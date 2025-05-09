export default {
  eleventyComputed: {
    nav_main: (data) => data.en.main?.nav_main,
    resources: (data) => data.en.resources,
    how: (data) => data.en.how,
    why: (data) => data.en.why,
  }
};
