'use strict';
var Promise = require('bluebird');

module.exports = function(FBUser) {
  /**
  * Allows users to log in with an OAuth 2 token received from Facebook.
  * @param {string} oauth-token An OAuth 2 token received from Facebook when
                                logging in. This is retrieved from the
                                registered callback url.
  * @param {Function(Error, object)} callback
  */

  FBUser.loginWithFacebook = function(oauthToken, callback) {
    
    var appId = 419764225166027;
    var appSecret = 'cfd1d719d71b048f653cc797e77e1b6c';
    // var redirectUrl = 'http://localhost:3000/auth/facebook/callback/';
    var redirectUrl = 'https://gymportalflexit.herokuapp.com/';

    // var appId = 120799575199257;
    // var appSecret = '0e134fa32554261883ba3cb1434b4658';
    // var redirectUrl = 'https://app.baseapp.tsl.io/';

    var Facebook = FBUser.app.datasources.Facebook;

    // Variable for storing facebook access token
    let accessToken;

    
    Facebook.accessToken(appId, appSecret, redirectUrl, oauthToken)
    .then(function(response) {
      
      accessToken = response['access_token'];
      return Facebook.me(accessToken);
    })
    .then(function(response) {
      var facebookId = response['id'];
      return Facebook.user(facebookId, accessToken);
    })
    .then(function(response) {
      
      var fullName = response['first_name'] + ' ' + response['last_name'];
      var email = response['email'];
      var pictureDictionary = response['picture'];
      var pictureData = pictureDictionary['data'];
      var facebookPicUrl = pictureData['url'];
      callback(null, {'fullName': fullName,
        'email': email,
        'facebookPicUrl': facebookPicUrl});
    })
    .catch(function(error) {
      callback(error, null);
    });
  };
};
