
'use strict';
var stripe = require("stripe")("sk_test_Sd0p5LOcQ7vq6344GYf0CWCn");

module.exports = function(Userpayments) {

 

  /**
   *  * registration of payment details with stripe gateway
   * @param {null} body body
   * @param {string} body body
   * @param {null} req request
   * @param {Function(Error)} callback
   */
  var stripe = require("stripe")("sk_test_Sd0p5LOcQ7vq6344GYf0CWCn");

  stripe.balance.retrieveTransaction(
    "txn_1CeMXKC42MS3C3eJHSnEpxWQ",
    function(err, balanceTransaction) {
// console.log(balanceTransaction);
  });
  

  Userpayments.paymentpost = function (request, callback) {
    console.log('request:' + JSON.stringify(request))
    Userpayments.create(request)
    callback(null, "{'status':'success'}");
  };


  Userpayments.remoteMethod('paymentpost', {
    accepts: [{ arg: 'request', type: 'user_payments', http: { source: 'body' } }],
     returns: [{ arg: 'request', type: 'Userpayments' }],
    'description': 'registration of payment details with stripe gateway',
    http: [
      {
        'path': '/paymentpost',
        'verb': 'post'
      }
    ]
  });

};

