Ext.define('ZirvaPortal.view.main.components.profile.EditProfileController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.edit-profile',

    onUpdateInfo: function () {
        var form = this.getView(),
            values = form.getValues(),
            email = values.email,
            username = values.username,
            newPassword = values.newPassword,
            oldPassword = values.oldPassword;

        if (!form.isValid()) {
            Ext.Msg.alert('Update Failure', 'Please fill in all required fields.');
            return false;
        }

        var userData = {
            email: email,
            username: username,
            password: oldPassword,
            new_password: newPassword
        };

        ZirvaPortal.service.ProfileService.updateInfo(
            userData,
            function (responseData) {
                if (responseData.success) {
                    Ext.Msg.alert('Success', 'Info updated successfully!');
                    form.up('window').close();

                    // update user store email and username
                    var user = LoginController.userStore.getAt(0);
                    user.set({email: email, username: username});
                    
                    Ext.GlobalEvents.fireEvent('userStoreUpdated');
                    
                } else {
                    Ext.Msg.alert('Update Failure', responseData.message);
                }
            },
            function (responseData) {
                Ext.Msg.alert('Update Failure', responseData.message);
            }
        );
    },

    handleKeyUp: function (field, e) {
        if (e.getKey() === e.ENTER) {
            e.preventDefault();
            this.onUpdatePassword();
        }
    },

});
