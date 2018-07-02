// Fetch the requested drone id, cache and return result JSON string.
// On fail serve from cache else retry.

const getDroneById = require('./fetch.js');
const cacheClient = require('./cache.js');

const getCachedDroneById = (droneId, fail, done) => {
	// Try to get drone from origin
	getDroneById(droneId,
		originError => {
			// Origin failed
			console.log('Origin error', originError)
			// Try to get from cache
			cacheClient.get(droneId, (cacheErr, droneFromCache) =>
			{
				if (cacheErr) {
					console.log('Cache error', cacheErr)
				} else {
					console.log('Got from cache', droneFromCache)
					return done(droneFromCache)
				}
			})
		},
		droneFromOrigin => {
			// Got drone from origin - cache and return it
			cacheClient.set(droneId, droneFromOrigin, {expires: 600})
				.catch(e => console.log('set failed', e))
			return done(droneFromOrigin)
		})
}

module.exports = getCachedDroneById
