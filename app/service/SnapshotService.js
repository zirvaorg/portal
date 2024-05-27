Ext.define('ZirvaPortal.service.SnapshotService', {
    singleton: true,
    
    generateSnapshot: function (domain, callback, scope) {
        var token = LoginController.getUserStoreToken();

        function requestSnapshot() {
            var base64Domain = btoa(domain); // Convert domain to base64
            var encodedDomain = encodeURIComponent(base64Domain);

            Ext.Ajax.request({
                url: ZirvaPortal.config.Config.baseUrl + 'service/snapshot',
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    domain: encodedDomain
                },
                responseType: 'blob', 
                success: function (response) {
                    if (response.status === 200) {
                        var blob = response.responseBlob;
                        var url = URL.createObjectURL(blob);
                        if (callback) {
                            callback.call(scope || this, url);
                        }
                    } else if (response.status === 201) {
                        // Wait for 5 seconds and try again
                        setTimeout(requestSnapshot, 5000);
                    }
                },
                failure: function (response) {
                    if (response.status === 500) {
                        Ext.Msg.alert('Error', 'Failed to generate snapshot');
                    } else {
                        Ext.Msg.alert('Error', 'Snapshot generation in progress, please wait');
                    }
                }
            });
        }

        requestSnapshot();
    }
});