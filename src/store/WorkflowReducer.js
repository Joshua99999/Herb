const initialContingentDetails = {
    workFlowData:[],
    workflowTable:[],
    DeleteRow:[]
  };
  export default function WorkflowReducer(contingentDetails = initialContingentDetails, action) {
    switch (action.type) {
      case "workflowTableData":
        return {
          ...contingentDetails,
          workflowTable: action.payload
        }
      case "DELETE_INDEX":
        return {
          ...contingentDetails,
          DeleteRow: action.payload
        }
      default:
        return contingentDetails;
    }
  }