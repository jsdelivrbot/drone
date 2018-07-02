// Fetch the requested drone id, cache and return result JSON string.
// On fail serve from cache else retry.

const getDroneById = require('./fetch.js');
const cacheClient = require('./cache.js');

const maxTries = 3;

// - droneId: integer or string
// - fail(error): called if all retries fail
// - done(droneJsonString): called on successful fetch from origin or cache

const getCachedDroneById = (droneId, fail, done) => {
	console.log('Fetch drone with caching', droneId)
	let drone;

	for (let tryNum = 1; ! drone && tryNum <= maxTries; tryNum++)
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
					} else {
						drone = droneFromCache && droneFromCache.toString()
						console.log('Got from cache', drone)
					}
				})
			},
			droneFromOrigin => {
				console.log('Try', tryNum, 'OK')
				// Got drone from origin - cache and return it
				cacheClient.set(droneId, droneFromOrigin, {expires: 600})
					.catch(e => console.log('set failed', e))
				drone = droneFromOrigin
			})
	}
	return drone ? done(drone) : fail('Failed to fetch')
}

module.exports = getCachedDroneById
