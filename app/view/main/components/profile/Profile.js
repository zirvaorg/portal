Ext.define('ZirvaPortal.view.main.components.profile.Profile', {
    alias: 'widget.profile',
    extend: 'Ext.container.Container',

    requires: [
        'Ext.GlobalEvents'
    ],

    viewModel: {
        stores: {
            user: {
                type: 'userstore'
            }
        },
        data: {
            username: 'Guest'
        },
        formulas: {
            usernameAndPoint: function(get) {
                const user = get('user');
                let point, username;
        
                if (user instanceof Ext.data.Store) {
                    // If 'user' is a store, use 'first()' to get the first record
                    const record = user.first();
                    point = record.get('point');
                    username = record.get('username');
                } else {
                    // If 'user' is an object, access its properties directly
                    point = user.point;
                    username = user.username;
                }
        
                return (point != null && username) ? `${point} ${username}` : '';
            }
        }
    },

    items: [
        {
            xtype: 'splitbutton',
            height: 30,
            iconCls: 'fas fa-coins',
            bind: {
                text: '{usernameAndPoint}' 
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
        const user = LoginController.userStore.getAt(0).data;
        this.getViewModel().set({ user: user });    
    }

});