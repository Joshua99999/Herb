// const intrayTableHeaders = [ {   dataField: 'sno',text: 'Slno'}, {   dataField: '',text: 'Status'},
//     {dataField: 'billType',text: 'Name',sort: true},
//     {dataField: 'headOfAccount',text: 'Head Of Accounts',sort: true,

//     headerStyle: {
//         'white-space': 'nowrap'
//       }
// },
//     {dataField: 'activity',text: 'Activity',sort: true }, {dataField: 'createdBy',text: 'Created by',sort: true},
//     {dataField: 'subType',text: 'Type',sort: true}, {dataField: 'receivedDate',text: 'Received Date',sort: true},{dataField: 'recievedTime',text: 'Received Time',sort: true}];

//     const draftTableHeaders = [  {   dataField: 'sno',text: 'Slno'},{ dataField: '',text: 'Status'},{dataField: 'billType',text: 'Name',sort: true},{dataField: 'createdBy',text: 'Created by',sort: true},{dataField: 'subType',text: 'Type',sort: true},{dataField:'createdDate',text:'Created Date',sort:true},
//         {dataField: 'createdTime',text: ' Created Time',sort: true}];

//     const substituteTableHeaders = [  {   dataField: 'sno',text: 'Slno'},{ dataField: 'status',text: 'Status'},{dataField: 'name',text: 'Name',sort: true},
//         {dataField: 'activity',text: 'Activity',sort: true},{dataField: 'substitutedfor',text: 'Substituted For',sort: true},{dataField: ' reason',
//         text: ' Reason',sort: true},{dataField: 'createdby',text: '  Created by',sort: true},{dataField: 'type',text: 'Type',sort: true},{dataField: 'receiveddate',text: ' Received Date',sort: true},{dataField: 'receivedtime',text: ' Received Time',sort: true}];

//     const sentTableHeaders = [ {   dataField: 'sno',text: 'Slno'}, { dataField: 'status',text: 'Status'},{dataField: 'name',text: 'Name',sort: true},
//         {dataField: 'nextactivity',text: 'Next Activity',sort: true},{dataField: 'sentto',text: 'Sent To',sort: true},{dataField: ' senton',
//         text: ' Sent On',sort: true},{dataField: 'senttime',text: ' Sent Time',sort: true}];
     
//     const trackedTableHeaders = [ {   dataField: 'sno',text: 'Slno'}, { dataField: 'status',text: 'Status'},{dataField: 'name',text: 'Name',sort: true},
//         {dataField: 'processor',text: 'Processor ',sort: true},{dataField: 'processingsince',text: 'Processing Since',sort: true},{dataField:'type',
//         text:'Type',sort: true}];
     
//       const tableHeadersMap = new Map();
//       tableHeadersMap.set(0,  intrayTableHeaders );
//       tableHeadersMap.set(1,  draftTableHeaders);
//       tableHeadersMap.set(2,  substituteTableHeaders);
//       tableHeadersMap.set(3,  sentTableHeaders);
//       tableHeadersMap.set(4,  trackedTableHeaders);
     
//       const tableBodyMap=new Map();
//        tableBodyMap.set(0,  'intray' );
//        tableBodyMap.set(1,  'draft');
//        tableBodyMap.set(2, 'substitute' );
//        tableBodyMap.set(3, 'sent' );
//        tableBodyMap.set(4, 'tracked' );

// export  {tableHeadersMap,tableBodyMap};