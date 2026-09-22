import fs from "fs";
import path from "path";

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  reason: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: string;
}

const FILE = path.join(process.cwd(), "data", "cms", "contacts.json");

function ensure() {
  const dir = path.dirname(FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, "[]");
}

export function readContacts(): ContactSubmission[] {
  try {
    ensure();
    return JSON.parse(fs.readFileSync(FILE, "utf-8"));
  } catch (e) {
    console.error("[contacts] readContacts failed:", e);
    return [];
  }
}

/**
 * Persists a new lead. Serverless platforms (Vercel etc.) ship a read-only
 * filesystem outside /tmp, so this throws there — the caller MUST check the
 * return value: a real business lead is at stake, never assume it saved.
 * Returns false (never throws) on failure.
 */
export function appendContact(c: ContactSubmission): boolean {
  try {
    ensure();
    const all = readContacts();
    all.push(c);
    fs.writeFileSync(FILE, JSON.stringify(all, null, 2));
    return true;
  } catch (e) {
    console.error("[contacts] appendContact failed — filesystem likely read-only in this environment:", e);
    return false;
  }
}

export function updateContactStatus(id: string, status: ContactSubmission["status"]): boolean {
  try {
    ensure();
    const all = readContacts();
    const idx = all.findIndex((c) => c.id === id);
    if (idx === -1) return false;
    all[idx].status = status;
    fs.writeFileSync(FILE, JSON.stringify(all, null, 2));
    return true;
  } catch (e) {
    console.error("[contacts] updateContactStatus failed:", e);
    return false;
  }
}
