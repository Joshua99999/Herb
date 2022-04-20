import { React, useEffect, useMemo, useState } from "react";
import { Col,Row, Button, Modal, Spinner } from "react-bootstrap";
import Select from "react-select";
import SupplyPayrollService from './SupplyPayrollService';
import '../../payroll.css';
import { MultiSelect } from "react-multi-select-component";
import Switch from "react-switch";
import { FaEye } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import * as HERBUI from "react-bootstrap"





function Loading() {
    return (
        <><Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner></>
    )
}
const SupplyEmployeePayrollFilter = () => {

    const location = useLocation();
    const dispatch = useDispatch();
    const existingData = useSelector((state) => state.payroll)
    
    const [filterList, setFilterList] = useState({ ddoOptions: [], HOAOptions: [], jobOptions: [], employeeOptions: [] })
    const [filterData, setData] = useState({ ddocode: '', HOAcode: '', jobcode: '' })
    const [filterDataOption, setDataOption] = useState({ ddocode: null, HOAcode: null, jobcode: null, selectedEmp: [] })
    const [supplyEmploayeePayrollList, setSupplyEmploayeePayrollList] = useState([]);
    const [supplyPayrollData, setSupplyPayrollData] = useState({
        "year": "",
        "month": "",
        "noOfworkingDays": "",
        "effectiveFrom": "",
        "SCODE": "",
        "SDESC": "",
        "EMPS": []
    });
    const [pending, setPending] = useState(false);
    const account = useSelector((state) => state.account);
    const [selectableRows, setselectableRows] = useState([]);
    const history = useHistory();

    const [confirm, showConfirm] = useState(false);
    const [selectedRow, setSelectedRow] = useState({});
    const [errors, setErrors] = useState({ ddoCode: '' })


    const columns = useMemo(() => [
        
        {
            name: 'SL.No',
            cell: (row, index) => index + 1,
            selector: row => row.slno,
        },
        {
            name: 'Employee Info',
            selector: row => row.empName + ' (' + row.empId + ')',
            sortable: true
        },
        {
            name: 'Office Info',
            selector: row => row.officeName + ' (' + row.HOAcode + ')'
        },
        {
            name: 'Earnings',
            selector: row => parseInt(row.totalEarning).toLocaleString(),

        },
        {
            name: 'Deduction',
            selector: row => parseInt(row.totalDeduction).toLocaleString(),

        },
        {
            name: 'Net Pay',
            selector: row => parseInt(row.netPay).toLocaleString(),

        },
        {
            name: 'Exclude',
            selector: row => row.payrollStatus,
            cell: (row, index) => <Switch id={row.empId.toString()} onChange={(checked, event) => {
                setSelectedRow(row)
                showConfirm(true)
            }} checked={row.payrollStatus === "YES" ? true : false} />,
            ignoreRowClick: true,
            allowOverflow: true
        },
        {
            name: 'No.of-Days worked',
            selector: row => row.payrollDays,
        },
        {
            name: 'Action',
            cell: (row, index) => <Button size="sm" variant="primary" onClick={() => onButtonClick(row)} disabled={row.payrollStatus === "NO"}>
                <FaEye></FaEye></Button>,
            button: true
        }
    ]);

    const onButtonClick = (row) => {
        alert("row..."+JSON.stringify(row))
        let params = { "cfmsId": row.empId, "ddocode": row.ddocode, "hoa": filterData.HOAcode, "year": supplyPayrollData.year, "month": supplyPayrollData.month,
         noOfworkingDays: supplyPayrollData.noOfworkingDays }
        let list = supplyEmploayeePayrollList;
        history.push({
            pathname: '/supplyEmployeePayroll',
            state: { selectedEmp: params, filterList, filterData, filterDataOption, emploayeePayrollList: JSON.stringify(list) }
        })
    }

    useEffect(() => {
       
        if (existingData.isExistingData === true) {
           
            setFilterList(existingData.filterList)
            setData(existingData.filterData)
            setDataOption(existingData.filterDataOption)
            setSupplyPayrollData({ ...supplyPayrollData, year: existingData.year, month: existingData.month, noOfworkingDays: existingData.noOfworkingDays })
            let updatedEmpData = existingData.updatedEmpData;
            console.log("existingData.updatedEmpData...."+JSON.stringify(existingData.updatedEmpData))
            let list = JSON.parse(existingData.emploayeePayrollList)
            console.log("existingData.updatedEmpData...."+JSON.stringify(existingData.emploayeePayrollList))
            if (updatedEmpData.empId) {
                let index = list.findIndex((emp) => parseInt(emp.empId) === parseInt(updatedEmpData.empId))
                if (index !== -1) {
                    list[index] = updatedEmpData
                }
            }
            setSupplyEmploayeePayrollList(list)
        } else {
            let username = account.user.username || ''
            SupplyPayrollService.ddoData(username).then((res) => {
                if (res.data) {
                    setFilterList({ ...filterList, ddoOptions: res.data })
                }
            })
        }
    }, [location, existingData])


    const onChangeDdo = (selectedOption) => {
       
        let options = []
        if (selectedOption !== null) {
            options = selectedOption.HOAS
            
            setDataOption({ ...filterDataOption, ddocode: selectedOption, HOAcode: null, jobcode: null })
            setData({ ...filterData, ddocode: selectedOption.DDOCODE, HOAcode: '', jobcode: '' })
            setErrors({ ...errors, ddoCode: '' })
        } else {
            setDataOption({ ...filterDataOption, ddocode: null, HOAcode: null, jobcode: null })
            setData({ ...filterData, ddocode: '', HOAcode: '', jobcode: '' })
            setErrors({ ...errors, ddoCode: 'Please select ddo code' })
        }
        setFilterList({ ...filterList, HOAOptions: options, jobOptions: [], employeeOptions: [] })

    }

    const onChangeOffice = (selectedOption) => {
        let options = []
        if (selectedOption !== null) {
            options = selectedOption.JOBS
            setDataOption({ ...filterDataOption, HOAcode: selectedOption, jobcode: null })
            setData({ ...filterData, HOAcode: selectedOption.HOA, jobcode: '' })
            setErrors({ ...errors, HOAcode: '' })
        } else {
            setDataOption({ ...filterDataOption, HOAcode: null, jobcode: null })
            setData({ ...filterData, HOAcode: '', jobcode: '' })
            setErrors({ ...errors, HOAcode: 'Please select HOA' })
        }
        setFilterList({ ...filterList, jobOptions: options, employeeOptions: [] })
    }

    const onChangeJob = (selectedOption) => {
        let empoptions = []
        if (selectedOption !== null) {
            empoptions = selectedOption.EMPS
            setDataOption({ ...filterDataOption, jobcode: selectedOption })
            setData({ ...filterData, jobcode: selectedOption.JOBID })
        } else {
            setDataOption({ ...filterDataOption, jobcode: null })
            setData({ ...filterData, jobcode: '' })
        }
        let options = empoptions.map((item) => {

            return (
                { value: item.EMPID, label: item.EMPID + ' ' + item.EMPNAME }
            )
        })
        setFilterList({ ...filterList, employeeOptions: options })
    }

    const overrideStrings = {
        "allItemsAreSelected": "All employees are selected."
    }

    const getData = (e) => {
        e.preventDefault();
        if (filterData.ddocode === '') {
            setErrors({ ...errors, ddoCode: "Please select ddo code" })
            return;
        }
        if (filterData.HOAcode === '') {
            setErrors({ ...errors, HOAcode: "Please select HOA" })
        }
        setPending(true);
        let empIds = []
        if (filterDataOption.selectedEmp.length > 0) {
            console.log("filterDataOption.selectedEmp.length...."+JSON.stringify(filterDataOption.selectedEmp.length))
            
            empIds = filterDataOption.selectedEmp.map(item => {
                 return { 
                     "cfmsId": item.value.toString()
                     } });
                     console.log("empIds...."+JSON.stringify(empIds))
        }
        SupplyPayrollService.empData({ ddocode: filterData.ddocode, hoa: filterData.HOAcode, jobId: filterData.jobcode, cfmsIdsList: empIds }).then(res => {
            if (res.status === 200) {
                setPending(false);
                let payData = res.data["PAYROLL-DATA"]
                setSupplyPayrollData(payData);
                let employees = payData.EMPS;
                console.log("##employees..." + JSON.stringify(employees))
                setSupplyEmploayeePayrollList(employees)
            }
            setPending(false);
        }).catch((error) => {
            setPending(false);
        });
    }
    const MainSubmit = () => {
        let params = { "ddocode": filterData.ddocode, "hoa": filterData.HOAcode, "year": supplyPayrollData.year, "month": supplyPayrollData.month }
        history.push({
            pathname: '/SupplyPayrollSummary',
            state: params

        })
    }
    const VerifySubmit = () => {
        alert("hello")
        let params = { "ddocode": filterData.ddocode, "hoa": filterData.HOAcode, "year": supplyPayrollData.year, "month": supplyPayrollData.month }
        SupplyPayrollService.form47(params).then(res => {
            if (res.status === 200) {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `FileName.pdf`);
                document.body.appendChild(link);
                link.click();
            }

        }).catch((error) => { })
    }

    const onClickProceed = (e) => {
        e.preventDefault();
        let excludeStatus = selectedRow.payrollStatus
        console.log("selectedRow.payrollStatus....."+JSON.stringify(selectedRow.payrollStatus))
        
        let params = { empcode: selectedRow.empId, ddocode: filterData.ddocode, hoa: filterData.HOAcode, year: supplyPayrollData.year, month: supplyPayrollData.month, exclude: excludeStatus }
        console.log("params..." + JSON.stringify(params))
        SupplyPayrollService.excludePayroll(params).then(res => {
            if (res.data.scode === "01") {
                let record = supplyEmploayeePayrollList.find((item) => item.empId === selectedRow.empId)
                // record.payrollStatus = res.data.exclude
                if (excludeStatus === "NO") {

                    record.payrollDays = supplyPayrollData.noOfworkingDays;
                    record.payrollStatus = "YES"
                } else {
                    record.payrollDays = 0;
                    record.payrollStatus = "NO"
                }
                supplyEmploayeePayrollList[record] = record
                setSupplyEmploayeePayrollList(supplyEmploayeePayrollList)
                setselectableRows([])
                toast.success(res.data.sdesc, { autoClose: false })
            }
            showConfirm(false)
        }).catch(error => {

        })
    }
    const conditionalRowStyles = [
        {
            when: row => row.payrollStatus === "NO",
            style: {
                backgroundColor: 'red'
            },
        }
    ];
    return (
        <>
            <HERBUI.Container>
                <HERBUI.Row >
                    <HERBUI.Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="page-titlespacing">
                        <div className="inner-herbpage-service-title1">
                            <h1>Supplementary Employee Payroll</h1>
                        </div>
                    </HERBUI.Col>

                </HERBUI.Row>
            </HERBUI.Container>

            <HERBUI.Container className="outer-page-content-container ">
                <form name="filterForm" onSubmit={getData}>
                    <HERBUI.Card className="p-3">
                        <Row className="mb-20">
                            <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}  >
                                <label >DDO <span className="text-danger">*</span></label>
                                <Select name="ddocode" onChange={onChangeDdo} options={filterList.ddoOptions} 
                                isSearchable={true} isClearable={true} getOptionValue={option => option.DDOCODE} getOptionLabel={option => option.DDOCODE + '  ' + option.DDODESC} value={filterDataOption.ddocode} required={true} />
                                {errors.ddoCode && <small className="text-danger form-text">{errors.ddoCode}</small>}
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6} >
                                <label>HOA <span className="text-danger">*</span></label>
                                <Select name="HOAcode" onChange={onChangeOffice} options={filterList.HOAOptions} getOptionValue={option => option.HOA} getOptionLabel={option => option.HOA} isSearchable={true} isClearable={true} value={filterDataOption.HOAcode} required={true} />
                                {errors.HOAcode && <small className="text-danger form-text">{errors.HOAcode}</small>}
                            </Col>
                        </Row>
                        <Row className="mb-20">
                            <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                <label>Job</label>
                                <Select name="jobcode" onChange={onChangeJob} options={filterList.jobOptions} getOptionValue={option => option.JOBID} getOptionLabel={option => option.JOBID + ' ' + option.JOBNAME} isSearchable={true} isClearable={true} value={filterDataOption.jobcode} />
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                <label>Employee</label>
                                <MultiSelect name="empId" options={filterList.employeeOptions} 
                                onChange={(data) => setDataOption({ ...filterDataOption, selectedEmp: data })} 
                                value={filterDataOption.selectedEmp} overrideStrings={overrideStrings} />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={8} xl={8} xxl={8}>
                                &nbsp;
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                <div className="d-grid  ">
                                    <Button type="submit" className="btn btn-primary btn-sm" variant="primary" size="sm">Get Data</Button>
                                </div>
                            </Col>
                        </Row>
                    </HERBUI.Card>
                </form>
                <div className="inner-herbpage-service-title-sub mb-4p5">
                    <h1>Total Employees</h1>
                </div>
                <DataTable

                    columns={columns}
                    pagination={true}
                    paginationPerPage="10"
                    progressPending={pending}
                    progressComponent={<Loading />}
                    persistTableHead={true}
                    data={supplyEmploayeePayrollList}
                    keyField="empId"
                    dense
                    conditionalRowStyles={conditionalRowStyles}
                />

                <Modal show={confirm} onHide={() => showConfirm(false)}
                    keyboard
                >
                    <Modal.Body>
                        <p>Are you sure want to {selectedRow.payrollStatus === "YES" ? ' exclude ' : ' Include '} pay?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => showConfirm(false)}>
                            cancel
                        </Button>
                        <Button variant="info" onClick={(event) => onClickProceed(event)}>Proceed
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* {console.log("employee payroll list......" + JSON.stringify(supplyEmploayeePayrollList))} */}
                {supplyEmploayeePayrollList && supplyEmploayeePayrollList.length > 0 &&
                    <center>
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}></Col>
                            <Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                                <div className="d-grid ">
                                    <Button onClick={MainSubmit} type="submit" className="btn  btn-sm" variant="success">Submit for Bill preparation</Button>
                                </div>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                                <div className="d-grid ">
                                    <Button onClick={VerifySubmit} className="btn  btn-sm" type="button" variant="primary">Verify Bill</Button>
                                </div>
                            </Col>
                        </Row>
                    </center>
                }
                <ToastContainer />
            </HERBUI.Container>
        </>

    )
}
export default SupplyEmployeePayrollFilter;