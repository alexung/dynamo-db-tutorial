/*
You can use the delete method to delete one item by specifying its primary key.
You can optionally provide a ConditionExpression to prevent item deletion if the condition is not met.
In the following example, you try to delete a specific movie item if its rating is 5 or less.

The movie's rating is > 5, so it doesn't delete.  When I comment out that condition,
it deletes!
*/

var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Movies";

var year = 2015;
var title = "The Big New Movie";

var params = {
    TableName:table,
    Key:{
        "year":year,
        "title":title
    },
    // ConditionExpression:"info.rating <= :val",
    // ExpressionAttributeValues: {
    //     ":val": 5.0
    // }
};

console.log("Attempting a conditional delete...");
docClient.delete(params, function(err, data) {
    if (err) {
        console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
    }
});