const express = require("express"),
      app = express(),
      port = 3000,
      validate = require("./validate"),
      idp = "https://blog2.auth.us-east-1.amazoncognito.com/login?response_type=token&client_id=2n4mbdugkkjoi3fchf0tlq0t33&redirect_uri=http://localhost:3000/app";

// Utility function to send a 401 response
function send401 (response, err) {
    response.status(401).send({
        error: "Not authenticated",
        idp,
        detail: err.message
    });
}

// Serve static files from folder called public
app.use("/app", express.static("static"));

// Authentication / authorisation middleware
app.use((request, response, next) => {

    response.setHeader('Content-Type', 'application/json');

    // We need an authorization header
    if (!request.headers || !request.headers.authorization) {
        send401(response, new Error("Missing authorization header"));

    // We need the authorization header to be a "bearer" header
    } else if (request.headers.authorization.substr(0, 7).toLowerCase() !== "bearer ") {
        send401(response, new Error("Authorization header is not a bearer header"));

    // So, we've got a token, which we validate.  If the validation is
    // successful, we send the requested response.  If the validation fails,
    // we send a 401 response (which includes the error from the validation).
    } else {
        validate(request.headers.authorization.substr(7),
                 (success) => { next(); },
                 (fail) => { send401(response, fail); });
    }
});

// Respond to a an API request
app.get("/", (request, response) => {
    response.send({message: "Hello friend"});
});

// Start the server
app.listen(port, () => console.log("Server listening on port " + port));
