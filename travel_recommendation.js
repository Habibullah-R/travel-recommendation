// DOM Element Declarations
const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');
const searchInput = document.getElementById('searchInput');
const resultContainer = document.getElementById('resultContainer');

// Task 6: Fetch JSON Data Implementation
function searchDestinations() {
    const keyword = searchInput.value.toLowerCase().trim();
    resultContainer.innerHTML = ''; // Reset container layout initially

    if (!keyword) {
        alert("Please enter a search keyword.");
        return;
    }

    fetch('travel_recommendation_api.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response encountered an issue loading local API data.");
            }
            return response.json();
        })
        .then(data => {
            console.log("Fetched API Data successfully:", data); // Required validation log
            
            let matchedItems = [];

            // Task 7: Keyword variations processing logic
            if (keyword === 'beach' || keyword === 'beaches') {
                matchedItems = data.beaches;
            } else if (keyword === 'temple' || keyword === 'temples') {
                matchedItems = data.temples;
            } else {
                // Country tracking match verification
                const foundCountry = data.countries.find(c => c.name.toLowerCase() === keyword);
                if (foundCountry) {
                    matchedItems = foundCountry.cities;
                }
            }

            // Task 8: UI Generation and Element Generation
            if (matchedItems.length > 0) {
                displayResults(matchedItems);
            } else {
                resultContainer.innerHTML = `<p class="error-msg">No results found matching "${searchInput.value}". Try searching "beach", "temple", or "Australia".</p>`;
            }
        })
        .catch(error => {
            console.error("Error executing fetch routine:", error);
            resultContainer.innerHTML = `<p class="error-msg">Error retrieving destination data profiles.</p>`;
        });
}

// Helper block to safely parse and append elements dynamically
function displayResults(items) {
    items.forEach(item => {
        // Task 10: Optional dynamic local target time logic conversion
        const timeOptions = { timeZone: item.timeZone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const localTimeStr = new Date().toLocaleTimeString('en-US', timeOptions);

        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}">
            <div class="card-body">
                <h3>${item.name}</h3>
                <p class="card-time">🕒 Local Time: ${localTimeStr}</p>
                <p>${item.description}</p>
            </div>
        `;
        resultContainer.appendChild(card);
    });
}

// Task 9: Clear functionality configuration logic
function clearResults() {
    searchInput.value = '';
    resultContainer.innerHTML = '';
    console.log("Search filters and display parameters cleared smoothly.");
}

// Event bindings assignment
btnSearch.addEventListener('click', searchDestinations);
btnClear.addEventListener('click', clearResults);