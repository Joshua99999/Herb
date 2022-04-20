import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik, Field } from 'formik';
import { Form, Col, Spinner, Modal, Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import LoadingServices from "./LoadingServices";
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import * as HERBUI from "react-bootstrap";
import Select from 'react-select';
import { useSelector } from "react-redux";
import '../../payroll.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';


function DDOCode() {
    const [DdoList, setDdoList] = useState()
    const [selectedDdoCode, setselectedDdoCode] = useState([]);
    const [errors, setErrors] = useState({ ddoCode: '' })
    
    const [fieldOption, setFieldOption] = useState({ ddocode: null })
    const account = useSelector((state) => state.account);
    const [cfmsId, setCfmsId] = useState();
    const [data, setData] = React.useState({ "EMPS": [] });
    const [empShow, setEmpShow] = useState(false);
    const history = useHistory();
    const [show, setShow] = useState(false);
    const [reportTypeList, setReportTypeList] = useState();
    const [rowList, setRowList] = useState();
    const [index, setIndex] = useState();
    const handleClose = () => setShow(false);
    var valuesArray = [];
    const [loading, setLoading] = useState(false);
    let username = account.user.username || ''
    const initialValues = {
        ddocode: '',
    };
    const [transferOutInitialValues, setTransferOutInitialValues] = useState({
        relievingDate: '',
        relievingType: '',
        reason: ''
    })
    const conditionalRowStyles = [
        {
            when: row => row.POSID === 0,
            style: {
                backgroundColor: 'red'
            },
        }
    ];
    function Loading() {
        return (
            <><Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner></>
        )
    }
    function dddoCodeSubmit(cfmsid) {
        history.push({
            pathname: '/employeeHome',
            state: { employeeCfmsId: cfmsid, ddoCode: selectedDdoCode.DDOCODE }

        })

    }
    const transerOutSubmit = (row, index) => {
        setShow(true)
        setRowList(row)
        setIndex(index)
        setCfmsId(row.CFMSID)
        console.log("transfer out save ..." + JSON.stringify(row) + "...index......" + index)
    }
    const saveTranferOutValues = (values) => {
        alert("working....")
        setShow(false)
        console.log("initial values...." + JSON.stringify(transferOutInitialValues))
        let params = {
            "cfmsId": rowList.CFMSID, "orgId": rowList.ORGID, "positionId": rowList.POSID,
            "relievingDate": moment(transferOutInitialValues.relievingDate).format("DD/MM/YYYY"), "updatedby": selectedDdoCode.DDOCODE,
            "relievingType": values.relievingType, "reason": values.reason, "updatedBy": username
        }
        console.log("params......" + JSON.stringify(params))
        setCfmsId(rowList.CFMSID)

        // LoadingServices.transferOutSave(params).then((res) => {

        //     console.log("res........." + JSON.stringify(res))
        //     if (res.data.scode === "01") {
        //         NotificationManager.success(res.data.sdesc)
        //     }
        //     else {
        //         NotificationManager.warning(res.data.sdesc)
        //     }
        //     setTransferOutInitialValues({ ...transferOutInitialValues, relievingDate: '' })
        // })

        
        let dataRec = data.EMPS.find((someData) => someData.CFMSID == rowList.CFMSID) || [];
        let empdata = data.EMPS;
        //   array.splice(index, 1);
        // empdata.splice(dataIndex, 1);
        // setData({ ...data, EMPS: empdata })
        // earnings.pop(row)
        console.log("data in emp org id....." + JSON.stringify(dataRec.ORGID))
        empdata[index].ORGID = 0
        empdata[index].POSID = 0
        // empdata[index].POSNAME='NA'
        // empdata[index].ORGNAME='NA'
        setData({ ...data, EMPS: empdata })
        console.log("data emp record...." + JSON.stringify(empdata))
        setTransferOutInitialValues({ ...transferOutInitialValues, relievingDate: '' })
    }

    const columns = [
        {
            name: 'S.No',
            cell: (row, index) => index + 1,
            selector: row => row.slno,
        },
        {
            name: 'CFMSID',
            selector: row => row.CFMSID,
        },
        {
            name: 'HRMSID',
            selector: row => row.HRMSID,
            sortable: true
        },
        {
            name: 'EMPNAME',
            selector: row => row.EMPNAME,
        },
        {
            name: 'EMPSTATUS',
            selector: row => row.EMPSTATUS,
        },
        {
            name: 'ORGID',
            selector: row => row.ORGID,
        },
        {
            name: 'ORGNAME',
            selector: row => row.ORGNAME,
        },
        {
            name: 'POSID',
            selector: row => row.POSID,
        },
        {
            name: 'POSNAME',
            selector: row => row.POSNAME,
        },
        {
            name: 'Action',
            cell: (row, index) => <Button size="sm" variant="info" disabled={(row.ORGID === 0) && (row.POSID === 0)}
            onClick={() => dddoCodeSubmit(row)}><FaEdit></FaEdit></Button>,
            button: true
        },
        {
            name: 'Transfer Out',
            cell: (row, index) => <Button size="sm" variant="info" disabled={(row.ORGID === 0) && (row.POSID === 0)}
                onClick={() => transerOutSubmit(row, index)}
            ><FaEdit></FaEdit></Button>,
            button: true
        }

    ];
    React.useEffect(() => {

        LoadingServices.ddoData(username).then(res => {
            if (res.data.SCODE = '01') {
                // const options = res.data.DDOS.map(d => ({
                //     "value": d.DDOCODE,
                //     "label": d.DDOCODE + "-----" + d.DDODESC
                // }))
                setDdoList(res.data.DDOS)
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
    }, [])

    // if (error) return "Error!";
    const validationSchema = Yup.object().shape({
        // ddocode: Yup.string()
        //     .ensure()
        //     .required("Ddo Code is required!"),
    });
    const submitDetails = (values) => {
        console.log("values in ddoCode....." + JSON.stringify(selectedDdoCode))
        setLoading(true);
        if (selectedDdoCode != '') {
            LoadingServices.fectchEmployeeDetails(selectedDdoCode.DDOCODE).then(res => {
                console.log("emplopyeees array......" + JSON.stringify(res.data.EMPS))
                setData({ ...data, EMPS: res.data.EMPS })
                // valuesArray = res.data.EMPS;
                // setData(res.data.EMPS);
                setEmpShow(true);
                setLoading(false);
            })
        }

        else {
            setErrors({ ...errors, ddoCode: "Please select ddo code" })
            return;
        }

    }

    const resetDetails = (event) => {
        if (selectedDdoCode != '') {
            setFieldOption({ ...fieldOption, ddocode: null })
        }
    }

    function handleSelectChange(event) {

    }
    const ddoFunction = (selectedOption) => {
        if (selectedOption !== null) {
            setFieldOption({ ...fieldOption, ddocode: selectedOption })
            setselectedDdoCode(selectedOption);
            setErrors({ ...errors, ddoCode: '' })

        }
        else {
            setFieldOption({ ...fieldOption, ddocode: null })
            setErrors({ ...errors, ddoCode: 'Please select ddo code' })
        }
    }
    return (
        <>
            <HERBUI.Container>

                <HERBUI.Row>
                    <HERBUI.Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="page-titlespacing">
                        <div className="inner-herbpage-service-title1">
                            <h1> DDO Details</h1>
                        </div>
                    </HERBUI.Col>

                </HERBUI.Row>
            </HERBUI.Container>
            <HERBUI.Container className="outer-page-content-container ">
                <HERBUI.Row>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Formik initialValues={initialValues} validationSchema={validationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                console.log(values)
                                submitDetails()
                                setTimeout(() => {
                                }, 1000);
                            }}
                        >
                            {({ values, touched, resetForm, handleSubmit }) => (

                                <Form onSubmit={handleSubmit}>
                                    <HERBUI.Row  >
                                        <Col xs={12} sm={12} md={12} lg={10} xl={10} xxl={10}>
                                            <Select className="" options={DdoList} isSearchable={true} isClearable={true} getOptionValue={option => option.DDOCODE}
                                                required={true} onChange={ddoFunction} getOptionLabel={option => option.DDOCODE + "---" + option.DDODESC} />
                                            {errors.ddoCode && <small className="text-danger form-text">{errors.ddoCode}</small>}


                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
                                            <div className="d-grid gap-2">
                                                <button type="submit" className="btn btn-primary" >Submit</button>
                                            </div>
                                        </Col>
                                    </HERBUI.Row>

                                    {empShow &&
                                        <HERBUI.Row  >
                                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                                <div className="inner-herbpage-service-title-sub mb-4p5">
                                                    <h1>Total Employees</h1>
                                                </div>
                                                <DataTable
                                                    columns={columns}
                                                    pagination={true}
                                                    progressPending={loading}
                                                    progressComponent={<Loading />}
                                                    paginationPerPage="50"
                                                    data={data.EMPS}
                                                    keyField="CFMSID"
                                                    conditionalRowStyles={conditionalRowStyles}
                                                />
                                            </Col>
                                        </HERBUI.Row>
                                    }
                                </Form>
                            )}
                        </Formik>
                    </Col>
                </HERBUI.Row>
                <Modal
                    size="lg"
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header>
                        <Modal.Title>Transfer Out:</Modal.Title>
                    </Modal.Header>
                    <br />
                    <Modal.Body>
                        <Formik
                            initialValues={transferOutInitialValues} enableReinitialize={true}
                            validationSchema={Yup.object().shape({
                                relievingDate: Yup.string().required("Please Select the date"),
                                // relievingDate: Yup.date()
                                //     .nullable()
                                //     // .transform((curr, orig) => orig === '' ? null : curr)
                                //     .required('Mandatory field message'),
                                relievingType: Yup.string().required("Please Select"),
                                reason: Yup.string().required("please Enter")
                            })}
                            onSubmit={(values) => {
                                alert("values transfer out......" + JSON.stringify(values))
                                saveTranferOutValues(values);

                            }}
                        >
                            {({ errors, values, handleChange, touched, setValues, setFieldValue, handleSubmit }) => {
                                return (
                                    <form name="addModalForm" id="addModalForm" style={{ alignContent: 'center' }}
                                        onSubmit={handleSubmit}>
                                        {/* <input type="hidden" value={cfmsId} /> */}
                                        <center>
                                            <div>
                                                <HERBUI.Row>
                                                    <HERBUI.Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                                        <HERBUI.InputGroup className="mb-4p5">
                                                            <span className="label-text-style">Relieving Date :</span>
                                                            <DatePicker showPopperArrow={false} dateFormat="dd/MM/yyyy"
                                                                onChange={(date) => setTransferOutInitialValues({ ...transferOutInitialValues, relievingDate: new Date(date) })}
                                                                selected={transferOutInitialValues.relievingDate}
                                                                name="relievingDate"
                                                                placeholderText="Select Date" className={(touched.relievingDate && errors.relievingDate) ? 'form-control is-invalid' : 'form-control'} />
                                                            {touched.relievingDate && errors.relievingDate ? (
                                                                <div className="invalid-feedback">{errors.relievingDate}</div>
                                                            ) : null}
                                                        </HERBUI.InputGroup>
                                                    </HERBUI.Col>
                                                    <HERBUI.Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                                        <HERBUI.InputGroup className="mb-4p5">
                                                            <span className="label-text-style">Relieving Type :</span>
                                                            <Field name="relievingType" >
                                                                {({ field }) => (
                                                                    <select {...field} className={'form-control' + (errors.relievingType && touched.relievingType ? ' is-invalid' : '')}
                                                                        // onChange={e=>relievingTypeOnChange(e,field)}
                                                                        onChange={handleChange}
                                                                    >
                                                                        <option value="">--Select--</option>
                                                                        {reportTypeList}
                                                                    </select>
                                                                )}
                                                            </Field>
                                                            {/* <Field name="relievingType"  >
                                                                {({ field }) => (
                                                                    <select {...field} className="form-control" name="relievingType"
                                                                        onChange={handleChange}
                                                                    >
                                                                        <option value="">----Select------</option>
                                                                        {reportTypeList}
                                                                    </select>
                                                                )}
                                                            </Field> */}
                                                            {touched.relievingType && errors.relievingType ? (
                                                                <div className="invalid-feedback">{errors.relievingType}</div>
                                                            ) : null}
                                                        </HERBUI.InputGroup>
                                                    </HERBUI.Col>
                                                    <HERBUI.Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                                        <HERBUI.InputGroup className="mb-4p5">
                                                            <span className="label-text-style">Reason :</span>
                                                            <Field name="reason" className={'form-control' + (errors.reason && touched.reason ? ' is-invalid' : '')} placeholder="Enter Reason"
                                                                // onChange={e=>reasonOnChange(e)}
                                                                onChange={handleChange}
                                                            >

                                                            </Field>
                                                            {touched.reason && errors.reason ? (
                                                                <div className="invalid-feedback">{errors.reason}</div>
                                                            ) : null}
                                                        </HERBUI.InputGroup>
                                                    </HERBUI.Col>
                                                </HERBUI.Row>
                                            </div>
                                        </center>
                                        <Button type="submit" className="btn-primary">Save</Button>
                                        <Button variant="warning" onClick={handleClose}>Close</Button>
                                    </form>
                                )
                            }}
                        </Formik>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </HERBUI.Container>

        </>
    )
}
export default DDOCode
//test