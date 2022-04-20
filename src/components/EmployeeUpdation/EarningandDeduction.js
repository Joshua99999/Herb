import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { Card, Modal, Button } from "react-bootstrap";
import React, { useState } from 'react'
import * as HERBUI from "react-bootstrap";
import LoadingServices from './LoadingServices';
import Select from "react-select";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import { useLocation } from 'react-router';
import { NotificationManager } from 'react-notifications';
import '../../payroll.css';
import 'react-toastify/dist/ReactToastify.css';


const EarningandDeduction = ({ data, masterData }, props) => {

    const location = useLocation();
    const [cfmsId, setCfmsId] = useState();
    const [hrmsId, setHrmsId] = useState();
    const handleClose = () => setShow(false);
    const [prcCodeList, setPrcCodeList] = useState();
    const [groupLevelList, setGroupLevelList] = useState();
    const [groupCodeList, setGroupCodeList] = useState();
    const [amountLevelList, setAmountLevelList] = useState();
    const [prcCodeValue, setPrcCodeValue] = useState();
    
    const [updatedArray, setUpdatedArray] = useState([]);
    const [updatedDeductionsArray, setUpdatedDeductionsArray] = useState([]);
    const [modalResponseDataArray, setModalResponseDataArray] = useState();

    const [earningList, setEarningList] = useState();
    const [deductionList, setDeductionList] = useState();
    const [Earndata, setEarndata] = useState([]);
    const [Deductiondata, setDeductiondata] = useState([]);
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const [selectedValue, setSelectedValue] = useState();
    const [selectedDedValue, setSelectedDedValue] = useState();
    const [modalData, setModalData] = useState({ prcCode: '', scaleCode: '', groupCode: '', levelAmount: '' })

    const [earnCalcTypeShowAmount, setEarnCalcTypeShowAmount] = useState(true);
    const [deductionCalcTypeShowAmount, setDeductionCalcTypeShowAmount] = useState(true);
    const [earnSelectShow, setEarnSelectShow] = useState(false);
    const [deductSelectShow, setDeductSelectShow] = useState(false);
    const [totalEarningSum, setTotalEarningSum] = useState();
    const [totalDeductionSum, setTotalDeductionSum] = useState();
    const [ddoCode, setDdoCode] = useState();
    const [value, setValue] = useState();

    const changeEarningAmount = (e, earningCode, i) => {
        var { name, value } = e.target;

        console.log("earningCode. @@..." + earningCode)

        let earnings = [...data.EarnDeductionsSummary[0].earnings];
        let index = earnings.findIndex(ear => ear.earningCode === earningCode);
        let earningREc = earnings.find(ear => ear.earningCode === earningCode)
        earningREc.earningAmount = value;
        setValue(earningREc.earningAmount);

        if (String(earningREc.earningAmount) == '') {
            NotificationManager.warning("Earning  should not be empty")
            return;
        }
        const totalData = data.EarnDeductionsSummary[0].earnings.reduce((totalEarnings, item) => totalEarnings + parseFloat(item.earningAmount), 0);
        setTotalEarningSum(totalData)
    }

    const changeDeductionAmount = (e, deductionCode, i) => {
        var { name, value } = e.target;
        let deductions = [...data.EarnDeductionsSummary[0].deductions];
        let index = deductions.findIndex(ear => ear.deductionCode === deductionCode);
        let deductionREc = deductions.find(ear => ear.deductionCode === deductionCode)
        deductionREc.deductionAmount = value;
        setValue(deductionREc.deductionAmount);
        if (String(deductionREc.deductionAmount) == '') {
            NotificationManager.warning("deduction should not be empty")
            return;
        }

        const totalDataDeduction = data.EarnDeductionsSummary[0].deductions.reduce((totalDeductions, item) => totalDeductions + parseFloat(item.deductionAmount), 0)
        setTotalDeductionSum(totalDataDeduction)
    }

    const formInitialValues = {
        prccode: data.postDetails[0].prccode, payscalelevel: data.postDetails[0].payscalelevel,
        payscalegroup: data.postDetails[0].payscalegroup

    }

    const [earning, setEarning] = useState({
        earningCode: '',
        earningDescription: '',
        isEditable: 'N',
        earningAmount: ''

    })
    const [deduction, setDeduction] = useState({
        deductionCode: '',
        deductionDescription: '',
        isEditable: 'N',
        deductionAmount: ''


    })
    const earnindDeductionSave = () => {

        let params = {
            "cfmsId": cfmsId, "ddoCode": ddoCode, "prccode": data.postDetails[0].prccode,
            "payscalegroup": data.postDetails[0].payscalegroup,
            "payscalelevel": data.postDetails[0].payscalelevel, "serviceType": "MASTER"
        }

        console.log("params..." + JSON.stringify(params))
        params["earnings"] = data.EarnDeductionsSummary[0].earnings;
        params["deductions"] = data.EarnDeductionsSummary[0].deductions
        LoadingServices.postEarnDetails(params).then((res) => {
            if (res.data.SCODE === "01") {
                NotificationManager.success(res.data.SDESC)
            }
        })
    }

    const checkSelectedValue = (selectedValue) => {
        setEarning({ ...earning, earningAmount: '' })
        setEarnCalcTypeShowAmount(true);
        var selectedValue = selectedValue;
        if (data.EarnDeductionsSummary[0].earnings.some(item => selectedValue.value === item.earningCode)) {
            NotificationManager.warning('Earning already exist')
            selectedValue = ''
        }
        else {
            setEarnSelectShow(false)
            let selectedValueCalType = Earndata.filter((somedata) => somedata.earningCode === selectedValue.value);

            if (selectedValueCalType[0].calcType == 'MANUAL') {
                setEarnCalcTypeShowAmount(false);
            }
            else {
                if ((selectedValueCalType[0].calcType !== "MANUAL") && (selectedValueCalType[0].calcType !== "DERIVED")) {
                    let earningAmountparams = { "cfmsId": cfmsId, "ddocode": ddoCode, "earndedcode": selectedValueCalType[0].earningCode, "serviceType": "MASTER" }
                    console.log("earningAmountparams...." + JSON.stringify(earningAmountparams))
                    LoadingServices.addButtonEarningAmount(earningAmountparams).then((res) => {
                       setEarning({ ...earning, earningCode: selectedValue.value, earningDescription: selectedValue.name, earningAmount: res.data })
                        console.log("earning....earning....earning..." + JSON.stringify(earning))
                    })
                }
                setEarnCalcTypeShowAmount(true);
            }
        }
        return selectedValue;
    }
   

    const checkDeductionSelectedValue = (selectedDedValue) => {
     // setDeduction({ ...deduction, deductionAmount: '' })
        setDeductionCalcTypeShowAmount(true);
        var selectedDedValue = selectedDedValue;
        if (data.EarnDeductionsSummary[0].deductions.some(item => selectedDedValue.value === item.deductionCode)) {
            NotificationManager.warning('Deduction already exist')
            selectedDedValue = ''
        }
        else {
            setDeductSelectShow(false)
            let selectedValueCalType = Deductiondata.filter((somedata) => somedata.deductionCode === selectedDedValue.value);
            if (selectedValueCalType[0].calcType == 'MANUAL') {
                setDeductionCalcTypeShowAmount(false);
            }
            else {
                if ((selectedValueCalType[0].calcType !== "MANUAL") && (selectedValueCalType[0].calcType !== "DERIVED")) {
                    let deductionAmountparams = { "cfmsId": cfmsId, "ddocode": ddoCode, "earndedcode": selectedValueCalType[0].deductionCode, "serviceType": "MASTER" }
                    console.log("deductionAmountparams..." + JSON.stringify(deductionAmountparams))
                    LoadingServices.addButtonEarningAmount(deductionAmountparams).then((res) => {
                        console.log("  result...." + JSON.stringify(res.data))
                        let amountRes=res.data
                        console.log("deductionAmountparams  result...." + amountRes)
                       
                        setDeduction({ ...deduction, deductionAmount: res.data })

                    })
                }
                setDeductionCalcTypeShowAmount(true);
            }
        }
        
        return selectedDedValue;
    }


    const saveEarnings = (values) => {
        data.EarnDeductionsSummary[0].earnings.push(values)
        let sum = data.EarnDeductionsSummary[0].earnings.map((earnData) => earnData.earningAmount)
        let InitialEarnings = 0;
        const totalData = sum.reduce((totalEarnings, item) => totalEarnings + parseFloat(item), InitialEarnings);
        setTotalEarningSum(totalData)
        setEarning({ ...earning, earningAmount: '' })
    }

    const saveDeductions = (values) => {
        data.EarnDeductionsSummary[0].deductions.push(values)
        let sum = data.EarnDeductionsSummary[0].deductions.map((deductionData) => deductionData.deductionAmount)
        let InitialDeductions = 0;
        const totalData = sum.reduce((totalDeductions, item) => totalDeductions + parseFloat(item), InitialDeductions)
        setTotalDeductionSum(totalData)
        setDeduction({ ...deduction, deductionAmount: '' })
    }


    const getPrcCodeList = (e, field, touched) => {
        var prcCodeValueTarget = e.target.value;
        field.onChange(e)
        setGroupCodeList([]);
        setAmountLevelList([]);
        if (prcCodeValueTarget !== '') {
            field.onChange(e);
            LoadingServices.fectchEarnDeductionGroupDetails(prcCodeValueTarget).then(res => {
                if (res.data) {
                    setGroupLevelList(res.data)
                    let options = res.data.map((item, i) => {
                        return (
                            <option key={i} value={item.GroupName}>{item.GroupName}</option>
                        )
                    });
                    setGroupCodeList(options)

                }
            })
        }
        setPrcCodeValue(prcCodeValueTarget);

    }

    const groupCodeDispaly = (e, field) => {
        var groupCode = e.target.value;
        field.onChange(e);
        setModalData({ ...modalData, groupCode: groupCode, levelAmount: '' })
        setAmountLevelList([]);
        let options = groupLevelList.find((item) => item.GroupName === groupCode).Levels.map((varamount, i) => {
            return (
                <option key={i} value={varamount.payscalelevel}>{varamount.amount}</option>
            )
        });

        setAmountLevelList(options);
    }
    const levelAmountDispaly = (e, setFieldValue) => {
        var levelAmountVal = e.target.value;
        setFieldValue("payscalelevel", levelAmountVal)
    }
    React.useEffect(() => {
        const totalData = data.EarnDeductionsSummary[0].earnings.reduce((totalEarnings, item) => totalEarnings + parseFloat(item.earningAmount), 0);
        setTotalEarningSum(totalData)

        const totalDataDeduction = data.EarnDeductionsSummary[0].deductions.reduce((totalDeductions, item) => totalDeductions + parseFloat(item.deductionAmount), 0)
        setTotalDeductionSum(totalDataDeduction)

        let cfmsId = location.state.employeeCfmsId.CFMSID
        setCfmsId((cfmsId))

        let hrmsId = location.state.employeeCfmsId.HRMSID
        setHrmsId(hrmsId);

        let ddoCode = location.state.ddoCode
        setDdoCode(ddoCode)

        LoadingServices.fectchPrcCodeDetails().then(res => {
            if (res.data) {
                let options = res.data.map((someData, i) => {
                    return (
                        <option key={i} value={someData.prccode}>{someData.prcdescription}</option>
                    )
                })

                setPrcCodeList(options);
            }
        },
            LoadingServices.fectchEarningsDetails().then(res => {
                if (res.data.EARNINGS) {
                    const options = res.data.EARNINGS.map(d => ({
                        "value": d.earningCode,
                        "label": d.earningCode + "-----" + d.earningDesc,
                        "name": d.earningDesc
                    }))
                    setEarningList(options);
                    setEarndata(res.data.EARNINGS)
                }
                if (res.data.DEDUCTIONS) {
                    const options = res.data.DEDUCTIONS.map(d => ({
                        "value": d.deductionCode,
                        "label": d.deductionCode + "-----" + d.deductionDesc,
                        "name": d.deductionDesc
                    }))
                    setDeductionList(options);
                    setDeductiondata(res.data.DEDUCTIONS)
                }
            }),

        )

    },
        [data])

    const onOpenModal = (empEarn) => {
        let prcCodeValue = data.postDetails[0].prccode
        setGroupCodeList([]);
        setAmountLevelList([]);

        if (prcCodeValue !== '') {
            let groupCode = data.postDetails[0].payscalegroup
            LoadingServices.fectchEarnDeductionGroupDetails(prcCodeValue).then(res => {
                if (res.data) {
                    setGroupLevelList(res.data)
                    let groupData = res.data;
                    let options = res.data.map((item, i) => {
                        return (
                            <option key={i} value={item.GroupName}>{item.GroupName}</option>
                        )
                    });
                    setGroupCodeList(options)
                    let levels = groupData.find((item) => item.GroupName === groupCode).Levels || [];
                    let leveloptions = levels.map((varamount, i) => {
                        return (
                            <option key={i} value={varamount.payscalelevel}>{varamount.amount}</option>
                        )
                    });
                    setAmountLevelList(leveloptions);
                }
            })

        }
        setShow(true)

    }
    const saveModalPopUpDetails = (values) => {
        let modalPopupDetails = {
            cfmsId: cfmsId,
            prccode: values.prccode,
            payscalegroup: values.payscalegroup,
            payscalelevel: values.payscalelevel,
        };
        console.log('apshcl=>' + JSON.stringify(modalPopupDetails));
        LoadingServices.modalPopupSave(modalPopupDetails).then(res => {

            if (res.data != '') {
                setModalResponseDataArray(res.data);
                data.postDetails[0].prccode = res.data.prccode;
                data.postDetails[0].payscalegroup = res.data.payscalegroup;
                data.postDetails[0].payscalelevel = res.data.payscalelevel;
                data.EarnDeductionsSummary[0].earnings = res.data.earnings;
                data.EarnDeductionsSummary[0].deductions = res.data.deductions;

                setUpdatedArray(res.data.earnings)
                const totalData = data.EarnDeductionsSummary[0].earnings.reduce((totalEarnings, item) => totalEarnings + parseFloat(item.earningAmount), 0);
                setTotalEarningSum(totalData)

                setUpdatedDeductionsArray(res.data.deductions)
                const totalDataDeduction = data.EarnDeductionsSummary[0].deductions.reduce((totalDeductions, item) => totalDeductions + parseFloat(item.deductionAmount), 0)
                setTotalDeductionSum(totalDataDeduction)


            }
        });
        if (updatedArray != '') {
            data.EarnDeductionsSummary[0].earnings = updatedArray;
            data.EarnDeductionsSummary[0].deductions = updatedDeductionsArray;
        }
        setShow(false)
    }

    return (
        <div className="container-fluid row mt-3">
            <HERBUI.Row className=" mb-3">
                <HERBUI.Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                    <HERBUI.Card  >
                        <Card.Body>
                            <Card.Title>
                                <div className="inner-herbpage-service-title-sub-np ">
                                    <h1 className="pt-oo">Earnings</h1>
                                </div>
                            </Card.Title>
                            <Formik enableReinitialize={true}
                                initialValues={earning}
                                validationSchema={Yup.object().shape({
                                    earningCode: Yup.string().required('Earning is required'),
                                    earningAmount: Yup.string().required('Amount is required').matches(/^\d+$/, "Please enter valid data"),

                                })}
                                onSubmit={(values, { resetForm }) => {
                                    saveEarnings(values);
                                    setSelectedValue([])
                                    resetForm();
                                }}
                            >
                                {({ errors, handleChange, handleSubmit, touched, values }) => {
                                    return (

                                        <form name="addEarningForm" id="addEarningForm" noValidate style={{ alignContent: 'center' }}
                                            onSubmit={handleSubmit}>
                                            <HERBUI.Row  >
                                                <HERBUI.Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                                    <Select className="mb-4p5" options={earningList} style={{ zindex: '3' }} name="earningCode" id="earningCode"
                                                        onChange={selectedOption => {

                                                            if (selectedOption !== null) {
                                                                console.log("selected option" + JSON.stringify(selectedOption))
                                                                let checkResult = checkSelectedValue(selectedOption)

                                                                if (checkResult !== '') {
                                                                    let event = { target: { name: 'earningDescription', value: selectedOption.name } }
                                                                    let event2 = { target: { name: 'earningCode', value: selectedOption.value } }
                                                                    handleChange(event)
                                                                    handleChange(event2)
                                                                }
                                                                else {
                                                                    selectedOption = '';
                                                                }

                                                            } else {
                                                                setEarnSelectShow(false)
                                                                let event = { target: { name: 'earningDescription', value: '' } }
                                                                let event2 = { target: { name: 'earningCode', value: '' } }
                                                                handleChange(event)
                                                                handleChange(event2)
                                                            }
                                                            setSelectedValue(selectedOption)
                                                        }}
                                                        value={selectedValue}
                                                        isSearchable={true}
                                                        isClearable={true} getOptionValue={option => option.value}
                                                        required={true} error={touched.earningCode && errors.earningCode} />
                                                    {touched.earningCode && errors.earningCode &&
                                                        <b><small className="text-danger form-text">{errors.earningCode}</small></b>}
                                                </HERBUI.Col>



                                            </HERBUI.Row><br />
                                            <HERBUI.Row>
                                                <HERBUI.Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                                    <HERBUI.InputGroup className="mb-4p5">
                                                        <span className="label-text-style"><b>Amount: </b></span>
                                                        <Field type="text" disabled={earnCalcTypeShowAmount}
                                                            placeholder="Enter Amount" name="earningAmount" id="earningAmount"
                                                            className={'form-control form-control-sm'} error={touched.earningAmount && errors.earningAmount} />
                                                        <button className="btn btn-primary">Add </button>
                                                    </HERBUI.InputGroup>
                                                    {touched.earningAmount && errors.earningAmount && <b><small className="text-danger form-text">{errors.earningAmount}</small></b>}
                                                </HERBUI.Col>
                                            </HERBUI.Row>
                                        </form>
                                    );
                                }}
                            </Formik>

                            <HERBUI.Row  >
                                <HERBUI.Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <table className="table table-bordered table-hover table-sm">
                                        <thead>
                                            <tr>
                                                <th colSpan="2">Earnings</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.EarnDeductionsSummary[0] && data.EarnDeductionsSummary[0].earnings.map((empEarn, i) => {
                                                if (empEarn.earningCode === '1001') {
                                                    return (
                                                        <tr key={i}>
                                                            <td>{empEarn.earningCode} <BsArrowRight />&nbsp; {empEarn.earningDescription}</td>
                                                            <td>
                                                                <input type="hidden" value={empEarn.earningCode} />
                                                                <input type="hidden" value={empEarn.earningAmount} />
                                                                <HERBUI.InputGroup  >
                                                                    <HERBUI.FormControl
                                                                        type="text" name="earningAmount"
                                                                        disabled={true} className="form-control-sm"
                                                                        value={empEarn.earningAmount}
                                                                    />
                                                                    <button className="btn btn-primary" onClick={() => onOpenModal(empEarn)}>  <AiOutlinePlusCircle style={{ color: '#ffffff' }} />
                                                                    </button>
                                                                </HERBUI.InputGroup>
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                                return (
                                                    <tr key={i}>
                                                        <td>{empEarn.earningCode} <BsArrowRight />&nbsp; {empEarn.earningDescription}</td>
                                                        <td>
                                                            <input className="form-control form-control-sm" type="text" name="earningAmount"
                                                                disabled={empEarn.isEditable === "N"} value={empEarn.earningAmount}
                                                                onChange={e => changeEarningAmount(e, empEarn.earningCode, i)}
                                                                />


                                                        </td>
                                                    </tr>
                                                );
                                            }
                                            )}
                                        </tbody>
                                        <thead>
                                            <tr>
                                                <th>Total Earnings</th>

                                                <th align="right" style={{ textAlign: 'left', paddingLeft: '20px' }}>{totalEarningSum}</th>

                                            </tr>
                                        </thead>
                                    </table>
                                </HERBUI.Col>

                            </HERBUI.Row>

                        </Card.Body>
                    </HERBUI.Card>



                </HERBUI.Col>
                <HERBUI.Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                    <Formik
                        initialValues={deduction}
                        validationSchema={Yup.object().shape({
                            deductionCode: Yup.string().required('Deduction is required'),
                            deductionAmount: Yup.string().required('Amount is required').matches(/^\d+$/, "Please enter valid data"),
                        })}
                        onSubmit={(values, { resetForm }) => {
                            saveDeductions(values);
                            setSelectedDedValue([])
                            resetForm();
                        }}
                        enableReinitialize={true}
                    >
                        {({ errors, handleChange, handleSubmit, touched, values }) => {
                            return (
                                <form name="addDeductionForm" id="addDeductionForm" noValidate style={{ alignContent: 'center' }}
                                    onSubmit={handleSubmit}>
                                    <HERBUI.Card className="p-3">
                                        <Card.Body style={{ padding: '0px' }}>
                                            <Card.Title>
                                                <div className="inner-herbpage-service-title-sub-np ">
                                                    <h1 className="pt-oo">Deductions</h1>
                                                </div>
                                            </Card.Title>
                                            <HERBUI.Row  >
                                                <HERBUI.Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}  >
                                                    <Select className="mb-4p5" options={deductionList}
                                                        name="deductionCode" id="deductionCode"
                                                        onChange={selectedDedOption => {
                                                            if (selectedDedOption !== null) {
                                                                
                                                                let checkDedResult = checkDeductionSelectedValue(selectedDedOption)
                                                                if (checkDedResult) {
                                                                    let event = { target: { name: 'deductionDescription', value: selectedDedOption.name } }
                                                                    let event2 = { target: { name: 'deductionCode', value: selectedDedOption.value } }
                                                                    handleChange(event)
                                                                    handleChange(event2)
                                                                } else {
                                                                    selectedDedOption = ''
                                                                }
                                                            } else {
                                                                setDeductSelectShow(false)
                                                                let event = { target: { name: 'deductionDescription', value: '' } }
                                                                let event2 = { target: { name: 'deductionCode', value: '' } }
                                                                handleChange(event)
                                                                handleChange(event2)
                                                            }
                                                            setSelectedDedValue(selectedDedOption)
                                                        }}
                                                        value={selectedDedValue}
                                                        isSearchable={true}
                                                        isClearable={true} getOptionValue={option => option.value}
                                                        required={true} error={touched.deductionCode && errors.deductionCode} />
                                                        {touched.deductionCode && errors.deductionCode &&
                                                            <b><small className="text-danger form-text">{errors.deductionCode}</small></b>} 

                                                </HERBUI.Col>
                                               
                                            </HERBUI.Row><br />
                                            <HERBUI.Row  >
                                                <HERBUI.Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                                    <HERBUI.InputGroup className="mb-4p5">
                                                        <span className="label-text-style"><b>Amount : </b></span>
                                                        <Field type="text" disabled={deductionCalcTypeShowAmount}
                                                            placeholder="Enter Amount" name="deductionAmount" id="deductionAmount"
                                                            className={'form-control form-control-sm'} />
                                                        <button className="btn btn-primary">Add</button>
                                                    </HERBUI.InputGroup>
                                                </HERBUI.Col>
                                                {touched.deductionAmount && errors.deductionAmount &&
                                                    <b><small className="text-danger form-text">{errors.deductionAmount}</small></b>}
                                            </HERBUI.Row>

                                            <HERBUI.Row >
                                                <HERBUI.Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                                    <table className="table table-bordered table-hover table-sm ">
                                                        <thead>
                                                            <tr>
                                                                <th colSpan="2">Deductions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {data.EarnDeductionsSummary[0] && data.EarnDeductionsSummary[0].deductions.map((empDed, i) => {
                                                                return (
                                                                    <tr key={empDed.deductionCode}>
                                                                        <td>{empDed.deductionCode} <BsArrowRight />&nbsp;
                                                                            {empDed.deductionDescription}
                                                                        </td>

                                                                        <td>
                                                                            <input className="form-control form-control-sm"
                                                                                type="text" name="deductionAmount"
                                                                                disabled={empDed.isEditable === "N"}
                                                                                onChange={e => changeDeductionAmount(e, empDed.deductionCode, i)}
                                                                                value={empDed.deductionAmount} />
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            }
                                                            )}
                                                        </tbody>
                                                        <thead>
                                                            <tr>
                                                                <th>Total Deductions</th>
                                                                <th align="right" style={{ textAlign: 'left', paddingLeft: '20px' }}>{totalDeductionSum}</th>

                                                            </tr>
                                                        </thead>
                                                    </table>
                                                </HERBUI.Col>
                                            </HERBUI.Row>
                                        </Card.Body>
                                    </HERBUI.Card>
                                </form>
                            );
                        }}
                    </Formik>
                </HERBUI.Col>
            </HERBUI.Row>

            <HERBUI.Row className=" mb-3">
                <HERBUI.Col xs={12} sm={12} md={12} lg={8} xl={8} xxl={8}>
                    &nbsp;
                </HERBUI.Col>
                <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                    <div className="d-grid gap-2">
                        <button type="submit" onClick={earnindDeductionSave} className="btn btn-success">Save Details</button>
                    </div>
                </HERBUI.Col>
            </HERBUI.Row>
            <Modal
                size="lg"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Earnings:</Modal.Title>
                </Modal.Header>
                <br />
                <Modal.Body>
                    <Formik
                        initialValues={formInitialValues} onSubmit={(values) => {
                            saveModalPopUpDetails(values);

                        }}
                    >
                        {({ errors, handleChange, handleSubmit, touched, setFieldValue, dirty, values }) => {
                            return (
                                <form name="addModalForm" id="addModalForm" style={{ alignContent: 'center' }}
                                    onSubmit={handleSubmit}>
                                    <input type="hidden" value={cfmsId} />
                                    <center>
                                        <div>
                                            <HERBUI.Row>
                                                <HERBUI.Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                                    <HERBUI.InputGroup className="mb-4p5">
                                                        <span className="label-text-style">Prc Code :</span>
                                                        <Field name="prccode"  >
                                                            {({ field, form: { dirty, touched } }) => (
                                                                <select {...field} className="form-control" name="prccode"
                                                                    // value={values?.postDetails[5].prccode}
                                                                    onChange={e => {
                                                                        values.payscalegroup = '';
                                                                        values.payscalelevel = '';
                                                                        getPrcCodeList(e, field)
                                                                    }}
                                                                >
                                                                    <option value="" >---Select---</option>
                                                                    {prcCodeList}
                                                                </select>
                                                            )}
                                                        </Field>
                                                    </HERBUI.InputGroup>


                                                </HERBUI.Col>
                                                <HERBUI.Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                                    <HERBUI.InputGroup className="mb-4p5">
                                                        <span className="label-text-style">Group :</span>
                                                        <Field name="payscalegroup"  >
                                                            {({ field }) => (
                                                                <select {...field} className="form-control" name="payscalegroup"
                                                                    onChange={e => { handleChange(e); groupCodeDispaly(e, field); }} >
                                                                    <option>----Select------</option>
                                                                    {groupCodeList}
                                                                </select>
                                                            )}
                                                        </Field>
                                                    </HERBUI.InputGroup>

                                                </HERBUI.Col>
                                                <HERBUI.Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                                    <HERBUI.InputGroup className="mb-4p5">
                                                        <span className="label-text-style">Level Amount :</span>
                                                        <Field name="payscalelevel"  >
                                                            {({ field }) => (
                                                                <select {...field} className="form-control" name="payscalelevel"
                                                                    onChange={(e) => { levelAmountDispaly(e, setFieldValue) }} >
                                                                    <option>----Select------</option>
                                                                    {amountLevelList}
                                                                </select>
                                                            )}
                                                        </Field>
                                                    </HERBUI.InputGroup>
                                                </HERBUI.Col>
                                            </HERBUI.Row>
                                        </div>
                                    </center>
                                    <button type="submit" className="btn-primary">Save</button>
                                    <Button variant="warning" onClick={handleClose}>Close</Button>
                                </form>
                            )
                        }}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default EarningandDeduction;
//test two