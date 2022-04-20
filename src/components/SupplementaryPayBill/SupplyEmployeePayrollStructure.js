import React, {useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Container, Row, Button, Modal, Card, Table, Alert, Spinner } from "react-bootstrap";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SupplyPayrollService from './SupplyPayrollService';
import {Formik } from "formik";
import * as Yup from 'yup';
import Select from "react-select";
import { useHistory, useLocation } from 'react-router';
import { HiOutlineRefresh } from 'react-icons/hi';
import * as HERBUI from "react-bootstrap"
import { BiTrash, BiEdit, BiPaperclip, BiRupee, BiArrowBack, BiSave, BiPlus } from "react-icons/bi";
import { AiOutlineStop } from "react-icons/ai";


const SupplyEmployeePayrollStructure = () => {

    const location = useLocation();
    const dispatch = useDispatch();

    const [earning, setEarning] = useState({
        earningCode: '',
        earningDescription: '',
        earningAmount: '',
        attachmentForEarnings:"YES",
        allowEditForEarnings: 'YES',
        allowStopForEarnings: 'YES',
        allowDeleteForEarnings: 'YES',
        actionType: 'CREATE',
        remarks: '',
        action: 'N',
        calcType: ''
    })
    const [deduction, setDeduction] = useState({
        deductionCode: '',
        deductionDescription: '',
        deductionAmount: '',
        attachmentForDeduction:"YES",
        allowEditForDeduction: 'YES',
        allowStopForDeduction: 'YES',
        allowDeleteForDeduction: 'YES',
        actionType: 'CREATE',
        remarks: '',
        action: 'N',
        calcType: ''
    })

    const [selectedValue, setSelectedValue] = useState([]);
    const [selectedDedValue, setDedSelectedValue] = useState([]);
    const [showModal, setShow] = useState(false);
    const [showPopup, setPopup] = useState(false);
    const [showEarningAttachment, setEarningAttachment] = useState(false)
    const [earningDesc, setEarningDesc] = useState([]);
    const [deductionDesc, setDeductionDesc] = useState([]);
    const [showModalbBox, setModal] = useState(false);
    
    const [empData, setEmpData] = useState({ earnings: [earning], deductions: [deduction] });
    const [updatedEmpData, setUpdatedEmpData] = useState({ earnings: [], deductions: [] });
    
    const [noOfDaysOptions, setDayOptions] = useState([]);
    const [message, setMessage] = useState('');
    const [confirmType, setType] = useState('');
    
    const history = useHistory();
    const [confirm, showConfirm] = useState(false);
    const [selected, setSelected] = useState({});
    const [existingPayrollDays, setExistingPayrollDays] = useState('');
    const [statedData, setStateData] = useState({});
    const [loading , setLoading] = useState(false);
 
    useEffect(() => {
        setStateData(location.state);
        let params = location.state.selectedEmp;
        SupplyPayrollService.selectedEmp(params).then((res) => {
            if (res.data.SCODE === "01") {
                setEmpData(res.data)
                setExistingPayrollDays(res.data.payrollDays)
                setUpdatedEmpData(res.data)
            }

        })
        SupplyPayrollService.addEarnings().then((res) => {
            if (res.data) {
                let eOptions = []
                if (res.data.EARNINGS) {
                    eOptions = res.data.EARNINGS.map((item, i) => {
                        return (
                            { value: item.earningCode, label: item.earningCode + ' ' + item.earningDesc, name: item.earningDesc, calcType: item.calcType }
                        )
                    })
                }
                setEarningDesc(eOptions);
                let dOptions = []
                if (res.data.DEDUCTIONS) {
                    dOptions = res.data.DEDUCTIONS.map((item, i) => {
                        return (
                            { value: item.deductionCode, label: item.deductionCode + ' ' + item.deductionDesc, name: item.deductionDesc, calcType: item.calcType }
                        )
                    })
                }
                setDeductionDesc(dOptions);

            }
        })

        let noOfDays = parseInt(params.noOfworkingDays);
        let dayOptions = [];
        for (var i = 1; i <= noOfDays; i++) {
            let opt = <option key={i} value={i}>{i}</option>
            dayOptions.push(opt);
        }
        setDayOptions(dayOptions);

    }, [location])

    const handleClose = () => {
        setShow(false);
    }
    const deductionClose = () => {
        setModal(false);
    }
    const popupClose = () => {
        setPopup(false);
        setEarningAttachment(false);
    }
    const handleEarningSubmit = (values) => {

        let earnings = empData.earnings;
        let earingRec = earnings.find((item) => parseFloat(item.earningCode) === parseFloat(values.earningCode)) || null
        console.log("values..."+JSON.stringify(earnings.find((item)=>parseFloat(item.earningCode))))
        console.log("earnings..."+JSON.stringify(parseFloat(values.earningCode)))
        console.log("values.actionType...."+values.actionType)
        if (values.actionType === "UPDATE") {

            if (earingRec.action !== 'A') {
                values.action = 'E';
            }
            let index = earnings.findIndex((item) => parseFloat(item.earningCode) === parseFloat(values.earningCode)) || null;
            earnings[index] = values
        } else {
            if (earingRec !== null) {
                toast.warn("Earning already exist")
                return;
            }
            values.action = 'A';
            values.allowStopForEarnings = 'NO';
            values.attachmentForEarnings ="NO"
            earnings.push(values)
        }
        let InitialEarnings = 0;
        const data = earnings.reduce((totalEarnings, item) => totalEarnings + parseFloat(item.earningAmount), InitialEarnings);
        setEmpData({ ...empData, earnings: earnings, totalEarning: data })
        setEarning({
            earningCode: '',
            earningDescription: '',
            earningAmount: '',
            allowEditForEarnings: 'YES',
            allowStopForEarnings: 'YES',
            allowDeleteForEarnings: 'YES',
            actionType: 'CREATE',
            action: '',
            remarks: ''
        })
        handleClose()
    }
    const handleDeductionSubmit = (values) => {
        let deductions = empData.deductions;
        let deductionRec = deductions.find((item) => parseFloat(item.deductionCode) === parseFloat(values.deductionCode)) || null;
        if (values.actionType === "UPDATE") {
            if (deductionRec.action !== 'A') {
                values.action = 'E';
            }
            let index = deductions.findIndex((item) => parseFloat(item.deductionCode) === parseFloat(values.deductionCode)) || null;
            deductions[index] = values
        } else {
            // if (deductionRec !== null) {
            //     NotificationManager.warning('Deduction already exist')
            //     return;
            // }
            values.action = 'A';
            values.allowStopForDeduction = 'NO';
            values.attachmentForDeduction ="NO";
            deductions.push(values)
        }

        let InitialDeductions = 0;
        const TotalAmount = deductions.reduce((totalDeductions, item) => totalDeductions + parseFloat(item.deductionAmount), InitialDeductions);
        setEmpData({ ...empData, deductions: deductions, totalDeduction: TotalAmount })
        setDeduction({
            deductionCode: '',
            deductionDescription: '',
            deductionAmount: '',
            allowEditForDeduction: 'YES',
            allowStopForDeduction: 'YES',
            allowDeleteForDeduction: 'YES',
            actionType: 'CREATE',
            remarks: ''
        })
        deductionClose()
    }

    const onClickProceed = (event) => {
        if (confirmType === 'EARNING') {
            let earnings = empData.earnings;
            let earningRec = earnings.find(item => item.earningCode === selected.earningCode)
            if (earningRec["action"] === "S") {
                earningRec["action"] = "";
            } else {
                earningRec["action"] = "S"
            }
            earnings[earningRec] = earningRec;
            setEmpData({ ...empData, earnings: earnings })
        } else if (confirmType === "DEDUCTION") {
            let deductions = empData.deductions;
            let deductionRec = deductions.find(item => item.deductionCode === selected.deductionCode)
            if (deductionRec["action"] === "S") {
                deductionRec["action"] = "";
            } else {
                deductionRec["action"] = "S"
            }
            deductions[deductionRec] = deductionRec;
            setEmpData({ ...empData, deductions: deductions })

        }
        setSelected({})
        setMessage('');
        setType('');
        showConfirm(false);
    }

    const StopEarning = (row, index) => e => {
        let msg = "";
        if (row.action === 'S') {
            msg = "Are you sure want to enable earning?"
        } else {
            msg = "Are you sure want to stop earning?"
        }
        setSelected(row);
        setMessage(msg);
        setType('EARNING')
        showConfirm(true);
    }

    const StopDeduction = (row, index) => e => {
        let msg = "";
        if (row.action === 'S') {
            msg = "Are you sure want to enable deduction?"
        } else {
            msg = "Are you sure want to stop deduction?"
        }
        setSelected(row);
        setMessage(msg);
        setType('DEDUCTION')
        showConfirm(true);
    }

    const DeleteEarning = (row, index) => e => {
        let earnings = empData.earnings;
        earnings.pop(row)
        let InitialDeduction = 0;
        const data = earnings.reduce((totalEarnings, item) => totalEarnings + parseFloat(item.earningAmount), InitialDeduction);
        setEmpData({ ...empData, earnings: earnings, totalEarning: data })
    }
    const DeleteDeduction = (row, index) => e => {
        let deductions = empData.deductions;
        deductions.pop(row)
        let InitialDeductions = 0;
        const TotalAmount = deductions.reduce((totalDeductions, item) => totalDeductions + parseFloat(item.deductionAmount), InitialDeductions);
        setEmpData({ ...empData, deductions: deductions, totalDeduction: TotalAmount })

    }

    const EditEarning = (row, index) => {
        alert("row.calcType...."+row.calcType)
        if (row.calcType) {
            if (row.calcType !== "MANUAL") {
                toast.warn("Unable to Edit Earning" , {autoClose:false})
                return
            }
        }else{
            if(row.allowEditForEarnings === "YES"){
                row.calcType="MANUAL";
            }
        }
        setSelectedValue([{ value: row.earningCode, label: row.earningCode + ' ' + row.earningDescription, name: row.earningDescription, calcType:row.calcType}])
        row["actionType"] = "UPDATE";
        console.log("row...row..."+JSON.stringify(row))
        setEarning(row);
        setShow(true);
    }

    const EditDeduction = (row, index) => {
        if (row.calcType) {
            if (row.calcType !== "MANUAL") {
                toast.warn("Unable to Edit Deduction" , {autoClose:false})
                return
            }
        }else{
            if(row.allowEditForDeduction === "YES"){
                row.calcType = "MANUAL";
            }
        }
        setDedSelectedValue([{ value: row.deductionCode, label: row.deductionCode + ' ' + row.deductionDescription, name: row.deductionDescription, calcType: row.calcType }])
        row["actionType"] = "UPDATE";
        setDeduction(row);
        setModal(true);
    }

    const attachment =(row,index) =>{
        alert("Loading")
        setEarningAttachment(true)
        setPopup(true)
    }

    const onClickBack = () => {
        const state = statedData;
        state["isExistingData"] = true;
        dispatch({
            type: "EMPLOYEE_PAYROLL", payload: {
                isExistingData: true, filterList: state.filterList, filterData: state.filterData, filterDataOption: state.filterDataOption,
                emploayeePayrollList: state.emploayeePayrollList, year: state.selectedEmp.year, month: state.selectedEmp.month, noOfworkingDays: state.selectedEmp.noOfworkingDays, 
                updatedEmpData: updatedEmpData
            }
        })
        history.goBack();
    }

    const FnReset = () => {
        setLoading(true)
        //let params = { "cfmsId": empData.empId, "ddocode": empData.ddocode, "year": payrollData.year, "month": payrollData.month, "noOfDays": payrollData.noOfworkingDays }
        let params = location.state.selectedEmp
        console.log("####reset"+JSON.stringify(params))
        SupplyPayrollService.resetStructure(params).then((res) => {
            setLoading(false)
            if (res.data.SCODE === "01") {
                toast.success(res.data.SDESC ,{autoClose:false})
                setEmpData(res.data)
                setUpdatedEmpData(res.data)
            }
            else if (res.data.SCODE === "02") {
               toast.error(res.data.SDESC ,{autoClose:false})
                setEmpData(res.data)
            }
        }).catch((e) => {
            setLoading(false);
        });

    }

    const FnSave = () => {
        setLoading(true)
        let params = { "cfmsId": empData.empId, "ddocode": empData.ddocode, "hoa":location.state.selectedEmp.hoa , "year": location.state.selectedEmp.year, "month": location.state.selectedEmp.month }
        params["earningsList"] = empData.earnings;
        params["deductionsList"] = empData.deductions
        SupplyPayrollService.SaveStructure(params).then((res) => {
            setLoading(false)
            if (res.data.SCODE === "01") {
                toast.success(res.data.SDESC , {autoClose : false})
                setEmpData(res.data)
                setUpdatedEmpData(res.data)
                //updateEmployeeData(res.data)
            }

        }).catch((e) => {
            setLoading(false);
        });
    }

    const FnRefresh = () => {
        let params = { "cfmsId": empData.empId, "ddocode": empData.ddocode, "hoa":location.state.selectedEmp.hoa , "year": location.state.selectedEmp.year, "month": location.state.selectedEmp.month ,"noOfDays":empData.payrollDays}
        //let params = { "cfmsId": empData.empId, "ddocode": empData.ddocode, "year": payrollData.year, "month": payrollData.month, "noOfDays": empData.payrollDays }
       // let params = location.state.selectedEmp
        if (parseInt(existingPayrollDays) === parseInt(empData.payrollDays)) {
            toast.warn('Data Exisited', {autoClose : false})
        } else {
            SupplyPayrollService.resetStructure(params).then((res) => {
                if (res.data.SCODE === "01") {
                    setExistingPayrollDays(empData.payrollDays)
                    setEmpData(res.data)
                    setUpdatedEmpData(res.data)
                    toast.success(res.data.SDESC , {autoClose : false})
                } else {
                    toast.error(res.data.SDESC, {autoClose : false})
                }
            })
        }

    }

    const NETPAY = () => {
        if (empData.totalEarning > empData.totalDeduction) {
            return ((empData.totalEarning - empData.totalDeduction).toLocaleString())
        } else {
            return "NETPAY cannot be less than 0"
        }
    }


    return (
        <>

            <HERBUI.Container>
                <HERBUI.Row >
                    <HERBUI.Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="page-titlespacing">
                        <div className="inner-herbpage-service-title1">
                            <h1>Employee Payroll Summary</h1>
                        </div>
                    </HERBUI.Col>

                </HERBUI.Row>
            </HERBUI.Container>
            <Container className="outer-page-content-container ">
            <>
            {loading ?<Spinner animation="border"/>:''}
            </>
                <div className="top-button-strip">
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                            <label htmlFor="payrollDays" style={{ color: '#ffffff', float: 'left' }}>No.Of Working Days</label> 
                             <select name="payrollDays" className="form-control" onChange={(e) => setEmpData({ ...empData, payrollDays: e.target.value })} value={empData.payrollDays}>
                                {noOfDaysOptions}
                                {/* console.log("noOfDaysOptions...."+JSON.stringify(noOfDaysOptions)) */}
                            </select></Col>
                        <Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>  <br /> <Button variant="primary" style={{ float: 'left' }} onClick={FnRefresh}><HiOutlineRefresh /> Refresh Pay Bills</Button>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}> <br />
                            <Button variant="primary" onClick={FnReset} className="btn  "><HiOutlineRefresh /> Reset</Button>{' '}
                            {/* <Button variant="primary" onClick={onClickBack} className="btn  "><BiArrowBack />  Back</Button> {' '} */}
                            <Button variant="primary" onClick={onClickBack} className="btn  "><BiArrowBack />Back</Button> {' '}
                            <Button variant="success" onClick={FnSave} className="btn   "> <BiSave /> Save</Button>{' '}
                        </Col>
                    </Row>
                </div>
                <Card>
                    <Card.Body>
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={5} xl={5} xxl={5}><b>EmpInfo:</b><p>{empData.empName}({empData.empId})</p></Col>
                            <Col xs={12} sm={12} md={12} lg={5} xl={5} xxl={5}><b>OfficeName:</b><p>{empData.officeName}({empData.officeCode})</p></Col>
                            <Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}><b>Payroll Month:</b><p>{empData.month + '-' + empData.year}</p></Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={5} xl={5} xxl={5}><b>Employee Designation:</b><p>{empData.empDesignation}({empData.empDesignationCode})</p></Col>
                            <Col xs={12} sm={12} md={12} lg={5} xl={5} xxl={5}><b>DDO:</b><p>{empData.ddoDescription}({empData.ddocode})</p></Col>
                            <Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}><b>Total Payable Days:</b><p>{empData.payrollDays}</p></Col>
                        </Row>

                    </Card.Body>
                </Card>
                <br />
                <Row>
                    <Col md="6">

                        <Card >
                            <Card.Header> <b>  Earnings </b>
                                <Button className="btn btn-secondary btn-sm float-end" onClick={() => {
                                    setSelectedValue([])
                                    setEarning({
                                        earningCode: '',
                                        earningDescription: '',
                                        earningAmount: '',
                                        allowEditForEarnings: 'YES',
                                        allowStopForEarnings: 'YES',
                                        allowDeleteForEarnings: 'YES',
                                        actionType: 'CREATE',
                                        action: '',
                                        remarks: ''
                                    })
                                    setShow(true)
                                }}><BiPlus />Add Earning</Button></Card.Header>
                            <Card.Body>
                                <Table className="table  tacondensedble- table-hover table-sm" >
                                    <thead>
                                        <tr>
                                            <th>Earnings Code</th>
                                            <th>Amount</th>
                                            <th>Edit</th>
                                            <th>Stop</th>
                                            <th>Files</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       
                                        {empData.earnings.map((item, i) => (
                                            <tr key={i}>
                                                <td>{item.earningDescription + ' (' + item.earningCode + ')'}</td>
                                                <td><strong>{parseInt(item.earningAmount).toLocaleString()}</strong></td>
                                                <td><Button onClick={() => EditEarning(item, i)} disabled={item.allowEditForEarnings === "NO"} className=" btn btn-padding-reset btn-secondary btn-sm"> <BiEdit /></Button></td>
                                                <td><Button onClick={StopEarning(item, i)} disabled={item.allowStopForEarnings === "NO"} variant={item.action === 'S' ? 'danger' : 'success'} className=" btn btn-secondary btn-sm btn-padding-reset"> <AiOutlineStop /> </Button></td>
                                                <td><Button onClick={() => attachment(item,i)} disabled={item.attachmentForEarnings === "NO"} className=" btn btn-secondary btn-sm btn-padding-reset"><BiPaperclip /> </Button></td>
                                                <td><Button onClick={DeleteEarning(item, i)} disabled={item.allowDeleteForEarnings === "NO"} className=" btn btn-danger btn-sm btn-padding-reset"><BiTrash /> </Button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td><b>Total Earnings</b></td>
                                            <td style={{ fontSize: '18px' }}><strong>{parseInt(empData.totalEarning).toLocaleString()}</strong></td>
                                        </tr>
                                    </tfoot>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md="6">
                        <Card >
                            <Card.Header>
                                <b>  Deductions </b>
                                <Button className="btn btn-secondary btn-sm float-end" onClick={() => {
                                    setDedSelectedValue([])
                                    setDeduction({
                                        deductionCode: '',
                                        deductionDescription: '',
                                        deductionAmount: '',
                                        allowEditForDeduction: 'YES',
                                        allowStopForDeduction: 'YES',
                                        allowDeleteForDeduction: 'YES',
                                        actionType: 'CREATE',
                                        remarks: ''
                                    })
                                    setModal(true)
                                }}><BiPlus /> Add Deduction</Button></Card.Header>
                            <Card.Body>
                                <Table className="table table-condensed table-hover table-sm" id="deduction-table">
                                    <thead>
                                        <tr>
                                            <th>Deductions Code</th>
                                            <th>Amount</th>
                                            <th>Edit</th>
                                            <th>Stop</th>
                                            <th>Files</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {empData.deductions.map((ditem, j) => (
                                            <tr key={j}>
                                                <td>{ditem.deductionDescription + ' (' + ditem.deductionCode + ')'}</td>
                                                <td><strong>{parseInt(ditem.deductionAmount).toLocaleString()}</strong></td>
                                                <td align="center"><Button className=" btn btn-secondary btn-sm btn-padding-reset" onClick={() => EditDeduction(ditem, j)} disabled={ditem.allowEditForDeduction === "NO"}> <BiEdit /> </Button></td>
                                                <td align="center"><Button className=" btn btn-secondary btn-sm btn-padding-reset" onClick={StopDeduction(ditem, j)} disabled={ditem.allowStopForDeduction === "NO"} variant={ditem.action === 'S' ? 'danger' : 'success'}> <AiOutlineStop /> </Button></td>
                                                <td align="center"><Button className=" btn btn-secondary btn-sm btn-padding-reset" onClick={() => attachment(ditem,j)} disabled={ditem.attachmentForDeduction === "NO"}> <BiPaperclip /></Button></td>
                                                <td align="center"><Button className=" btn btn-danger btn-sm btn-padding-reset" onClick={DeleteDeduction(ditem)} disabled={ditem.allowDeleteForDeduction === "NO"}> <BiTrash /> </Button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td><b>Total Deductions</b></td>
                                            <td style={{ fontSize: '18px' }}><strong>{parseInt(empData.totalDeduction).toLocaleString()}</strong></td>
                                        </tr>
                                    </tfoot>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>&nbsp;</Col>
                    <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                        <Alert variant="default" style={{ borderradius: '0px !important' }}>
                            <Alert.Heading style={{ textAlign: 'right', fontSize: '30px' }}><small>NETPAY:</small><BiRupee />{NETPAY()}</Alert.Heading>


                        </Alert>
                    </Col>
                </Row>



            </Container>


            <Modal show={showModal} onHide={handleClose}
                // dialogClassName="modal-container"
                dialogClassName="modal-90w"
                size="lg"
                keyboard
            >
                <Modal.Header closeButton>
                    <Modal.Title>{earning.actionType === "CREATE" ? 'Add' : 'Edit'} Earning</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik initialValues={earning}
                        validationSchema={Yup.object().shape({
                            calcType: Yup.string(),
                            earningDescription: Yup.string().required('Description is required'),
                            //  earningAmount: Yup.string().required('Amount is required').matches(/^\d+$/, "Please enter valid data"),
                            remarks: Yup.string().max(500).required('Remarks is required'),
                            earningAmount: Yup.string().when('calcType',
                                {
                                    is: (calcType) => calcType === "MANUAL" ? true : false,
                                    then: Yup.string().required('Amount is required').matches(/^\d+$/, "Please enter valid data"),
                                    oterwise: Yup.string()
                                })

                        })}
                        onSubmit={(values, { resetForm }) => {
                            handleEarningSubmit(values)
                            setSelectedValue([])
                            resetForm()
                        }}>
                        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => {
                            return (
                                <form noValidate onSubmit={handleSubmit}>
                                    <input type="hidden" name="earningCode" value={values.earningCode} />
                                    <Row>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                            <label htmlFor="earningDescription">Description</label>
                                            <Select name="earningDescription" options={earningDesc}
                                                onChange={selectedOption => {
                                                    if (selectedOption !== null) {
                                                        let earingRec = empData.earnings.find((item) => parseFloat(item.earningCode) === parseFloat(selectedOption.value)) || null
                                                        if (earingRec !== null) {
                                                            toast.warn("Earning is already Exist" , {autoClose:false})
                                                            selectedOption = null
                                                        }
                                                    }
                                                    if (selectedOption !== null) {

                                                        let event = { target: { name: 'earningDescription', value: selectedOption.name } }
                                                        let event2 = { target: { name: 'earningCode', value: selectedOption.value } }
                                                        let event3 = { target: { name: 'calcType', value: selectedOption.calcType } }
                                                        let event4 = { target: { name: 'earningAmount', value: '' } }
                                                        if (selectedOption.calcType !== "MANUAL") {
                                                            let params = { "cfmsId": empData.empId, "ddocode": empData.ddocode, "earndedcode": selectedOption.value }
                                                            SupplyPayrollService.getEarningAmout(params).then(res => {
                                                                if (res.status === 200) {
                                                                    console.log("###Response" + res.data)
                                                                    event4.target.value = res.data
                                                                    console.log("###Response" + JSON.stringify(event4))
                                                                    handleChange(event4)
                                                                }
                                                            })
                                                        } else {
                                                            handleChange(event4)
                                                        }
                                                        handleChange(event)
                                                        handleChange(event2)
                                                        handleChange(event3)
                                                    }
                                                    else {
                                                        let event = { target: { name: 'earningDescription', value: '' } }
                                                        let event2 = { target: { name: 'earningCode', value: '' } }
                                                        let event3 = { target: { name: 'calcType', value: '' } }
                                                        let event4 = { target: { name: 'earningAmount', value: '' } }
                                                        handleChange(event)
                                                        handleChange(event2)
                                                        handleChange(event3)
                                                        handleChange(event4)
                                                    }

                                                    setSelectedValue(selectedOption)
                                                }}
                                                isClearable={true}
                                                isSearchable={true}
                                                value={selectedValue}
                                                error={touched.earningDescription && errors.earningDescription}
                                                isDisabled={values.actionType === "UPDATE"}
                                            />
                                            {touched.earningDescription && errors.earningDescription && <small className="text-danger form-text">{errors.earningDescription}</small>}
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                            <label htmlFor="earningAmount">Amount</label>
                                            <input type="text" name="earningAmount" className="form-control" onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={touched.earningAmount && errors.earningAmount}
                                                value={values.earningAmount} disabled={values.calcType !== "MANUAL"} />
                                            {touched.earningAmount && errors.earningAmount && <small className="text-danger form-text">{errors.earningAmount}</small>}
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                            <label htmlFor="remarks">Remarks</label>
                                            <input type="text" name="remarks" className="form-control" onChange={handleChange}
                                                error={touched.remarks && errors.remarks} value={values.remarks} />
                                            {touched.remarks && errors.remarks && <small className="text-danger form-text">{errors.remarks}</small>}
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={8} xl={8} xxl={8}>
                                            &nbsp;
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                            <br />
                                            <div className="d-grid  ">
                                                <button type="submit" className="btn btn-sm btn-primary" >{values.actionType === "CREATE" ? 'Add' : 'Update'}</button>
                                            </div>
                                        </Col>
                                    </Row>
                                </form>
                            )
                        }}
                    </Formik>
                </Modal.Body>
            </Modal>

            <Modal show={showModalbBox} onHide={deductionClose}
                // dialogClassName="modal-container"
                dialogClassName="modal-90w"
                size="lg"
                keyboard
            >
                <Modal.Header closeButton>
                    <Modal.Title>{deduction.actionType === "CREATE" ? 'Add' : 'Edit'} Deduction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik initialValues={deduction} enableReinitialize={true}
                        validationSchema={Yup.object().shape({
                            calcType: Yup.string(),
                            deductionDescription: Yup.string().max(255).required('Description is required'),
                            remarks: Yup.string().max(500).required('Remarks is required'),
                            deductionAmount: Yup.string().when('calcType',
                                {
                                    is: (calcType) => calcType === "MANUAL" ? true : false,
                                    then: Yup.string().required('Amount is required').matches(/^\d+$/, "Please enter valid data"),
                                    oterwise: Yup.string()
                                })
                        })}
                        onSubmit={(values, { resetForm }) => {
                            handleDeductionSubmit(values)
                            setDedSelectedValue([])
                            resetForm()
                        }}>
                        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => {
                            return (
                                <form noValidate onSubmit={handleSubmit}>
                                    <input type="hidden" name="deductionCode" value={values.deductionCode} />
                                    <Row>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                            <label htmlFor="deductionDescription">Description</label>
                                            <Select name="deductionDescription" options={deductionDesc}
                                                onChange={selectedOption => {
                                                    if (selectedOption !== null) {
                                                        let deductionRec = empData.deductions.find((item) => parseFloat(item.deductionCode) === parseFloat(selectedOption.value)) || null
                                                        if (deductionRec !== null) {
                                                            toast.warn("Deduction is already Exist" , {autoClose:false})
                                                            selectedOption = null
                                                        }
                                                    }
                                                    if (selectedOption !== null) {
                                                        let event = { target: { name: 'deductionDescription', value: selectedOption.name } }
                                                        let event2 = { target: { name: 'deductionCode', value: selectedOption.value } }
                                                        let event3 = { target: { name: 'calcType', value: selectedOption.calcType } }
                                                        let event4 = { target: { name: 'deductionAmount', value: '' } }
                                                        if (selectedOption.calcType !== "MANUAL") {
                                                            let params = { "cfmsId": empData.empId, "ddocode": empData.ddocode, "earndedcode": selectedOption.value }
                                                            SupplyPayrollService.getEarningAmout(params).then(res => {
                                                                if (res.status === 200) {
                                                                    console.log("###Response" + res.data)
                                                                    event4.target.value = res.data
                                                                    console.log("###Response" + JSON.stringify(event4))
                                                                    handleChange(event4)
                                                                }
                                                            })
                                                        } else {
                                                            handleChange(event4)
                                                        }
                                                        handleChange(event)
                                                        handleChange(event2)
                                                        handleChange(event3)
                                                    }
                                                    else {
                                                        let event = { target: { name: 'deductionDescription', value: '' } }
                                                        let event2 = { target: { name: 'deductionCode', value: '' } }
                                                        let event3 = { target: { name: 'calcType', value: '' } }
                                                        let event4 = { target: { name: 'deductionAmount', value: '' } }
                                                        handleChange(event)
                                                        handleChange(event2)
                                                        handleChange(event3)
                                                        handleChange(event4)
                                                    }
                                                    setDedSelectedValue(selectedOption)
                                                }}
                                                isClearable={true}
                                                isSearchable={true}
                                                value={selectedDedValue}
                                                error={touched.deductionDescription && errors.deductionDescription}
                                                isDisabled={values.actionType === "UPDATE"} />
                                            {touched.deductionDescription && errors.deductionDescription && <small className="text-danger form-text">{errors.deductionDescription}</small>}
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                            <label htmlFor="deductionAmount">Amount</label>
                                            <input type="text" name="deductionAmount" className="form-control" onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={touched.deductionAmount && errors.deductionAmount}
                                                value={values.deductionAmount} disabled={values.calcType !== "MANUAL"} />
                                            {touched.deductionAmount && errors.deductionAmount && <small className="text-danger form-text">{errors.deductionAmount}</small>}
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                            <label htmlFor="remarks">Remarks</label>
                                            <input type="text" name="remarks" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.remarks}
                                                error={touched.remarks && errors.remarks} />
                                            {touched.remarks && errors.remarks && <small className="text-danger form-text">{errors.remarks}</small>}
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={8} xl={8} xxl={8}>
                                            &nbsp;
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                            <br />
                                            <div className="d-grid  ">
                                                <button type="submit" className="btn btn-sm btn-primary" >{values.actionType === "CREATE" ? 'Add' : 'Update'}</button>
                                            </div>
                                        </Col>
                                    </Row>
                                </form>
                            )
                        }}
                    </Formik>
                </Modal.Body>
            </Modal>
            <Modal show={showPopup} onHide={popupClose}
                // dialogClassName="modal-container"
                dialogClassName="modal-90w"
                size="lg"
                keyboard
            >
                <Modal.Header closeButton>
                    <Modal.Title>File Upload</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label for="file">Upload File:</label>
                    <input type="file" />
                    <Button variant="primary">Upload</Button>
                </Modal.Body>
            </Modal>

            <Modal  onHide={popupClose}
                // dialogClassName="modal-container"
                dialogClassName="modal-90w"
                size="lg"
                keyboard
            >
                <Modal.Header>
                    <Modal.Title>File Upload</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label for="file">Upload File:</label>
                    <input type="file" />
                    <Button variant="primary">Upload</Button>
                </Modal.Body>
            </Modal>

            <Modal show={confirm} onHide={() => showConfirm(false)}
                keyboard
            >
                <Modal.Body>
                    <p>{message}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => showConfirm(false)}>
                        cancel
                    </Button>
                    <Button variant="info" onClick={(event) => onClickProceed(event)}>Proceed
                       
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer/>
        </>

    )
}
export default SupplyEmployeePayrollStructure;