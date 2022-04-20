import * as HERBUI from "react-bootstrap";
import { Col, Row, Button, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Formik, Field } from "formik";
import LoadingServices from "../LoadingServices";

const userValidationSchema = Yup.object().shape({
  cfms_id: Yup.string().required("Pension Class is Required"),
  cvp_inward_date:Yup.string().required("Required"),
  cvp_author_date:Yup.string().required("Required"),
  cvp_auth_no:Yup.string().required("Required"),
cvp_start_date:Yup.string().required("Required"),
person:Yup.string().required("Required"),
cvp_amt_ap:Yup.string().required("Required"),
cvp_commuted_amt_ap:Yup.string().required("Required"),
deduction_amt_ap:Yup.string().required("Required"),
net_payment_amt_after_recovery_ap:Yup.string().required("Required"),
cvp_amt_ts:Yup.string().required("Required"),
cvp_commuted_amt_ts:Yup.string().required("Required"),
deduction_amt_ts:Yup.string().required("Required"),
net_payment_amt_after_recovery_ts:Yup.string().required("Required"),
cvp_amt_comp:Yup.string().required("Required"),
cvp_commuted_amt_comp:Yup.string().required("Required"),
deduction_amt_comp:Yup.string().required("Required"),
net_payment_amt_after_recovery_comp:Yup.string().required("Required"),
cvp_amt_og:Yup.string().required("Required"),
cvp_commuted_amt_og:Yup.string().required("Required"),
deduction_amt_og:Yup.string().required("Required"),
net_payment_amt_after_recovery_og:Yup.string().required("Required"),


});

