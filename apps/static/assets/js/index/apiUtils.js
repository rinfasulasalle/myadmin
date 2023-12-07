// apiUtils.js
const apiUrl = 'http://62.72.11.15:3000/api/';

function buildUrl(endpoint) {
    return apiUrl + endpoint;
}

async function fetchData(endpoint) {
    try {
        const response = await fetch(buildUrl(endpoint));

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Response is not in JSON format");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}
