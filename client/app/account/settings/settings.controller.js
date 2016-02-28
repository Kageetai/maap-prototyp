'use strict';

class SettingsController {
  constructor(Auth, User) {
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;

    User.events({ id: Auth.getCurrentUser()._id }, (events) => {
      this.savedEvents = events;
    });
  }

  removeEvent(event) {
    this.Auth.removeSavedEvent(event._id).then((user) => {
      this.savedEvents.splice(this.savedEvents.indexOf(event), 1);
      console.log('Event removed');
    });
  }

  changePassword(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
        .then(() => {
          this.message = 'Password successfully changed.';
        })
        .catch(() => {
          form.password.$setValidity('mongoose', false);
          this.errors.other = 'Incorrect password';
          this.message = '';
        });
    }
  }
}

angular.module('maapApp')
  .controller('SettingsController', SettingsController);
