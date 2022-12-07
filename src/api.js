import https from 'https';
// import http from 'http';

let hostname = 'my-tech-map.onrender.com';
const local = true;
if (local) {
    hostname = 'http://localhost:5000';
}
const markerURL = hostname + '/api/v1/markers';
const userURL = hostname + '/api/v1/users';

export default class MyTechMapAPI {

    // GET /api/v1/markers - get a page of markers from the database and return them as JSON
    // GET /api/v1/markers?category=category - get a page of markers with category from the database and return them as JSON 
    // GET /api/v1/markers?page=page - get a page of markers with page number from the database and return them as JSON
    // GET /api/v1/markers?category=category&page=page - get a page of markers with category and page from the database and return them as JSON

    /**
     * Returns a promise that resolves to a JSON object containing a list of markers
     * @param {string} category - the category of markers to return
     * @param {number} page - the page number of markers to return, -1 for all markers
     * @returns {Promise} - a promise that resolves to a JSON object containing a list of markers
     */
    static getMarkers(category, page) {
        let url = '';
        if (category && page) {
            url += `?category=${category}&page=${page}`;
        } else if (category) {
            url += `?category=${category}`;
        } else if (page) {
            url += `?page=${page}`;
        }

        return new Promise((resolve, reject) => {
            const options = {
                // hostname: localhost,
                port: 5000,
                path: `/api/v1/markers/${url}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const req = https.request(options, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    resolve(JSON.parse(data));
                });
            });
            req.on('error', (err) => {
                reject(err);
            });
            req.end();
        });
    };

    // get all users from the database and return them as JSON
    // GET /api/v1/users - get all users from the database and return them as JSON
    /**
     * Returns a promise that resolves to a JSON object containing a list of users
     * @returns {Promise} - a promise that resolves to a JSON object containing a list of users
     * @throws {Error} - if the user is not found
     * @throws {Error} - if the marker is not found
     */
    static getUsers() {
        return new Promise((resolve, reject) => {
            const options = {
                // hostname: localhost,
                port: 5000,
                path: '/api/v1/users',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const req = https.request(options, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    resolve(JSON.parse(data));
                });
            });
            req.on('error', (err) => {
                reject(err);
            });
            req.end();
        });
    };


    // GET /api/v1/markers/id/:id - get a marker with id from the database and return it as JSON
    /**
     * Returns a promise that resolves to a JSON object containing a marker
     * @param {number} id - the id of the marker to return
     * @returns {Promise} - a promise that resolves to a JSON object containing a marker
     */
    static getMarkerById(id) {

        return new Promise((resolve, reject) => {
            if (typeof id !== 'string' && !(id instanceof String)) {
                id = id.toString();
            }
            const options = {
                hostname: hostname,
                // port: 10000,
                path: `/api/v1/markers/id/${id}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const req = https.request(options, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    resolve(JSON.parse(data));
                });
            });
            req.on('error', (err) => {
                reject(err);
            });
            req.end();
        });
        return new Promise((resolve, reject) => {
            https.get(markerURL + `/id/${id}`, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    resolve(JSON.parse(data));
                });
            }).on('error', (err) => {
                reject(err);
            });
        });
    };

    // // POST /api/v1/markers/savedMarker - save a marker to a user's saved markers and return message as JSON
    // /**
    //  * Saves a marker to a user's saved markers, returns a promise that resolves to a JSON object containing a message
    //  * @param {number} markerId - the id of the marker to save
    //  * @param {number} userId - the id of the user to save the marker to
    //  * @returns {Promise} - a promise that resolves to a JSON object containing a message
    //  */
    // static saveMarker(markerId, userId) {
    //     return new Promise((resolve, reject) => {
    //         const data = JSON.stringify({
    //             'marker_id': markerId,
    //             'user_id': userId
    //         });
    //         const options = {
    //             hostname: 'my-tech-map.herokuapp.com',
    //             port: 443,
    //             path: '/api/v1/markers/savedMarker',
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Content-Length': data.length
    //             }
    //         };
    //         const req = https.request(options, (res) => {
    //             let data = '';
    //             res.on('data', (chunk) => {
    //                 data += chunk;
    //             });
    //             res.on('end', () => {
    //                 resolve(JSON.parse(data));
    //             });
    //         });
    //         req.on('error', (err) => {
    //             reject(err);
    //         });
    //         req.write(data);
    //         req.end();
    //     });
    // };

    // add marker to a user's favorite markers array
    // POST /api/v1/users/favoriteMarker - add a marker to a user's favorite markers and return message as JSON
    /**
     * Adds a marker to a user's favorite markers, returns a promise that resolves to a JSON object containing a message
     * @param {number} markerId - the id of the marker to add
     * @param {number} userId - the id of the user to add the marker to
     * @returns {Promise} - a promise that resolves to a JSON object containing a message
     * @throws {Error} - if the user is not found
     * @throws {Error} - if the marker is not found
     */
    static addFavoriteMarker(userId, markerId) {
        if (typeof userId !== 'string' && !(userId instanceof String)) {
            userId = userId.toString();
        }
        if (typeof markerId !== 'string' && !(markerId instanceof String)) {
            markerId = markerId.toString();
        }
        console.log('addFavoriteMarker');
        return new Promise((resolve, reject) => {
            const data = JSON.stringify({
                'marker_id': markerId,
                'user_id': userId
            });
            console.log(data);
            const options = {
                hostname: hostname,
                // port: 10000,
                path: '/api/v1/users/addFavoriteMarker',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': data.length
                }
            };
            console.log(options);
            const req = http.request(options, (res) => {
                console.log('sending request');
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    resolve(JSON.parse(data));
                });
            });
            req.on('error', (err) => {
                reject(err);
            });
            req.write(data);
            req.end();
        });
    };

    // remove marker from a user's favorite markers array
    // POST /api/v1/users/removeFavoriteMarker - remove a marker from a user's favorite markers and return message as JSON
    /**
     * Removes a marker from a user's favorite markers, returns a promise that resolves to a JSON object containing a message
     * @param {number} markerId - the id of the marker to remove
     * @param {number} userId - the id of the user to remove the marker from
     * @returns {Promise} - a promise that resolves to a JSON object containing a message
     * @throws {Error} - if the user is not found
     * @throws {Error} - if the marker is not found
     */
    static removeFavoriteMarker(markerId, userId) {
        if (typeof userId !== 'string' && !(userId instanceof String)) {
            userId = userId.toString();
        }
        if (typeof markerId !== 'string' && !(markerId instanceof String)) {
            markerId = markerId.toString();
        }
        return new Promise((resolve, reject) => {
            const data = JSON.stringify({
                'marker_id': markerId,
                'user_id': userId
            });
            const options = {
                hostname: hostname,
                // port: 5000,
                path: '/api/v1/users/removeFavoriteMarker',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': data.length
                }
            };
            const req = http.request(options, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    resolve(JSON.parse(data));
                });
            });
            req.on('error', (err) => {
                reject(err);
            });
            req.write(data);
            req.end();
        });
    };

    // add marker to a user's regestered markers array
    // POST /api/v1/users/registeredMarker - add a marker to a user's registered markers and return message as JSON
    /**
     * Adds a marker to a user's registered markers, returns a promise that resolves to a JSON object containing a message
     * @param {number} markerId - the id of the marker to add
     * @param {number} userId - the id of the user to add the marker to
     * @returns {Promise} - a promise that resolves to a JSON object containing a message
     * @throws {Error} - if the user is not found
     * @throws {Error} - if the marker is not found
     */
    static addRegisteredMarker(userId, markerId) {
        if (typeof userId !== 'string' && !(userId instanceof String)) {
            userId = userId.toString();
        }
        if (typeof markerId !== 'string' && !(markerId instanceof String)) {
            markerId = markerId.toString();
        }
        return new Promise((resolve, reject) => {
            const data = JSON.stringify({
                'marker_id': markerId,
                'user_id': userId
            });
            const options = {
                hostname: hostname,
                // port: 443,
                path: '/api/v1/users/addRegisteredMarker',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': data.length
                }
            };
            const req = https.request(options, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    resolve(JSON.parse(data));
                });
            });
            req.on('error', (err) => {
                reject(err);
            });
            req.write(data);
            req.end();
        });
    };

    // remove marker from a user's registered markers array
    // POST /api/v1/users/removeRegisteredMarker - remove a marker from a user's registered markers and return message as JSON
    /**
     * Removes a marker from a user's registered markers, returns a promise that resolves to a JSON object containing a message
     * @param {number} markerId - the id of the marker to remove
     * @param {number} userId - the id of the user to remove the marker from
     * @returns {Promise} - a promise that resolves to a JSON object containing a message
     * @throws {Error} - if the user is not found
     * @throws {Error} - if the marker is not found
     */
    static removeRegisteredMarker(userId, markerId) {
        if (typeof userId !== 'string' && !(userId instanceof String)) {
            userId = userId.toString();
        }
        if (typeof markerId !== 'string' && !(markerId instanceof String)) {
            markerId = markerId.toString();
        }
        return new Promise((resolve, reject) => {
            const data = JSON.stringify({
                'marker_id': markerId,
                'user_id': userId
            });
            const options = {
                hostname: hostname,
                // port: 443,
                path: '/api/v1/users/removeRegisteredMarker',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': data.length
                }
            };
            const req = https.request(options, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    resolve(JSON.parse(data));
                });
            });
            req.on('error', (err) => {
                reject(err);
            });
            req.write(data);
            req.end();
        });
    };



    // remove a saved marker from a user's saved markers array
    // POST /api/v1/users/removeSavedMarker - remove a marker from a user's saved markers and return message as JSON
    /**
     */
    static removeSavedMarker(userId, markerId) {
        if (typeof userId !== 'string' && !(userId instanceof String)) {
            userId = userId.toString();
        }
        if (typeof markerId !== 'string' && !(markerId instanceof String)) {
            markerId = markerId.toString();
        }
        return new Promise((resolve, reject) => {
            const data = JSON.stringify({
                'marker_id': markerId,
                'user_id': userId
            });
            const options = {
                hostname: hostname,
                // port: 443,
                path: '/api/v1/users/removeSavedMarker',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': data.length
                }
            };
            const req = https.request(options, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    resolve(JSON.parse(data));
                });
            });
            req.on('error', (err) => {
                reject(err);
            });
            req.write(data);
            req.end();
        });
    };


    // get a user by username the username may be an email address with special characters
    // GET /api/v1/users/username/:username - get a user by username and return user as JSON
    /**
     */
    static getUserByUsername(username) {
        // return new Promise((resolve, reject) => {
        //     http.get(hostname + `/api/v1/users/username/${username}`, (res) => {
        //         let data = '';
        //         res.on('data', (chunk) => {
        //             data += chunk;
        //         });
        //         res.on('end', () => {
        //             resolve(JSON.parse(data));
        //         });
        //     }).on('error', (err) => {
        //         reject(err);
        //     });
        // });
        console.log('getUserByUsername: ' + username);
        return new Promise((resolve, reject) => {
            const options = {
                hostname: hostname,
                // port: 10000,
                path: `/api/v1/users/username/${username}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const req = https.request(options, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    resolve(JSON.parse(data));
                });
            });
            req.on('error', (err) => {
                reject(err);
            });
            req.end();
        });
    };



    // GET /api/v1/users/id/ - Sign in a user with Microsoft Azure AD and return a JSON object containing a user tokens
    /**
     * Signs in a user with Microsoft Azure AD, returns a promise that resolves to a JSON object containing user idTokenClaims
     * @returns {Promise} - a promise that resolves to a JSON object containing a user tokens
     * @see https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow
     */
    static signInUser() {
        return new Promise((resolve, reject) => {
            const options = {
                hostname: hostname,
                port: 443,
                path: '/api/v1/users/auth/signin/',
                method: 'GET'
            };
            const req = https.request(options, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    resolve(JSON.parse(data));
                });
            });
            req.on('error', (err) => {
                reject(err);
            });
            req.end();
        });
    };
}



// Testing Only
// console.log(await getMarkerById('63533d347cd83b83d3c70179'));
// console.log(await MyTechMapAPI.getMarkerById(1));
// console.log(await saveMarker('63533d347cd83b83d3c70179', '635c97548ab44ed1e0cabc87'));
// console.log(await deleteSavedMarker('63533d347cd83b83d3c7006d', '635c97548ab44ed1e0cabc87'));
// console.log(await findUser('Jarod.Wellinghoff@ttu.edu'));
// console.log(await MyTechMapAPI.getUserByUsername('blanebrown'));
// console.log(await MyTechMapAPI.removeFavoriteMarker(1, 7));
// console.log(await MyTechMapAPI.getUsers());
