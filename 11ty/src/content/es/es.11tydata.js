export default {
  eleventyComputed: {
    nav_main: (data) => data.es.main?.nav_main,
    index: (data) => data.es.main,
    resources: (data) => data.es.resources,
    how: (data) => data.es.how,
    why: (data) => data.es.why,
  }
};
