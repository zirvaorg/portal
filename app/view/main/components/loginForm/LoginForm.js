Ext.define('ZirvaPortal.view.main.components.loginForm.LoginForm', {
    xtype: 'login-form',
    extend: 'Ext.form.Panel',

    requires: [
        'Ext.field.Text',
        'Ext.layout.HBox',
        'ZirvaPortal.view.main.components.loginForm.LoginFormController'
    ],

    controller: 'login-form',

    layout: {
        type: 'hbox',
    },
    bodyStyle: {
        background: 'transparent',
    },

    defaults: {
        margin: '0 10 0 0',
    },

    items: [{
            xtype: 'textfield',
            name: 'username',
            ui: 'alt',
            autoCapitalize: false,
            placeholder: 'username',
            width: 140,
            allowBlank: false,
            required: true,
        }, {
            xtype: 'textfield',
            name: 'password',
            ui: 'alt',
            inputType: 'password',
            placeholder: 'password',
            width: 140,
            allowBlank: false,
            required: true,
            listeners: {
                specialkey: 'handleKeyUp'
            },
        }, {
            xtype: 'button',
            text: 'Login',
            handler: 'onLogin',
        },
        {
            xtype: 'button',
            text: 'Register',
            ui: 'alt',
            handler: 'onRegister',
        }
    ],
})