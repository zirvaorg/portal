Ext.define('ZirvaPortal.service.ProfileService', {
    singleton: true,

    updateInfo: function(userData, successCallback, failureCallback) {
        var token = LoginController.getUserStoreToken();

        Ext.Ajax.request({
            url: ZirvaPortal.config.Config.baseUrl + 'user/update',
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            jsonData: userData,
            success: function(response) {
                if (successCallback) {
                    const responseData = Ext.decode(response.responseText);
                    successCallback(responseData);
                }
            },
            failure: function(response) {
                if (failureCallback) {
                    if (response.responseText.trim() !== '') {
                        const responseData = Ext.decode(response.responseText);
                        failureCallback(responseData);
                    } else {
                        failureCallback(response);
                    }
                }
            }
        });
    },

    getUserInfo: function(token, successCallback, failureCallback) {
        Ext.Ajax.request({
            url: ZirvaPortal.config.Config.baseUrl + 'user/info',
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            success: function(response) {
                if (successCallback) {
                    const responseData = Ext.decode(response.responseText);
                    successCallback(responseData.user_info);
                }
            },
            failure: function(response) {
                if (failureCallback) {
                    if (response.responseText.trim() !== '') {
                        const responseData = Ext.decode(response.responseText);
                        failureCallback(responseData);
                    } else {
                        failureCallback(response);
                    }
                }
            }
        });
    },

    setUserInfo: function(token, successCallback, failureCallback) {
        ZirvaPortal.service.ProfileService.getUserInfo(token,
            function(userInfo) {
                LoginController.userStore.removeAll();
                LoginController.userStore.add({
                    username: userInfo.username,
                    email: userInfo.email,
                    loggedIn: true,
                    point: userInfo.remaining_point,
                    registerDate: userInfo.registered_at,
                    token: token
                });

                if (successCallback) {
                    successCallback(userInfo);
                }
            },
            function(response) {
                if (failureCallback) {
                    failureCallback(response);
                }
            },
        );
    }
});