import React from 'react';
import { FieldArray, Formik } from 'formik';
import * as HERBUI from "react-bootstrap"
import { store } from '../../store';
import AddProcessorToWorkflow from './AddProcessorToWorkflow';
const AddprocessorToWorkflowMain = ({ formik }) => {
  return (
    <>
      <FieldArray name='Workflow' className='form-control'>
        {(fieldArrayProps) => {
          const { push, remove, form } = fieldArrayProps
          // alert(JSON.stringify(form));
          const { values } = form
         // alert(JSON.stringify(values))
          const {Workflow} = values
          return (
            <div>
              <div className="container" style={{ marginLeft: "95%" }} >
                <button className="button-titile btn btn-sm btn-success" value="false" type='button' onClick={() => {push({ level: '', activity: '', processor: '',processorName:'' })
                }}>+</button>&nbsp;&nbsp;
              </div>
                <AddProcessorToWorkflow values={Workflow} formik={formik}
                  fieldArrayProps={fieldArrayProps}
                   />
                   
            </div>
          ) 
        }}
      </FieldArray>
      <HERBUI.Row>
        <HERBUI.Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
        </HERBUI.Col>
        <HERBUI.Col className="d-flex flex-row-reverse" xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
        </HERBUI.Col>
      </HERBUI.Row>
    </>
  )
};

export default AddprocessorToWorkflowMain;