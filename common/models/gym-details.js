'use strict';
var loopback = require('loopback');
module.exports = function (Gymdetails) {
    /**
     * list of fitness centers
     * @param {number} location 
     * @param {Function(Error, object)} callback
     */
    Gymdetails.dashboard = function (location, callback) {

        var here = new loopback.GeoPoint({ lat: location.lat, lng: location.lng });

        Gymdetails.find({ where: { location: { near: here } }, limit: 15 }

        ).then(list => {
            console.log(JSON.stringify(list));
            callback(null,list);

        }).catch(err => {
            callback(err);
        });
    };

    Gymdetails.remoteMethod(
        'dashboard', {
            http: {
                path: '/dashboard',
                verb: 'get'
            },
            "description": 'list of fitness centers',

            accepts: [
                { arg: 'location', type: 'GeoPoint', required: true, http: { source: 'query' } },
            ],
            returns: {
                arg: 'Gymdetails',
                type: 'object',
                root: true
            }

        }
    )


    /**
     * list of gym details form the corresponding gym name and place
     * @param {string} gymName 
     * @param {string} place 
     * @param {Function(Error, object)} callback
     */

    Gymdetails.findlocation = function (gymName, place, callback) {
        var details;
        Gymdetails.find({ where: { gym_name: gymName, address: place } }

        ).then(details => {
            console.log(JSON.stringify(details));
            callback(null,details);

        }).catch(err => {
            callback(err);
        });
    };
    Gymdetails.remoteMethod(
        'findlocation', {
            http: {
                path: '/findlocation',
                verb: 'get'
            },

            accepts: [
                {
                    arg: 'gymName',
                    type: 'string',
                    required: false,
                    description: '',
                    http: {
                        source: 'query'
                    }
                },
                {
                    arg: 'place',
                    type: 'string',
                    required: false,
                    description: '',
                    http: {
                        source: 'query'
                    }
                }
            ],
            returns: [
                {
                    arg: 'details',
                    type: 'object',
                    root: true,
                    description: ''
                }
            ]
        }
    )




};

