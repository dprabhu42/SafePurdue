export type Resource = {
  name: string;
  description?: string;
  url?: string;
  phone?: string;
  location?: string;
  notes?: string;
};

export type AskResponse = {
  reply: string;
  resources: Resource[];
  // optional fields if your backend returns them:
  // intent?: string;
  // crisis?: boolean;
};

const BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";

export async function askSafePurdue(message: string): Promise<AskResponse> {
  const res = await fetch(`${BASE}/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Backend error (${res.status}): ${text || res.statusText}`);
  }

  return (await res.json()) as AskResponse;
}
