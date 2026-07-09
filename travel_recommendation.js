// Target UI Node Bindings
const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');
const searchInput = document.getElementById('searchInput');
const resultContainer = document.getElementById('resultContainer');

// Search Execution Module Logic
function searchDestinations() {
    const keyword = searchInput.value.toLowerCase().trim();
    resultContainer.innerHTML = ''; // Wipe display frame area

    if (!keyword) {
        alert("Please enter a valid search term.");
        return;
    }

    fetch('travel_recommendation_api.json')
        .then(response => {
            if (!response.ok) throw new Error("API data resource could not be loaded.");
            return response.json();
        })
        .then(data => {
            console.log("JSON payload loaded:", data);
            
            let matchedItems = [];

            // Task 7: String validation matching conditions 
            if (keyword === 'beach' || keyword === 'beaches') {
                matchedItems = data.beaches;
            } else if (keyword === 'temple' || keyword === 'temples') {
                matchedItems = data.temples;
            } else if (keyword === 'country' || keyword === 'countries') {
                // Task 8 expansion logic: flatten and map all cities across every country definition package
                matchedItems = data.countries.flatMap(country => country.cities);
            } else {
                // Direct specific keyword structural tracking fallback configuration
                const foundCountry = data.countries.find(c => c.name.toLowerCase() === keyword);
                if (foundCountry) {
                    matchedItems = foundCountry.cities;
                }
            }

            // Render Output Array Context Array Elements
            if (matchedItems.length > 0) {
                displayResults(matchedItems);
            } else {
                resultContainer.innerHTML = `<p class="error-msg">No structured results found for "${searchInput.value}". Please input "beach", "temple", or "country".</p>`;
            }
        })
        .catch(err => {
            console.error("Pipeline failure executing process handling routine:", err);
            resultContainer.innerHTML = `<p class="error-msg">Critical runtime anomaly loading server assets.</p>`;
        });
}

// Result Component Node Compiler
function displayResults(items) {
    items.forEach(item => {
        // Task 10: Clock formatting profile tracking conversion implementation
        const timeOptions = { timeZone: item.timeZone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const convertedLocalTime = new Date().toLocaleTimeString('en-US', timeOptions);

        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}">
            <div class="card-body">
                <h3>${item.name}</h3>
                <p class="card-time">🕒 Local Time: ${convertedLocalTime}</p>
                <p>${item.description}</p>
            </div>
        `;
        resultContainer.appendChild(card);
    });
}

// Reset Form & View Interface Properties
function clearResults() {
    searchInput.value = '';
    resultContainer.innerHTML = '';
    console.log("Display state tracking properties successfully cleared.");
}

// Event Handler Attachment Hooks
btnSearch.addEventListener('click', searchDestinations);
btnClear.addEventListener('click', clearResults);