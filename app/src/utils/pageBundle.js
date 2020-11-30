// loads and invokes the correct JS bundle for a given html page
export async function getPageJsBundle(pageName) {
  if (pageName === "index") {
    const { default: _ } = await import(
      /* webpackChunkName: "init-app" */ "./initApp.js"
    );
    return _;
  }
  const { default: _ } = await import(
    /* webpackChunkName: "init-info-pages" */ "./initInfoPages.js"
  );
  return _;
}
