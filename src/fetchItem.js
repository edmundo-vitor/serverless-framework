"use strict"

const AWS = require("aws-sdk");

const fetchItem = async (event) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

    const { id } = event.pathParameters;

    let item;

    try {
        const result = await dynamoDB.get({
            TableName: "ItemTableNew",
            Key: {id}
        }).promise();

        item = result.Item;
    } catch (error) {
        console.log(error);
    }

    return {
        statusCode: 200,
        body: JSON.stringify(item)
    }
}

module.exports = {
    handler:fetchItem
}