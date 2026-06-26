import { createServer } from "node:http";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const databasePath = join(__dirname, "data", "testimonials.json");
const port = Number(process.env.API_PORT || 5180);

async function ensureDatabase() {
  await mkdir(dirname(databasePath), { recursive: true });

  try {
    await readFile(databasePath, "utf8");
  } catch {
    await writeFile(databasePath, "[]\n", "utf8");
  }
}

async function readTestimonials() {
  await ensureDatabase();

  try {
    const database = await readFile(databasePath, "utf8");
    const testimonials = JSON.parse(database);
    return Array.isArray(testimonials) ? testimonials : [];
  } catch {
    return [];
  }
}

async function saveTestimonials(testimonials) {
  await ensureDatabase();
  await writeFile(databasePath, `${JSON.stringify(testimonials, null, 2)}\n`, "utf8");
}

function sendJson(response, statusCode, data) {
  response.writeHead(statusCode, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Content-Type": "application/json",
  });
  response.end(JSON.stringify(data));
}

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;

      if (body.length > 1_000_000) {
        request.destroy();
        reject(new Error("Request body is too large."));
      }
    });

    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

function cleanText(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function createTestimonial(payload) {
  const name = cleanText(payload.name, 80);
  const role = cleanText(payload.role, 80) || "Client Feedback";
  const text = cleanText(payload.text, 800);
  const result = cleanText(payload.result, 120);
  const rating = Math.min(5, Math.max(1, Number(payload.rating) || 5));

  if (!name || !text || !result) {
    return null;
  }

  return {
    id: `feedback-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    role,
    rating,
    text,
    result,
    createdAt: new Date().toISOString(),
  };
}

const server = createServer(async (request, response) => {
  if (request.method === "OPTIONS") {
    sendJson(response, 204, {});
    return;
  }

  const url = new URL(request.url || "/", `http://${request.headers.host}`);

  if (url.pathname === "/api/health") {
    sendJson(response, 200, { ok: true });
    return;
  }

  if (url.pathname !== "/api/testimonials") {
    sendJson(response, 404, { error: "Not found" });
    return;
  }

  try {
    if (request.method === "GET") {
      const testimonials = await readTestimonials();
      sendJson(response, 200, testimonials);
      return;
    }

    if (request.method === "POST") {
      const body = await readRequestBody(request);
      const testimonial = createTestimonial(JSON.parse(body || "{}"));

      if (!testimonial) {
        sendJson(response, 400, {
          error: "Name, feedback, and result are required.",
        });
        return;
      }

      const testimonials = await readTestimonials();
      const nextTestimonials = [testimonial, ...testimonials];
      await saveTestimonials(nextTestimonials);
      sendJson(response, 201, testimonial);
      return;
    }

    sendJson(response, 405, { error: "Method not allowed" });
  } catch (error) {
    sendJson(response, 500, {
      error: error instanceof Error ? error.message : "Server error",
    });
  }
});

server.listen(port, () => {
  console.log(`Testimonials API running at http://localhost:${port}`);
});
