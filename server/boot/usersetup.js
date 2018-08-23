// const async = require('async');

// module.exports = function (app, cb) {

//   console.log('inboot:'+ app.models.userIdentity)
//   var User = app.models.userinfo;
//   var Role = app.models.Role;
//   var Userpayments = app.models.Userpayments;
//   var RoleMapping = app.models.RoleMapping;
//   var Acl = app.models.ACL;
//   var AccessToken = app.models.AccessToken;
//   var userActivities = app.models.userActivity;
//   var Customerdetails = app.models.Customerdetails;
//   var Gymamenities = app.models.Gymamenities;
//   var Gyminvites = app.models.Gyminvites;
//   var Gymdetails = app.models.Gymdetails;
//   var Gymlogin = app.models.Gymlogin;
//   var Gympaymentinformation = app.models.Gympaymentinformation;
//   var Gymratecard = app.models.Gymratecard;
//   var Gymsocialmedialinks = app.models.Gymsocialmedialinks;
//   var Gymworkinghours = app.models.Gymworkinghours;
//   var Offers = app.models.Offers;
//   var Passwordreset = app.models.Passwordreset;
//   var Pushnotification = app.models.Pushnotification;
//   var Referrals = app.models.Referrals;
//   var Taxrates = app.models.Taxrates;
//   var Usercredits = app.models.Usercredits;
//   var Userreferrals = app.models.Userreferrals;
//   var Workoutlogs = app.models.Workoutlogs;
//      var Fbuser = app.models.Fbuser;
     


//   function automigrateItem(item) {
//     return function (cb) {
//       app.dataSources.postgres.automigrate(item, function (err) {
//         err ? cb(err) : (function () {
//           console.log('automigration is done for the following entity => ' + item);
//           cb(null);
//         })();
//       });
//     }
//   }

//   async.parallel([
//     automigrateItem('userinfo'),
//     automigrateItem('user_payments'),
//     automigrateItem('AccessToken'),
//     automigrateItem('UserActivity'),
//     automigrateItem('Fbuser'),

//     automigrateItem('customer_details'),
//     automigrateItem('gym_amenities'),
//     automigrateItem('gym_details'),
//     automigrateItem('gym_invites'),
//     automigrateItem('gym_login'),
//     automigrateItem('gym_payment_information'),
//     automigrateItem('gym_rate_card'),
//     automigrateItem('gym_social_media_links'),
//     automigrateItem('gym_working_hours'),
//     automigrateItem('offers'),
//     automigrateItem('password_reset'),
//     automigrateItem('push_notifications'),
//     automigrateItem('referrals'),
//     automigrateItem('tax_rates'),
//     automigrateItem('user_credits'),
//     automigrateItem('user_referrals'),
//     automigrateItem('workout_logs'),


//     automigrateItem('Role'),
//     automigrateItem('RoleMapping'),
//     automigrateItem('ACL')

//   ],

//     function (err) {

//       if (err) {
//         cb(err);
//       }
//       else {

//         User.create([
//           { username: 'John', email: 'john@doe.com', password: 'test123', 'facebook_id': 'gbabu' },
//           { username: 'Jane', email: 'jane@doe.com', password: 'test123', 'facebook_id': 'gbabu' },
//           { username: 'Bob', email: 'bob@doe.com', password: 'test123', 'facebook_id': 'gbabu' }
//         ],

//           function (err, users) {

//             if (err) return cb(err);

//             console.log('Created users:', users);

//             Role.create({

//               name: 'admin'

//             }, function (err, role) {

//               if (err) return cb(err);

//               console.log('Created role:', role);


//               role.principals.create({
//                 principalType: RoleMapping.USER,
//                 principalId: users[2].id
//               }, function (err, principal) {

//                 if (err) return cb(err);

//                 console.log('Created principal:', principal);

//                 cb(null);

//               });
//             });

//           });
//       }
//     });


// };
















