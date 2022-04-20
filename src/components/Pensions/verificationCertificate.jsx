import * as HERBUI from "react-bootstrap";
import { Col, Row,Card} from "react-bootstrap";
import * as Yup from "yup";
//import React, { useState, useEffect } from "react";
//import axios from "axios";
import { Form, Formik, Field } from "formik";
//import Select from "react-select";
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import { toast, ToastContainer } from "react-toastify";
//import LoadingServices from "../LoadingServices";


import img from "../../download.jpg";

export default function verificationCertificate() {
const initialValuesVerificationCertificate= {

    son:'',
    emp:'',
    mrg:'',
    date:'',
    spouse:'',
    Aadhaarspouse:'',
    receipt:'',
    proid:'',
    village:'',
    mandal:'',
    pincode:'',
    mobileNo:'',
    email:'',
    pan:'',
    lcUpload:'',
    declaration:'',

}
const current = new Date();
const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
const subvalidation = Yup.object({

    mobileNo:Yup.string()
    .required("Please enter mobile number")
    .matches(/^[6-9]{1}[0-9]{9}$/,"phone number is invalid"),
 
    pan:Yup.string()
    .required("Please enter PAN number"),

    declaration: Yup.bool().oneOf([true], 
    "Please confirm the declaraion"),
})
return(
    <>
    <HERBUI.Container>
        <HERBUI.Row>
          <HERBUI.Col
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            xxl={12}
            className="page-titlespacing"
          >
            <div className="inner-herbpage-service-title1">
              <h1>Pensions Module</h1>
            </div>
          </HERBUI.Col>
        </HERBUI.Row>
      </HERBUI.Container>
     <HERBUI.Container className="outer-page-content-container ">
      <HERBUI.Card className="p-3">
        <Formik
          initialValues={initialValuesVerificationCertificate}
          validationSchema={subvalidation}
        //   onSubmit={onSubmit}
        //   enableReinitialize
        >
        {({
            errors,
            values,
            handleChange,
            touched,
            setValues,
            handleSubmit,
          }) => (
              
            
            <div>
          
          <Form>
            <Card.Body className='panel-body'>
             <center >
              <Row className="mb-20">
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <div className="inner-herbpage-service-title-sub">
                   
                    <h1>
                       <center>
                                Government Of Andhra Pradesh 
                                <br/>
                                Format Of Annual Verification Certificate
                        </center>
                     </h1>
                  </div>
                </Col>
              </Row> 
              <Row className="mb-20">
                <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                  
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
               
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                    <img src={img} alt="" style={{height: "140px" , width:"170px"}}/> 
                </Col>
               
              </Row>
              <Row className="mb-20">
                 <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                 </Col>
                    
                <Col xs={12} sm={12} md={12} lg={12} xl={2} xxl={2}>
                  <label>
                         1.(i)Type Of Pension 
                  </label>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                    :
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={1} xxl={1}>
                  <Field name="pensionType" >

                  </Field>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                </Col>
                </Row>

                <Row className="mb-20">
                   <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                    </Col>
                    
                   <Col xs={12} sm={12} md={12} lg={12} xl={2} xxl={2}>
                      <label>
                              (iI)Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </label>
                    </Col>
                   <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                      :
                   </Col>
                   <Col xs={12} sm={12} md={12} lg={12} xl={1} xxl={1}>
                      <Field name="name" >

                      </Field>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                    </Col>
                </Row>
                <Row className="mb-20">
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                    </Col>
                    
                   <Col xs={12} sm={12} md={12} lg={12} xl={2} xxl={2}>
                     <label>
                        (iii)S/o,D/o,W/o  &nbsp;
                     </label>
                   </Col>
                   <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                      :
                   </Col>
                   <Col xs={12} sm={12} md={12} lg={12} xl={1} xxl={1}>
                      <Field name="son" type="text">

                     </Field>
                   </Col>
                   <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                   </Col>
                </Row>
                <Row className="mb-20">
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                    </Col>
                    
                   <Col xs={12} sm={12} md={12} lg={12} xl={2} xxl={2}>
                      <label>
                          (IV) AADHAAR NO  &nbsp;
                      </label>
                   </Col>
                   <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                       :
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={1} xxl={1}>
                       <Field name="aadhar" >

                       </Field>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                    </Col>
                </Row>

                <Row className="mb-20">
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                    </Col>
                    
                   <Col xs={12} sm={12} md={12} lg={12} xl={2} xxl={2}>
                      <label>
                           2. Date of Birth/Age &nbsp;
                      </label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                       :
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={1} xxl={1}>
                       <Field name="aadhar" >
                       </Field>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                    </Col>
                </Row>

                <Row className="mb-20">
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                    </Col>
                    
                   <Col xs={12} sm={12} md={12} lg={12} xl={2} xxl={2}>
                      <label>
                           3.(I) PPO ID &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </label>
                   </Col>
                   <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                      :
                   </Col>
                   <Col xs={12} sm={12} md={12} lg={12} xl={1} xxl={1}>
                      <Field name="aadhar" >

                      </Field>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                  </Col>
                </Row>
             
                <Row className="mb-20">
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                    </Col>
                    
                    <Col xs={12} sm={12} md={12} lg={12} xl={2} xxl={2}>
                      <label>
                          (II)PPO NO &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                       :
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={1} xxl={1}>
                        <Field name="aadhar" >

                        </Field>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                    </Col>
                </Row>
                <Row className="mb-20">
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                    </Col>
                    
                    <Col xs={12} sm={12} md={12} lg={12} xl={2} xxl={2}>
                       <label>
                            4.NAME OF THE BANK   
                       </label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                        :
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={1} xxl={1}>
                       <Field name="aadhar">

                       </Field>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                    </Col>
                </Row>

                <Row className="mb-20">
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                    </Col>
                    
                    <Col xs={12} sm={12} md={12} lg={12} xl={2} xxl={2}>
                       <label>
                            5.NAME OF THE BANK BRANCH   
                        </label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                        :
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={1} xxl={1}>
                       <Field name="aadhar" >

                       </Field>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                    </Col>
                </Row>
                <Row className="mb-20">
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                    </Col>
                    
                    <Col xs={12} sm={12} md={12} lg={12} xl={2} xxl={2}>
                        <label>
                             6.(i) BANK ACCOUNT NUMBER  
                        </label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                         :
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={1} xxl={1}>
                       <Field name="aadhar" >

                       </Field>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                    </Col>
                </Row>
                <Row className="mb-20">
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                    </Col>
                    
                    <Col xs={12} sm={12} md={12} lg={12} xl={2} xxl={2}>
                       <label>
                           (II) MICR CODE &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                        </label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                       :
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={1} xxl={1}>
                        <Field name="aadhar" >

                        </Field>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                    </Col>
                </Row>

                <Row className="mb-20">
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                    </Col>
                    
                    <Col xs={12} sm={12} md={12} lg={12} xl={2} xxl={2}>
                         <label>
                             (III) IFSC CODE &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                        </label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                        :
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={1} xxl={1}>
                       <Field name="aadhar" >
                            
                       </Field>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                    </Col>
                </Row>


                <Row className="mb-20">
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={2} xxl={2}>
                        <label>
                             7.Employment Particulars&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
                             (Applicable if Re-employed after 
                             retirement&employee pensioner only)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                        :
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={1} xxl={1}>
                        <Field
                           as="select"
                           name="emp" >
                             <option value="0">Select</option>
                             <option value="DR">DR</option>
                             <option value="IR"> IR</option>
                             <option value="MA"> MA</option>
                        </Field>
                    {touched.emp && errors.emp ? (
                      <span className="errmsg">
                         {errors.emp}
                      </span>
                    ) : null}
                  </Col>

                  <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                  </Col>
                </Row>
                <Row className="mb-20">
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                    </Col>
                    
                    <Col xs={12} sm={12} md={12} lg={12} xl={2} xxl={2}>
                       <label>
                            8.Re-Marraige Particulars (if any)
                        </label>
                   </Col>
                   <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                       :
                   </Col>
                   <Col xs={12} sm={12} md={12} lg={12} xl={1} xxl={1}>
                     <Field
                       as="select"
                       name="mrg"              
                     >
                      <option value="0">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No"> No</option>
                     </Field>
                      {touched.mrg && errors.mrg ? (
                        <span className="errmsg">
                                {errors.mrg}
                        </span>
                      ) : null}
             
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                    </Col>
                </Row>

                <Row className="mb-20">
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                    </Col>
                    
                    <Col xs={12} sm={12} md={12} lg={12} xl={2} xxl={2}>
                       <label>
                           (I) Date Of Remarriage &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                       </label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                       :
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={1} xxl={1}>
                       <Field
                             name="date" type="date"
                        >
                        </Field>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                   </Col>
                </Row>
             
                <Row className="mb-20">
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                    </Col>
                    
                    <Col xs={12} sm={12} md={12} lg={12} xl={2} xxl={2}>
                      <label>
                          (II) Name Of The Spouse &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                        :
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={1} xxl={1}>
                       <Field
                           name="spouse" type="text"
                        >
                       </Field>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                    </Col>
                </Row>

                <Row className="mb-20">
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                    </Col>
                    
                    <Col xs={12} sm={12} md={12} lg={12} xl={2} xxl={2}>
                       <label>
                          (III)Aadhar Number Of The Spouse
                       </label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                        :
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={1} xxl={1}>
                       <Field
                            name="Aadhaarspouse" type="text"
                        >
                        </Field>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                    </Col>
                </Row>

                <Row className="mb-20">
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                    </Col>
                    
                    <Col xs={12} sm={12} md={12} lg={12} xl={2} xxl={2}>
                       <label>
                           9.Receipt Of Any Other Person &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                       </label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                         :
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={1} xxl={1}>
                        <Field
                           as="select"
                           name="mrg"              
                        >
                           <option value="0">Select</option>
                           <option value="Yes">Yes</option>
                           <option value="No"> No</option>
                        </Field>
                      {touched.mrg && errors.mrg ? (
                         <span className="errmsg">
                                {errors.mrg}
                        </span>
                       ) : null}
             
                    </Col>
                  <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                </Col>
                </Row>

                <Row className="mb-20">
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                    </Col>
                    
                    <Col xs={12} sm={12} md={12} lg={12} xl={2} xxl={2}>
                     <label>
                          (I) AP/TG State Govt PPOID&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                     </label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                      :
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={1} xxl={1}>
                       <Field
                          name="proid" type="text">
                       </Field>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                    </Col>
                </Row>

                <Row className="mb-20">
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                    </Col>
                    
                    <Col xs={12} sm={12} md={12} lg={12} xl={2} xxl={2}>
                       <label>
                            10.(I)Present Residential Address 
                       </label>
                    </Col>
                
                </Row>

                <Row className="mb-20">
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                    </Col>
                    
                    <Col xs={12} sm={12} md={12} lg={12} xl={2} xxl={2}>
                        <label>
                            H-NO/Village Name 
                        </label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                       :
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={1} xxl={1}>
                        <Field
                           name="village" type="text">
                        </Field>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                    </Col>
                </Row>
                <Row className="mb-20">
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                    </Col>
                    
                    <Col xs={12} sm={12} md={12} lg={12} xl={2} xxl={2}>
                       <label>
                           Mandal/District Name  
                        </label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                        :
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={1} xxl={1}>
                       <Field
                           name="mandal" type="text">
                       </Field>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                    </Col>
                </Row>

                <Row className="mb-20">
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                    </Col>
                    
                    <Col xs={12} sm={12} md={12} lg={12} xl={2} xxl={2}>
                       <label>
                          Pincode &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                       </label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                        :
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={1} xxl={1}>
                       <Field
                          name="pincode" type="text">
                       </Field>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                    </Col>
                </Row>
                <Row className="mb-20">
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                    </Col>
                    
                    <Col xs={12} sm={12} md={12} lg={12} xl={2} xxl={2}>
                       <label>
                          Mobile Number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                       </label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                       :
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={1} xxl={1}>
                       <Field
                           name="mobileNo" type="text">
                       </Field>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                    </Col>
                </Row>
                <Row className="mb-20">
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                    </Col>
                    
                    <Col xs={12} sm={12} md={12} lg={12} xl={2} xxl={2}>
                         <label>
                            (II) E-mail Address (if any)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                         </label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                       :
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={1} xxl={1}>
                       <Field
                           name="email" type="email">
                      </Field>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                    </Col>
                </Row>
                <Row className="mb-20">
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                    </Col>
                    
                    <Col xs={12} sm={12} md={12} lg={12} xl={2} xxl={2}>
                        <label>
                            11.Income tax PAN number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                      :
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={1} xxl={1}>
                       <Field
                           name="pan" type="text">
                       </Field>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                    </Col>
                </Row>
                <Row className="mb-20">
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                    </Col>
                    
                    <Col xs={12} sm={12} md={12} lg={12} xl={2} xxl={2}>
                      <label>
                          Manaul LC uploaded &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                     </label>
                   </Col>
                   <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                       :
                   </Col>
                   <Col xs={12} sm={12} md={12} lg={12} xl={1} xxl={1}>
                     <Field
                           name="lcUplaod" type="text">
                     </Field>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                    </Col>
                </Row>
                </center>
                
                <Row>
                   <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <div className="inner-herbpage-service-title-sub"> 
                         <center>
                            <h5 style={{color:"red"}}><u>Declaration of the pensioner</u></h5>
                         </center>
                      </div>
                      <center>
                     <Row>
                       <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <label className=" control-label star">
                                      &nbsp;
                                      
                            <p style={{textalign:"justify"}}> 
                                <Field type="checkbox" name="declaration"/>
                                 I hereby declare that Iam not drawing any DR on other pension.
                                  As pensioner , I am remarried after the death of my spouse 
                                  <p> from  whom I got this pension.The particulers above mentioned are true to the best of my knowledge and belief.<br/>
                                      If the above particulers are proved wrong at any time , Iam liable for disciplinary /criminal action as per rules.
                                  </p>
                            </p>
                        </label>
                      </Col>
                    </Row>
                   </center>
                   <center>
                    <Row className="mb-20">
                       <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                       </Col>
                    
                       <Col xs={12} sm={12} md={12} lg={12} xl={2} xxl={2}>
                 
                        <p>Date : {date}</p> 
                        <p>Place :</p>
                 
                       </Col>
                       <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                    
                       </Col>
                      <Col xs={12} sm={12} md={12} lg={12} xl={1} xxl={1}>
               
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                      </Col>
                    </Row>
                   </center>
                  </Col>
                </Row> 
                <br/>
                <br/>
                <br/>
             </Card.Body> 
            </Form>
                
          </div>

        )}
        </Formik>
        </HERBUI.Card>
        </HERBUI.Container>
        </>
)
}