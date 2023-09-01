async function fetchNews() {
    try {
        let response = await fetch('http://localhost:4000/api/news');
        let news = await response.json();

        // Sort by timestamp
        news.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

        const newsBody = document.getElementById("newsBody");
        newsBody.innerHTML = '';

        news.forEach(article => {
            const row = newsBody.insertRow();

            const imgCell = row.insertCell(0);
            const img = document.createElement("img");
            img.src = article.urlToImage;
            img.alt = "News image";
            imgCell.appendChild(img);

            const headlineCell = row.insertCell(1);
            const headlineLink = document.createElement("a");
            headlineLink.href = article.url;
            headlineLink.textContent = article.title;
            headlineCell.appendChild(headlineLink);

            const descriptionCell = row.insertCell(2);
            descriptionCell.textContent = article.description;

            const timestampCell = row.insertCell(3);
            timestampCell.textContent = new Date(article.publishedAt).toLocaleString();
        });

    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

document.getElementById("darkModeToggle").addEventListener("change", function() {
    if (this.checked) {
        document.body.setAttribute("data-theme", "dark");
    } else {
        document.body.removeAttribute("data-theme");
    }
});

document.getElementById("sortOption").addEventListener("change", function() {
    fetchNews(); // Re-fetch and re-render the news whenever sorting option is changed
});

// Initial fetch
fetchNews();
