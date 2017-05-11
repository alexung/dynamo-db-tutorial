/*
The program included in this step retrieves all movies released in the year 1985.

**NOTE**
ExpressionAttributeNames provides name substitution. 

We use this because year is a reserved word in DynamoDB
—you cannot use it directly in any expression, including KeyConditionExpression. 
We use the expression attribute name #yr to address this.
ExpressionAttributeValues provides value substitution. 
We use this because you cannot use literals in any expression, 
including KeyConditionExpression. 
We use the expression attribute value :yyyy to address this.

The preceding program shows how to query a table by its primary key attributes. 

In DynamoDB, you can optionally create one or more secondary indexes on a table, 
and query those indexes in the same way that you query a table. 

Secondary indexes give your applications additional flexibility 
by allowing queries on non-key attributes. 

For more information, see Secondary Indexes in the Amazon DynamoDB Developer Guide.
*/

var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Querying for movies from 1985.");

var params = {
    TableName : "Movies",
    KeyConditionExpression: "#yr = :yyyy",
    ExpressionAttributeNames:{
        "#yr": "year"
    },
    ExpressionAttributeValues: {
        ":yyyy":1985
    }
};

docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log(" -", item.year + ": " + item.title);
        });
    }
});
