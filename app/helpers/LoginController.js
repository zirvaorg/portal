Ext.define('ZirvaPortal.helpers.LoginController', {
    singleton: true,
    alternateClassName: 'LoginController',
    userStore: null,

    init: function() {
        this.userStore = Ext.getStore('userStore');
    },

    isAuth: function () {
        try {
            if (this.userStore && this.userStore.getCount() > 0) {
                const firstRecord = this.userStore.first();
                if (firstRecord) {
                    return firstRecord.get('loggedIn');
                }
            }
    
            return false;
        } catch (error) {
            console.error('Error in isAuth:', error);
            return false;
        }
    },

    login: function () {
        const mainToolbar = Ext.getCmp('mainToolbar');
        mainToolbar.add({
            id: 'profileToolbar',
            xtype: 'profile'
        });

        const loginFormToolbar = Ext.getCmp('loginFormToolbar');
        if (loginFormToolbar) {
            mainToolbar.remove(loginFormToolbar);
        }
    },

    logout: function () {
        if (this.userStore) {
            this.userStore.removeAll();
            this.userStore.sync();
        }

        const mainToolbar = Ext.getCmp('mainToolbar');
        mainToolbar.add({
            id: 'loginFormToolbar',
            xtype: 'login-form'
        });

        const profileToolbar = Ext.getCmp('profileToolbar');
        if (profileToolbar) {
            mainToolbar.remove(profileToolbar);
        }
       
    },

    getUserStoreToken: function() {
        let userStore = LoginController.userStore.getAt(0);
        return userStore ? userStore.get('token') : null;
    }
});
