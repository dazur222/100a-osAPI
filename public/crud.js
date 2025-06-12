async function search() {
const query = document.getElementById('searchInput').value;
const category = document.getElementById('category').value;

try {
    const response = await fetch(`http://localhost:3000/search/${category}?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    displayResults(data);
} catch (error) {
    console.error("Search error:", error);
}
}

function displayResults(data) {
  const resultsDiv = document.getElementById('results');
  const cardsContainer = document.getElementById('cardsContainer');
  resultsDiv.innerHTML = '';
  cardsContainer.innerHTML = '';
  if (data.length === 0) {
    resultsDiv.innerText = 'No results found.';
    return;
  }
  // Show all results in a single card
  let cardHtml = `<div class="card">`;
  data.forEach((item, idx) => {
    // Use 'nombre' as title for each item, or fallback
    const title = item.nombre || Object.values(item)[0] || 'Sin título';
    cardHtml += `<h3>${title}</h3>`;
    Object.entries(item).forEach(([key, value]) => {
      if (key !== '_id' && key !== 'nombre') {
        cardHtml += `<p><strong>${key}:</strong> ${value}</p>`;
      }
    });
    if (idx < data.length - 1) cardHtml += '<hr />';
  });
  cardHtml += `</div>`;
  cardsContainer.innerHTML = cardHtml;
}

