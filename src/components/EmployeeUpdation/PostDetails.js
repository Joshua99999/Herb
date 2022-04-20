import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as HERBUI from "react-bootstrap";
import '../../payroll.css';
import { Field, Formik, yupToFormErrors } from 'formik';
import * as Yup from 'yup';
import LoadingServices from './LoadingServices';
import { useHistory, useLocation } from 'react-router';
import { NotificationManager } from 'react-notifications';



const PostDetails = ({ data, masterData }, props) => {
    const [postResult, setPostResult] = useState({ sdesc: '' })
    const [postShow, setPostShow] = useState(false);
    const [DeptPostCodeList, setDeptPostCodeList] = useState()
    const [prcCodeList, setPrcCodeList] = useState()
    const [masterDeptPostDataList, setMasterDeptPostDataList] = useState([])
    const [payScalesData, setPayScalesData] = useState()
    const [postOptions, setPostOptions] = useState()
    const [serviceOptions, setServiceOptions] = useState()
    const [postArray, setPostArray] = useState([]);
    const [payscaleOptions, setPayscaleOptions] = useState();
    const [cfmsId, setCfmsId] = useState();

    const location = useLocation();
    React.useEffect(() => {
        let cfmsId = location.state.employeeCfmsId.CFMSID
        setCfmsId((cfmsId))


        LoadingServices.fetchPayScalesData().then(res => {
            setPayScalesData(res.data)
            if (res.data) {
                let options = res.data.map((item, i) => {
                    return (
                        <option key={i} value={item.prccode}>{item.prcdescription}</option>
                    )
                })
                setPrcCodeList(options);
            }

        })
        LoadingServices.fetchDeptPostCommonDetails().then(res => {
            if (res.data) {
                setMasterDeptPostDataList(res.data)
                getPostData(res.data)
                let options = res.data.map((item, i) => {
                    return (
                        <option key={i} value={item.deptId}>{item.deptdesc}</option>
                    )
                })
                setDeptPostCodeList(options);

            }

        })
        data.postId = ''
    }, [data])
    const onChangeDepartment = (e, field) => {
        let postOptions = e.target.value;
        let postData = masterDeptPostDataList.find((someData) => someData.deptId == postOptions).posts || [];
        let options = postData.map((item, i) => {
            return (
                <option key={i} value={item.postid}>{item.postdescription}</option>
            )

        })
        setPostArray(postData);
        setPostOptions(options)
        field.onChange(e);
    }

    const onChangePost = (e, field) => {
        let postId = e.target.value;
        let postRec = postArray.find((data) => parseInt(data.postid) === parseInt(postId))?.serviceRule || null;
        setServiceOptions(postRec);
        field.onChange(e);

    }

    const getPostData = (list) => {
        if (data) {
            if (data.deptId !== '') {
                if (list.length > 0) {
                    let postData = list.find((someData) => parseInt(someData.deptId) === parseInt(data.deptId))?.posts || [];
                    let options = postData.map((item, i) => {
                        return (
                            <option key={i} value={item.postid}>{item.postdescription}</option>
                        )

                    })
                    setPostArray(postData);
                    setPostOptions(options)
                }
            }
        }
    }

    const onChangePRC = (e) => {
        let prcCode = e.target.value
        let options = payScalesData.filter((someObj) => someObj.prccode === prcCode).map((eachObj) => eachObj.payscales.map((item, i) => {
            return (
                <option key={i} value={item.payscaleGroup}>{item.payscaleBand}</option>
            )
        }))
        setPayscaleOptions(options)
    }

    const postDetailsSave = (values) => {
        let postDetails = {
            // cfmsId:cfmsId,
            cfmsId: cfmsId,
            deptId: values.deptId,
            postId: values.postId,
            cadrecode: values.cadrecode,
            daimpcode: values.daimpcode,
            ccacategory: values.ccacategory,
            gpfcategory: values.gpfcategory,
            gisno: values.gisno,
            hracode: values.hracode,
        };
        console.log('postDetails...=>' + JSON.stringify(postDetails));
        LoadingServices.postDetailsSave(postDetails).then(res => {
            console.log("sucess---" + JSON.stringify(res))
            if (res.data.sCode === "01") {
                NotificationManager.success(res.data.sDesc)
            }
            else if (res.data.sCode === "02") {
                NotificationManager.warning(res.data.sDesc)
            }
           

        });
    }


    return (

        <div className="container-fluid row mt-3">
            {/* {JSON.stringify(data)} */}
            <div className="inner-herbpage-service-title-sub mb-4p5">
                <h1>Post Details</h1>
            </div>
            <Formik
                initialValues={data}
                validationSchema={Yup.object().shape({
                    deptId: Yup.string().required("Please select"),
                    postId: Yup.string().required("Please select"),
                    gisno: Yup.string().required("Please select"),
                    cadrecode: Yup.string().required("Please select"),
                    daimpcode: Yup.string().required("Please select"),
                    ccacategory: Yup.string().required("Please select"),
                    gpfcategory: Yup.string().required("Please select"),
                    hracode: Yup.string().required("Please select"),
                })}
                onSubmit={(values) => {
                    console.log("### form submit " + JSON.stringify(values));
                    postDetailsSave(values);
                }}
            >

                {({ errors, values, handleChange, handleBlur, touched, setValues, handleSubmit }) => {
                    return (
                        <div className="empDiv">
                            <form noValidate name="customForm" onSubmit={handleSubmit}>
                                {/* <input type="hidden" name="cfmsId" value={masterdata.cfmsId} /> */}
                                <HERBUI.Row>

                                    <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                        <HERBUI.InputGroup className="mb-4p5">

                                            <span className="label-text-style" htmlFor="deptId"><b>Department: </b></span>
                                            <Field name="deptId" disabled={true}>
                                                {({ field }) => (
                                                    <select {...field} name="deptId" className={'form-control' + (errors.deptId && touched.deptId ? ' is-invalid' : '')}
                                                        value={values?.deptId} onChange={e => onChangeDepartment(e, field)}>
                                                        <option value="">--Select--</option>
                                                        {DeptPostCodeList}
                                                    </select>
                                                )}
                                            </Field>

                                            {touched.deptId && errors.deptId ? (
                                                <div className="invalid-feedback">{errors.deptId}</div>
                                            ) : null}
                                        </HERBUI.InputGroup>

                                    </HERBUI.Col>
                                    <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                        <HERBUI.InputGroup className="mb-4p5">
                                            <span className="label-text-style" htmlFor="postId"><b>Post Name:</b></span>
                                            <Field name="postId" disabled={true}>
                                                {({ field }) => (
                                                    <select {...field} name="postId" className={'form-control' + (errors.postId && touched.postId ? ' is-invalid' : '')}
                                                        value={values?.postId} onChange={e => onChangePost(e, field)}>
                                                        <option value="">--Select--</option>
                                                        {postOptions}
                                                    </select>
                                                )}
                                            </Field>

                                            {touched.postId && errors.postId ? (
                                                <div className="invalid-feedback">{errors.postId}</div>
                                            ) : null}
                                        </HERBUI.InputGroup>
                                    </HERBUI.Col>

                                    <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                        <HERBUI.InputGroup className="mb-4p5">
                                            <span className="label-text-style"><b>Service Rule:</b></span>
                                            <Field type="text" placeholder="Enter Service Rule" 
                                               disabled={true} value={values?.serviceRule} 
                                                name="serviceRule" className={(touched.serviceRule && errors.serviceRule) ? 'form-control is-invalid' : 'form-control'} />
                                            {touched.serviceRule && errors.serviceRule ? (
                                                <div className="invalid-feedback">{errors.serviceRule}</div>
                                            ) : null}
                                        </HERBUI.InputGroup>
                                    </HERBUI.Col>
                                </HERBUI.Row>
                                <HERBUI.Row>
                                    <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                        <HERBUI.InputGroup className="mb-4p5">
                                            <span className="label-text-style" htmlFor="prccode">
                                                <b>PRC:</b></span>
                                            {/* <Field as="select" name="prccode"
                                               value={values?.prccode}  className={'form-control' + (errors.prccode && touched.prccode ? ' is-invalid' : '')}
                                                error={errors.prccode}>
                                                <option value="">--Select--</option>
                                                {prcCodeList}
                                            </Field> */}
                                            <Field name="prccode" >
                                                {({ field }) => (
                                                    <select {...field} name="prccode" className={'form-control' + (errors.prccode && touched.prccode ? ' is-invalid' : '')}
                                                        value={values?.prccode} onChange={e => { handleChange(e); onChangePRC(e); }} disabled={true} >
                                                        <option value="">--Select--</option>
                                                        {prcCodeList}
                                                    </select>
                                                )}
                                            </Field>

                                            {touched.prccode && errors.prccode ? (
                                                <div className="invalid-feedback">{errors.prccode}</div>
                                            ) : null}
                                        </HERBUI.InputGroup>
                                    </HERBUI.Col>
                                    <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                        <HERBUI.InputGroup className="mb-4p5">
                                            <span className="label-text-style" htmlFor="payscalegroup">
                                                <b>Pay Scale Group:</b></span>
                                            {/* <Field name="payscalegroup" readonly="true">
                                                {({ field }) => (
                                                    <select {...field} name="payscalegroup"
                                                    value={values?.payscalegroup}  className={'form-control' + (errors.payscalegroup && touched.payscalegroup ? ' is-invalid' : '')}  >
                                                        <option value="">--Select--</option>

                                                        {payscaleOptions}
                                                    </select>
                                                )}
                                            </Field> */}

                                            <Field type="text" placeholder="Enter Payscalegroup "
                                                value={values?.payscalegroup}
                                                name="serviceRule" disabled={true} className={(touched.payscalegroup && errors.payscalegroup) ? 'form-control is-invalid' : 'form-control'} />
                                            {touched.payscalegroup && errors.payscalegroup ? (
                                                <div className="invalid-feedback">{errors.payscalegroup}</div>
                                            ) : null}


                                        </HERBUI.InputGroup>
                                    </HERBUI.Col>
                                    <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                        <HERBUI.InputGroup className="mb-4p5">
                                            <span className="label-text-style" htmlFor="amount">
                                                <b>Level Amount:</b></span>
                                            {/* <Field name="amount" readonly="true">
                                                {({ field }) => (
                                                    <select {...field} name="amount"
                                                        className={'form-control' + (errors.amount && touched.amount ? ' is-invalid' : '')}  >
                                                        <option value="">--Select--</option>

                                                        {payscaleOptions}
                                                    </select>
                                                )}
                                            </Field> */}

                                            <Field type="text" placeholder="Enter Payscalegroup "
                                                value={values?.amount}
                                                name="serviceRule" disabled={true} className={(touched.amount && errors.amount) ? 'form-control is-invalid' : 'form-control'} />
                                            {touched.amount && errors.amount ? (
                                                <div className="invalid-feedback">{errors.amount}</div>
                                            ) : null}

                                            {/* {touched.payScaleId && errors.payScaleId ? (
                                                <div className="invalid-feedback">{errors.payScaleId}</div>
                                            ) : null} */}
                                        </HERBUI.InputGroup>
                                    </HERBUI.Col>
                                    {/* <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                        <HERBUI.InputGroup className="mb-4p5">
                                            <span className="label-text-style" htmlFor="levelAmount">
                                                <b>Level Amount:</b></span>
                                            <Field name="levelAmount" readonly="true">
                                                {({ field }) => (
                                                    <select {...field} name="levelAmount"
                                                        className={'form-control' + (errors.levelAmount && touched.levelAmount ? ' is-invalid' : '')}  >
                                                        <option value="">--Select--</option>
                                                        {levelAmountOptions}
                                                    </select>
                                                )}
                                            </Field>

                                            {touched.levelAmount && errors.levelAmount ? (
                                                <div className="invalid-feedback">{errors.levelAmount}</div>
                                            ) : null}
                                        </HERBUI.InputGroup>
                                    </HERBUI.Col> */}

                                </HERBUI.Row>
                                <HERBUI.Row>
                                    <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                        <HERBUI.InputGroup className="mb-4p5">
                                            <span className="label-text-style"><b>Cadre Code Category:</b></span>
                                            <Field name="cadrecode">
                                                {({ field }) => (
                                                    <select {...field} name="cadrecode" className={'form-control' + (errors.cadrecode && touched.cadrecode ? ' is-invalid' : '')}
                                                        value={values?.cadrecode} onChange={handleChange}
                                                    >
                                                        <option value="">--Select--</option>
                                                        {
                                                            masterData &&
                                                            masterData.EmployeeCadre.map((item, i) => {
                                                                return (
                                                                    <option key={i} value={item.cadrecode}>{item.description}</option>
                                                                )
                                                            })
                                                        }

                                                    </select>
                                                )}
                                            </Field>

                                            {touched.cadrecode && errors.cadrecode ? (
                                                <div className="invalid-feedback">{errors.cadrecode}</div>
                                            ) : null}
                                        </HERBUI.InputGroup>
                                    </HERBUI.Col>
                                    <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                        <HERBUI.InputGroup className="mb-4p5">
                                            <span className="label-text-style"><b>DA IMP Code:</b></span>
                                            <Field name="daimpcode">
                                                {({ field }) => (
                                                    <select {...field} name="daimpcode" className={'form-control' + (errors.daimpcode && touched.daimpcode ? ' is-invalid' : '')}
                                                        value={values?.daimpcode} onChange={handleChange} >
                                                        <option value="">--Select--</option>
                                                        {
                                                            masterData &&
                                                            masterData.DAPercentage.map((item, i) => {
                                                                return (
                                                                    <option key={i} value={item.code}>{item.daValue}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                )}
                                            </Field>
                                            {touched.daimpcode && errors.daimpcode ? (
                                                <div className="invalid-feedback">{errors.daimpcode}</div>
                                            ) : null}
                                            
                                        </HERBUI.InputGroup>
                                    </HERBUI.Col>

                                    <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                        <HERBUI.InputGroup className="mb-4p5">
                                            <span className="label-text-style"><b>CCA Category:</b></span>
                                            <Field name="ccacategory">
                                                {({ field }) => (
                                                    <select {...field} name="ccacategory" className={'form-control' + (errors.ccacategory && touched.ccacategory ? ' is-invalid' : '')}
                                                        value={values?.ccacategory} onChange={handleChange}>
                                                        <option value="">--Select--</option>
                                                        {
                                                            masterData &&
                                                            masterData.CCALocation.map((item, i) => {
                                                                return (
                                                                    <option key={i} value={item.ccacategory}>{item.description}</option>
                                                                )
                                                            })
                                                        }

                                                    </select>
                                                )}
                                            </Field>
                                            {touched.ccacategory && errors.ccacategory ? (
                                                <div className="invalid-feedback">{errors.ccacategory}</div>
                                            ) : null}
                                        </HERBUI.InputGroup>
                                    </HERBUI.Col>

                                </HERBUI.Row>
                                <HERBUI.Row>
                                    <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                        <HERBUI.InputGroup className="mb-4p5">
                                            <span className="label-text-style"><b>GPF Category:</b></span>
                                            <Field name="gpfcategory">
                                                {({ field }) => (
                                                    <select {...field} name="gpfcategory" className={'form-control' + (errors.gpfcategory && touched.gpfcategory ? ' is-invalid' : '')}
                                                        value={values?.gpfcategory} onChange={handleChange}>
                                                        <option value="">--Select--</option>
                                                        {
                                                            masterData &&
                                                            masterData.GPFCategory.map((item, i) => {
                                                                return (
                                                                    <option key={i} value={item.catgcode}>{item.catgdesc}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                )}
                                            </Field>
                                            {touched.gpfcategory && errors.gpfcategory ? (
                                                <div className="invalid-feedback">{errors.gpfcategory}</div>
                                            ) : null}
                                        </HERBUI.InputGroup>
                                    </HERBUI.Col>
                                    <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                        <HERBUI.InputGroup className="mb-4p5">
                                            <span className="label-text-style" htmlFor="gisno"><b>GIS Category: </b></span>
                                            <Field name="gisno">
                                                {({ field }) => (
                                                    <select {...field} name="gisno" className={'form-control' + (errors.gisno && touched.gisno ? ' is-invalid' : '')}
                                                        value={values?.gisno}
                                                        onChange={handleChange}>
                                                        <option value="">--Select--</option>
                                                        {
                                                            masterData &&
                                                            masterData.GISCategory.map((item, i) => {
                                                                return (
                                                                    <option key={i} value={item.giscatg}>{item.subscriptamt}</option>
                                                                )
                                                            })
                                                        }

                                                    </select>
                                                )}
                                            </Field>
                                            {touched.gisno && errors.gisno ? (
                                                <div className="invalid-feedback">{errors.gisno}</div>
                                            ) : null}
                                        </HERBUI.InputGroup>
                                    </HERBUI.Col>
                                    <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                        <HERBUI.InputGroup className="mb-4p5">
                                            <span className="label-text-style"><b>HRA Category:</b></span>
                                            <Field name="hracode">
                                                {({ field }) => (
                                                    <select {...field} name="hracode" className={'form-control' + (errors.hracode && touched.hracode ? ' is-invalid' : '')}
                                                        value={values?.hracode} onChange={handleChange}>
                                                        <option value="">--Select--</option>
                                                        {
                                                            masterData &&
                                                            masterData.HRACategory.map((item, i) => {
                                                                return (
                                                                    <option key={i} value={item.code}>{item.hraValue}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                )}
                                            </Field>

                                            {touched.hracode && errors.hracode ? (
                                                <div className="invalid-feedback">{errors.hracode}</div>
                                            ) : null}
                                        </HERBUI.InputGroup>
                                    </HERBUI.Col>

                                </HERBUI.Row>
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
            <div>
                {postShow &&
                    <div style={{ color: 'red' }}><b>{postResult.sdesc}</b></div>
                }
            </div>

        </div>

    )
}
export default PostDetails;
//updated