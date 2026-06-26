import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const backend = join(root, "backend");
const processes = [];

async function laravelIsRunning() {
  try { return (await fetch("http://127.0.0.1:8000/up")).ok; } catch { return false; }
}

function stopAll() { for (const process of processes) if (!process.killed) process.kill(); }
process.on("SIGINT", () => { stopAll(); process.exit(0); });
process.on("SIGTERM", () => { stopAll(); process.exit(0); });

if (!(await laravelIsRunning())) {
  processes.push(spawn("php", ["artisan", "serve", "--host=127.0.0.1", "--port=8000"], { cwd: backend, shell: true, stdio: "inherit" }));
} else {
  console.log("Laravel is already running at http://127.0.0.1:8000");
}

processes.push(spawn("vite", [], { cwd: root, shell: true, stdio: "inherit" }));
for (const process of processes) process.on("exit", (code) => { if (code && code !== 0) { stopAll(); process.exit(code); } });
