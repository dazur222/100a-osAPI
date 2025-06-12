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
  data.forEach(item => {
    const title = item.nombre || Object.values(item)[0] || 'Sin título';
    let cardHtml = `<div class="card">`;
    cardHtml += `<h3>${title}</h3>`;
    // List all properties except _id and nombre
    Object.entries(item).forEach(([key, value]) => {
      if (key !== '_id' && key !== 'nombre') {
        cardHtml += `<p><strong>${key}:</strong> ${value}</p>`;
      }
    });
    cardHtml += `</div>`;
    cardsContainer.innerHTML += cardHtml;
  });
}

