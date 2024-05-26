Ext.define('ZirvaPortal.view.main.components.loginForm.LoginFormController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.login-form',

    handleKeyUp: function(field, e) {
        if (e.getKey() === e.ENTER) {
            e.preventDefault();
            this.onLogin();
        }
    },

    onLogin: function () {
        let form = this.getView(),
            username = form.down('textfield[name=username]').getValue(),
            password = form.down('textfield[name=password]').getValue();

        if (!form.validate()) {
            Ext.Msg.alert('Login Failure', 'Please enter a username and password.');
            return false;
        }

        var userData = {
            username: username,
            password: password,
        };

         // Ensure userStore is available
         if (!LoginController.userStore) {
            Ext.Msg.alert('Error', 'User store is not available.');
            return;
        }

        ZirvaPortal.service.LoginService.loginUser(
            userData,
            function (responseData) {
                if (responseData.success) {

                    ZirvaPortal.service.ProfileService.getUserInfo(responseData.token, 
                        function(userInfo) {
                            LoginController.userStore.add({
                                username: userInfo.username,
                                email: userInfo.email,
                                loggedIn: true,
                                point: userInfo.remaining_point,
                                registerDate: userInfo.registered_at

                            });
                           
                            // Calling helpers loginController to load application when user login
                            LoginController.login();
                        },
                        function(error) {
                            Ext.Msg.alert('Error', 'Failed to retrieve user info.');
                        }
                    );

                } else {
                    Ext.Msg.alert('Login Failure', responseData.message);
                }
            },
            function (responseData) {
                Ext.Msg.alert('Login Failure', responseData.message);
            }
        );

    },

    onRegister: function () {
        Ext.create('Ext.window.Window', {
            title: 'User Registration',
            iconCls: 'x-fa fa-user-plus',
            width: 350,
            layout: 'fit',
            items: {
                xtype: 'register-form',
            },
            closable: true,
        }).show();
    }
});