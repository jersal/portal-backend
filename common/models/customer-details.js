'use strict';

module.exports = function (Customerdetails) {

  /**
   * 
   * @param {number} customerDetailsId 
   * @param {Function(Error, object)} callback
   */

  Customerdetails.getEmergencyNumber = function (customerDetailsId, callback) {
    Customerdetails.findOne(
      { where: { customer_details_id: customerDetailsId } }
    ).then(function (customerdetails) {
      var obj={};
      obj.first_name=customerdetails.first_name;
      obj.last_name=customerdetails.last_name;
      obj.emergency_contact=customerdetails.emergency_contact;
      obj.birthday=customerdetails.birthday;
      obj.phone_number=customerdetails.phone_number;
      
      console.log(JSON.stringify(obj));
      callback(null, obj);

    }).catch(err => {
      callback(err);
    });
  };

  Customerdetails.remoteMethod(
    'getEmergencyNumber', {
      http: {
        path: '/getEmergencyNumber',
        verb: 'get'
      },
      accepts: [
        { arg: 'customerDetailsId', type: 'number', http: { source: 'query' } },
      ],
      returns: {
        arg: 'customerdetails',
        type: 'object',
        root: true
      }
    }
  ),

    Customerdetails.getAccountDetails = function (customerId, callback) {
      Customerdetails.findOne(
        { where: { customer_details_id: customerId } }
      ).then(accountDetails => {
        console.log(JSON.stringify(accountDetails));
        callback(null, accountDetails);

      }).catch(err => {
        callback(err);
      });
    };

  Customerdetails.remoteMethod(
    'getAccountDetails', {
      http: {
        path: '/getAccountDetails',
        verb: 'get'
      },
      accepts: [
        { arg: 'customeIid', type: 'number', http: { source: 'query' } },
      ],
      returns: {
        arg: 'accountDetails',
        type: 'object',
        root: true
      }
    }
  ),

    Customerdetails.getProfileDetails = function (custId, callback) {
      Customerdetails.findOne(
        { where: { customer_details_id: custId } }
      ).then(profileDetails => {
        console.log(JSON.stringify(profileDetails));
        callback(null, profileDetails);

      }).catch(err => {
        callback(err);
      });
    };

  Customerdetails.remoteMethod(
    'getProfileDetails', {
      http: {
        path: '/getProfileDetails',
        verb: 'get'
      },
      accepts: [
        { arg: 'custId', type: 'number', http: { source: 'query' } },
      ],
      returns: {
        arg: 'profileDetails',
        type: 'object',
        root: true
      }
    }
  )
};
