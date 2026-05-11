export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css");
  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    }
  };
};