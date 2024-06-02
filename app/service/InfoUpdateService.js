Ext.define('ZirvaPortal.service.InfoUpdateService', {
    singleton: true,

    init: setInterval(function () {
        if (!LoginController.isAuth()) {
            return;
        }

        ZirvaPortal.service.ProfileService.setUserInfo(LoginController.getUserStoreToken(), function () {
            Ext.GlobalEvents.fireEvent('userStoreUpdated');
        });
    }, 5000)
});