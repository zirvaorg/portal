Ext.define('ZirvaPortal.Application', {
    extend: 'Ext.app.Application',

    name: 'ZirvaPortal',

    stores: [
        'ZirvaPortal.store.UserStore'
    ],

    requires: [
        'ZirvaPortal.helpers.LoginController'
    ],

    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },

    launch: function () {
        LoginController.init();
        if (LoginController.isAuth()) {
            LoginController.login();
        } else {
            LoginController.logout();
        }
    },

    onAppUpdate: function () {
        window.location.reload();
    }
});
