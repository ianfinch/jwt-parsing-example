const express = require("express"),
      app = express(),
      port = 3000;

// Serve static files from folder called public
app.use("/app", express.static("static"));

// Respond to a an API request
app.get("/", (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    response.send({message: "Hello friend"});
});

// Start the server
app.listen(port, () => console.log("Server listening on port " + port));



//    response.status(401).send({error: "Not authenticated"});