export default function Pensions4({ empUniqueId }) {
  const [isCompo, setIsCompo] = useState(false);
  const [isAp, setIsAp] = useState(false);
  const [isTs, setIsTs] = useState(false);
  const [isOg, setIsOg] = useState(false);

  useEffect(() => {
    conditionalForm();
    setValuestoForm();
  }, []);

  // const setValuestoForm = async (e) => {
  //   try {
  //     const res = await axios.get(
  //       "https://10.10.0.219:8451/master//pensions/getCommutationData/" +
  //         empUniqueId
  //     );
  //     setDefaultValues(res.data);
  //     console.log(res.data);
  //   } catch (e) {
  //     alert("exception=>" + console.log(e));
  //     console.log("exception===>" + e);
  //   }
  // };

  const setValuestoForm = (values) => {
 
    LoadingServices.getPPOValuestoForm3(empUniqueId).then((res) => 
    {
      console.log("fill data===>"+res.data.inward_no);
         if (res.data) 
        { 
          setDefaultValues(res.data);
        }
        else
        {
        alert("No Data Found");
        }
    }).catch(() => 
    {
        console.log("Exception Occured");
    })

  }


  const [empCfmsId, setEmpCfmsId] = useState();
  const [defaultValues, setDefaultValues] = useState({});

  const setValues = {
    cfms_id: empCfmsId,
    cvp_inward_date: defaultValues.cvp_inward_date
      ? defaultValues.cvp_inward_date
      : "",
    cvp_author_date: defaultValues.cvp_author_date
      ? defaultValues.cvp_author_date
      : "",
    cvp_actual_date: defaultValues.cvp_actual_date
      ? defaultValues.cvp_actual_date
      : "",
    cvp_auth_no: defaultValues.cvp_auth_no ? defaultValues.cvp_auth_no : "",

    cvp_start_date: defaultValues.cvp_start_date
      ? defaultValues.cvp_start_date
      : "",
    person: defaultValues.person ? defaultValues.person : "",
    cvp_amt_ap: defaultValues.cvp_amt_ap ? defaultValues.cvp_amt_ap : "",
    cvp_amt_ts: defaultValues.cvp_amt_ts ? defaultValues.cvp_amt_ts : "",
    cvp_amt_comp: defaultValues.cvp_amt_comp ? defaultValues.cvp_amt_comp : "",
    cvp_amt_og: defaultValues.cvp_amt_og ? defaultValues.cvp_amt_og : "",
    cvp_commuted_amt_ap: defaultValues.cvp_commuted_amt_ap
      ? defaultValues.cvp_commuted_amt_ap
      : "",
    cvp_commuted_amt_ts: defaultValues.cvp_commuted_amt_ts
      ? defaultValues.cvp_commuted_amt_ts
      : "",
    cvp_commuted_amt_comp: defaultValues.cvp_commuted_amt_comp
      ? defaultValues.cvp_commuted_amt_comp
      : "",
    cvp_commuted_amt_og: defaultValues.cvp_commuted_amt_og
      ? defaultValues.cvp_commuted_amt_og
      : "",
    deduction_amt_ap: defaultValues.deduction_amt_ap
      ? defaultValues.deduction_amt_ap
      : "",
    deduction_amt_ts: defaultValues.deduction_amt_ts
      ? defaultValues.deduction_amt_ts
      : "",
    deduction_amt_comp: defaultValues.deduction_amt_comp
      ? defaultValues.deduction_amt_comp
      : "",
    deduction_amt_og: defaultValues.deduction_amt_og
      ? defaultValues.deduction_amt_og
      : "",

    net_payment_amt_after_recovery_ap:
      defaultValues.net_payment_amt_after_recovery_ap
        ? defaultValues.net_payment_amt_after_recovery_ap
        : "",
    net_payment_amt_after_recovery_ts:
      defaultValues.net_payment_amt_after_recovery_ts
        ? defaultValues.net_payment_amt_after_recovery_ts
        : "",
    net_payment_amt_after_recovery_comp:
      defaultValues.net_payment_amt_after_recovery_comp
        ? defaultValues.net_payment_amt_after_recovery_comp
        : "",
    net_payment_amt_after_recovery_og:
      defaultValues.net_payment_amt_after_recovery_og
        ? defaultValues.net_payment_amt_after_recovery_og
        : "",
  };

  useEffect(() => {
    setEmpCfmsId(empUniqueId);
  }, [empUniqueId]);

  // const conditionalForm = async (e) => {
  //   try {
  //     const res = await axios.get(
  //       "https://10.10.0.219:8451/master//pensions/getBasicData/" + empUniqueId
  //     );
  //     console.log(res.data);

  //     if (
  //       res.data.sp_comp_amt !== "" &&
  //       res.data.sp_comp_amt !== null &&
  //       res.data.sp_comp_amt != "0"
  //     ) {
  //       setIsCompo(true);
  //     }

  //     if (
  //       res.data.sp_ap_amt !== "" &&
  //       res.data.sp_ap_amt !== null &&
  //       res.data.sp_ap_amt != "0"
  //     ) {
  //       setIsAp(true);
  //     }

  //     if (
  //       res.data.sp_ts_amt !== "" &&
  //       res.data.sp_ts_amt !== null &&
  //       res.data.sp_ts_amt != "0"
  //     ) {
  //       setIsTs(true);
  //     }
  //     if (
  //       res.data.sp_og_sp_amt !== "" &&
  //       res.data.sp_og_sp_amt !== null &&
  //       res.data.sp_og_sp_amt != "0"
  //     ) {
  //       setIsOg(true);
  //     }

  //     console.log("sp_comp_amt===>" + res.data.sp_comp_amt);
  //     console.log("sp_ap_amt===>" + res.data.sp_ap_amt);
  //     console.log("sp_ts_amt===>" + res.data.sp_ts_amt);
  //     console.log("sp_og_sp_amt===>" + res.data.sp_og_sp_amt);
  //   } catch (e) {
  //     alert("exception=>" + console.log(e));
  //     console.log("exception===>" + e);
  //   }
  // };

  const conditionalForm= (values) => {
 
    LoadingServices.getconditionalForm3(empUniqueId).then((res) => 
    {
      console.log("fill data===>"+res.data);
         if (res.data) 
        { 
          
      if (
        res.data.sp_comp_amt !== "" &&
        res.data.sp_comp_amt !== null &&
        res.data.sp_comp_amt != "0"
      ) {
        setIsCompo(true);
      }

      if (
        res.data.sp_ap_amt !== "" &&
        res.data.sp_ap_amt !== null &&
        res.data.sp_ap_amt != "0"
      ) {
        setIsAp(true);
      }

      if (
        res.data.sp_ts_amt !== "" &&
        res.data.sp_ts_amt !== null &&
        res.data.sp_ts_amt != "0"
      ) {
        setIsTs(true);
      }
      if (
        res.data.sp_og_sp_amt !== "" &&
        res.data.sp_og_sp_amt !== null &&
        res.data.sp_og_sp_amt != "0"
      ) {
        setIsOg(true);
      }
        }
        else
        {
        alert("No Data Found");
        }
    }).catch(() => 
    {
        console.log("Exception Occured");
    })

  }

  // const submitDetails = async (values) => {
  //   try {
  //     const req = values;
  //     console.log(req);
  //     const res = await axios.post(
  //       "https://10.10.0.219:8451/master/pensions/savePpoCommutationData",

  //       req
  //     );
  //     console.log(res.data);
  //   } catch (e) {
  //     alert("exception=>" + console.log(e));
  //     console.log("exception===>" + e);
  //   }
  // };

  
  const submitDetails = (values) => {
         
    LoadingServices.submitPPOForm3Details(values).then((res) => 
    {
      console.log(res.data);
         if (res.data) 
        { 
           alert("Success");
        }
        else
        {
        alert("No Data Found");
        }
    }).catch(() => 
    {
        console.log("Exception Occured");
    })

  }

  return (
    <>
      <HERBUI.Card className="p-3">
        <HERBUI.Row>
          <HERBUI.Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <div className="inner-herbpage-service-title-sub">
              <h1>Commutation Details</h1>
            </div>
            <br></br>
          </HERBUI.Col>
        </HERBUI.Row>
        <Formik
          initialValues={setValues}
          onSubmit={submitDetails}
          validationSchema={userValidationSchema}
          enableReinitialize
        >
          {({
            errors,
            values,
            handleChange,
            touched,
            setValues,
            handleSubmit,
          }) => (
            <Form>
              <HERBUI.Row>
                <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>CVP Inward Date:</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      type="date"
                      placeholder="CVP Inward Date"
                      name="cvp_inward_date"
                      maxLength="15"
                      id="cvp_inward_date"
                      className="form-control"
                    />
                     {touched.cvp_inward_date && errors.cvp_inward_date ? (
                    <span className="text-danger">{errors.cvp_inward_date}</span>
                  ) : null}

                    <Field
                      type="hidden"
                      name="cfms_id"
                      className="form-control"
                      value={empCfmsId}
                    />
                    <div className="invalid-feedback">
                      {errors.cvp_inward_date}
                    </div>
                  </HERBUI.InputGroup>
                </HERBUI.Col>
                <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>CVP Author Date</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      type="date"
                      placeholder="CVP Author Date"
                      name="cvp_author_date"
                    
                      id="cvp_author_date"
                      className="form-control"
                    />
                     {touched.cvp_author_date && errors.cvp_author_date ? (
                    <span className="text-danger">{errors.cvp_author_date}</span>
                  ) : null}
                  </HERBUI.InputGroup>
                </HERBUI.Col>
                <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>CVP Actual Pay Date:</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      type="date"
                      placeholder="CVP Actual Pay Date"
                      name="cvp_actual_date"
                      
                      id="cvp_actual_date"
                      className="form-control"
                    />
                    {touched.cvp_actual_date && errors.cvp_actual_date ? (
                    <span className="text-danger">{errors.cvp_actual_date}</span>
                  ) : null}
                    
                  </HERBUI.InputGroup>
                </HERBUI.Col>
              </HERBUI.Row>

              <HERBUI.Row>
                <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>CVP Auth No:</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      type="text"
                      placeholder="CVP Auth No"
                      name="cvp_auth_no"
                      maxLength="15"
                      id="cvp_auth_no"
                      className="form-control"
                    />
                        {touched.cvp_auth_no && errors.cvp_auth_no ? (
                    <span className="text-danger">{errors.cvp_auth_no}</span>
                  ) : null} 
                    <div className="invalid-feedback">{errors.cvp_auth_no}</div>
                  </HERBUI.InputGroup>
                </HERBUI.Col>
                <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>CVP Start Date(Max)</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      type="date"
                      placeholder="CVP Start Date(Max)"
                      name="cvp_start_date"
                     
                      id="cvp_start_date"
                      className="form-control"
                    />
                     {touched.cvp_start_date && errors.cvp_start_date ? (
                    <span className="text-danger">{errors.cvp_start_date}</span>
                  ) : null} 
                  </HERBUI.InputGroup>
                </HERBUI.Col>
              </HERBUI.Row>

              <HERBUI.Row>
                <HERBUI.Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={4}
                  xl={4}
                  xxl={4}
                ></HERBUI.Col>
                <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>Selection of Person</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      as="select"
                      name="person"
                      className="form-control"
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option value="1">Self</option>
                      <option value="2">Family Memb-1</option>
                    </Field>
                    {touched.person && errors.person ? (
                    <span className="text-danger">{errors.person}</span>
                  ) : null} 
                  </HERBUI.InputGroup>
                </HERBUI.Col>

                <HERBUI.Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={4}
                  xl={4}
                  xxl={4}
                ></HERBUI.Col>
              </HERBUI.Row>

              <HERBUI.Row>
                <HERBUI.Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={2}
                  xl={2}
                  xxl={2}
                ></HERBUI.Col>

                <HERBUI.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
                  <b> CVP Amount</b>
                </HERBUI.Col>

                <HERBUI.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
                  <b>CVP Commutted Amount</b>
                </HERBUI.Col>

                <HERBUI.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
                  <b>Deduction Amount</b>
                </HERBUI.Col>

                <HERBUI.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
                  <b> Net Payement Amount After Recovery</b>
                </HERBUI.Col>
              </HERBUI.Row>
              {isAp && (
                <HERBUI.Row>
                  <HERBUI.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
                    &nbsp; AP(24)
                  </HERBUI.Col>

                  <HERBUI.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
                    <Field
                      type="text"
                      placeholder="CVP Amount AP"
                      name="cvp_amt_ap"
                      maxLength="15"
                      id="cvp_amt_ap"
                      className="form-control"
                    />
                   {touched.cvp_amt_ap && errors.cvp_amt_ap ? (
                    <span className="text-danger">{errors.cvp_amt_ap}</span>
                  ) : null} 
                  </HERBUI.Col>

                  <HERBUI.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
                    <Field
                      type="text"
                      placeholder="CVP Commuted Amount AP"
                      name="cvp_commuted_amt_ap"
                      maxLength="15"
                      id="cvp_commuted_amt_ap"
                      className="form-control"
                    />
                   {touched.cvp_commuted_amt_ap && errors.cvp_commuted_amt_ap ? (
                    <span className="text-danger">{errors.cvp_commuted_amt_ap}</span>
                  ) : null} 
                  </HERBUI.Col>

                  <HERBUI.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
                    <Field
                      type="text"
                      placeholder="Deduction Amount AP"
                      name="deduction_amt_ap"
                      maxLength="15"
                      id="deduction_amt_ap"
                      className="form-control"
                    />
                     {touched.deduction_amt_ap && errors.deduction_amt_ap ? (
                    <span className="text-danger">{errors.deduction_amt_ap}</span>
                  ) : null} 
                  </HERBUI.Col>

                  <HERBUI.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
                    <Field
                      type="text"
                      placeholder="Net Payment Amount After Recovery"
                      name="net_payment_amt_after_recovery_ap"
                      maxLength="15"
                      id="net_payment_amt_after_recovery_ap"
                      className="form-control"
                    />
                    {touched.net_payment_amt_after_recovery_ap && errors.net_payment_amt_after_recovery_ap ? (
                    <span className="text-danger">{errors.net_payment_amt_after_recovery_ap}</span>
                  ) : null} 
                  </HERBUI.Col>
                </HERBUI.Row>
              )}

              {isTs && (
                <HERBUI.Row>
                  <HERBUI.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
                    &nbsp; TS(24)
                  </HERBUI.Col>

                  <HERBUI.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
                    <Field
                      type="text"
                      placeholder="CVP Amount TS"
                      name="cvp_amt_ts"
                      maxLength="15"
                      id="cvp_amt_ts"
                      className="form-control"
                    />
                   {touched.cvp_amt_ts && errors.cvp_amt_ts ? (
                    <span className="text-danger">{errors.cvp_amt_ts}</span>
                  ) : null} 
                  </HERBUI.Col>

                  <HERBUI.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
                    <Field
                      type="text"
                      placeholder="CVP Commuted Amount TS"
                      name="cvp_commuted_amt_ts"
                      maxLength="15"
                      id="cvp_commuted_amt_ts"
                      className="form-control"
                    />
                   {touched.cvp_commuted_amt_ts && errors.cvp_commuted_amt_ts ? (
                    <span className="text-danger">{errors.cvp_commuted_amt_ts}</span>
                  ) : null} 
                  </HERBUI.Col>

                  <HERBUI.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
                    <Field
                      type="text"
                      placeholder="Deduction Amount TS"
                      name="deduction_amt_ts"
                      maxLength="15"
                      id="deduction_amt_ts"
                      className="form-control"
                    />
                   {touched.deduction_amt_ts && errors.deduction_amt_ts ? (
                    <span className="text-danger">{errors.deduction_amt_ts}</span>
                  ) : null} 
                  </HERBUI.Col>

                  <HERBUI.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
                    <Field
                      type="text"
                      placeholder="Net Payment Amount After Recovery TS"
                      name="net_payment_amt_after_recovery_ts"
                      maxLength="15"
                      id="net_payment_amt_after_recovery_ts"
                      className="form-control"
                    />
                    {touched.net_payment_amt_after_recovery_ts && errors.net_payment_amt_after_recovery_ts ? (
                    <span className="text-danger">{errors.net_payment_amt_after_recovery_ts}</span>
                  ) : null} 
                  </HERBUI.Col>
                </HERBUI.Row>
              )}
              {isCompo && (
                <HERBUI.Row>
                  <HERBUI.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
                    &nbsp; Composite(14)
                  </HERBUI.Col>

                  <HERBUI.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
                    <Field
                      type="text"
                      placeholder="CVP Amount Composite"
                      name="cvp_amt_comp"
                      maxLength="15"
                      id="cvp_amt_comp"
                      className="form-control"
                    />
                   {touched.cvp_amt_comp && errors.cvp_amt_comp ? (
                    <span className="text-danger">{errors.cvp_amt_comp}</span>
                  ) : null} 
                  </HERBUI.Col>

                  <HERBUI.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
                    <Field
                      type="text"
                      placeholder="CVP Commuted Amount Composite"
                      name="cvp_commuted_amt_comp"
                      maxLength="15"
                      id="cvp_commuted_amt_comp"
                      className="form-control"
                    />
                    {touched.cvp_commuted_amt_comp && errors.cvp_commuted_amt_comp ? (
                    <span className="text-danger">{errors.cvp_commuted_amt_comp}</span>
                  ) : null} 
                  </HERBUI.Col>

                  <HERBUI.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
                    <Field
                      type="text"
                      placeholder="Deduction Amount Composite"
                      name="deduction_amt_comp"
                      maxLength="15"
                      id="deduction_amt_comp"
                      className="form-control"
                    />
                    {touched.deduction_amt_comp && errors.deduction_amt_comp ? (
                    <span className="text-danger">{errors.deduction_amt_comp}</span>
                  ) : null}
                  </HERBUI.Col>

                  <HERBUI.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
                    <Field
                      type="text"
                      placeholder="Net Payment After Recovery Composite"
                      name="net_payment_amt_after_recovery_comp"
                      maxLength="15"
                      id="net_payment_amt_after_recovery_comp"
                      className="form-control"
                    />
                      {touched.net_payment_amt_after_recovery_comp && errors.net_payment_amt_after_recovery_comp ? (
                    <span className="text-danger">{errors.net_payment_amt_after_recovery_comp}</span>
                  ) : null}
                  </HERBUI.Col>
                </HERBUI.Row>
              )}
              {isOg && (
                <HERBUI.Row>
                  <HERBUI.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
                    &nbsp; OG
                  </HERBUI.Col>

                  <HERBUI.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
                    <Field
                      type="text"
                      placeholder="CVP Amount OG"
                      name="cvp_amt_og"
                      maxLength="15"
                      id="cvp_amt_og"
                      className="form-control"
                    />
                     {touched.cvp_amt_og && errors.cvp_amt_og ? (
                    <span className="text-danger">{errors.cvp_amt_og}</span>
                  ) : null}
                  </HERBUI.Col>

                  <HERBUI.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
                    <Field
                      type="text"
                      placeholder="CVP Commuted Amoutn OG"
                      name="cvp_commuted_amt_og"
                      maxLength="15"
                      id="cvp_commuted_amt_og"
                      className="form-control"
                    />
                    {touched.cvp_commuted_amt_og && errors.cvp_commuted_amt_og ? (
                    <span className="text-danger">{errors.cvp_commuted_amt_og}</span>
                  ) : null}
                  </HERBUI.Col>

                  <HERBUI.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
                    <Field
                      type="text"
                      placeholder="Deduction Amount OG"
                      name="deduction_amt_og"
                      maxLength="15"
                      id="deduction_amt_og"
                      className="form-control"
                    />
                    {touched.deduction_amt_og && errors.deduction_amt_og ? (
                    <span className="text-danger">{errors.deduction_amt_og}</span>
                  ) : null}
                  </HERBUI.Col>

                  <HERBUI.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
                    <Field
                      type="text"
                      placeholder="Net Payment Amount After Recovery OG"
                      name="net_payment_amt_after_recovery_og"
                      maxLength="15"
                      id="net_payment_amt_after_recovery_og"
                      className="form-control"
                    />
                   {touched.net_payment_amt_after_recovery_og && errors.net_payment_amt_after_recovery_og ? (
                    <span className="text-danger">{errors.net_payment_amt_after_recovery_og}</span>
                  ) : null}
                  </HERBUI.Col>
                </HERBUI.Row>
              )}
              <Row className="mb-20">
                <Col xs={12} sm={12} md={12} lg={12} xl={6} xxl={6}></Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={6} xxl={6}>
                  <br></br>
                  <Button
                    type="submit"
                    className="btn btn-success btn-sm pull-right"
                    variant="primary"
                    size="sm"
                  >
                    Save & Continue
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </HERBUI.Card>
    </>
  );
}
