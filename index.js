//Task 01:
//Iterating with Async/Await: Write an async function iterateWithAsyncAwait that takes an array of values and logs each value with a delay of 1 second between logs.
const value = ["Rice", "Beans", "Bannana", "Apple"];
async function iterateWithAsyncAwait(values) {
    for (const value of values) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(value);
    }
}
iterateWithAsyncAwait(value);

//Task 02
//Awaiting a Call: Create an async function awaitCall that simulates fetching data from an API. Use await to wait for the API response and then log the data.
async function awaitCall() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}
awaitCall();




// Task 04:
//Awaiting Concurrent Requests: Create an async function concurrentRequests that makes two API calls concurrently using Promise.all(). Log the combined results after both requests have resolved.
async function concurrentRequests() {
    const fakeApi1 = fakeApiCall();
    const fakeApi2 = fakeApiCall();
    
    try {
        const [response1, response2] = await Promise.all([fakeApi1, fakeApi2]);
        console.log('API 1 Response:', response1);
        console.log('API 2 Response:', response2);
    } catch (error) {
        console.error('One of the API calls failed:', error.message);
    }
}

// Simulate a fake API call for awaitCall function
function fakeApiCall() {
    return new Promise((resolve, reject) => {
        // Simulate a successful API call 70% of the time
        setTimeout(() => {
            if (Math.random() > 0.3) {
                resolve({ data: 'Sample data' });
            } else {
                reject(new Error('API call failed'));
            }
        }, 2000);
    });
}
concurrentRequests();



//Task 05:
//Awaiting Parallel Calls: Write a function parallelCalls that takes an array of URLs and fetches data from each URL concurrently using Promise.all(). Log the responses once all requests are complete.
const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3'
];
async function parallelCalls(urls) {
    try {
        // Map each URL to a fetch request and store the promises in an array
        const fetchPromises = urls.map(url => fetch(url));

        // Use Promise.all() to wait for all the fetch requests to complete
        const responses = await Promise.all(fetchPromises);

        // Map over the responses to extract the JSON data from each one
        const dataPromises = responses.map(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch from ${response.url}: ${response.statusText}`);
            }
            return response.json();
        });

        // Wait for all the data promises to resolve
        const data = await Promise.all(dataPromises);

        // Log the fetched data
        console.log(data);
    } catch (error) {
        // Handle any errors that occur during the fetch process
        console.error('Error during parallel fetch operation:', error);
    }
}
parallelCalls(urls);

