export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css");

    eleventyConfig.addFilter("postDate", (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  });
  
  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    }
  };
};