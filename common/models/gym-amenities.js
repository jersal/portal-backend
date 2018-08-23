'use strict';

module.exports = function (Gymamenities) {
    Gymamenities.validatesAbsenceOf("gym_amenities_id")

    /**
     * To get Amenities Info
     * @param {number} gymAmenitiesId
     * @param {Function(Error)} callback
     */

    Gymamenities.getAmenitiesInfo = function (gymAmenitiesId, callback) {
        Gymamenities.findOne({ where: { gym_amenities_id: gymAmenitiesId } }
        ).then(gymamenities => {
            console.log(JSON.stringify(gymamenities));
            callback(null,gymamenities);

        }).catch(err => {
            callback(err);
        });
    };

    Gymamenities.remoteMethod(
        'getAmenitiesInfo', {
            http: {
                path: '/getAmenitiesInfo',
                verb: 'get'
            },

            accepts: [
                { arg: 'gymAmenitiesId', type: 'number', http: { source: 'query' } },
            ],
            returns: {
                arg: 'gymamenities',
                type: 'object',
                root: true
            }
        })


};





