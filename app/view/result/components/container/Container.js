Ext.define('ZirvaPortal.view.result.components.container.Container', {
    extend: 'Ext.container.Container',
    xtype: 'dashboard',

    requires: [
        'Ext.grid.Grid',
        'Ext.tab.Panel'
    ],

    controller: 'container',
    items: [
        {
            xtype: 'tabpanel',
            itemId: 'tabpanel',
            layout: {
                type: 'card',
                animation: false,
            },

            tabBar: {
                layout: {
                    pack: 'start',
                    overflow: 'scroller'
                },
            },

            items: [
                {
                    title: 'Health',
                    iconCls: 'x-fa fa-heart-broken',
                    items: [createGridPanelMultiple(['HTTP', 'PING', 'DNS'])]
                },
                {
                    title: 'WhoIs',
                    iconCls: 'x-fa fa-user-secret',
                    items: [whoisCustomTab('whois')]
                },
                {
                    title: 'Subdomains',
                    iconCls: 'x-fa fa-sitemap',
                    items: [createGridPanel('subdomains')]
                },
                {
                    title: 'DNS History',
                    iconCls: 'x-fa fa-history',
                    items: [createGridPanel('DNS History')]
                },
                {
                    title: 'MX Records',
                    iconCls: 'x-fa fa-envelope',
                    items: [createGridPanel('MX Records')]
                }
            ]
        }
    ]
});

function createGridPanel(actionType) {
    let storeData = {};
    let columns = [];

    switch (actionType) {
        case 'whois':
            storeData = {
                fields: ['key', 'value'],
                data: [
                    { key: 'Registrar', value: 'GoDaddy.com, LLC' },
                    { key: 'Registration', value: '2020-01-01' },
                    { key: 'Expiration', value: '2021-01-01' },
                    { key: 'Updated', value: '2020-01-01' },
                    { key: 'Status', value: 'clientTransferProhibited' },
                ]
            };
            columns = [
                { text: 'Key', dataIndex: 'key', width: 95, renderer: function (value, record, dataIndex, cell) { cell.setStyle({ fontWeight: 'bold', color: '#213547' }); return value } },
                { text: 'Value', dataIndex: 'value', flex: 1 }
            ];
            break;
        // ...
        default:
            storeData = generateSampleData();
            columns = [{ text: 'Location', dataIndex: 'location', flex: 1 }];
            break;
    }

    return {
        xtype: 'result-grid',
        itemId: actionType,
        store: storeData,
        columns: columns,
    };
}
function createGridPanelMultiple(actionTypes) {
    return {
        xtype: 'container',
        layout: 'hbox',
        items: actionTypes.map((actionType, index) => {
            let margin = '0 4 0 0';
            if (index === actionTypes.length - 1) {
                margin = '0 0 0 0';
            }
            return Ext.apply(createGridPanel(actionType), { margin: margin, title: actionType });
        })
    };
}
function generateSampleData() {
    return {
        fields: ['location'],
        data: [
            { location: 'United States' },
            { location: 'United States Of America' },
        ]
    }
}

function whoisCustomTab(actionType) {
    return {
        xtype: 'container',
        layout: 'hbox',
        height: 300,
        items : [
            createGridPanel(actionType),
            {
                flex: 3,
                xtype: 'component',
                scrollable: true,
                style: {
                    padding: '0 5px',
                    backgroundColor: '#f0f0f0',
                    fontFamily: 'monospace',
                    color: '#213547',
                    borderWidth: '1px',
                    borderColor: '#4974af',
                    borderStyle: 'solid',
                    borderLeft: '0',
                },
                html: `<pre>   Domain Name: SERCANARGA.COM\r\n   Registry Domain ID: 2474165529_DOMAIN_COM-VRSN\r\n   Registrar WHOIS Server: whois.metunic.com.tr\r\n   Registrar URL: http://metunic.com.tr\r\n   Updated Date: 2023-10-31T15:45:18Z\r\n   Creation Date: 2019-12-31T01:55:59Z\r\n   Registry Expiry Date: 2026-12-31T01:55:59Z\r\n   Registrar: ODTU Gelistirme Vakfi Bilgi Teknolojileri Sanayi Ve Ticaret Anonim Sirketi\r\n   Registrar IANA ID: 3871\r\n   Registrar Abuse Contact Email: abuseverisign@metunic.com.tr\r\n   Registrar Abuse Contact Phone: 90 312 9881106\r\n   Domain Status: clientTransferProhibited https://icann.org/epp#clientTransferProhibited\r\n   Name Server: ANNA.NS.CLOUDFLARE.COM\r\n   Name Server: ANUJ.NS.CLOUDFLARE.COM\r\n   DNSSEC: unsigned\r\n   URL of the ICANN Whois Inaccuracy Complaint Form: https://www.icann.org/wicf/\r\n>>> Last update of whois database: 2024-05-30T06:35:04Z <<<\r\n\r\nFor more information on Whois status codes, please visit https://icann.org/epp\r\n\r\nNOTICE: The expiration date displayed in this record is the date the\r\nregistrar's sponsorship of the domain name registration in the registry is\r\ncurrently set to expire. This date does not necessarily reflect the expiration\r\ndate of the domain name registrant's agreement with the sponsoring\r\nregistrar.  Users may consult the sponsoring registrar's Whois database to\r\nview the registrar's reported date of expiration for this registration.\r\n\r\nTERMS OF USE: You are not authorized to access or query our Whois\r\ndatabase through the use of electronic processes that are high-volume and\r\nautomated except as reasonably necessary to register domain names or\r\nmodify existing registrations; the Data in VeriSign Global Registry\r\nServices' (\\"VeriSign\\") Whois database is provided by VeriSign for\r\ninformation purposes only, and to assist persons in obtaining information\r\nabout or related to a domain name registration record. VeriSign does not\r\nguarantee its accuracy. By submitting a Whois query, you agree to abide\r\nby the following terms of use: You agree that you may use this Data only\r\nfor lawful purposes and that under no circumstances will you use this Data\r\nto: (1) allow, enable, or otherwise support the transmission of mass\r\nunsolicited, commercial advertising or solicitations via e-mail, telephone,\r\nor facsimile; or (2) enable high volume, automated, electronic processes\r\nthat apply to VeriSign (or its computer systems). The compilation,\r\nrepackaging, dissemination or other use of this Data is expressly\r\nprohibited without the prior written consent of VeriSign. You agree not to\r\nuse electronic processes that are automated and high-volume to access or\r\nquery the Whois database except as reasonably necessary to register\r\ndomain names or modify existing registrations. VeriSign reserves the right\r\nto restrict your access to the Whois database in its sole discretion to ensure\r\noperational stability.  VeriSign may restrict or terminate your access to the\r\nWhois database for failure to abide by these terms of use. VeriSign\r\nreserves the right to modify these terms at any time.\r\n\r\nThe Registry database contains ONLY .COM, .NET, .EDU domains and\r\nRegistrars.\r\n</pre>`,
            }
        ],
    };
}