// Prettify a JSON payload
const prettify = (x) => JSON.stringify(JSON.parse(x), null, 4);

// Prepare our API call in advance
const xhr = new XMLHttpRequest();

// Set up our handler for the API call completing
xhr.onreadystatechange = function () {

    // When our state is 4, we have completed the API call
    if (this.readyState == 4) {

        // Update our status marker
        document.getElementById("status").innerHTML = "" + this.status;

        // On success, display the result
        if (this.status == 200) {
            document.getElementById("status").className = "tertiary";
            document.getElementById("result").innerText = prettify(xhr.responseText);

        // On failure, indicate the fail
        } else {
            document.getElementById("status").className = "secondary";
            document.getElementById("result").innerHTML = "/* Unsuccessful API call */";
        }
    }
};

// Function to call the api
function apiCall () {
    xhr.open("GET", window.location.origin + "/", true);
    xhr.send();
}
