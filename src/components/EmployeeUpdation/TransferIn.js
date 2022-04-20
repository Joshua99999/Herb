import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik, Field } from 'formik';
// import { Card, CardBody } from 'reactstrap';
import * as Yup from 'yup';
import React, { useState } from 'react'
import { Form, FormGroup, FormLabel, Card, Row, Col } from 'react-bootstrap'
import LoadingServices from './LoadingServices';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import * as HERBUI from "react-bootstrap";
import { NotificationManager } from 'react-notifications';
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";




export default function TransferIn() {
    const account = useSelector((state) => state.account);
    let username = account.user.username || ''
    const [flag1, setFlag1] = useState(false)
    const [transferInDisplayData, setTransferInDisplayData] = useState();
    const [reportTypeList, setReportTypeList] = useState();
    const [dataShow, setDataShow] = useState(false)
    const [ddoOptionsList, setDdoOptionsList] = useState()
    const [orgIdOptionsList, setOrgIdOptionsList] = useState()
    const [positionIdOptionsList, setPositionIdOptionsList] = useState()
    const [ddoDataList, setDdoDataList] = useState()
    const [orgIdDataList, setOrgIdDataList] = useState([])
    const [hoaList, setHoaList] = useState()
    const [cfmsId, setCfmsId] = useState()
    const onChangeCfmsId = (e, field) => {
        const cfmsId = e.target.value;
        field.onChange(e);
        setFlag1(true)
    }
    const onChangeHrmsId = (e, field) => {
        const hrmsId = e.target.value;
        field.onChange(e);
        setFlag1(true)
    }
    const hoaOnChange = (e, field) => {
        field.onChange(e);
        setTransferInInitialValues({ ...transferInInitialValues, hoa: e.target.value })
    }
    const positionIdOnChange = (e, field) => {
        field.onChange(e);
        setTransferInInitialValues({ ...transferInInitialValues, positionId: e.target.value })
    }
    const relievingTypeOnChange = (e, field) => {
        field.onChange(e);
        setTransferInInitialValues({ ...transferInInitialValues, relievingType: e.target.value })
    }
    const [transferInInitialValues, setTransferInInitialValues] = useState({
        ddoCode: '',
        hoa: '',
        orgId: '',
        positionId: '',
        relievingType: '',
        joiningDate: '',
    })
    const ddoFunction = (e, field) => {
        console.log("transfer in selected option....." + JSON.stringify(e.target.value))
        if (e.target.value !== null) {
            field.onChange(e);
            setTransferInInitialValues({ ...transferInInitialValues, ddoCode: e.target.value })
            let hoaOptions = ddoDataList.filter((obj) => obj.ddocode === e.target.value).map((eachObject) => eachObject.HOA.map((opt, i) => {
                return (
                    <option key={i} value={opt.hoa}>{opt.hoa}</option>
                )
            }))
            setHoaList(hoaOptions)
            let orgDataList = ddoDataList.filter((obj) => obj.ddocode === e.target.value).map((eachObject) => {
                setOrgIdDataList(eachObject.ORGS)
            })
            // setOrgIdDataList(ddoDataList.filter((obj) => obj.ddocode === e.target.value).map((eachObject) => eachObject.ORGS))
            let orgIdOptions = ddoDataList.filter((obj) => obj.ddocode === e.target.value).map((eachObject) => eachObject.ORGS.map((opt, i) => {
                return (
                    <option key={i} value={opt.orgId}>{opt.orgId + "-------" + opt.orgName}</option>
                )
            }))

            setOrgIdOptionsList(orgIdOptions)
        }
        else {
        }
    }
    const orgIdOnChange = (e, field) => {
        let orgIdVal = e.target.value
        setTransferInInitialValues({ ...transferInInitialValues, orgId: orgIdVal })
        if (orgIdVal !== null) {

            let positionIdOptions = orgIdDataList.find((someData) => someData.orgId == orgIdVal).positions || [];
            console.log("positions......" + JSON.stringify(positionIdOptions))
            let opt = positionIdOptions.map((item, i) => {
                return (
                    <option key={i} value={item.positionId}>{item.positionId + "-----" + item.positionName}</option>

                )
            })
            console.log("opt......" + JSON.stringify(opt))
            setPositionIdOptionsList(opt)
            field.onChange(e);
        }
    }
    const saveTransferInDetails = (values) => {
        console.log("values.............." + JSON.stringify(values))
        let params = {
            "cfmsId": parseInt(cfmsId), "ddocode": values.ddoCode, "orgId": parseInt(values.orgId), "positionId": parseInt(values.positionId)
            , "joiningdate": moment(values.joiningDate).format("DD/MM/YYYY"), "relievingType": parseInt(values.relievingType),
            "hoa": values.hoa, "updatedBy": parseInt(username)
        }
        console.log("params......" + JSON.stringify(params))
        //transferInSave
        LoadingServices.transferInSave(params).then((res) => {
            if (res.data) {
                if (res.data.scode === "01") {
                    NotificationManager.success(res.data.sdesc)
                }
                else if (res.data.scode === "02") {
                    NotificationManager.warning(res.data.sdesc)
                }
            }
            console.log("transfer result details....." + JSON.stringify(res))
        })
    }
    const validationSchema = Yup.object().shape({
        radioGroup: Yup.string().required()
    });
    const submitTransferDetails = (values) => {

        setCfmsId(values.employeeId)
        console.log("values in transfer in ....." + values.employeeId)
        LoadingServices.transferInDetails(values.employeeId).then((res) => {
            console.log("transfer result details....." + JSON.stringify(res))
            setTransferInDisplayData(res.data)
            if (res.data.scode === "01") {
                NotificationManager.success(res.data.sdesc)
            }
            else if (res.data.scode === "02") {
                NotificationManager.warning(res.data.sdesc)
            }
            setDataShow(true)
        })
        LoadingServices.transferInDdo(username).then((res) => {
            console.log("ddo data in transfer in ......" + JSON.stringify(res))
            setDdoDataList(res.data)
            if (res.data) {
                let ddoOptions = res.data.map((item, i) => {
                    return (
                        <option key={i} value={item.ddocode}>{item.ddocode + "--------" + item.ddodescription}</option>
                    )
                })
                setDdoOptionsList(ddoOptions)
            }
        })
        LoadingServices.transferOutType().then((res) => {
            if (res.data) {
                let options = res.data.map((item, i) => {
                    return (
                        <option key={i} value={item.actionTypeId}>{item.actionTypeDesc}</option>
                    )
                })
                setReportTypeList(options)
            }
        })
    }
    return (
        <>
            <HERBUI.Container>
                <HERBUI.Row>
                    <HERBUI.Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="page-titlespacing">
                        <div className="inner-herbpage-service-title1">
                            <h1> Transfer In</h1>
                        </div>
                    </HERBUI.Col>
                </HERBUI.Row>
            </HERBUI.Container>
            <HERBUI.Container className="outer-page-content-container ">
                <HERBUI.Row>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Formik
                            initialValues={{
                                employeeId: '',
                                cfsmsHrmsId: ''
                            }
                            }
                            validationSchema={Yup.object().shape({
                                cfsmsHrmsId: Yup.string().required("please select")
                            })}
                            onSubmit={(values, { setSubmitting }) => {
                                submitTransferDetails(values)
                                setTimeout(() => {

                                }, 1000);
                            }}
                        >
                            {({ formik, errors, values, touched, setValues, handleSubmit, resetForm, setFieldValue }) => (
                                <Form onSubmit={handleSubmit}>
                                    <div className="container py-5 px-5 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <Card className="card border-0 shadow mx-auto">
                                            <Card.Body className="card border-0 ">
                                                <h5 style={{ color: '#004687', marginRight: "85%" }} className="fw-bold">Transfer In</h5>
                                                <hr></hr>
                                                <Row className="mb-3">

                                                <FormGroup as={Col} className="py-3">
                                            <FormLabel ><h6>Type of Account:</h6></FormLabel><span className="mandatory" style={{ color: "red" }}>*</span>
                                                       {/* <RadioButtonGroup
                                                id="radioGroup"
                                                value={values.radioGroup}
                                                error={errors.radioGroup}
                                                touched={touched.radioGroup}
                                                 >
                                                <Field
                                                    component={RadioButton}
                                                    name="radioGroup"
                                                    id="cfmsId" onChange={e => onChangeCfmsId(e, field, values, setValues)}
                                                    label="CFMS ID"
                                                />
                                                <Field
                                                    component={RadioButton}
                                                    name="radioGroup"
                                                    id="hrmsId"
                                                    label="HRMS ID"  onChange={e => onChangeHrmsId(e, field, values, setValues)}
                                                />
                                            </RadioButtonGroup> */}

                                        </FormGroup>
                                                    <FormGroup className="py-3">
                                                        
                                                        <span>
                                                           
                                                            <Field name="cfmsId">
                                                        {({ field }) => (
                                                            <input {...field} type ="radio" id="cfmsId" name="cfsmsHrmsId" value="cfmsId"
                                                            onChange={e => onChangeCfmsId(e, field, values, setValues)}>
                                                            </input>
                                                        )}
                                                            </Field>
                                                        {touched.cfsmsHrmsId && errors.cfsmsHrmsId?(
                                                            <div className="invalid-feedback">{errors.cfsmsHrmsId}</div>
                                                        ): null}
                                                        </span>
                                                        <span><label>Cfms Id</label></span>
                                                        <span >
                                                            <Field name="hrmsId">
                                                                {({ field }) => (
                                                                    <input {...field} type="radio" id="hrmsId" name="cfsmsHrmsId" value="hrmsId"
                                                                        onChange={e => onChangeHrmsId(e, field, values, setValues)}>
                                                                    </input>
                                                                )}
                                                            </Field>
                                                            {touched.cfsmsHrmsId && errors.cfsmsHrmsId ? (
                                                                <div className="invalid-feedback">{errors.cfsmsHrmsId}</div>
                                                            ) : null}
                                                        </span><span><label>Hrms Id</label> </span>
                                                      </FormGroup>

                                                   
                                                </Row>
                                                
                                                <Row className="mb-3 py-2">
                                                    <FormGroup as={Col}>
                                                        {
                                                            flag1 && <>
                                                                <FormLabel ><h6>Employee Id</h6></FormLabel><span className="mandatory"
                                                                    style={{ color: "red" }}>*</span>

                                                                <div >
                                                                    <Field name="employeeId" placeholder="employeeId" className={(touched.employeeId && errors.employeeId) ? 'form-control is-invalid' : 'form-control'} type="text" />
                                                                    {touched.employeeId && errors.employeeId ? (
                                                                        <div className="invalid-feedback">{errors.employeeId}</div>
                                                                    ) : null}
                                                                </div>
                                                            </>
                                                        }
                                                    </FormGroup>
                                                </Row>
                                                <Row className=" mb-3">
                                                    <div className="form-group py-2">
                                                        <button type="submit" className="btn btn-primary" >Submit</button>
                                                        <button className="btn btn-info mx-5" type="reset" onClick={resetForm}>Clear</button>
                                                    </div>
                                                </Row>
                                            </Card.Body>

                                        </Card>
                                    </div>
                                </Form>
                            )
                            }
                        </Formik >
                    </Col>
                </HERBUI.Row>
                {dataShow &&
                    <>
                        <HERBUI.Row>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Card>
                                    <Card.Body>
                                        <Row>
                                            <Col xs={12} sm={12} md={12} lg={5} xl={5} xxl={5}><b>EmpName:</b><p>{transferInDisplayData.name} </p></Col>
                                            <Col xs={12} sm={12} md={12} lg={5} xl={5} xxl={5}><b>DOB:</b><p>{transferInDisplayData.dob} </p></Col>
                                            <Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}><b>DOJ:</b><p> {transferInDisplayData.doj}</p></Col>

                                        </Row>
                                        <Row>
                                            <Col xs={12} sm={12} md={12} lg={5} xl={5} xxl={5}><b>ORGID:</b><p>{transferInDisplayData.orgName + "(" + transferInDisplayData.orgId + ")"} </p></Col>
                                            <Col xs={12} sm={12} md={12} lg={5} xl={5} xxl={5}><b>Employee Designation(POSTID):</b><p> {transferInDisplayData.positionName + "(" + transferInDisplayData.postId + ")"}  </p></Col>
                                            <Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}><b>Position Name(position Id):</b><p> {transferInDisplayData.positionName + "(" + transferInDisplayData.postId + ")"}</p></Col>

                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </HERBUI.Row><br /><br />
                    </>
                }
                {transferInDisplayData && transferInDisplayData.scode === "01" &&
                    <HERBUI.Row>
                        <Formik
                            initialValues={
                                transferInInitialValues
                            } enableReinitialize={true}
                            validationSchema={Yup.object().shape({
                                //accountoperation: Yup.string().required(),
                                ddoCode: Yup.string().required("Please select"),
                                hoa: Yup.string().required("Please select"),
                                orgId: Yup.string().required("Please Select"),
                                positionId: Yup.string().required("Please Select"),
                                relievingType: Yup.string().required("Please Select"),
                                joiningDate: Yup.string().required("Please Select"),
                            })}
                            onSubmit={(values) => {
                                saveTransferInDetails(values)
                            }}
                        >
                            {({ errors, values, handleChange, touched, setValues, setFieldValue, handleSubmit }) => {
                                return (
                                    <form noValidate name="customForm" onSubmit={handleSubmit}>
                                        <div>
                                            <HERBUI.Container>
                                                <HERBUI.Row>
                                                    <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                                        <HERBUI.InputGroup className="mb-4p5">
                                                            <span className="label-text-style" htmlFor="caste"><b>DDOCODE:</b></span>
                                                            <Field name="ddoCode" >
                                                                {({ field }) => (
                                                                    <select {...field} className={'form-control' + (errors.ddoCode && touched.ddoCode ? ' is-invalid' : '')}
                                                                        onChange={e => ddoFunction(e, field)} >
                                                                        <option value="">--Select--</option>
                                                                        {ddoOptionsList}
                                                                    </select>
                                                                )}
                                                            </Field>
                                                            {touched.ddoCode && errors.ddoCode ? (
                                                                <div className="invalid-feedback">{errors.ddoCode}</div>
                                                            ) : null}
                                                        </HERBUI.InputGroup>
                                                    </HERBUI.Col>
                                                    <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                                        <HERBUI.InputGroup className="mb-4p5">
                                                            <span className="label-text-style" htmlFor="hoa"><b>HOA:</b></span>
                                                            <Field name="hoa" >
                                                                {({ field }) => (
                                                                    <select {...field} className={'form-control' + (errors.hoa && touched.hoa ? ' is-invalid' : '')}
                                                                        onChange={e => hoaOnChange(e, field)}>
                                                                        <option value="">--Select--</option>
                                                                        {hoaList}
                                                                    </select>
                                                                )}
                                                            </Field>
                                                            {touched.hoa && errors.hoa ? (
                                                                <div className="invalid-feedback">{errors.hoa}</div>
                                                            ) : null}
                                                        </HERBUI.InputGroup>
                                                    </HERBUI.Col>
                                                    <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                                        <HERBUI.InputGroup className="mb-4p5">
                                                            <span className="label-text-style" htmlFor="caste"><b>ORGID:</b></span>
                                                            <Field name="orgId" >
                                                                {({ field }) => (
                                                                    <select {...field} className={'form-control' + (errors.orgId && touched.orgId ? ' is-invalid' : '')}
                                                                        onChange={e => orgIdOnChange(e, field)}
                                                                    >
                                                                        <option value="">--Select--</option>
                                                                        {orgIdOptionsList}
                                                                    </select>
                                                                )}
                                                            </Field>
                                                            {touched.orgId && errors.orgId ? (
                                                                <div className="invalid-feedback">{errors.orgId}</div>
                                                            ) : null}
                                                        </HERBUI.InputGroup>
                                                    </HERBUI.Col>
                                                </HERBUI.Row>
                                                <HERBUI.Row>
                                                    <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                                        <HERBUI.InputGroup className="mb-4p5">
                                                            <span className="label-text-style" htmlFor="caste"><b>Position Id:</b></span>
                                                            <Field name="positionId" >
                                                                {({ field }) => (
                                                                    <select {...field} className={'form-control' + (errors.positionId && touched.positionId ? ' is-invalid' : '')}
                                                                        onChange={e => { positionIdOnChange(e, field) }}>
                                                                        <option value="">--Select--</option>
                                                                        {positionIdOptionsList}
                                                                    </select>
                                                                )}
                                                            </Field>
                                                            {touched.positionId && errors.positionId ? (
                                                                <div className="invalid-feedback">{errors.positionId}</div>
                                                            ) : null}
                                                        </HERBUI.InputGroup>
                                                    </HERBUI.Col>
                                                    <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                                        <HERBUI.InputGroup className="mb-4p5">
                                                            <span className="label-text-style">Relieving Type :</span>
                                                            <Field name="relievingType"  >
                                                                {({ field }) => (
                                                                    <select {...field} className="form-control" name="relievingType"
                                                                        onChange={e => relievingTypeOnChange(e, field)}
                                                                    >
                                                                        <option value="">----Select------</option>
                                                                        {reportTypeList}
                                                                    </select>
                                                                )}
                                                            </Field>
                                                            {touched.relievingType && errors.relievingType ? (
                                                                <div className="invalid-feedback">{errors.relievingType}</div>
                                                            ) : null}
                                                        </HERBUI.InputGroup>
                                                    </HERBUI.Col>
                                                    <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                                        <HERBUI.InputGroup className="mb-4p5">
                                                            <span className="label-text-style"><b>Joining Date(DD/MM/YYYY):</b></span>
                                                            <DatePicker showPopperArrow={false} dateFormat="dd/MM/yyyy"
                                                                onChange={(date) => setTransferInInitialValues({ ...transferInInitialValues, joiningDate: new Date(date) })}
                                                                selected={transferInInitialValues.joiningDate}
                                                                name="joiningDate"

                                                                placeholderText="Select Date" className={(touched.joiningDate && errors.joiningDate) ? 'form-control is-invalid' : 'form-control'} />
                                                            {touched.joiningDate && errors.joiningDate ? (
                                                                <div className="invalid-feedback">{errors.joiningDate}</div>
                                                            ) : null}
                                                        </HERBUI.InputGroup>
                                                    </HERBUI.Col>
                                                </HERBUI.Row>
                                                <HERBUI.Row>
                                                    <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                                        <HERBUI.InputGroup className="mb-4p5">
                                                            <span className="label-text-style">Upload File :</span>
                                                            <div >

                                                                <input id="file" name="file" type="file" onChange={(event) => {
                                                                    setFieldValue("file", event.currentTarget.files[0]);
                                                                }} className="form-control" />
                                                            </div>

                                                            {touched.file && errors.file ? (
                                                                <div className="invalid-feedback">{errors.file}</div>
                                                            ) : null}
                                                        </HERBUI.InputGroup>
                                                    </HERBUI.Col>
                                                </HERBUI.Row>
                                                <>
                                                    <HERBUI.Row>
                                                        <HERBUI.Col xs={12} sm={12} md={12} lg={8} xl={8} xxl={8}>
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
                    </HERBUI.Row>
                }

            </HERBUI.Container>
        </>
    )
}