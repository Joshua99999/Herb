import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik } from 'formik';
import { Col } from 'react-bootstrap';
import LoadingServices from "./LoadingServices";
import * as HERBUI from "react-bootstrap";
import Select from 'react-select';
import { useSelector } from "react-redux";
import '../../payroll.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import * as Yup from 'yup';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { FiUsers } from "react-icons/fi";
import { BiRupee } from "react-icons/bi";
import { FaWpforms } from "react-icons/fa";
import { MdRule } from "react-icons/md";


// import PDF from 'react-pdf-scroll'

function Report() {
    const [DdoList, setDdoList] = useState()
    const account = useSelector((state) => state.account);
    const [reportTypeList, setReportTypeList] = useState()
    const [monthYearList, setMonthYearList] = useState()
    const [totalNoOfPosts, setTotalNoOfPosts] = useState()
    const [totalWorking, setTotalWorking] = useState()
    const [totalGross, setTotalGross] = useState()
    const [totalDeduction, setTotalDeduction] = useState()
    const [totalNet, setTotalNet] = useState()
    const [totalEarning, setTotalEarning] = useState()
    const [totalDeductionArrayAmount, setTotalDeductionArrayAmount] = useState()
    const [viewShow, setViewShow] = useState(true)
    const [downloadShow, setDownloadShow] = useState(false)
    const [selectedDdoCode, setselectedDdoCode] = useState([]);
    const [hoaOptions, setHoaOptions] = useState()
    const [payBillProcessingData, setPayBillProcessingData] = useState();
    const [billDetailsData, setBillDetailsData] = useState();
    const [paybillSummaryView, setPayBillSummaryView] = useState(false);
    const [billDetailsView, setBillDetailsView] = useState(false);
    const [form47View, setForm47View] = useState(false);
    const [fieldOption, setFieldOption] = useState({ ddocode: null, hoa: null, monthYear: null, reportType: null })
    // const [filterData, setData] = useState({ ddocode: '' })
    const [show, setshow] = useState(false);
    const [reportData, setReportData] = useState({
        ddoCode: '',
        hoa: '',
        monthYear: '',
        reportType: ''
    })
   
    const [errors, setErrors] = useState({ ddoCode: '', hoa: '', monthYear: '', reportType: '' })
    React.useEffect(() => {
        let username = account.user.username || ''
        LoadingServices.ddoData(username).then(res => {
            if (res.data.SCODE = '01') {
                setDdoList(res.data.DDOS)
            }
        })
        LoadingServices.fectchReportTypeDetails().then(res => {
            if (res.data) {
                setReportTypeList(res.data)
            }
        })

    }, [])
    const ddoFunction = (selectedOption) => {
        if (selectedOption !== null) {
            setFieldOption({ ...fieldOption, ddocode: selectedOption })
            setselectedDdoCode(selectedOption);
            setReportData({ ...reportData, ddoCode: selectedOption })
            setErrors({ ...errors, ddoCode: '' })
            let params = { "ddocode": selectedOption.DDOCODE }
            DdoList.filter((hoaData) => hoaData.DDOCODE === selectedOption.DDOCODE).map((opt) => {
                setHoaOptions(opt.HOAS)
            })
            LoadingServices.fectchPayrollCalendarTypeDetails(params).then(res => {
                if (res.data) {
                    setMonthYearList(res.data)
                }
            })
        }
        else {
            setFieldOption({ ...fieldOption, ddocode: null })
            setErrors({ ...errors, ddoCode: 'Please select ddo code' })
        }
    }
    const monthYearChange = (selectedOption) => {
        if (selectedOption !== null) {
            setshow(false)
            setReportData({ ...reportData, monthYear: selectedOption })
            setFieldOption({ ...fieldOption, monthYear: selectedOption })
            setselectedDdoCode(selectedOption);
            setErrors({ ...errors, monthYear: '' })
        }
        else {
            // setFieldOption({ ...fieldOption, monthYear: null })
            setErrors({ ...errors, monthYear: 'Please select month year' })
        }
    }
    const reportTypeFunction = (selectedOption) => {
        if (selectedOption !== null) {
            setReportData({ ...reportData, reportType: selectedOption })
            setFieldOption({ ...fieldOption, reportType: selectedOption })
            setshow(false)
            setBillDetailsView(false)

            if (selectedOption.action === 'B') {
                setViewShow(true)
                setDownloadShow(true)
            }
            else if (selectedOption.action === 'V') {
                setViewShow(true)
                setDownloadShow(false)
            }
            else {
                setViewShow(false)
                setDownloadShow(true)
            }
            setErrors({ ...errors, reportType: '' })
        }
        else {
            setFieldOption({ ...fieldOption, ddocode: null })
            setErrors({ ...errors, ddoCode: 'Please select ddo code' })
        }
    }
    const hoaOnChange = (selectedOption) => {
        if (selectedOption !== null) {
            setReportData({ ...reportData, hoa: selectedOption.HOA })
            setFieldOption({ ...fieldOption, hoa: selectedOption.HOA })
            setErrors({ ...errors, hoa: '' })
        }
        else {
            setFieldOption({ ...fieldOption, hoa: null })
            setErrors({ ...errors, hoa: 'Please select hoa' })
        }
    }
    const submitDetails = (values) => {
        if ((reportData.hoa === '') && (reportData.ddoCode === '') && (reportData.reportType === '') && (reportData.monthYear === '')) {

            setErrors({ ...errors, hoa: "hoa is required", ddoCode: "ddoCode is required", reportType: "reportType is required", monthYear: "monthYear is required" })
        }
        else if (reportData.ddoCode === "") {
            setErrors({ ...errors, ddoCode: "ddoCode is required" })
        }
        else if ((reportData.monthYear === "") && (reportData.hoa === '') && (reportData.reportType === '')) {
            setErrors({ ...errors, monthYear: "month year is required" })
        }
        else if (reportData.hoa === "") {
            setErrors({ ...errors, hoa: "hoa is required" })
        }
        else if (reportData.monthYear === "") {
            setErrors({ ...errors, monthYear: "monthYear is required" })
        }
        else if (reportData.reportType === "") {
            setErrors({ ...errors, reportType: "reportType is required" })
        }
        if (reportData.ddoCode !== '' && reportData.hoa !== '' && reportData.monthYear !== '' && reportData.reportType !== '') {
            let params = { "ddocode": reportData.ddoCode.DDOCODE, "hoa": reportData.hoa.HOA, "year": reportData.monthYear.YEAR, "month": reportData.monthYear.MONTH }
            if (reportData.reportType.id === '5') {
                LoadingServices.fectchPayBillDetails(params).then((res) => {
                    if (res.data) {
                        setBillDetailsData(res.data)
                        setBillDetailsView(true)
                    }
                })
            }
            else {
                LoadingServices.fectchPayBillProcessingDetails(params).then(res => {
                    if (res.data.SCODE === '01') {
                        setPayBillProcessingData(res.data)
                        setshow(true)
                        const dataNoOfPosts = res.data.HOA_WISE_CADRE_STRENGTH[0].CADRE.reduce((totalData, item) => totalData + parseFloat(item.NO_OF_POSTS), 0)
                        setTotalNoOfPosts(dataNoOfPosts)
                        const dataNoOfWorking = res.data.HOA_WISE_CADRE_STRENGTH[0].CADRE.reduce((totalData, item) => totalData + parseFloat(item.WORKING), 0)
                        setTotalWorking(dataNoOfWorking)
                        const grossAmount = res.data.EMP_PAY_SUMMARY.reduce((totalData, item) => totalData + parseFloat(item.GROSS), 0)
                        setTotalGross(grossAmount);
                        const deductionAmount = res.data.EMP_PAY_SUMMARY.reduce((totalData, item) => totalData + parseFloat(item.DEDUCTION), 0)
                        setTotalDeduction(deductionAmount);
                        const netAmount = res.data.EMP_PAY_SUMMARY.reduce((totalData, item) => totalData + parseFloat(item.NET), 0)
                        setTotalNet(netAmount);
                        const earningAmount = res.data.EARNINGS_HEADS.reduce((totalData, item) => totalData + parseFloat(item.EARNING_AMOUNT), 0)
                        setTotalEarning(earningAmount);
                        const deductionArrayAmount = res.data.DEDUCTIONS_HEADS.reduce((totalData, item) => totalData + parseFloat(item.DEDUCTION_AMOUNT), 0)
                        setTotalDeductionArrayAmount(deductionArrayAmount);
                    }
                })
            }
            if (reportData.reportType.id === '2') {
                setForm47View(true)
                setPayBillSummaryView(false)
            }
            else {
                setForm47View(true)
                setPayBillSummaryView(true)
            }
        }
    }
    const downloadPdf = () => {
        console.log("report data ...."+JSON.stringify(reportData))
        let params = { "ddocode": reportData.ddoCode.DDOCODE, "hoa": reportData.hoa.HOA, "year": reportData.monthYear.YEAR, "month": reportData.monthYear.MONTH }
        console.log("params....."+JSON.stringify(params))
        let reportType = JSON.stringify(reportData.reportType.id)
        if (reportType === '1') {
            fetch(
                'http://172.16.150.149:8081/hrms/services/ddo/form47-summary-report/pdf', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params)
            }
            )
                .then((response) => response.blob())
                .then((blob) => {
                    // Create blob link to download
                    const url = window.URL.createObjectURL(
                        new Blob([blob]),
                    );
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute(
                        'download',
                        `PayBillSummary.pdf`,
                    );
                    // link.setAttribute('download',"paySummary"); // ---For downloading text double are used
                    // Append to html link element page
                    document.body.appendChild(link);
                    // Start download
                    link.click();
                    // Clean up and remove the link
                    link.parentNode.removeChild(link);
                });
        }
        else if (reportType === '3') {
            fetch(
                'http://172.16.150.149:8082/hrms/services/ddo/payslips-summary-report/pdf', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params)
            }
            )
                .then((response) => response.blob())
                .then((blob) => {
                    const url = window.URL.createObjectURL(
                        new Blob([blob]),
                    );
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute(
                        'download',
                        `PaySlip.pdf`,
                    );
                    document.body.appendChild(link);
                    link.click();
                    link.parentNode.removeChild(link);
                });
        }
        else if (reportType === '4') {
            fetch(
                'http://172.16.150.149:8082/hrms/services/ddo/subscriptions-summary-report/pdf', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params)
            }
            )
                .then((response) => response.blob())
                .then((blob) => {
                    const url = window.URL.createObjectURL(
                        new Blob([blob]),
                    );
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute(
                        'download',
                        `BillSchedules.pdf`,
                    );
                    document.body.appendChild(link);
                    link.click();
                    link.parentNode.removeChild(link);
                });
        }
        else if (reportType === '5') {
            fetch(
                'http://172.16.150.149:8082/hrms/services/ddo/hoa-billsummary-report/pdf', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params)
            }
            )
                .then((response) => response.blob())
                .then((blob) => {
                    const url = window.URL.createObjectURL(
                        new Blob([blob]),
                    );
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute(
                        'download',
                        `BillDetails.pdf`,
                    );
                    document.body.appendChild(link);
                    link.click();
                    link.parentNode.removeChild(link);
                }
                );
        }
        else if (reportType === '6') {
            fetch(
                ' http://172.16.150.149:8082/hrms/services/ddo/payslips-variation-report/pdf', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params)
            }
            )
                .then((response) => response.blob())
                .then((blob) => {
                    const url = window.URL.createObjectURL(
                        new Blob([blob]),
                    );
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute(
                        'download',
                        `variation.pdf`,
                    );
                    document.body.appendChild(link);
                    link.click();
                    link.parentNode.removeChild(link);
                });
        }
    }
    return (
        <>
            <HERBUI.Container>
                <HERBUI.Row>
                    <HERBUI.Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="page-titlespacing">
                        <div className="inner-herbpage-service-title1">
                            <h1> Report</h1>
                        </div>
                    </HERBUI.Col>
                </HERBUI.Row>
            </HERBUI.Container>
            <HERBUI.Container className="outer-page-content-container ">
                <div className="top-button-strip">
                    <HERBUI.Row>
                        <HERBUI.Col xs={12} sm={12} md={12} lg={8} xl={8} xxl={8}>
                            &nbsp;
                        </HERBUI.Col>

                        <HERBUI.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
                            <div className="d-grid gap-2">
                                {
                                    viewShow &&
                                    <button type="submit" className="btn btn-primary" onClick={submitDetails}>View</button>
                                }
                            </div>
                        </HERBUI.Col>
                        <HERBUI.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
                            <div className="d-grid gap-2">

                                {
                                    downloadShow &&
                                    <button type="submit" className="btn btn-success" onClick={downloadPdf}>Download</button>

                                }
                            </div>
                        </HERBUI.Col>
                    </HERBUI.Row>
                </div>
                <HERBUI.Row>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Formik initialValues={reportData}
                            validationSchema={Yup.object().shape({
                                ddoCode: Yup.string().required('ddoCode is required'),
                                hoa: Yup.string().required('hoa is required'),
                                monthYear: Yup.string().required('monthYear is required'),
                                reportType: Yup.string().required('reportType is required')
                            })}
                        >
                            {({ values, touched, resetForm, handleBlur, handleSubmit }) => (
                                <form onSubmit={handleSubmit}>
                                    <HERBUI.Row  >
                                        <HERBUI.Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                            <h6><b>DDO CODE</b><span className="text-danger">*</span></h6>
                                            <Select className="mb-4p5" id="ddoCode" name="ddoCode" options={DdoList} isSearchable={true} onChange={ddoFunction}
                                                isClearable={true} getOptionValue={option => option.DDOCODE}
                                                getOptionLabel={option => option.DDOCODE + "----" + option.DDODESC} required={true} />
                                            {errors.ddoCode && <small className="text-danger form-text">{errors.ddoCode}</small>}
                                        </HERBUI.Col>
                                        <HERBUI.Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                            <h6><b>HOA</b><span className="text-danger">*</span></h6>
                                            <Select
                                                id="hoa" name="hoa" isSearchable={true} isClearable={true}
                                                options={hoaOptions} getOptionValue={option => option.HOA}
                                                getOptionLabel={option => option.HOA}
                                                onChange={hoaOnChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.hoa && <small className="text-danger form-text">{errors.hoa}</small>}
                                        </HERBUI.Col>
                                        <HERBUI.Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                            <h6><b>Month Year</b><span className="text-danger">*</span></h6>
                                            <Select
                                                id="monthYear" name="monthYear" isSearchable={true} isClearable={true}
                                                options={monthYearList} getOptionValue={option => option.YEAR + "----" + option.MONTH}
                                                onChange={monthYearChange} getOptionLabel={option => option.YEAR + "----" + option.MONTH}
                                                onBlur={handleBlur}
                                            />
                                            {errors.monthYear && <small className="text-danger form-text">{errors.monthYear}</small>}
                                        </HERBUI.Col>
                                        <HERBUI.Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                            <h6><b>Report Type</b><span className="text-danger">*</span></h6>
                                            <Select
                                                id="reportType" name="reportType" isSearchable={true} isClearable={true}
                                                options={reportTypeList} getOptionValue={option => option.id}
                                                onChange={reportTypeFunction} getOptionLabel={option => option.reportName}
                                                onBlur={handleBlur}
                                            />
                                            {errors.reportType && <small className="text-danger form-text">{errors.reportType}</small>}
                                        </HERBUI.Col>
                                    </HERBUI.Row>
                                    <>
                                        <HERBUI.Row className=" mb-3">
                                            <HERBUI.Col xs={12} sm={12} md={12} lg={8} xl={8} xxl={8}>
                                                &nbsp;
                                            </HERBUI.Col>
                                            <HERBUI.Col className="mt-3" xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                                <HERBUI.Row >
                                                    <HERBUI.Col className="" xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>

                                                    </HERBUI.Col>
                                                </HERBUI.Row>
                                            </HERBUI.Col>
                                        </HERBUI.Row>
                                    </>
                                </form>
                            )}
                        </Formik>
                    </Col>
                </HERBUI.Row>
                {show &&
                    <>
                        <Tabs>
                            <TabList>
                                {
                                    paybillSummaryView &&
                                    <>
                                        <Tab><FiUsers className="tabicon" />Cadre Strength  </Tab>
                                        <Tab><BiRupee className="tabicon" /> Employees Included in Pay Bill</Tab></>
                                }
                                {form47View &&
                                    <Tab><FaWpforms className="tabicon" /> Form 47</Tab>}
                                {
                                    paybillSummaryView && <Tab><MdRule className="tabicon" /> Pay Rules</Tab>}
                            </TabList>
                            {payBillProcessingData.SCODE === '01' &&
                                <>
                                    {paybillSummaryView && <>
                                        <TabPanel>

                                            <table className="table table-bordered table-sm table-hover">
                                                <thead>
                                                    <tr><th colSpan='3'>Pay Bill Processing & Cadre Strength</th></tr>
                                                </thead>
                                                <tbody><tr>
                                                    <td>DDOCODE: {payBillProcessingData.DDOCODE}</td>
                                                    <td>Year: {payBillProcessingData.YEAR}</td>
                                                    <td>Month: {payBillProcessingData.MONTH}</td>
                                                </tr></tbody>
                                            </table>
                                            <table className="table table-bordered table-hover">
                                                <thead>
                                                    <tr><th colSpan='8'>Employees Included in Pay Bill</th></tr>
                                                    <tr>
                                                        <th>S.NO</th>
                                                        <th>Designation</th>
                                                        <th>Cadre Strength</th>
                                                        <th>No.Of Employees in Pay Bill</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        payBillProcessingData.HOA_WISE_CADRE_STRENGTH.map((arr) => arr.CADRE.map((obj, i) => {
                                                            return (
                                                                <tr key={i}>
                                                                    <td>{i + 1}</td>
                                                                    <td>{obj.POST_NAME}</td>
                                                                    <td style={{ textAlign: 'right' }}>{obj.NO_OF_POSTS}</td>
                                                                    <td style={{ textAlign: 'right' }}>{obj.WORKING}</td>
                                                                </tr>
                                                            )
                                                        }))
                                                    }
                                                    <tr>
                                                        <td colSpan='2'>Total</td>
                                                        <td style={{ textAlign: 'right' }}>{totalNoOfPosts}</td>
                                                        <td style={{ textAlign: 'right' }}>{totalWorking}</td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            {/* <DataTable plotData={datatableDetails}></DataTable> */}
                                        </TabPanel>

                                        <TabPanel>
                                            <table className="table table-bordered table-hover">
                                                <thead>
                                                    <tr><th colSpan='8'>Employees Included in Pay Bill</th></tr>
                                                    <tr>
                                                        <th>S.NO</th>
                                                        <th>CFMS ID</th>
                                                        <th>HRMS ID</th>
                                                        <th>Name</th>
                                                        <th>Designation</th>
                                                        <th>Gross</th>
                                                        <th>Deductions</th>
                                                        <th>Net</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        payBillProcessingData.EMP_PAY_SUMMARY.map((obj, i) => {
                                                            return (
                                                                <tr key={obj.CFMSID}>
                                                                    <td>{i + 1}</td>
                                                                    <td>{obj.CFMSID}</td>
                                                                    <td>{obj.HRMSID}</td>
                                                                    <td>{obj.EMPNAME}</td>
                                                                    <td>{obj.DESIGNATION}</td>
                                                                    <td>{parseInt(obj.GROSS).toLocaleString()}</td>
                                                                    <td>{parseInt(obj.DEDUCTION).toLocaleString()}</td>
                                                                    <td>{parseInt(obj.NET).toLocaleString()}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                    <tr>
                                                        <td colSpan='5'>Total</td>
                                                        <td>{parseInt(totalGross).toLocaleString()}</td>
                                                        <td>{parseInt(totalDeduction).toLocaleString()}</td>
                                                        <td>{parseInt(totalNet).toLocaleString()}</td>

                                                    </tr>
                                                </tbody>
                                            </table>
                                            {/* <DataTable plotData={datatableDetails}></DataTable> */}
                                        </TabPanel>
                                    </>}
                                </>
                            }
                            {
                                form47View &&
                                <TabPanel>
                                    <HERBUI.Row>
                                        <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4} style={{ textAlign: 'center' }}>

                                            <HERBUI.Card >
                                                <HERBUI.Card.Body>
                                                    <HERBUI.Card.Title>{parseInt(payBillProcessingData.DDO_PAY_SUMMARY.GROSS).toLocaleString()}</HERBUI.Card.Title>
                                                    <HERBUI.Card.Text>
                                                        Gross
                                                    </HERBUI.Card.Text>

                                                </HERBUI.Card.Body>
                                            </HERBUI.Card>

                                        </HERBUI.Col>
                                        <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4} className="mb-3" style={{ textAlign: 'center' }}>

                                            <HERBUI.Card >
                                                <HERBUI.Card.Body>
                                                    <HERBUI.Card.Title>{parseInt(payBillProcessingData.DDO_PAY_SUMMARY.DEDUCTION).toLocaleString()}</HERBUI.Card.Title>
                                                    <HERBUI.Card.Text>
                                                        Deductions
                                                    </HERBUI.Card.Text>

                                                </HERBUI.Card.Body>
                                            </HERBUI.Card>

                                        </HERBUI.Col>
                                        <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4} style={{ textAlign: 'center' }}>

                                            <HERBUI.Card >
                                                <HERBUI.Card.Body>
                                                    <HERBUI.Card.Title>{parseInt(payBillProcessingData.DDO_PAY_SUMMARY.NET).toLocaleString()}</HERBUI.Card.Title>
                                                    <HERBUI.Card.Text>
                                                        Net.
                                                    </HERBUI.Card.Text>

                                                </HERBUI.Card.Body>
                                            </HERBUI.Card>

                                        </HERBUI.Col>

                                    </HERBUI.Row>
                                    <HERBUI.Row>


                                        <HERBUI.Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                            <table className="table table-bordered table-sm table-hover">
                                                <thead>
                                                    <tr><th colSpan='4'>Earnings Pay Head Wise Summary</th></tr>
                                                    <tr>
                                                        <th>S.NO</th>
                                                        <th>Earning Code</th>
                                                        <th>Description</th>
                                                        <th>Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        payBillProcessingData.EARNINGS_HEADS.map((obj, i) => {
                                                            return (
                                                                <tr key={obj.EARNING_CODE}>
                                                                    <td>{i + 1}</td>
                                                                    <td>{obj.EARNING_CODE}</td>
                                                                    <td>{obj.EARNING_DESCRIPTION}</td>
                                                                    <td align="right">{parseInt(obj.EARNING_AMOUNT).toLocaleString()}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                    <tr>
                                                        <td colSpan='3'>Total</td>
                                                        <td align="right">{parseInt(totalEarning).toLocaleString()}</td>

                                                    </tr>
                                                </tbody>
                                            </table>
                                        </HERBUI.Col>
                                        <HERBUI.Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                            <table className="table table-bordered table-sm table-hover">
                                                <thead>
                                                    <tr><th colSpan='4'>Deductions Pay Head Wise Summary</th></tr>
                                                    <tr>
                                                        <th>S.NO</th>
                                                        <th>Deduction Code</th>
                                                        <th>Description</th>
                                                        <th>Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        payBillProcessingData.DEDUCTIONS_HEADS.map((obj, i) => {
                                                            return (
                                                                <tr key={obj.EARNING_CODE}>
                                                                    <td>{i + 1}</td>
                                                                    <td>{obj.DEDUCTION_CODE}</td>
                                                                    <td>{obj.DEDUCTION_DESCRIPTION}</td>
                                                                    <td align="right">{parseInt(obj.DEDUCTION_AMOUNT).toLocaleString()}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                    <tr>
                                                        <td colSpan='3'>Total</td>
                                                        <td align="right">{parseInt(totalDeductionArrayAmount).toLocaleString()}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </HERBUI.Col>
                                    </HERBUI.Row>

                                    {/* <DataTable plotData={datatableDetails}></DataTable> */}
                                </TabPanel>
                            }
                            {
                                paybillSummaryView &&
                                <TabPanel>
                                    <table className="table table-bordered table-hover">
                                        <thead>
                                            <tr><th colSpan='5'>Pay Rules</th></tr>
                                            <tr>
                                                <th>Rule Number</th>
                                                <th>Description</th>
                                                <th>Yes</th>
                                                <th>No</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                payBillProcessingData.PAYROLL_RULES.map((obj, i) => {
                                                    return (
                                                        <tr key={obj.RULE_NO}>
                                                            <td>{obj.RULE_NO}</td>
                                                            <td>{obj.RULE_DESCRIPTION}</td>
                                                            <td></td>
                                                            <td></td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </TabPanel>
                            }
                        </Tabs>
                    </>
                }
                {billDetailsView &&
                    <HERBUI.Row>
                        <Tabs>
                            <TabList>
                                <Tab> Bill Details  </Tab>
                            </TabList>
                            <TabPanel>
                                <table className="table table-bordered table-hover">
                                    <thead>
                                        <tr><th colSpan='4'>Bill Details for the month of {billDetailsData.MONTH},{billDetailsData.YEAR}</th></tr>
                                        <tr>
                                            <th>DDOCODE</th>
                                            <th>HOA</th>
                                            <th>TBR Number</th>
                                            <th>Bill Number</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{billDetailsData.DDOCODE}</td>
                                            <td>{billDetailsData.HOA}</td>
                                            <td>{billDetailsData.TRBRNO}</td>
                                            <td>{billDetailsData.BILLNO}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </TabPanel>
                        </Tabs>
                    </HERBUI.Row>
                }
            </HERBUI.Container>

        </>
    )
}
export default Report