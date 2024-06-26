Ext.define('ZirvaPortal.view.main.components.profile.Profile', {
    alias: 'widget.profile',
    extend: 'Ext.container.Container',

    viewModel: {
        stores: {
            user: {
                type: 'userStore',
                autoLoad: true,
            }
        },
        formulas: {
            username: function(get) {
                var user = get('user').first();
                return user ? user.get('username') : '';
            },
            point: function(get) {
                var user = get('user').first();
                return user ? user.get('point') : '';
            }
        }
    },

    items: [
        {
            xtype: 'splitbutton',
            height: 30,
            iconCls: 'fas fa-coins',
            bind: {
                text: '({point}) {username}'
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
        this.getViewModel().set({ username: user.username, point: user.point });
    }
});