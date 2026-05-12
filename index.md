---
layout: base.njk
title: Welcome
---

# Welcome to Biblically Faithful

This site is dedicated to exploring the Bible with faithfulness and integrity.

---

## Latest Articles

{% for post in collections.articles | slice(0, 3) %}
  <article class="post-item">
    <h2><a href="{{ post.url }}">{{ post.data.title }}</a></h2>
    <p class="date">{{ post.date | postDate }}</p>
  </article>
{% endfor %}

<p><a href="/articles/" class="read-more">View all articles →</a></p>