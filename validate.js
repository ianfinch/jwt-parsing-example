// Libraries we need
const axios = require("axios");
const jwkToPem = require("jwk-to-pem");
const jwt = require("jsonwebtoken");

// User pool information
const region = "us-east-1";
const poolId = "us-east-1_MsHScNijB";
const issuer = "https://cognito-idp." + region + ".amazonaws.com/" + poolId;

// When verifying, we expect to use RS256, and that our issuer is correct
const verificationOptions = {
    algorithms: ["RS256"],
    issuer
};


// The validation process
function validate(token, success, failure = handleError) {

    getKeys(region, poolId)
        .then(indexKeys)
        .then(findVerificationKey(token))
        .then(verifyToken(token))
        .then(checkTokenUse)
        .then(success)
        .catch(failure);
}


// Error handling
function handleError(err) {
    console.error(err);
}


// Get our keys
function getKeys(region, poolId) {

    let jwksUrl = issuer + "/.well-known/jwks.json";
    return axios.get(jwksUrl).then(response => Promise.resolve(response.data.keys));
}


// Index keys by "kid", and convert to PEM
function indexKeys(keyList) {

    let result = keyList.reduce((keys, jwk) => {
        keys[jwk.kid] = jwkToPem(jwk);
        return keys;
    }, {});

    return Promise.resolve(result);
}


// Now we need to decode our token, to find the verification key
function findVerificationKey(token) {

    return (pemList) => {

        let decoded = jwt.decode(token, {complete: true});
        return Promise.resolve(pemList[decoded.header.kid]);
    };
}


// Verify our token
function verifyToken(token) {

    return (pem) => {

        let verified = jwt.verify(token, pem, verificationOptions);
        return Promise.resolve(verified);
    };
}


// Check that we are using the token to establish access
function checkTokenUse(verifiedToken) {

    if (verifiedToken.token_use === "access") {
        return Promise.resolve(verifiedToken);
    }

    throw new Error("Expected access token, got: " + verifiedToken.token_use);
}


// Make our valdation function available
module.exports = validate;
