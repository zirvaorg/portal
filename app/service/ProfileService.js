Ext.define('ZirvaPortal.service.ProfileService', {
    singleton: true,

    updatePassword: function(userData, successCallback, failureCallback) {
        Ext.Ajax.request({
            url: ZirvaPortal.config.Config.baseUrl + 'user/update',
            method: 'PATCH',
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

        const userStore = Ext.getStore('userstore');
        
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
    }

});