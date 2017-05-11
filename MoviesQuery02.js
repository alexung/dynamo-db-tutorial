/* 
The program included in this step retrieves all movies released in year 1992, 
with title beginning with the letter "A" through the letter "L".

ProjectionExpression is what I want the result db query to look like
KeyConditionExpression -- If the data fits this query, then return in
ExpressionAttributeNames -- need to do this for 'year' bc it's protected keyword in dynamodb
ExpressionAttributeValues -- The actual hard values for KeyConditionExpression
*/
var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Querying for movies from 1992 - titles A-L, with genres and lead actor");

var params = {
    TableName : "Movies",
    ProjectionExpression:"#yr, title, info.genres, info.actors[0]",
    KeyConditionExpression: "#yr = :yyyy and title between :letter1 and :letter2",
    ExpressionAttributeNames:{
        "#yr": "year"
    },
    ExpressionAttributeValues: {
        ":yyyy":1992,
        ":letter1": "A",
        ":letter2": "L"
    }
};

docClient.query(params, function(err, data) {
    if (err) {
        console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log(" -", item.year + ": " + item.title
            + " ... " + item.info.genres
            + " ... " + item.info.actors[0]);
        });
    }
});