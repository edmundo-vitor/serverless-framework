"use strict"

const { v4 } = require("uuid");
const AWS = require("aws-sdk");

AWS.config.update({region: 'us-east-1'});

const insertItem = async (event) => {
    const { item } = JSON.parse(event.body);
    const createdAt = new Date().toISOString();
    const id = v4();

    const dynamoDB = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

    const newItem = {
        id,
        item,
        createdAt,
        itemStatus: false
    }

    const params = {
        TableName: "ItemTableNew",
        Item: newItem
    }

    await dynamoDB.put(params, function(err, data) {
        if (err) {
        console.log(err); // an error occurred
        } else {
        console.log(data); // successful response
        }
    }).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(newItem)
    }
}

module.exports = {
    handler:insertItem
}