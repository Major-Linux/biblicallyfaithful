import * as yaml from "js-yaml"; 
import rssPlugin from "@11ty/eleventy-plugin-rss";
import Image from "@11ty/eleventy-img";
import markdownIt from "markdown-it";
import markdownItCallouts from "markdown-it-callouts";

export default function(eleventyConfig) {
  // Add YAML parsing extension for the _data directory
  eleventyConfig.addDataExtension("yaml, yml", (contents) => yaml.load(contents));
  // Markdown-it with callouts support (Obsidian-style callout syntax)
  const md = markdownIt({ html: true }).use(markdownItCallouts);
  eleventyConfig.setLibrary("md", md);
  eleventyConfig.addPlugin(rssPlugin);
  eleventyConfig.addPassthroughCopy("assets");
  
  // Date filter
  eleventyConfig.addFilter("postDate", (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  });

  eleventyConfig.addFilter("isoDate", (date) => {
    return new Date(date).toISOString().split('T')[0];
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
    const metadata = await Image(`./assets/images/${src}`, {
      widths: [400, 800, 1200],
      formats: ["webp", "jpeg"],
      outputDir: "./_site/assets/images/",
      urlPath: "/assets/images/",
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
  eleventyConfig.addShortcode("videocard", (id, title, runtime, date) => {
    const youtubeUrl = `https://www.youtube.com/watch?v=${id}`;
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
          <ul class="video-card__meta">
            ${date ? `<li><span class="video-card__meta-label">Published</span> ${date}</li>` : ''}
            ${runtime ? `<li><span class="video-card__meta-label">Runtime</span> ${runtime}</li>` : ''}
            <li><span class="video-card__meta-label">Watch on YouTube</span> <a href="${youtubeUrl}" target="_blank" rel="noopener noreferrer">${youtubeUrl}</a></li>
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
  const categories = ["bible", "biblical-church", "creation", "end-times", "redemption", "featured-scripture"];
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
      includes: "_includes",
      data: "_data",
    }
  };
};

