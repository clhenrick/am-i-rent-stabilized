/**
 * gets the in page navigation link data for info pages sidebar
 * @param {{}} data
 * @param {string} langCode
 * @returns {{} | undefined}
 */
export function getInPageNavLinks(data, langCode) {
  const { fileSlug } = data.page;
  const infoPageData = data[langCode][fileSlug];
  return infoPageData?.nav_side;
}
