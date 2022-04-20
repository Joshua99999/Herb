import React, { useEffect, useState } from 'react'
import * as HERBUI from "react-bootstrap";
import { ErrorMessage, Field, FieldArray, FormikProvider, formik } from 'formik';
import TableHeader from './TableHeader';
import { BiOutline } from 'react-icons/bi';
import { store } from '../../store';
import { BiTrash } from "react-icons/bi";
import SearchProcessorPopup from './SearchProcessorPopup';
function AddProcessorToWorkflow({formik,values,fieldArrayProps}) {
  const [show,setShow]=useState(false);
  const [index,setIndex]=useState();
  const [details,setDetails] = useState([]);
function SearchPopup(index){
   store.dispatch({type:"DELETE_INDEX",payload:fieldArrayProps})
  setShow(true);
  setIndex(index);
}
function closeModal(){
 setShow(false);
 } 
 function activityDetails(event){
   setDetails(event.target.value)
 }
  const tableHeaderDetails = [{ label: 'Level', isMandatory: false, showField: true }, { label: 'Activity', isMandatory: false, showField: true },
  { label: 'Processor', isMandatory: false, showField: true }, { label: 'Processor Name', isMandatory: false, showField: true }];
  return (
    <>
      <HERBUI.Container>
        <div className="table-responsive">
          <table className="table table-bordered table-hover table-sm ">
            <TableHeader headerValues={tableHeaderDetails} />
            <tbody>
              {values.map((Workflow, index) => (
                <tr key={index}>
                  <td>
                    <HERBUI.Col>
                      <span className='className="label-text-style"' name={`Workflow[${index}].level`}>{index+1}</span>
                    </HERBUI.Col>

                  </td>
                  <td>
                    <HERBUI.Col>
                      <Field  id={`activity[${index}]`} index={index} name={`Workflow[${index}].activity`} autoComplete='off' onClick={activityDetails}
                       component = "select" className="form-control required">
                           <option>-----Select------</option>
                           <option value='c'>Checker</option>
                           <option value='s'>Approve</option></Field>
                      <ErrorMessage name={`Workflow[${index}].activity`} className="text-error" component="div" />
                    </HERBUI.Col>
                  </td>
                  <td>
                 
                    <HERBUI.Col>
                      <Field type='text' id={`processor[${index}]`} name={`Workflow[${index}].processor`} 
                        index={index} className="form-control required numberAlign" autoComplete='off' onClick={()=>{SearchPopup(index)}}/>
                      <ErrorMessage name={`Workflow[${index}].processor`} className="text-error" component="div" />
                    </HERBUI.Col>
                  </td>
                  <td>
                 <HERBUI.Col>
                 <Field type='text' name={`Workflow[${index}].processorName`} 
                        index={index} className="form-control required numberAlign" autoComplete='off'/>
                 </HERBUI.Col>
               </td>
                  <td style={{display:values.length>1?"block":"none"}}>
                    <BiTrash size="25px" color="red" onClick={() =>{
                      fieldArrayProps.remove([index])}}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <br></br>
      </HERBUI.Container>
      <SearchProcessorPopup  show={show}  hideModal={closeModal} details ={details} index={index} formik={formik}/> 
    </>
  );

}
export default AddProcessorToWorkflow;