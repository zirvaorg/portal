Ext.define('ZirvaPortal.view.main.components.profile.Profile', {
    alias: 'widget.profile',
    extend: 'Ext.container.Container',

    requires: [
        'Ext.GlobalEvents'
    ],

    viewModel: {
        stores: {
            user: {
                type: 'userstore',
                autoLoad: true,
            }
        },
        formulas: {
            username: function(get) {
                var user = get('user').first();
                return user ? user.get('username') : '';
            }
        }
    },

    items: [
        {
            xtype: 'splitbutton',
            height: 30,
            iconCls: 'fas fa-coins',
            bind: {
                text: '{username}'
            },
            handler: function () {
                TabSync.addCustomTab('tab_point_history', 'Point History', 'point', 'fas fa-coins');
            },
            menu: [{
                    iconCls: 'fas fa-user-edit',
                    text: 'Edit Profile',
                    width: 120,
                    handler: function() {
                        Ext.create('Ext.window.Window', {
                            title: 'Edit Profile',
                            iconCls: 'fas fa-user-edit',
                            width: 380,
                            layout: 'fit',
                            items: {
                                xtype: 'edit-profile',
                            },
                            closable: true,
                        }).show();
                    }
                },
                {
                    iconCls: 'fas fa-sign-out-alt',
                    text: 'Logout',
                    handler: function() {
                        // Calling helpers loginController to load application when user logout
                        LoginController.logout();


                        Ext.Msg.alert('Success', 'You are now logged out.');

                        
                    }
                }
            ]
        }
    ],

    constructor: function() {
        this.callParent(arguments);
        Ext.GlobalEvents.on('userStoreUpdated', this.onUserStoreUpdated, this);
    },

    onUserStoreUpdated: function() {
        var user = LoginController.userStore.getAt(0).data;
        this.getViewModel().set({ username: user.username });
    }

});