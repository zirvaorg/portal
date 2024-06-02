Ext.define('ZirvaPortal.view.main.components.registerForm.RegisterFormController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.register-form',

    register: function () {
        let form = this.getView(),
            values = form.getValues(),
            email = values.email,
            username = values.username,
            password = values.password

        if (!form.isValid()) {
            Ext.Msg.alert('Registration Failure', 'Please fill in all required fields.');
            return false;
        }

        let userData = {
            email: email,
            username: username,
            password: password,
        };
        
        ZirvaPortal.service.RegistrationService.registerUser(
            userData,
            function(responseData) {
                if (responseData.success) {

                   // Close the registration form after successful registration
                    form.up('window').close();
                    Ext.Msg.alert('Success', 'Registration successful! You can now log in.');

                } else {
                    Ext.Msg.alert('Registration Failure', responseData.message);
                }
            },
            function(responseData) {
                Ext.Msg.alert('Registration Failure', responseData.message);
            }
        );
    },

    onTermsCheckboxChange: function(checkbox, newValue) {        
        Ext.getCmp('registerButton').setDisabled(!newValue);
    },


    handleKeyUp: function(field, e) {
        if (e.getKey() === e.ENTER) {
            e.preventDefault();
            this.register();
        }
    }
});
