import rssPlugin from "@11ty/eleventy-plugin-rss";
import Image from "@11ty/eleventy-img";

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


// Reading time filter
  eleventyConfig.addFilter("readingTime", (content) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `Read Time: ${minutes} min (est.)`;
  });


// Callout block shortcode
  eleventyConfig.addShortcode("callout", (text) => {
    return `
      <div class="callout">
        <p>${text}</p>
      </div>
    `;
  });


// Responsive image shortcode
  eleventyConfig.addShortcode("image", async (src, alt, sizes = "100vw") => {
    const metadata = await Image(`./images/${src}`, {
      widths: [400, 800, 1200],
      formats: ["webp", "jpeg"],
      outputDir: "./_site/images/",
      urlPath: "/images/",
      filenameFormat: (id, src, width, format) => {
        const name = src.split("/").pop().split(".")[0];
        return `${name}-${width}w.${format}`;
      }
    });

    
  const imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async"
  };

  return Image.generateHTML(metadata, imageAttributes);
});

// Previous article filter
  eleventyConfig.addFilter("previousPost", (collection, currentPage) => {
    const index = collection.findIndex(p => p.url === currentPage.url);
    return index < collection.length - 1 ? collection[index + 1] : null;
  });

// Next article filter
  eleventyConfig.addFilter("nextPost", (collection, currentPage) => {
    const index = collection.findIndex(p => p.url === currentPage.url);
    return index > 0 ? collection[index - 1] : null;
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