// Fetch the requested drone id, cache and return result JSON string.
// On fail serve from cache else retry.

const getDroneById = require('./fetch.js');
const cacheClient = require('./cache.js');

const maxTries = 3;

const getCachedDroneById = (droneId, fail, done) => {
	for (let tryNum = 1; tryNum <= maxTries; tryNum++)
	{
		// Try to get drone from origin
		getDroneById(droneId,
			originError => {
				// Origin failed
				console.log('Try', tryNum, 'Origin error', originError)
				// Try to get from cache.  May have been fetched by another process.
				cacheClient.get(droneId, (cacheErr, droneFromCache) => {
					if (cacheErr) {
						console.log('Try', tryNum, 'Cache error', cacheErr)
						return // Try again
					}
					console.log('Got from cache', droneFromCache)
					return done(droneFromCache)
				})
			},
			droneFromOrigin => {
				// Got drone from origin - cache and return it
				cacheClient.set(droneId, droneFromOrigin, {expires: 600})
					.catch(e => console.log('set failed', e))
				return done(droneFromOrigin)
			})
	}
}

module.exports = getCachedDroneById
