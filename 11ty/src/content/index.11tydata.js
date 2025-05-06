export default {
  eleventyComputed: {
    main: (data) => data.en.main,
    nav_main: (data) => data.en.main?.nav_main,
  }
};
