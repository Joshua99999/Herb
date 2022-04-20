import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal,Button } from 'react-bootstrap'
import AddprocessorToWorkflowMain from './AddProcessorToWorkflowMain';
import { useSelector } from 'react-redux';
import { store } from '../../store';

import { blmSetModalPopupData } from './popup';
const AddNewWorkFlowPopup=(props)=> {
    //let statedata = useSelector(state=>state.contingentDetails)
    //let removeData = statedata.DeleteRow;
     function hideModal(){
        props.hideModal()
    }
function tableData(){
    let count = 0;
    props.formik.values.Workflow.map((item,index)=>{
             if(item.activity === 's'){
                 count = count + 1;
             }
          })
          if(count>1){
            blmSetModalPopupData.errorAlert("Multiple Approvers Not Allowed")
            // removeData.remove();
         }
          else{
            let data = props.formik.values.Workflow.filter((value)=>value.level !== ''&&value.processor !== ''&&value.activity !==''&&value.processorName!=='')
            store.dispatch({type:"workflowTableData", payload:data}); 
            hideModal();  
          }
         
}
    return (
        <div>
            <Modal show={props.show}  size="xl">
                <Modal.Header className="modal-header">
                <Modal.Title>Add Processor to Workflow</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body"> 
                        <AddprocessorToWorkflowMain formik={props.formik} />
                </Modal.Body>
                <Modal.Footer className="modal-footer">
                <Button type="button" className='btnSave' onClick={tableData} ><b>Add</b></Button>
                <Button type="button" className="btnClose" onClick={()=>hideModal()}><b>Close</b></Button>    
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default AddNewWorkFlowPopup;