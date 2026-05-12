---
layout: base.njk
title: Articles
---

# Articles

{% for post in collections.articles %}
  <article class="post-item">
    <h2><a href="{{ post.url }}">{{ post.data.title }}</a></h2>
    <p class="date">{{ post.date | postDate }}</p>
  </article>
{% endfor %}