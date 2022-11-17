const Dynamo = require("../services/Dynamo");
const Responses = require("../API-Responses");

const tableName = process.env.tableName;

// MOSTRAR TAREA
const getTasks = async (event) => {

	const tasks = await Dynamo.getAll(tableName)
		.catch( err => {
			console.log("error al mostrar tareas: ", err);
			return null;
		})

	if (!tasks) {
		return Responses._400({ message: 'Error al mostrar.' });
	}

	return Responses._200({ tasks });

}

// MOSTRAR POR ID
const getTaskById = async (event) => {

	if (!event.pathParameters || !event.pathParameters.id) {
		return Responses._400({ message: 'No existe id.' });
	}

	const { id } = event.pathParameters;
	const tasks = await Dynamo.getById(id, tableName)
		.catch( err => {
			console.log("error al mostrar la tarea: ", err);
			return null;
		})

	if (!tasks) {
		return Responses._400({ message: 'Error al mostrar.' });
	}

	return Responses._200({ tasks });

}

// AGREGAR TAREA
const addTask = async (event) => {

	const { title, description } =  JSON.parse(event.body);
	const createdAt = new Date();
	const task = {
		title,
		description,
		createdAt
	}
	const newTask = await Dynamo.write( task, tableName )
		.catch( err => {
			console.log("Error al crear la tarea: ", err);
			return null;
		})

	if (!newTask) {
		return Responses._400({ message: 'Error al crear la tarea.' });
	}

	return Responses._200({ newTask });

}

// EDITAR POR ID
const putTask = async (event) => {

	if (!event.pathParameters || !event.pathParameters.id || !event.body) {
		return Responses._400({ message: 'No existe id.' });
	}
	const { id } = event.pathParameters;
	const { title, description } =  JSON.parse(event.body);

	const taskUpdate = await Dynamo.update(
		id,
		tableName,
		UpdateExpression = 'set title = :title, description = :description',
		ExpressionAttributeValues = {
			':title': title,
			':description': description
		}
	)
		.catch( err => {
			console.log("error al editar la tarea: ", err);
			return null;
		})

	if (!taskUpdate) {
		return Responses._400({ message: 'Error al editar.' });
	}

	return Responses._200({ taskUpdate });

}

// ELIMINAR POR ID
const deleteTask = async (event) => {

	if (!event.pathParameters || !event.pathParameters.id) {
		return Responses._400({ message: 'No existe id.' });
	}
	
	const { id } = event.pathParameters;
	const taskDelete = await Dynamo.delete(id, tableName)
		.catch( err => {
			console.log("error al eliminar la tarea: ", err);
			return null;
		})

	if (!taskDelete) {
		return Responses._400({ message: 'Error al eliminar.' });
	}

	return Responses._200({ message: `La tarea ed ID: ${id} fue eliminada satisfactoriamente.` });
}


module.exports = {
	addTask,
	getTasks,
	getTaskById,
	putTask,
	deleteTask
};