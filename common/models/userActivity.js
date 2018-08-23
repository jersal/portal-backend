'use strict';
var loopback = require('loopback');

module.exports = function (userActivity) {
  userActivity.validatesAbsenceOf("user_activity_id")

  /**
   * User activities for work out
   * @param {string} userid 
   * @param {Function(Error,object)} callback
   */

  // userActivity.workouthistory = function(userid, callback) {
  //     console.log('userid:'+ userid)
  //     var activities = userActivity.find({
  //         where: {'user_id': userid},
  //         order: 'check_out_time'
  //       })
  //      console.log('returns:' + JSON.stringify(activities));
  //     callback(null,activities);
  //   };


  userActivity.workouthistory = function (userid, callback) {
    console.log('userid:' + userid)
    userActivity.find({ where: { user_activity_id: userid } }

    ).then(workout => {

      console.log(JSON.stringify(workout));
      callback(null, workout);
    });
  }

  userActivity.remoteMethod('workouthistory', {
    accepts: [{
      arg: "userid", type: "string", required: true
    }
    ],
    returns: [{ arg: 'workout', type: 'object' }],
    description: "User activities for work out",
    http: [
      {
        path: "/workouthistory/userid",
        verb: "get"
      }
    ]
  });


  /**
   * registration for user
   * @param {null} body body
   * @param {string} body body
   * @param {null} req request
   * @param {Function(Error)} callback
   */

  userActivity.checkin = function (request, callback) {
    console.log('req:' + JSON.stringify(request))

    userActivity.create(request);
    callback(null, '{success:true}');
  };

  userActivity.remoteMethod('checkin', {
    accepts: [{
      arg: "request", type: "UserActivity", required: true, http: { source: 'body' }
    }
    ],
    returns: [{ arg: 'activityId', type: 'string' }],
    description: "User activities for work out",
    http: [
      {
        path: "/checkin",
        verb: "post"
      }
    ]
  });


  /**
   *  @param {timestamp} check_out_time 
   * @param {number} activityid 
   * @param {Function(Error, object)} callback
   */


  userActivity.checkout = function (activityid, callback) {
    console.log('activity id :' + JSON.stringify(activityid))
    var activity;



    userActivity.find({
      where: { 'user_activity_id': activityid }
    }).then(activity => {
      console.log('activity found  : ' + JSON.stringify(activity));
      userActivity.update(userActivity.check_out_time);

      console.log("activity = updated successfully");
      callback(null, activity);
    })


  };

  userActivity.remoteMethod('checkout', {
    accepts: [{ arg: "activityid", type: "string", required: true }],
    returns: [{ arg: 'activity', type: 'object' }],
    description: "User activities for work out",
    http: [
      {
        path: "/checkout",
        verb: "put"
      }
    ]
  });








}
