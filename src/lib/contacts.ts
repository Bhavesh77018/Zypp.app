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
  ensure();
  try { return JSON.parse(fs.readFileSync(FILE, "utf-8")); } catch { return []; }
}

export function appendContact(c: ContactSubmission): void {
  ensure();
  const all = readContacts();
  all.push(c);
  fs.writeFileSync(FILE, JSON.stringify(all, null, 2));
}

export function updateContactStatus(id: string, status: ContactSubmission["status"]): void {
  ensure();
  const all = readContacts();
  const idx = all.findIndex((c) => c.id === id);
  if (idx !== -1) { all[idx].status = status; fs.writeFileSync(FILE, JSON.stringify(all, null, 2)); }
}
