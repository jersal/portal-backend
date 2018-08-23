'use strict';

module.exports = function(Passwordreset) {
    Passwordreset.validatesAbsenceOf("password_reset_id");
};
