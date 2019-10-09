"use strict";

const jwk = require("jsonwebtoken");
const jwkToPem = require("jwk-to-pem");
const request = require("request");

// For AWS Cognito: https://cognito-idp.<region>.amazonaws.com/<user pool id>
// refer to:        http://amzn.to/2fo77UI
const iss = "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_nBOVuuuVl";

// Generate policy to allow this user on this API:
const generatePolicy = (principalId, effect, resource) => {
  console.log(`effect: ${effect}`)
  console.log(`resource: ${resource}`)
  const authResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = "2012-10-17";
    policyDocument.Statement = [];
    const statementOne = {};
    statementOne.Action = "execute-api:Invoke";
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }

  return authResponse;
};

// Reusable Authorizer function, set on `authorizer` field in serverless.yml
module.exports.authorize = (event, context, cb) => {
  console.log("Auth function invoked");

  if (event.authorizationToken) {
    // console.log(`Reveived jwt: ${event.authorizationToken}`);
    // Remove 'bearer ' from token:
    const token = event.authorizationToken.substring(7);
    // Make a request to the iss + .well-known/jwks.json URL:
    request(
      { url: `${iss}/.well-known/jwks.json`, json: true },
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          console.log("Request error:", error);
          cb(`Error requesting jwks.json: ${error} `);
        }

        // console.log(`Request response: ${response}`)
        // console.log(`Request body: ${body}`)

        
        const keys = body;
        // Based on the JSON of `jwks` create a Pem:
        const k = keys.keys[0];
        const jwkArray = {
          kty: k.kty,
          n: k.n,
          e: k.e
        };
        const pem = jwkToPem(jwkArray);

        // console.log(`Variables: keys: ${keys}_____k: ${k}____jwkArray: ${jwkArray}____pem: ${pem}`)

        // Verify the token:
        jwk.verify(
          token,
          pem,
          { issuer: iss },
          (err, decoded) => {
            if (err) {
              console.log("Unauthorized user:", err.message);
              cb("Unauthorized");
            } else {
              let result = generatePolicy(decoded.sub, "Allow", event.methodArn)
              console.log(`result: ${result.policyDocument.Statement[0].Resource}`)
              cb(null, result);
            }
          }
        );
      }
    );
  } else {
    console.log("No authorizationToken found in the header.");
    cb("Unauthorized. No authorizationToken found in header.");
  }
};
