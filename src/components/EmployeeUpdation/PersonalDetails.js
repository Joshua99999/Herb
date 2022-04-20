import React, { useState } from 'react'
import { Form, Card, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as HERBUI from "react-bootstrap";
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import LoadingServices from './LoadingServices';
import { useHistory, useLocation } from 'react-router';
import Loader from "react-loader-spinner";
import '../../payroll.css';
import { NotificationManager } from 'react-notifications';

export default function PersonalDetails({ data, masterData }, props) {
    //personal Details
    const [personalShow, setPersonalShow] = useState(false);
    const [personalResult, setPersonalResult] = useState({ sDesc: '' })
    const [showError, setShowError] = React.useState(false);
    const [showMessage, setShowMessage] = React.useState(false);
    const [showPanError, setShowPanError] = React.useState(false);
    const [showPanMessage, setShowPanMessage] = React.useState(false);
    const [showMobileError, setShowMobileError] = React.useState(false);
    const [showMobileMessage, setShowMobileMessage] = React.useState(false);
    const [aadharError, setAadharError] = useState(false);
    const [aadharMessage, setAadharMessage] = useState(false);

    const [personalData, setPersonalData] = useState({
        gpfNo: '',
        apgliNo: '',
        panno: '',
        bankaccountNo: '',
        ifscCode: '',
        aadharNo: '',
        mobileNo: '',
        emailId: '',

    })
    const ifscCodeValidation = (e) => {
        let ifscCode = e.target.value
      
        LoadingServices.fetchIfscCodeDetails(ifscCode).then(res => {
            var pattern = new RegExp(/^[A-Za-z]{4}\d{7}$/);
            const isValidIfsc = pattern.test(ifscCode);
            if (!isValidIfsc) {
                let message = res.data.message
                setShowMessage(message);
                setShowError(true);
                ifscCode="";

            } else {
               
                setShowMessage("");
                setShowError(false);

            }
        })

    };
    const pancardValidation = (e) => {
        let panno = e.target.value
        var regex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        if (!regex.test(panno)) {
            let message = "Enter Valid Pan NUmber"
            setShowPanError(true)
            setShowPanMessage(message)
        }
        else {
            setShowPanMessage("")
            setShowPanError(false)

        }

    }
    const mobileNumberValidation = (e) => {
        let mobile = e.target.value
        let regx = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
        if (!regx.test(mobile)) {
            let message = "Enter Valid Mobile Number"
            setShowMobileError(true)
            setShowMobileMessage(message)
        } else {
            setShowMobileError(false)
            setShowMobileMessage("")
        }
    }

    const aadharValidation = (e) => {
        let aadhar = e.target.value
        var adhartwelvedigit = /^\d{12}$/;
        var adharsixteendigit = /^\d{16}$/;
        if (aadhar != '') {
            if ((aadhar.match(adhartwelvedigit)) || (aadhar.match(adharsixteendigit))) {
               
                setAadharError(false)
                setAadharMessage("")

            }
            else {
                let message = "Enter valid aadhar..";
                setAadharError(true)
                setAadharMessage(message)


            }
        }


    }

    const personalDetailsSave = (values) => {
        console.log('personalDetails...=>' + JSON.stringify(values));
        console.log('personalDetails...=>' + JSON.stringify(values.gpfNo));

        let personalDetails = {
            cfmsId: values.cfmsId,
            gpfNo: values.gpfNo,
            apgliNo: values.apgliNo,
            aadharNo: values.aadharNo,
            panno: values.panno,
            bankaccountNo: values.bankaccountNo,
            ifscCode: values.ifscCode,
            mobileNo: values.mobileNo,
            emailId: values.emailId,
        };
        console.log('personalDetails...=>' + JSON.stringify(personalDetails));
        LoadingServices.personalEmpSavings(personalDetails).then(res => {
            console.log("sucess---" + JSON.stringify(res))
            if (res.data.sCode === "01") {
                NotificationManager.success(res.data.sDesc)
            }
            else if (res.data.sCode === "02") {
                NotificationManager.warning(res.data.sDesc)
            }
            // setPersonalResult(res.data);
            // setPersonalShow(true);
        });
    }
    return (
        <div className="container-fluid row mt-3">
            <div className="inner-herbpage-service-title-sub mb-4p5">
                <h1>Personal Details</h1>
            </div>
            <Formik
                initialValues={data} enableReinitialize={true}
                validationSchema={Yup.object().shape({
                    gpfNo: Yup.string().required("Please Enter"),
                    apgliNo: Yup.string().required("Please Enter"),
                    panno: Yup.string().required("Please Enter"),
                    bankaccountNo: Yup.string().required().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, "must match patern given"),
                    ifscCode: Yup.string().required("Please Enter"),
                    aadharNo: Yup.string().required("Please Enter"),
                    mobileNo: Yup.string().required("Please Enter"),
                    emailId: Yup.string().email('Wrong e-mail format'),
                

                })}
                onSubmit={(values) => {
                    console.log("### form submit " + JSON.stringify(values));
                    personalDetailsSave(values);
                }}
            >
                {({ errors, values, touched, setValues, resetForm, handleBlur, handleChange, handleSubmit }) => {
                    return (
                        <div className="empDiv">
                            <form noValidate name="customForm" onSubmit={handleSubmit}>
                                <HERBUI.Row>
                                    <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                        <HERBUI.InputGroup className="mb-4p5">
                                            <span className="label-text-style"><b>GPFNo/AG/IV/CPS/ZP/AIS: </b></span>
                                            <Field name="gpfNo" id="gpfNo" onBlur={handleBlur} maxLength={20}

                                                placeholder="Enter gpfno" type="text"
                                                value={values?.gpfNo} maxLength='300' autoComplete="off"
                                                className={(touched.gpfNo && errors.gpfNo) ? 'form-control is-invalid' : 'form-control'} />
                                            {touched.gpfNo && errors.gpfNo ? (
                                                <div className="invalid-feedback">{errors.gpfNo}</div>
                                            ) : null}
                                        </HERBUI.InputGroup>
                                    </HERBUI.Col>
                                    <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                        <HERBUI.InputGroup className="mb-4p5">
                                            <span className="label-text-style"><b>APGLI No:</b></span>
                                            <Field name="apgliNo" onBlur={handleBlur}
                                                id="apgliNo" maxLength={20}
                                                placeholder="Enter apgliNo" type="text"
                                                value={values?.apgliNo}
                                                className={(touched.apgliNo && errors.apgliNo) ? 'form-control is-invalid' : 'form-control'} />
                                            {touched.apgliNo && errors.apgliNo ? (
                                                <div className="invalid-feedback">{errors.apgliNo}</div>
                                            ) : null}
                                        </HERBUI.InputGroup>
                                    </HERBUI.Col>
                                    <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                        <HERBUI.InputGroup className="mb-4p5">
                                            <span className="label-text-style"><b>Aadhar No:</b></span>
                                            <Field type="text" placeholder="Enter Aadhar No" name="aadharNo" maxLength={12}
                                                value={values?.aadharNo} onBlur={aadharValidation}
                                                className={(touched.aadharNo && errors.aadharNo) ? 'form-control is-invalid' : 'form-control'} />
                                            {touched.aadharNo && errors.aadharNo ? (
                                                <div className="invalid-feedback">{errors.aadharNo}</div>
                                            ) : null}

                                            {aadharError &&
                                                <div className="text-error" >
                                                    {aadharMessage}
                                                </div>}

                                        </HERBUI.InputGroup>
                                    </HERBUI.Col>
                                    <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                        <HERBUI.InputGroup className="mb-4p5">
                                            <span className="label-text-style"><b>PAN No:</b></span>
                                            <Field type="text" placeholder="Enter PAN No" name="panno" value={values?.panno}
                                                onBlur={pancardValidation} maxLength={10}
                                                className={(touched.panno && errors.panno) ? 'form-control is-invalid' : 'form-control'} />
                                            {touched.panno && errors.panno ? (
                                                <div className="invalid-feedback">{errors.panno}</div>
                                            ) : null}

                                            {showPanError &&
                                                <div className="text-error" >
                                                    {showPanMessage}
                                                </div>}

                                        </HERBUI.InputGroup>
                                    </HERBUI.Col>
                                    <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                        <HERBUI.InputGroup className="mb-4p5">
                                            <span className="label-text-style"><b>Bank Account No:</b></span>
                                            <Field type="text" placeholder="Enter Bank Account No" maxLength={18}
                                                name="bankaccountNo" value={values?.bankaccountNo}

                                                className={(touched.bankaccountNo && errors.bankaccountNo) ? 'form-control is-invalid' : 'form-control'} />
                                            {touched.bankaccountNo && errors.bankaccountNo ? (
                                                <div className="invalid-feedback">{errors.bankaccountNo}</div>
                                            ) : null}
                                        </HERBUI.InputGroup>
                                    </HERBUI.Col>
                                    <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                        <HERBUI.InputGroup className="mb-4p5">
                                            <span className="label-text-style"><b>Bank Branch IFSC Code:</b></span>
                                            <Field type="text" placeholder="Enter Ifsc Code"
                                                name="ifscCode" value={values?.ifscCode}
                                                onBlur={ifscCodeValidation}
                                                className={(touched.ifscCode && errors.ifscCode) ? 'form-control is-invalid' : 'form-control'} />
                                            {touched.ifscCode && errors.ifscCode ? (
                                                <div className="invalid-feedback">{errors.ifscCode}</div>
                                            ) : null}

                                            {showError &&
                                                <div className="text-error" >
                                                    {showMessage}
                                                </div>}

                                        </HERBUI.InputGroup>
                                    </HERBUI.Col>
                                </HERBUI.Row>
                                <HERBUI.Row>

                                    <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                        <HERBUI.InputGroup className="mb-4p5">
                                            <span className="label-text-style"><b>Mobile No:</b></span>
                                            <Field type="text" placeholder="Enter Mobile No" name="mobileNo"
                                                value={values?.mobileNo} onBlur={mobileNumberValidation} maxLength="10"
                                                className={(touched.mobileNo && errors.mobileNo) ? 'form-control is-invalid' : 'form-control'} />
                                            {touched.mobileNo && errors.mobileNo ? (
                                                <div className="invalid-feedback">{errors.mobileNo}</div>
                                            ) : null}
                                            {showMobileError &&
                                                <div className="text-error" >
                                                    {showMobileMessage}
                                                </div>}
                                        </HERBUI.InputGroup>
                                    </HERBUI.Col>

                                    <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                        <HERBUI.InputGroup className="mb-4p5">
                                            <span className="label-text-style"><b>Email Id(Optional):</b></span>
                                            <Field type="text" placeholder="Enter Email Id" name="emailId" value={values?.emailId}

                                                className={(touched.emailId && errors.emailId) ? 'form-control is-invalid' : 'form-control'} />
                                            {touched.emailId && errors.emailId ? (
                                                <div className="invalid-feedback">{errors.emailId}</div>
                                            ) : null}
                                        </HERBUI.InputGroup>
                                    </HERBUI.Col>
                                </HERBUI.Row>

                                <Field type="hidden" value="cfmsid" />
                                <>
                                    <HERBUI.Row className=" mb-3">
                                        <HERBUI.Col xs={12} sm={12} md={12} lg={8} xl={8} xxl={8}>
                                            &nbsp;
                                        </HERBUI.Col>
                                        <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                            <div className="d-grid gap-2">
                                                <button type="submit" className="btn btn-success">Save</button>
                                            </div>
                                        </HERBUI.Col>
                                    </HERBUI.Row>
                                </>
                            </form>
                        </div>

                    );
                }}
            </Formik>
        </div>

    )
}
//updated