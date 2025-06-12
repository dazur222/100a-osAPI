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
resultsDiv.innerHTML = '';
if (data.length === 0) {
    resultsDiv.innerText = 'No results found.';
    return;
}
data.forEach(item => {
    resultsDiv.innerHTML += `<pre>${JSON.stringify(item, null, 2)}</pre>`;
});
}

