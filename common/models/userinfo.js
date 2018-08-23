var nodemailer = require("nodemailer");
var uniqid = require("uniqid");

var config = require('../../server/config.json');
var path = require('path');
var senderAddress = "testflexit@gmail.com"; //Replace this address with your actual address

module.exports = function(userinfo) {

  userinfo.register = function (request, callback) {
    userinfo.create(request     
    ).then(userDetails => {

      var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'testflexit@gmail.com',
            pass: 'testflexit123'
          }
        });

      request.urlid = uniqid(request.firstname);
      var link;
        link="http://localhost:3000/verified?id="+request.urlid;
        
        var mailOptions = {
          from: 'testflexit@gmail.com',
          to: request.email,
          subject : "Please confirm your Email account",
          html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
        };
    
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
      console.log(JSON.stringify(userDetails));
      callback(null, userDetails);

    }).catch(err => {
      callback(err);
    });
  };

  userinfo.remoteMethod('register', {
    accepts: [{ arg: 'request', type: 'userinfo', http: { source: 'body' }}],
    'description': 'registration for user',
    returns: {
      arg: 'userDetails',
      type: 'object',
      root: true
    },
    http:[
      {
        'path': '/register',
        'verb': 'post'
      }
    ]
  });


  
  // Method to render
  userinfo.afterRemote('prototype.verify', function(context, userinfo, next) {
    context.res.render('response', {
      title: 'A Link to reverify your identity has been sent '+
        'to your email successfully',
      content: 'Please check your email and click on the verification link '+
        'before logging in',
      redirectTo: '/',
      redirectToLinkText: 'Log in'
    });
  });

  //send password reset link when requested
  userinfo.on('resetPasswordRequest', function(info) {
    var url = 'http://' + config.host + ':' + config.port + '/reset-password';
    var html = 'Click <a href="' + url + '?access_token=' +
        info.accessToken.id + '">here</a> to reset your password';

    userinfo.app.models.Email.send({
      to: info.email,
      from: senderAddress,
      subject: 'Password reset',
      html: html
    }, function(err) {
      if (err) return console.log('> error sending password reset email');
      console.log('> sending password reset email to:', info.email);
    });
  });

  //render UI page after password change
  userinfo.afterRemote('changePassword', function(context, userinfo, next) {
    context.res.render('response', {
      title: 'Password changed successfully',
      content: 'Please login again with new password',
      redirectTo: '/',
      redirectToLinkText: 'Log in'
    });
  });

  //render UI page after password reset
  userinfo.afterRemote('setPassword', function(context, userinfo, next) {
    context.res.render('response', {
      title: 'Password reset success',
      content: 'Your password has been reset successfully',
      redirectTo: '/',
      redirectToLinkText: 'Log in'
    });
  });


userinfo.updatePasswordFromToken = (accessToken, __, newPassword, cb) => {
  const buildError = (code, error) => {
    const err = new Error(error);
    err.statusCode = 400;
    err.code = code;
    return err;
  };

  if (!accessToken) {
    cb(buildError('INVALID_TOKEN', 'token is null'));
    return;
  }

  userinfo.findById(accessToken.userId, function (err, user) {
    if (err) {
      cb(buildError('INVALID_USER', err));
      return;
    };
    user.updateAttribute('password', newPassword, function (err, user) {
      if (err) {
        cb(buildError('INVALID_OPERATION', err));
        return;
      }

      // successful,
      // notify that everything is OK!
      cb(null,null);
    });
  });
}


userinfo.remoteMethod('updatePasswordFromToken', {
  isStatic: true,
  accepts: [
    {
      arg: 'accessToken',
      type: 'object',
      http: function(ctx) {
        return ctx.req.accessToken;
      }
    },
    {arg: 'access_token', type: 'string', required: true, 'http': { source: 'query' }},
    {arg: 'newPassword', type: 'string', required: true},      
  ],
  http: {path: '/update-password-from-token', verb: 'post'},
  returns: {type: 'boolean', arg: 'passwordChanged'}
});


};