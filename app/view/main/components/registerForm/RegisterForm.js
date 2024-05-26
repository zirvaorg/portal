Ext.define('ZirvaPortal.view.main.components.registerForm.RegisterForm', {
    extend: 'Ext.form.Panel',

    bodyPadding: 10,
    autoSize: true,
    xtype: 'register-form',
    controller: 'register-form',
    items: [
        {
            xtype: 'emailfield',
            allowBlank: false,
            required: true,
            label: 'Email',
            name: 'email',
            vtype: 'email',
            validators: 'email'
        },
        {
            xtype: 'textfield',
            allowBlank: false,
            required: true,
            label: 'Username',
            name: 'username', 
            validators: [
                {
                    fn: function(value) {
                        if (value.length < 3) {
                            return 'Username must be at least 3 characters long.';
                        }
                        return true;
                    }
                }
            ]
        },
        {
            xtype: 'passwordfield',
            allowBlank: false,
            required: true,
            label: 'Password',
            name: 'password',
            validators: [
                {
                    fn: function(value) {
                        if (value.length < 8) {
                            return 'Password must be at least 8 characters long.';
                        }
                        return true;
                    }
                }
            ],
            listeners: {
                specialkey: 'handleKeyUp'
            }
            
        },
        {
            xtype: 'checkboxfield',
            boxLabel: 'I accept the <a href="#">terms and conditions</a>.',
            name: 'accept',
            allowBlank: false,
            required: true,
            listeners: {
                change: 'onTermsCheckboxChange',
                click: {
                    element: 'bodyElement',
                    fn: function (e) {
                        if (e.target.localName === 'a') {
                            e.preventDefault();
                            Ext.create('terms-and-conditions').show();
                        }
                    },
                },
            }
        }
    ],

    buttons: [
        {
            text: 'Register',
            id: 'registerButton',
            disabled: true,
            formBind: true,
            handler: 'nowRegister',
            listeners: {
                click: 'nowRegister'
            }
        },
        {
            text: 'Cancel',
            handler: function () {
                this.up('window').close();
            }
        }
    ]
});
