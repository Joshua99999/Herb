import React, { useState, useEffect } from 'react'
import { Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as HERBUI from "react-bootstrap";
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import LoadingServices from './LoadingServices';
import '../../payroll.css';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { BsGenderTrans, BsGenderFemale, BsGenderMale } from "react-icons/bs";
import Loader from "react-loader-spinner";
import { NotificationManager } from 'react-notifications';


export default function BasicDetails({ data, masterData }, props) {

    const [show, setshow] = useState(false);
    const [saveResult, setSaveResult] = useState();
    const [cfmsId, setCfmsId] = useState();
    const [array, setArray] = useState({ empId: '', empName: '', surName: '' })
    const [dateOfBirth, setDobDate] = useState({ "dateOfBirth": '' })
    const [dojgovernmentservice, setDojGovtDate] = useState({ "dojgovernmentservice": '' })
    const [dob, setDob] = useState(null)
    const [doj, setDoj] = useState(null);
    const [empShow, setEmpShow] = useState(false);
    const [empResult, setEmpResult] = useState({ sdesc: '' });
    const [martialStatusFlag, setMartialStatusFlag] = useState(false);
    const [disablePercentageflag, setDisablePercentageFlag] = useState(false);
    const [derrors, setDErrors] = useState({ "dateOfBirth": '', "dojgovernmentservice": '' })
    useEffect(() => {
        // console.log("data.dojgovernmentservice..." + moment(data.dojgovernmentservice).format('dd/MM/yyyy'))
        let stringDate = (data?.dojgovernmentservice) ? data?.dojgovernmentservice.split('/') : []
        console.log("@@ stringDate: " + stringDate)
        let finalDate = stringDate[1] + "/" + stringDate[0] + "/" + stringDate[2]
        console.log("@@ finalDate: " + finalDate)
        let date = new Date(finalDate);
        setDoj(date.getTime())


        let stringDateDateOfBirth = (data?.dateOfBirth) ? data?.dateOfBirth.split('/') : []
        console.log("@@ stringDateDateOfBirth: " + stringDateDateOfBirth)

        let finalDateDateOfBirth = stringDateDateOfBirth[1] + "/" + stringDateDateOfBirth[0] + "/" + stringDateDateOfBirth[2]
        console.log("@@ finalDateDateOfBirth: " + finalDateDateOfBirth)

        let dateDateOfBirth = new Date(finalDateDateOfBirth);
        console.log("dateDateOfBirth..." + dateDateOfBirth)
        setDob(dateDateOfBirth.getTime())
        setDobDate({ ...dateOfBirth, dateOfBirth: dateDateOfBirth.getTime() })
        setDojGovtDate({ ...dojgovernmentservice, dojgovernmentservice: date.getTime() })
    }, [data.dateOfBirth], [data.dojgovernmentservice])


    const onChangeMartialStatus = (e, field) => {
        const martialStatusCheck = e.target.value
        if (martialStatusCheck == "2") {
            setMartialStatusFlag(true)
        }
        else {
            setMartialStatusFlag(false)
        }
        setEmpShow(false)
        field.onChange(e);
    }

    const onChangeDisabledStatus = (e, field) => {
        const disabledCheck = e.target.value
        if (disabledCheck == "2" || disabledCheck == "3" || disabledCheck == "4") {
            setDisablePercentageFlag(true)
        }
        else {
            setDisablePercentageFlag(false)
        }
    }

    const differenceInYears = (date, name) => {
        //console.log("date...." + date + "split....." + date.split("/"))
        let dojSplit = ''
        let dobSplit = '';
        if (name === "dojgovernmentservice") {
            dojSplit = date.split('/')
            console.log("s....." + dojSplit[0] + dojSplit[1] + dojSplit[2])
            if (dateOfBirth.dateOfBirth === '' || dateOfBirth.dateOfBirth === undefined) {
                setDErrors({ ...derrors, dateOfBirth: 'please select date of birth', dojgovernmentservice: '' })
            }
            else {
                setDErrors({ ...derrors, dateOfBirth: '', dojgovernmentservice: '' })
                dobSplit = moment(dateOfBirth.dateOfBirth).format("dd/MM/yyyy").split("/")
            }
        }
        else if (name === "dateOfBirth") {
            dobSplit = date.split('/')
            console.log("s....." + dobSplit[0] + dobSplit[1] + dobSplit[2])
            if (dojgovernmentservice.dojgovernmentservice === '' || dojgovernmentservice.dojgovernmentservice === undefined) {
                setDErrors({ ...derrors, dojgovernmentservice: 'please select ', dateOfBirth: '' })
            }
            else {
                setDErrors({ ...derrors, dojgovernmentservice: '', dojgovernmentservice: '', dateOfBirth: '' })
                dojSplit = moment(dojgovernmentservice.dojgovernmentservice).format("dd/MM/yyyy").split("/")
                console.log("dojSplit...." + dojSplit)
            }
        }
        var dobSplitDay = dobSplit[0]
        var dobSplitMonth = dobSplit[1]
        var dobSplitYear = dobSplit[2]

        // var dojSplitDay = dojSplit[0]
        var dojSplitMonth = dojSplit[1]
        var dojSplitYear = dojSplit[2]
        console.log("doj split year..." + dojSplitYear + "dob split year...." + dobSplitYear)
        var differenceYear = parseInt(dojSplitYear) - parseInt(dobSplitYear);
        console.log("difference-------" + differenceYear)
        if (parseInt(dobSplitYear) > parseInt(dojSplitYear)) {
            console.log("working in condition......")
            setDobDate({ ...dateOfBirth, dateOfBirth: '' })
            setDojGovtDate({ ...dojgovernmentservice, dojgovernmentservice: '' })
            NotificationManager.warning("Employee Date of Birth later than the Date of Joining")
        }
        else if (differenceYear < 15) {
            setDobDate({ ...dateOfBirth, dateOfBirth: '' })
            setDojGovtDate({ ...dojgovernmentservice, dojgovernmentservice: '' })
            NotificationManager.warning("Employee Date of Joining should be greater than 15 years from Date of Birth")
        }
        else if (parseInt(dobSplitYear) == parseInt(dojSplitYear)) {
            if (parseInt(dobSplitMonth) > parseInt(dojSplitMonth)) {
                setDobDate('')
                setDojGovtDate('')
                NotificationManager.warning("Employee Date of Birth aaaaaa later than the Date of Joining")
            }
        }
    }
    const empDetailsSave = (values) => {
        console.log("date of birth values....." + dateOfBirth.dateOfBirth)
        if (values.maritalstatus != '2') {
            values.spousename = "";
            values.spouseoccupation = "";
        }
        if (values.isdisabled === '1') {
            values.disbaledpercentage = "0"
        }
        if ((dateOfBirth.dateOfBirth === '') && (dojgovernmentservice.dojgovernmentservice === '')) {

            setDErrors({ ...derrors, dateOfBirth: 'please Select the date of birth!!!!', dojgovernmentservice: 'please select' })
        }
        else {
            setDErrors({ ...derrors, dateOfBirth: '', dojgovernmentservice: '' })
        }
       
        console.log("uptaded date filed...." + JSON.stringify(dateOfBirth.dateOfBirth))
        let empDetails = {
            employeeId: values.employeeId,
            name: values.name,
            surname: values.surName,
            cfmsId: values.cfmsId,
            hrmsId: values.hrmsId,
            fathername: values.fathername,
            gender: values.gender,
            caste: values.caste,
            religion: values.religion,
            maritalstatus: values.maritalstatus,
            spousename: values.spousename,
            spouseoccupation: values.spouseoccupation,
            isdisabled: values.isdisabled,
            disbaledpercentage: values.disbaledpercentage,
            dateOfBirth: moment(dateOfBirth.dateOfBirth).format("DD/MM/yyyy"),
            dojgovernmentservice: moment(dojgovernmentservice.dojgovernmentservice).format("DD/MM/yyyy"),
        };
        console.log('basic data save.....' + JSON.stringify(empDetails));
        if ((dateOfBirth.dateOfBirth !== '') && (dojgovernmentservice.dojgovernmentservice !== '')) {
            LoadingServices.basicDetailsSave(empDetails).then(res => {
                console.log(" basic sucess---" + JSON.stringify(res))
                if (res.data.scode === "01") {
                    NotificationManager.success(res.data.sdesc)
                }
                else if (res.data.scode === "02") {
                    NotificationManager.warning(res.data.sdesc)
                }
            });
        }
    }

    return (
        <>
            <div className="container-fluid row mt-3">
                <div className="inner-herbpage-service-title-sub  ">
                    <h1>Basic Details DAte</h1>

                </div>
                <Formik initialValues={data} enableReinitialize={true}
                    validationSchema={Yup.object().shape({
                        fathername: Yup.string()
                            .required("Please enter the required field")
                            .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
                        gender: Yup.string().required("Please select"),
                        dateOfBirth: Yup.string().required("Please Select"),
                        dojgovernmentservice: Yup.string().required("Please Select"),
                        caste: Yup.string().required("Please Select"),
                        religion: Yup.string().required("Please Select"),
                        isdisabled: Yup.string().required("Please Select"),
                        disbaledpercentage: Yup.string().when('isdisabled',
                            {
                                is: (isdisabled) => isdisabled !== "1" ? true : false,
                                then: Yup.string().required('disbaledpercentage is required').matches(/^\d+$/, "Please Select"),
                                oterwise: Yup.string()
                            }),
                        maritalstatus: Yup.string().required("Please Select"),
                        spousename: Yup.string().when('maritalstatus',
                            {
                                is: (maritalstatus) => maritalstatus === '2' ? true : false,
                                then: Yup.string().required('spousename is required'),
                                oterwise: Yup.string()
                            }),
                        spouseoccupation: Yup.string().when('maritalstatus',
                            {
                                is: (maritalstatus) => maritalstatus === '2' ? true : false,
                                then: Yup.string().required('spouseoccupation is required'),
                                oterwise: Yup.string()
                            }),

                    })}
                    onSubmit={(values) => {
                        empDetailsSave(values)
                    }}
                >
                    {({ errors, values, handleChange, touched, setValues, handleSubmit }) => {
                        return (
                            <form noValidate name="customForm" onSubmit={handleSubmit}>
                                <input type="text" name="cfmsId" value={cfmsId} />
                                <div>
                                    <HERBUI.Container>
                                        <HERBUI.Row>
                                            <HERBUI.Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="mb-4">
                                                {show &&
                                                    <div className="alert alert-success">
                                                        <div style={{ color: 'red' }}><b>{saveResult.sdesc}</b></div>
                                                    </div>
                                                }
                                            </HERBUI.Col>
                                        </HERBUI.Row>
                                        <HERBUI.Row>
                                            <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                                <HERBUI.InputGroup className="mb-4p5">
                                                    <span className="label-text-style"><b>Employee ID:</b></span>
                                                    <Field type="text" placeholder="Enter Employee Id" disabled={true}
                                                        name="hrmsId" maxLength="15" value={values.hrmsId}
                                                        id="hrmsId"
                                                        className={(touched.hrmsId && errors.hrmsId) ? 'form-control is-invalid' : 'form-control'} />
                                                    {touched.hrmsId && errors.hrmsId ? (
                                                        <div className="invalid-feedback">{errors.hrmsId}</div>
                                                    ) : null}
                                                </HERBUI.InputGroup>
                                            </HERBUI.Col>
                                            <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                                <HERBUI.InputGroup className="mb-4p5">
                                                    <span className="label-text-style"><b>Employee Name:</b></span>
                                                    <Field type="text" value={values?.name} maxLength="50"
                                                        placeholder="Enter Employee Name" name="name" id="name" disabled={true}
                                                        className={(touched.name && errors.name) ? 'form-control is-invalid' : 'form-control'} />
                                                    {touched.name && errors.name ? (
                                                        <div className="invalid-feedback">{errors.name}</div>
                                                    ) : null}
                                                </HERBUI.InputGroup>
                                            </HERBUI.Col>
                                            <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                                <HERBUI.InputGroup className="mb-4p5">
                                                    <span className="label-text-style"><b>SurName:</b></span>
                                                    <Field type="text" value={values?.surname} maxLength="50"
                                                        placeholder="Enter surname" name="surname" id="SurName" disabled={true}
                                                        className={(touched.surname && errors.surname) ? 'form-control is-invalid' : 'form-control'} />
                                                    {touched.surname && errors.surname ? (
                                                        <div className="invalid-feedback">{errors.surname}</div>
                                                    ) : null}
                                                </HERBUI.InputGroup>
                                            </HERBUI.Col>
                                        </HERBUI.Row>
                                        <HERBUI.Row>
                                            <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                                <HERBUI.InputGroup className="mb-4p5">
                                                    <span className="label-text-style"><b>CFMS ID:</b></span>
                                                    <Field type="text" placeholder="Enter CFMS Id" disabled={true}
                                                        name="cfmsId" maxLength="15" value={values?.cfmsId}
                                                        id="cfmsId"
                                                        className={(touched.cfmsId && errors.employeeId) ? 'form-control is-invalid' : 'form-control'} />
                                                    {touched.cfmsId && errors.cfmsId ? (
                                                        <div className="invalid-feedback">{errors.cfmsId}</div>
                                                    ) : null}
                                                </HERBUI.InputGroup>
                                            </HERBUI.Col>

                                            <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                                <HERBUI.InputGroup className="mb-4p5">
                                                    <span className="label-text-style"><b>Father Name:</b></span>
                                                    <Field type="text" value={values?.fathername}
                                                        placeholder="Enter Father Name" name="fathername" id="fathername" maxLength="50"
                                                        className={(touched.fathername && errors.fathername) ? 'form-control is-invalid' : 'form-control'} />
                                                    {touched.fathername && errors.fathername ? (
                                                        <div className="invalid-feedback">{errors.fathername}</div>
                                                    ) : null}
                                                </HERBUI.InputGroup>
                                            </HERBUI.Col>
                                            <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                                <HERBUI.Row>

                                                    {masterData && masterData.Gender.map((item) => (<HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                                        <HERBUI.InputGroup className="mb-4p5">
                                                            <span className="label-text-style"><b>{item.genderDesc}:</b></span>
                                                            <span className=" border spacer text-center">
                                                                {item.id === 1 ? <BsGenderMale className="paymentoption-icon" /> : ''}
                                                                {item.id === 2 ? <BsGenderFemale className="paymentoption-icon" /> : ''}
                                                                {item.id === 3 ? <BsGenderTrans className="paymentoption-icon" /> : ''}
                                                                <Field name=" gender"  >
                                                                    {({ field }) => (
                                                                        <input  {...field} type="radio" name="gender" id={item.id}
                                                                            value={item.id}

                                                                            checked={parseInt(values.gender) === parseInt(item.id)}>
                                                                        </input>
                                                                    )}
                                                                </Field>
                                                                {touched.gender && errors.gender ? (
                                                                    <div className="invalid-feedback">{errors.gender}</div>
                                                                ) : null}
                                                            </span>
                                                        </HERBUI.InputGroup>

                                                    </HERBUI.Col>

                                                    ))}
                                                </HERBUI.Row>
                                            </HERBUI.Col>
                                        </HERBUI.Row>
                                        <HERBUI.Row>

                                            <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                                <HERBUI.InputGroup className="mb-4p5">
                                                    <span className="label-text-style" htmlFor="caste"><b>Caste:</b></span>
                                                    <Field name="caste" >
                                                        {({ field }) => (
                                                            <select {...field} className={'form-control' + (errors.caste && touched.caste ? ' is-invalid' : '')}
                                                                value={values.caste} >
                                                                <option value="">--Select--</option>
                                                                {
                                                                    masterData &&
                                                                    masterData.Caste.map((item, i) => {
                                                                        return (
                                                                            <option key={i} value={item.id}>{item.casteDesc}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </select>
                                                        )}
                                                    </Field>
                                                    {touched.caste && errors.caste ? (
                                                        <div className="invalid-feedback">{errors.caste}</div>
                                                    ) : null}
                                                </HERBUI.InputGroup>
                                            </HERBUI.Col>
                                            <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                                <HERBUI.InputGroup className="mb-4p5">
                                                    <span className="label-text-style" htmlFor="religion"><b>Religion:</b></span>
                                                    <Field name="religion" >
                                                        {({ field }) => (
                                                            <select {...field} className={'form-control' + (errors.religion && touched.religion ? ' is-invalid' : '')}
                                                            >
                                                                <option value="">--Select--</option>
                                                                {
                                                                    masterData &&
                                                                    masterData.Religion.map((item, i) => {
                                                                        return (
                                                                            <option key={i} value={item.religioncode}>{item.description}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </select>
                                                        )}
                                                    </Field>
                                                    {touched.religion && errors.religion ? (
                                                        <div className="invalid-feedback">{errors.religion}</div>
                                                    ) : null}
                                                </HERBUI.InputGroup>
                                            </HERBUI.Col>
                                            <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                                <HERBUI.InputGroup className="mb-4p5">
                                                    <span className="label-text-style" htmlFor="maritalstatus"><b>Martial Status:</b></span>
                                                    <Field name="maritalstatus" >
                                                        {({ field }) => (
                                                            <select {...field} className={'form-control' + (errors.maritalstatus && touched.maritalstatus ? ' is-invalid' : '')}
                                                                value={values.maritalstatus} onChange={e => onChangeMartialStatus(e, field)}>
                                                                <option value="">--Select--</option>
                                                                {
                                                                    masterData &&
                                                                    masterData.MaritalStatus.map((item, i) => {
                                                                        return (
                                                                            <option key={i} value={item.statuCode}>{item.description}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </select>
                                                        )}
                                                    </Field>

                                                    {touched.maritalstatus && errors.maritalstatus ? (
                                                        <div className="invalid-feedback">{errors.maritalstatus}</div>
                                                    ) : null}
                                                </HERBUI.InputGroup>
                                            </HERBUI.Col>
                                            {(String(values?.maritalstatus) === "2") && <HERBUI.Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                                <HERBUI.InputGroup className="mb-4p5">
                                                    <span className="label-text-style"><b>Spouse Name:</b></span>
                                                    <Field type="text" placeholder="Enter Spouse Name" value={values.spousename}
                                                        value={values.spousename} maxLength={50}
                                                        name="spousename" className={(touched.spousename && errors.spousename) ? 'form-control is-invalid' : 'form-control'} />
                                                    {touched.spousename && errors.spousename ? (
                                                        <div className="invalid-feedback">{errors.spousename}</div>
                                                    ) : null}
                                                </HERBUI.InputGroup>
                                            </HERBUI.Col>
                                            }
                                            {(String(values?.maritalstatus) === "2") &&
                                                <HERBUI.Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                                    <HERBUI.InputGroup className="mb-4p5">
                                                        <span className="label-text-style" htmlFor="spouseoccupation">
                                                            <b>Spouse Occupation:</b></span>
                                                        <Field name="spouseoccupation">
                                                            {({ field }) => (
                                                                <select {...field} className={'form-control' + (errors.spouseoccupation && touched.spouseoccupation ? ' is-invalid' : '')}
                                                                    value={values.spouseoccupation}>
                                                                    <option value="">--Select--</option>
                                                                    {
                                                                        masterData &&
                                                                        masterData.SpouseOccupation.map((item, i) => {
                                                                            return (
                                                                                <option key={i} value={item.id}>{item.description}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </select>
                                                            )}
                                                        </Field>
                                                        {touched.spouseoccupation && errors.spouseoccupation ? (
                                                            <div className="invalid-feedback">{errors.spouseoccupation}</div>
                                                        ) : null}
                                                    </HERBUI.InputGroup>
                                                </HERBUI.Col>
                                            }
                                        </HERBUI.Row>
                                        <HERBUI.Row>
                                            <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                                <HERBUI.InputGroup className="mb-4p5">
                                                    <span className="label-text-style" htmlFor="isdisabled"><b>is Disabled:</b></span>
                                                    <Field name="isdisabled" disabled="true">
                                                        {({ field }) => (
                                                            <select {...field} className={'form-control' + (errors.isdisabled && touched.isdisabled ? ' is-invalid' : '')}
                                                                value={values.isdisabled}
                                                                onChange={e => {
                                                                    handleChange(e); onChangeDisabledStatus(e, field);
                                                                }}
                                                            >
                                                                <option value="">--Select--</option>
                                                                {
                                                                    masterData &&
                                                                    masterData.isDisabled.map((item, i) => {
                                                                        return (
                                                                            <option key={i} value={item.id}>{item.disabledCategory}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </select>
                                                        )}
                                                    </Field>

                                                    {touched.isdisabled && errors.isdisabled ? (
                                                        <div className="invalid-feedback">{errors.isdisabled}</div>
                                                    ) : null}
                                                </HERBUI.InputGroup>
                                            </HERBUI.Col>

                                            {((String(values?.isdisabled) !== "1") && (String(values?.isdisabled) !== "") && <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                                <HERBUI.InputGroup className="mb-4p5">
                                                    <span className="label-text-style" htmlFor="disbaledpercentage"><b> Disabled Percentage:</b></span>
                                                    <Field name="disbaledpercentage" disabled="true">
                                                        {({ field }) => (
                                                            <select {...field} className={'form-control' + (errors.disbaledpercentage && touched.disbaledpercentage ? ' is-invalid' : '')}
                                                                value={values.disbaledpercentage}
                                                            >
                                                                <option value="">--Select--</option>
                                                                {
                                                                    masterData &&
                                                                    masterData.DisabledPercentage.map((item, i) => {
                                                                        return (
                                                                            <option key={i} value={item.id}>{item.disabledPercentage}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </select>
                                                        )}
                                                    </Field>
                                                    {touched.disbaledpercentage && errors.disbaledpercentage ? (
                                                        <div className="invalid-feedback">{errors.disbaledpercentage}</div>
                                                    ) : null}
                                                </HERBUI.InputGroup>
                                            </HERBUI.Col>
                                            )}




                                            {/* <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>

                                                <HERBUI.InputGroup className="mb-4p5">
                                                    <span className="label-text-style"><b>DOB(DD/MM/YYYY):</b></span>
                                                    <DatePicker showPopperArrow={false} dateFormat="dd/MM/yyyy" showMonthDropdown
                                                        showYearDropdown
                                                        name="dateOfBirth" 
                                                        selected={dateOfBirth?.dateOfBirth}
                                                         value={dateOfBirth.dateOfBirth} maxDate={new Date()}
                                                        onChange={(date) => {
                                                            let event = { target: { name: 'dateOfBirth', value:date}};
                                                            handleChange(event);
                                                            console.log("value onChange......" + moment(date).format("DD/MM/YYYY"))
                                                            setDobDate({ ...dateOfBirth, dateOfBirth:date })
                                                            differenceInYears(moment(date).format("DD/MM/YYYY"), event.target.name);
                                                        }}
                                                       
                                                        placeholderText="Select Date"
                                                        className={(touched.dateOfBirth && errors.dateOfBirth) ? 'form-control is-invalid' : 'form-control'} />
                                                    {derrors.dateOfBirth && <small className="text-danger form-text">
                                                        {derrors.dateOfBirth}</small>}
                                                </HERBUI.InputGroup>
                                            </HERBUI.Col> */}
                                            <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>

                                                <HERBUI.InputGroup className="mb-4p5">
                                                    <span className="label-text-style"><b>DOB(DD/MM/YYYY):</b></span>
                                                    <DatePicker showPopperArrow={false}

                                                        dateFormat="dd/MM/yyyy" maxDate={new Date()}
                                                        name="dateOfBirth" showMonthDropdown
                                                        showYearDropdown
                                                        selected={dateOfBirth?.dateOfBirth}
                                                        onChange={(date) => {
                                                            let event = { target: { name: 'dateOfBirth', value: date } };
                                                            handleChange(event);
                                                            setDobDate({ ...dateOfBirth, dateOfBirth: date })
                                                            differenceInYears(moment(date).format("dd/MM/yyyy"), event.target.name);
                                                        }}
                                                        // selected={moment(dojgovernmentservice.dojgovernmentservice).format("DD/MM/YYYY")}
                                                        placeholderText="Select Date" className={(touched.dateOfBirth && errors.dateOfBirth) ? 'form-control is-invalid' : 'form-control'} />
                                                    {derrors.dateOfBirth && <small className="text-danger form-text">{derrors.dateOfBirth}</small>}

                                                </HERBUI.InputGroup>
                                            </HERBUI.Col>
                                            <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>

                                                <HERBUI.InputGroup className="mb-4p5">
                                                    <span className="label-text-style"><b>DOJ of Govt Service((DD/MM/YYYY):</b></span>
                                                    <DatePicker showPopperArrow={false}

                                                        dateFormat="dd/MM/yyyy" maxDate={new Date()}
                                                        name="dojgovernmentservice" showMonthDropdown
                                                        showYearDropdown
                                                        selected={dojgovernmentservice?.dojgovernmentservice}
                                                        onChange={(date) => {
                                                            let event = { target: { name: 'dojgovernmentservice', value: date } };
                                                            handleChange(event);
                                                            setDojGovtDate({ ...dojgovernmentservice, dojgovernmentservice: date })
                                                            differenceInYears(moment(date).format("dd/MM/yyyy"), event.target.name);
                                                        }}

                                                        // selected={moment(dojgovernmentservice.dojgovernmentservice).format("DD/MM/YYYY")}
                                                        placeholderText="Select Date" className={(touched.dojgovernmentservice && errors.dojgovernmentservice) ? 'form-control is-invalid' : 'form-control'} />
                                                    {derrors.dojgovernmentservice && <small className="text-danger form-text">{derrors.dojgovernmentservice}</small>}

                                                </HERBUI.InputGroup>
                                            </HERBUI.Col>
                                        </HERBUI.Row>
                                        <>
                                            <HERBUI.Row>
                                                <HERBUI.Col xs={12} sm={12} md={12} lg={8} xl={8} xxl={8}>

                                                    &nbsp;

                                                </HERBUI.Col>
                                                <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                                    <div className="d-grid">
                                                        <button type="submit" className="btn btn-success" >Submit</button>
                                                    </div>
                                                </HERBUI.Col>
                                            </HERBUI.Row>

                                        </>
                                    </HERBUI.Container>
                                </div>
                            </form>
                        )
                    }}
                </Formik>
            </div>
        </>

    )
}