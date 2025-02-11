const apiKey = "b975d02ff1ca45a4a8b53f9ae304a0aa";
const apiUrl = `https://newsapi.org/v2/everything?q=tesla&from=2025-01-10&sortBy=publishedAt&apiKey=${apiKey}`;

// Fetch latest news
async function fetchNews(url) {
    try {
        const res = await fetch(url)
        if(!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`)
        }
        const data = await res.json();
        if(data.articles && data.articles.length > 0) {
            displayNews(data.articles);
            document.getElementById("errorMessage").classList.add("hidden");
        }else {
            showError("No articles found")
        }
    } catch(err) {
        console.error("Error fetching news:", err);
        showError("Failed to fetch news. Please check yout Apit key or try again later.")
    }
}

// Display news articles
function displayNews(articles) {
    const newsContainer = document.getElementById("newsContainer");
    newsContainer.innerHTML = '';

    articles.forEach(article => {
        const newsCard = document.createElement("div");
        newsCard.className = "bg-white p-4 rounded shadow";

        newsCard.innerHTML = `
         <img src="${article.urlToImage || 'https://via.placeholder.com/400'}" class="w-full h-48 object-cover rounded">
         <h2 class="text-xl font-semibold mt-2">${article.title}</h2>
         <p class="text-sm text-gray-600">${article.description || "No Description available."}</p>
         <a href="${article.url}" target="_blank" class="text-blue-500 cursor-pointer hover:underline mt-2 inline-block" >Read more</a>
        `;
        newsContainer.appendChild(newsCard)
    });
}

// Show error message
function showError(message) {
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden")

    document.getElementById("newsContainer").innerHTML = ""
}

// Search news
function searchNews() {
    const query = document.getElementById("searchInput").value.trim();
    if(query) {
        const serchUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
          query
        )}&apiKey=${apiKey}`;
        fetchNews(serchUrl);
    }else {
        fetchNews(apiUrl)
    }
}

// Load default nesw
fetchNews(apiUrl)