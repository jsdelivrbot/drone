const request = require('superagent')

// URL to GET JSON object describing drone with appended id

const apiByIdUrl = 'https://bobs-epic-drone-shack-inc.herokuapp.com/api/v0/drone/';

const getDroneById = droneId => {
	request.get(apiByIdUrl . droneId)
		.end((err, res) => {
			console.log("res", res, "err", err)
		})
}

module.exports = getDroneById
