async function getNews() {
  const keyword = document.getElementById('keywordInput').value.trim();
  const newsContainer = document.getElementById('newsContainer');
  const status = document.getElementById('status');

  newsContainer.innerHTML = '';
  status.textContent = '';

  if (!keyword) {
    status.textContent = 'Please enter a topic to search.';
    return;
  }

  status.textContent = 'Loading...';

  const apiKey = '186cb8fbc8f8445dadd5ef89e7fe056d';
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(keyword)}&apiKey=${apiKey}&pageSize=10`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.status === "error") {
      status.textContent = `Error: ${data.message}`;
      return;
    }

    if (data.articles.length === 0) {
      status.textContent = 'No articles found.';
      return;
    }

    status.textContent = `Top ${data.articles.length} results for "${keyword}"`;

    data.articles.forEach(article => {
      const card = document.createElement('div');
      card.className = 'news-card';

      card.innerHTML = `
        <img src="${article.urlToImage || 'https://via.placeholder.com/300x160'}" alt="News Image">
        <h3>${article.title}</h3>
        <a href="${article.url}" target="_blank">Read more →</a>
      `;

      newsContainer.appendChild(card);
    });
  } catch (err) {
    status.textContent = 'Failed to fetch news. Please try again later.';
    console.error(err);
  }
}
