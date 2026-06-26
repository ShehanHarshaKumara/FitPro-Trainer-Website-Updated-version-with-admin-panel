const API_URL = import.meta.env.VITE_API_URL || "/api";
const BACKEND_URL = API_URL.startsWith("http") ? API_URL.replace(/\/api$/, "") : "http://127.0.0.1:8000";

export type ApiPackage = { id: number; slug: string; title: string; duration: string; price: string; description: string; features: string[]; image: string | null };
export type ApiService = { id: number; title: string; description: string; features: string[]; image: string | null; icon?: string | null };
export type ApiGalleryItem = { id: number; title: string | null; description: string | null; image: string | null; before_image: string | null; category: string };
export const assetUrl = (path: string | null) => path ? (path.startsWith("http") || path.startsWith("/") ? path : `${BACKEND_URL}/storage/${path}`) : "";
export async function getApi<T>(path: string): Promise<T> { const response = await fetch(`${API_URL}/${path}`); if (!response.ok) throw new Error("Could not load website content."); return response.json(); }
export async function submitFeedback(payload: {name:string;email:string;phone:string;package_id:string;message:string}) { const response=await fetch(`${API_URL}/feedback`,{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(payload)}); if(!response.ok) throw new Error("Could not send message."); return response.json(); }

export function trackVisit(path: string) {
  const key = "fitpro_visitor_id";
  let visitorId = localStorage.getItem(key);
  if (!visitorId) { visitorId = crypto.randomUUID(); localStorage.setItem(key, visitorId); }
  return fetch(`${API_URL}/visits`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ path, visitor_id: visitorId }), keepalive: true }).catch(() => undefined);
}
