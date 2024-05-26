Ext.define('ZirvaPortal.view.main.components.profile.EditProfile', {
    extend: 'Ext.form.Panel',
    alias: 'widget.edit-profile',
    controller: 'edit-profile',
    bodyPadding: 10,
    flex: 1,
    autoSize: true,

    viewModel: {
        stores: {
            user: {
                type: 'userstore'
            }
        },
        formulas: {
            username: function(get) {
                const user = get('user').first();
                return user ? user.get('username') : '';
            },
            email: function(get) {
                const user = get('user').first();
                return user ? user.get('email') : '';
            }
        },
    },

    items: [
        {
            xtype: 'textfield',
            name: 'email',
            allowBlank: false,
            required: true,
            label: 'Email',
            vtype: 'email',
            bind: {
                value: '{email}'
            },
            validators: 'email'
        },
        {
            xtype: 'textfield',
            name: 'username',
            allowBlank: false,
            required: true,
            label: 'Username',
            bind: {
                value: '{username}'
            },
            validators: function(value) {
                if (value.length < 3) {
                    return 'Username must be at least 3 characters long.';
                }
                return true;
            }
        },
        {
            margin: '4 0 0 0',
            xtype: 'passwordfield',
            name: 'newPassword',
            label: 'New Password',
            required: true,
            placeholder: 'New Password',
            allowBlank: false,
            itemId: 'newPassword',
            validators: function(value) {
                if (value.length < 8) {
                    return 'Password must be at least 8 characters long.';
                }
                return true;
            }
        },
        {
            xtype: 'passwordfield',
            name: 'confirmPassword',
            label: 'Confirm Pass.',
            required: true,
            placeholder: 'Confirm Password',
            allowBlank: false,
            margin: '5 0 0 0',
            validators: function(value) {
                var newPasswordField = Ext.ComponentQuery.query('#newPassword')[0],
                    newPasswordValue = newPasswordField.getValue();
                
                if (value !== newPasswordValue) {
                    return 'Passwords do not match.';
                }
                return true;
            }
        },
        {

            xtype: 'passwordfield',
            name: 'oldPassword',
            allowBlank: false,
            required: true,
            label: 'Old Password',
            placeholder: 'type your current password',
            cls: 'password-confirm',
        },
    ],

    buttons: [{
        text: 'Save',
        formBind: true,
        listeners: {
            click: 'onUpdatePassword'
        },
        handler: 'onUpdatePassword',
    },
    {
        text: 'Cancel',
        handler: function () {
            this.up('window').close();
        }
    }],
});