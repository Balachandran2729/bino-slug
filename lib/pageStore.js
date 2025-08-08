let pagesCache = [];

export function getPages() {
  return pagesCache;
}

export function addPage(page) {
  pagesCache.push(page);
}

export function setPages(pages) {
  pagesCache = pages;
}
