const { v4 } = require("uuid");
const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();

const Dynamo = {

	async getAll( TableName ) {
		const params = {
			TableName
		};
		const data = await dynamodb.scan(params).promise();
		if (!data || !data.Items) {
			throw Error(`Se ha producido un error al obtener los datos desde ${TableName}`);
		}
		return data.Items;
	},

	async getById(id, TableName) {
		const params = {
			TableName,
			Key: { id }
		};
		const data = await dynamodb.get(params).promise();
		if (!data || !data.Item) {
			throw Error(`Se ha producido un error al obtener los datos del elemento de ID: ${id} desde ${TableName}`);
		}
		return data.Item;
	},

	async write(data, TableName) {
		data.id = v4();
		const params = {
			TableName,
			Item: data,
		};
		const res = await dynamodb.put(params).promise();
		if (!res) {
			throw Error(`Se produjo un error al intertar la data de ID: ${data.id} en la tabla: ${TableName}`);
		}
		return data;
	},

	async update(id, TableName, UpdateExpression, ExpressionAttributeValues) {
		const params = {
			TableName,
			Key: { id },
			UpdateExpression,
			ExpressionAttributeValues,
			ReturnValues: 'ALL_NEW'
		};
		const data = await dynamodb.update(params).promise();
		if (!data) {
			throw Error(`Se produjo un error al editar la data de ID: ${data?.Attributes?.id} en la tabla: ${TableName}`);
		}
		return data?.Attributes;
	},

	async delete(id, TableName) {
		const params = {
			TableName,
			Key: { id }
		};
		const res = await dynamodb.delete(params).promise();
		if (!res) {
			throw Error(`Se ha producido un error al obtener los datos del elemento de ID: ${id} desde ${TableName}`);
		}
		return res;
	},
};

module.exports = Dynamo;