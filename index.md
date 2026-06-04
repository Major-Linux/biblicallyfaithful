---
layout: base.njk
title: Welcome
templateEngineOverride: njk,md
---

# Welcome to Biblically Faithful

<section class="bento">

  <!-- Featured Article -->
  {% set featured = collections.articles[0] %}
  <div class="bento__cell bento__cell--featured">
    {% if featured.data.image %}
      {% image featured.data.image | replace("/images/", ""), featured.data.title %}
    {% else %}
      <img src="/images/placeholder.svg" alt="{{ featured.data.title }}" class="bento__image"/>
    {% endif %}
    <div class="bento__featured-content">
      <span class="bento__label">Latest Article</span>
      <h2 class="bento__featured-title">
        <a href="{{ featured.url }}">{{ featured.data.title }}</a>
      </h2>
      <p class="bento__synopsis">{{ featured.data.synopsis }}</p>
      <a href="{{ featured.url }}" class="read-more">Read article →</a>
    </div>
  </div>

  <!-- Latest Articles List -->
  <div class="bento__cell bento__cell--articles">
    <span class="bento__label">Latest Articles</span>
    <ul class="bento__article-list">
      {% for post in collections.articles | slice(0, 5) %}
        <li>
          <a href="{{ post.url }}">{{ post.data.title }}</a>
          <span class="date">{{ post.date | postDate }}</span>
        </li>
      {% endfor %}
    </ul>
    <a href="/articles/" class="read-more">View all articles →</a>
  </div>

  <!-- About -->
  <div class="bento__cell bento__cell--about">
    <span class="bento__label">About</span>
    <p>A site dedicated to exploring the Bible with faithfulness and integrity.</p>
    <a href="/about/" class="read-more">Learn more →</a>
  </div>

  <!-- Thought for the Week -->
  <div class="bento__cell bento__cell--thought">
    <span class="bento__label">Thought for the Week</span>
    <blockquote class="bento__quote">
      "The word of God is living and active, sharper than any two-edged sword."
    </blockquote>
    <cite class="bento__cite">— Hebrews 4:12</cite>
  </div>

  <!-- Slogan -->
  <div class="bento__cell bento__cell--slogan">
    <p class="bento__slogan">Honouring the Bible</p>
    <p class="bento__slogan">Honouring God</p>
  </div>

</section>