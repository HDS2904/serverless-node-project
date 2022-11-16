const  Responses = {
	_200(data = {}) {
		return {
			status: 200,
			body: data,
		};
	},

	_400(data = {}) {
		return {
			status: 400,
			body: data,
		};
	},
};
module.exports = Responses;