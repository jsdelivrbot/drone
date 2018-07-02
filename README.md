# Denis Howe - Flock tech test

## Github

https://github.com/denishowe/flock

## Spec

https://github.com/flockcover/tech-screen-instructions/blob/master/Task1.md

- Maintainable and readable
- Caching webserver
- Routing structure of your choice
- Forward request sensibly
- Cache response
- On fail (non-200 response, time-out), serve from cache, else retry

## Run Locally

```sh
$ git clone git@github.com:denishowe/flock.git
$ npm install
$ npm start
```

Browse to http://localhost:5000/.

## Run on Heroku

Browse to, e.g.
https://blooming-stream-18811.herokuapp.com/
https://blooming-stream-18811.herokuapp.com/1
https://blooming-stream-18811.herokuapp.com/13

Heroku git repo: https://git.heroku.com/blooming-stream-18811.git.

## Source data

https://bobs-epic-drone-shack-inc.herokuapp.com/

8 IP addresses

Fetch all drones:

https://bobs-epic-drone-shack-inc.herokuapp.com/api/v0/drones

==>

```[drone,drone,...]```

Drone ids 1..12.
Total data: 1.2KB.

Fetch drone with droneId 1:

https://bobs-epic-drone-shack-inc.herokuapp.com/api/v0/drone/1

==>

```javascript
{
    "droneId":1,
    "numFlights":123,
    "name":"Retro Encabulator",
    "currency":"USD",
    "price":100000,
    "numCrashes":123
}
```

Bad doneId ==> 200 response, body: "null"

## Memcached

For simplicity.

https://devcenter.heroku.com/articles/memcachedcloud#using-memcached-from-node-js

```heroku addons:create memcachedcloud
heroku addons:open memcachedcloud```

https://www.npmjs.com/package/memjs

## Further Development

- Tests

- https://www.npmjs.com/package/resilient
  fault tolerance, server balancing, ...

- Redis - fine-grained control over caching, persist to disk, expiry

- Handle
-- larger volume of data
-- multiple web servers with shared cache
-- multiple origin servers
