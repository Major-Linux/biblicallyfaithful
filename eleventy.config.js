import rssPlugin from "@11ty/eleventy-plugin-rss";

export default function(eleventyConfig) {
  eleventyConfig.addPlugin(rssPlugin);
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("images");
  
  // Date filter
  eleventyConfig.addFilter("postDate", (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  });

  // Video card shortcode
  eleventyConfig.addShortcode("videocard", (id, title, summary, runtime, date) => {
    return `
      <div class="video-card">
        <div class="video-card__player">
          <div class="video-wrapper">
            <iframe
              src="https://www.youtube.com/embed/${id}"
              title="${title}"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>
            </iframe>
          </div>
        </div>
        <div class="video-card__details">
          <h3 class="video-card__title">${title}</h3>
          <p class="video-card__summary">${summary}</p>
          <ul class="video-card__meta">
            ${runtime ? `<li><span class="meta-label">⏱ Runtime</span> ${runtime}</li>` : ''}
            ${date ? `<li><span class="meta-label">📅 Published</span> ${date}</li>` : ''}
          </ul>
        </div>
      </div>
    `;
  });

  // Main articles collection sorted by date
  eleventyConfig.addCollection("articles", function(collectionApi) {
    return collectionApi.getFilteredByTag("articles").sort((a, b) => {
      return b.date - a.date;
    });
  });

  // Category collections
  const categories = ["bible", "church", "creation", "end-times", "redemption"];
  categories.forEach(category => {
    eleventyConfig.addCollection(category, function(collectionApi) {
      return collectionApi.getFilteredByTag(category).sort((a, b) => {
        return b.date - a.date;
      });
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