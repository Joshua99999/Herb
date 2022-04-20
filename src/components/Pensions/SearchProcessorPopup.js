import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal,Button } from 'react-bootstrap'
import AddprocessorToWorkflowMain from './AddProcessorToWorkflowMain';
import SearchProcessor from './SearchProcessor';
const SearchProcessorPopup=(props)=> {
    function hideModal(){
        props.hideModal()
    }
    return (
        <div>
            <Modal show={props.show}  size="xl">
                <Modal.Header className="modal-header">
                <Modal.Title>Search Processor</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body"> 
                        <SearchProcessor formik={props.formik} index={props.index} details={props.details} hideModal={hideModal}/>
                </Modal.Body>
                <Modal.Footer className="modal-footer">
                <Button type="button" className="btnClose" onClick={()=>hideModal()}><b>Close</b></Button>    
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default SearchProcessorPopup;