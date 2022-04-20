const initialContigentCreationDetails = {
    formCreationValues:{
        Workflow:[{level:'',activity:'',processor:"",processorName:"",positionName:'',EmployeeCode:''}],
    }

}
export default function ContingentCreationReducer(contingentCreateDetails = initialContigentCreationDetails,action)
{
    switch(action.type){
        case "UPDATE_CONTINGENT_CREATION_MODAL_DATA":
            return action.payload
        default:
            return contingentCreateDetails;
    }
}