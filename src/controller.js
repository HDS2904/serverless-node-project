const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const dynamodb = new AWS.DynamoDB.DocumentClient();

// AGREGAR TAREA
const addTask = async (event) => {

	try {

		const { title, description } =  JSON.parse(event.body);
		const createdAt = new Date();
		const taskId = v4();

		const newTask = {
			taskId,
			title,
			description,
			createdAt
		}

		await dynamodb
			.put({
				TableName: 'TaskTable',
				Item: newTask
			}).promise();

		return {
			status: 200,
			body: newTask
		}

	} catch (error) {
		
		return {
			status: 400,
			body: error
		}
	}

	

}

// MOSTRAR TAREA
const getTasks = async (event) => {

	try {
		const result = await dynamodb
		.scan({
			TableName: 'TaskTable'
		}).promise();

		return {
			status: 200,
			body: result?.Items
		}

	} catch (error) {
		
		return {
			status: 404,
			body: error
		}
	}

}

// MOSTRAR POR ID
const getTaskById = async (event) => {

	try {

		const { id } = event.pathParameters;
		const result = await dynamodb
			.get({
				TableName: 'TaskTable',
				Key: { taskId: id }
			}).promise();

		return {
			status: 200,
			body: result?.Item
		}

	} catch (error) {
		
		return {
			status: 404,
			body: error
		}
	}

}

// EDITAR POR ID
const putTask = async (event) => {

	try {

		const { id } = event.pathParameters;

		const { title, description } =  JSON.parse(event.body);

		const result = await dynamodb
			.update({
				TableName: 'TaskTable',
				Key: { taskId: id },
				UpdateExpression: 'set title = :title, description = :description',
				ExpressionAttributeValues: {
					':title': title,
					':description': description
				},
				ReturnValues: 'ALL_NEW'
			}).promise();

		return {
			status: 200,
			body: `Tarea ${result?.Attributes?.taskId} actualizada!`
		}

	} catch (error) {
		
		return {
			status: 404,
			body: error
		}
	}

}

	// ELIMINAR POR ID
	const deleteTask = async (event) => {

		try {

			const { id } = event.pathParameters;

			const result = await dynamodb
				.delete({
					TableName: 'TaskTable',
					Key: { taskId: id },
				}).promise();

				console.log("eliminando: ", result)
			return {
				status: 200,
				body: `Tarea ${id} eliminada!`
			}

		} catch (error) {
			
			return {
				status: 404,
				body: error
			}
		}

	}


module.exports = {
	addTask,
	getTasks,
	getTaskById,
	putTask,
	deleteTask
};