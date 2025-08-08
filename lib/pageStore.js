// lib/pageStore.js

import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "pages.json");

function readPages() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

function writePages(pages) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(pages, null, 2));
}

export function getPages() {
  return readPages();
}

export function addPage(page) {
  const pages = readPages();
  pages.push(page);
  writePages(pages);
}

export function setPages(pages) {
  writePages(pages);
}