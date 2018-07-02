const request = require('superagent')

// URL to GET JSON object describing drone with appended id

const apiByIdUrl = 'https://bobs-epic-drone-shack-inc.herokuapp.com/api/v0/drone/';

const getDroneById = (droneId, fail, done) => {
	request.get(apiByIdUrl + droneId)
		.timeout({
			response: 3000,  // 3000 ms for the server to start sending
			deadline: 4000,  // ms to finish loading
		})
		.end((err, res) => {
			return err ? fail('Fetch failed: ' + err) : done(res.text)
		})
}

module.exports = getDroneById
