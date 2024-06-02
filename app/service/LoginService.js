Ext.define('ZirvaPortal.service.LoginService', {
    singleton: true, 

    loginUser: function(userData, successCallback, failureCallback) {
        Ext.Ajax.request({
            url: ZirvaPortal.config.Config.baseUrl + 'user/login', 
            method: 'POST',
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
                        response.message = 'Something went wrong.'
                        failureCallback(response);
                    }
                }
            }
        });
    }
});
