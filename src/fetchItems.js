"use strict"

const AWS = require("aws-sdk");

const fetchItems = async (event) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

    let items;

    try {
        const results = await dynamoDB.scan({
            TableName: "ItemTableNew"
        }).promise();
        items = results.Items;

    } catch (error) {
        console.log(error);
    }

    return {
        statusCode: 200,
        body: JSON.stringify(items)
    }
}

module.exports = {
    handler:fetchItems
}