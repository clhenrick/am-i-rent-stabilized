export default {
  lang: "zh",
  eleventyComputed: {
    nav_main: (data) => data.zh.main?.nav_main,
    index: (data) => data.zh.main,
    resources: (data) => data.zh.resources,
    how: (data) => data.zh.how,
    why: (data) => data.zh.why,
  }
};
