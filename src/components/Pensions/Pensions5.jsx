import * as HERBUI from "react-bootstrap";
import { Col, Row, Button, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Formik, Field } from "formik";
import LoadingServices from "../LoadingServices";

const userValidationSchema = Yup.object().shape({
  cfms_id: Yup.string().required("Required"),
  gpo_no: Yup.string().required("Required"),
  gpo_inward_date:Yup.string().required("Required"),
  gpo_authorization_date:Yup.string().required("Required"),
 
gratuity_valid_date:Yup.string().required("Required"),
});

export default function Pensions5({ empUniqueId }) {
  const [isCompo, setIsCompo] = useState(false);
  const [isAp, setIsAp] = useState(false);
  const [isTs, setIsTs] = useState(false);
  const [isOg, setIsOg] = useState(false);
  const [openBlock, setOpenBlock] = useState(false);
  const [recoveryBlock, setRecoveryBlock] = useState(false);

  const [empCfmsId, setEmpCfmsId] = useState();
  const [defaultValues, setDefaultValues] = useState({});

  useEffect(() => {
    conditionalForm();
    setValuestoForm();
  }, []);
  // const setValuestoForm = async (e) => {
  //   try {
  //     const res = await axios.get(
  //       "https://10.10.0.219:8451/master//pensions/getGratuityData/" +
  //         empUniqueId
  //     );
  //     setDefaultValues(res.data);
  //     if (res.data.any_recovery === "true") {
  //       setOpenBlock(true);
  //       setRecoveryBlock(true);
  //     }
  //     console.log("set default values===>" + res.data);
  //   } catch (e) {
  //     alert("exception=>" + console.log(e));
  //     console.log("exception===>" + e);
  //   }
  // };
  const setValuestoForm = (values) => {
 
    LoadingServices.getPPOValuestoForm4(empUniqueId).then((res) => 
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

  const setValues = {
    cfms_id: empCfmsId,

    gpo_no: defaultValues.gpo_no ? defaultValues.gpo_no : "",
    gpo_inward_date: defaultValues.gpo_inward_date
      ? defaultValues.gpo_inward_date
      : "",
    gpo_authorization_date: defaultValues.gpo_authorization_date
      ? defaultValues.gpo_authorization_date
      : "",
    gratuity_valid_date: defaultValues.gratuity_valid_date
      ? defaultValues.gratuity_valid_date
      : "",

    gratuity_amt_ap: defaultValues.gratuity_amt_ap
      ? defaultValues.gratuity_amt_ap
      : "",
    gratuity_amt_ts: defaultValues.gratuity_amt_ts
      ? defaultValues.gratuity_amt_ts
      : "",
    gratuity_amt_comp: defaultValues.gratuity_amt_comp
      ? defaultValues.gratuity_amt_comp
      : "",
    gratuity_amt_og: defaultValues.gratuity_amt_og
      ? defaultValues.gratuity_amt_og
      : "",

    net_paymnt_after_recovery_ap: defaultValues.net_paymnt_after_recovery_ap
      ? defaultValues.net_paymnt_after_recovery_ap
      : "",
    net_paymnt_after_recovery_ts: defaultValues.net_paymnt_after_recovery_ts
      ? defaultValues.net_paymnt_after_recovery_ts
      : "",
    net_paymnt_after_recovery_comp: defaultValues.net_paymnt_after_recovery_comp
      ? defaultValues.net_paymnt_after_recovery_comp
      : "",
    net_paymnt_after_recovery_og: defaultValues.net_paymnt_after_recovery_og
      ? defaultValues.net_paymnt_after_recovery_og
      : "",

    any_recovery: defaultValues.any_recovery ? defaultValues.any_recovery : "",

    recovery_amt_ap: defaultValues.recovery_amt_ap
      ? defaultValues.recovery_amt_ap
      : "",
    recovery_amt_ts: defaultValues.recovery_amt_ts
      ? defaultValues.recovery_amt_ts
      : "",
    recovery_amt_comp: defaultValues.recovery_amt_comp
      ? defaultValues.recovery_amt_comp
      : "",

    recovery_amt_og: defaultValues.recovery_amt_og
      ? defaultValues.recovery_amt_og
      : "",
    recovery_ddo_ap: defaultValues.recovery_ddo_ap
      ? defaultValues.recovery_ddo_ap
      : "",
    recovery_ddo_ts: defaultValues.recovery_ddo_ts
      ? defaultValues.recovery_ddo_ts
      : "",

    recovery_ddo_comp: defaultValues.recovery_ddo_comp
      ? defaultValues.recovery_ddo_comp
      : "",
    recovery_ddo_og: defaultValues.recovery_ddo_og
      ? defaultValues.recovery_ddo_og
      : "",
    recovery_hoa_ap: defaultValues.recovery_hoa_ap
      ? defaultValues.recovery_hoa_ap
      : "",

    recovery_hoa_ts: defaultValues.recovery_hoa_ts
      ? defaultValues.recovery_hoa_ts
      : "",
    recovery_hoa_comp: defaultValues.recovery_hoa_comp
      ? defaultValues.recovery_hoa_comp
      : "",
    recovery_hoa_og: defaultValues.recovery_hoa_og
      ? defaultValues.recovery_hoa_og
      : "",
  };

  useEffect(() => {
    setEmpCfmsId(empUniqueId);
  }, [empUniqueId]);

  const openBlock1 = (e) => {
    setOpenBlock(e.target.checked);
  };

  const openRecoveryBlock = (e) => {
    if (e.target.value === "true") setRecoveryBlock(true);
    else setRecoveryBlock(false);
  };
  // 
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
  //       "https://10.10.0.219:8451/master/pensions/savePpoGratuityData",

  //       req
  //     );
  //     console.log(res.data);
  //   } catch (e) {
  //     alert("exception=>" + console.log(e));
  //     console.log("exception===>" + e);
  //   }
  // };

  const submitDetails = (values) => {
         
    LoadingServices.submitPPOForm4Details(values).then((res) => 
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
        <Formik
          onSubmit={submitDetails}
          validationSchema={userValidationSchema}
          enableReinitialize
          initialValues={setValues}
        >
          {({
            errors,
            values,
            handleChange,
            touched,
            setValues,
            handleSubmit,
            props,
          }) => (
            <Form>
              <HERBUI.Row>
                <HERBUI.Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <div className="inner-herbpage-service-title-sub">
                    <h1>Gratuety Details</h1>
                  </div>
                  <br></br>
                </HERBUI.Col>
              </HERBUI.Row>
              <HERBUI.Row>
                <HERBUI.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>GPO Number:</b>
                      <span className="text-danger">*</span>
                    </span>

                    <Field
                      type="hidden"
                      name="cfms_id"
                      className="form-control"
                      value={empCfmsId}
                    />
                    <Field
                      type="text"
                      placeholder=""
                      name="gpo_no"
                      maxLength="15"
                      id="gpo_no"
                      className="form-control"
                    />

                    {touched.gpo_no && errors.gpo_no ? (
                      <span className="text-danger">{errors.gpo_no}</span>
                    ) : null}
                  </HERBUI.InputGroup>
                </HERBUI.Col>
                <HERBUI.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>GPO Inward Date</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      type="date"
                      placeholder=""
                      name="gpo_inward_date"
                 
                      id="gpo_inward_date"
                      className="form-control"
                    />
                    {touched.gpo_inward_date && errors.gpo_inward_date ? (
                      <span className="text-danger">
                        {errors.gpo_inward_date}
                      </span>
                    ) : null}
                  </HERBUI.InputGroup>
                </HERBUI.Col>
                <HERBUI.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>GPO Authorization Date</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      type="date"
                      placeholder=""
                      name="gpo_authorization_date"
                
                      id="gpo_authorization_date"
                      className="form-control"
                    />
                    {touched.gpo_authorization_date &&
                    errors.gpo_authorization_date ? (
                      <span className="text-danger">
                        {errors.gpo_authorization_date}
                      </span>
                    ) : null}
                  </HERBUI.InputGroup>
                </HERBUI.Col>

                <HERBUI.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>Gratuity Valid Date</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      type="date"
                      placeholder=""
                      name="gratuity_valid_date"
                      
                      id="gratuity_valid_date"
                      className="form-control"
                    />
                    {touched.gratuity_valid_date &&
                    errors.gratuity_valid_date ? (
                      <span className="text-danger">
                        {errors.gratuity_valid_date}
                      </span>
                    ) : null}
                  </HERBUI.InputGroup>
                </HERBUI.Col>
              </HERBUI.Row>
              <HERBUI.Row>
                <HERBUI.Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Field
                    type="checkbox"
                    name="famMember1"
                    onChange={(e) => {
                      handleChange(e);
                      openBlock1(e);
                    }}
                    // checked="true"
                  />
                  &nbsp; Family Member-1 &nbsp;
                </HERBUI.Col>
              </HERBUI.Row>
              <br></br> <br></br>
              {openBlock && (
                <>
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
                      <b> Gratuity Amount</b>
                    </HERBUI.Col>

                    <HERBUI.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
                      <b>Net payment after Recovery</b>
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
                          placeholder=""
                          name="gratuity_amt_ap"
                          maxLength="15"
                          id="gratuity_amt_ap"
                          className="form-control"
                        />
                        {touched.gratuity_amt_ap && errors.gratuity_amt_ap ? (
                          <span className="text-danger">
                            {errors.gratuity_amt_ap}
                          </span>
                        ) : null}
                      </HERBUI.Col>

                      <HERBUI.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
                        <Field
                          type="text"
                          placeholder=""
                          name="net_paymnt_after_recovery_ap"
                          maxLength="15"
                          id="net_paymnt_after_recovery_ap"
                          className="form-control"
                        />
                        {touched.net_paymnt_after_recovery_ap &&
                        errors.net_paymnt_after_recovery_ap ? (
                          <span className="text-danger">
                            {errors.net_paymnt_after_recovery_ap}
                          </span>
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
                          placeholder=""
                          name="gratuity_amt_ts"
                          maxLength="15"
                          id="gratuity_amt_ts"
                          className="form-control"
                        />
                        {touched.gratuity_amt_ts && errors.gratuity_amt_ts ? (
                          <span className="text-danger">
                            {errors.gratuity_amt_ts}
                          </span>
                        ) : null}
                      </HERBUI.Col>

                      <HERBUI.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
                        <Field
                          type="text"
                          placeholder=""
                          name="net_paymnt_after_recovery_ts"
                          maxLength="15"
                          id="net_paymnt_after_recovery_ts"
                          className="form-control"
                        />
                        {touched.net_paymnt_after_recovery_ts &&
                        errors.net_paymnt_after_recovery_ts ? (
                          <span className="text-danger">
                            {errors.net_paymnt_after_recovery_ts}
                          </span>
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
                          placeholder=""
                          name="gratuity_amt_comp"
                          maxLength="15"
                          id="gratuity_amt_comp"
                          className="form-control"
                        />
                        {touched.gratuity_amt_comp &&
                        errors.gratuity_amt_comp ? (
                          <span className="text-danger">
                            {errors.gratuity_amt_comp}
                          </span>
                        ) : null}
                      </HERBUI.Col>

                      <HERBUI.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
                        <Field
                          type="text"
                          placeholder=""
                          name="net_paymnt_after_recovery_comp"
                          maxLength="15"
                          id="net_paymnt_after_recovery_comp"
                          className="form-control"
                        />
                        {touched.net_paymnt_after_recovery_comp &&
                        errors.net_paymnt_after_recovery_comp ? (
                          <span className="text-danger">
                            {errors.net_paymnt_after_recovery_comp}
                          </span>
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
                          placeholder=""
                          name="gratuity_amt_og"
                          maxLength="15"
                          id="gratuity_amt_og"
                          className="form-control"
                        />
                        {touched.gratuity_amt_og && errors.gratuity_amt_og ? (
                          <span className="text-danger">
                            {errors.gratuity_amt_og}
                          </span>
                        ) : null}
                      </HERBUI.Col>

                      <HERBUI.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
                        <Field
                          type="text"
                          placeholder=""
                          name="net_paymnt_after_recovery_og"
                          maxLength="15"
                          id="net_paymnt_after_recovery_og"
                          className="form-control"
                        />
                        {touched.net_paymnt_after_recovery_og &&
                        errors.net_paymnt_after_recovery_og ? (
                          <span className="text-danger">
                            {errors.net_paymnt_after_recovery_og}
                          </span>
                        ) : null}
                      </HERBUI.Col>
                    </HERBUI.Row>
                  )}
                  <br></br>
                  <br></br>
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
                          <b>Any Recover</b>
                          <span className="text-danger">*</span>
                        </span>
                        <Field
                          as="select"
                          name="any_recovery"
                          className="form-control"
                          onChange={(e) => {
                            handleChange(e);
                            openRecoveryBlock(e);
                          }}
                        >
                          <option value="0">Select</option>
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </Field>

                        {touched.any_recovery && errors.any_recovery ? (
                          <span className="text-danger">
                            {errors.any_recovery}
                          </span>
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
                  {recoveryBlock && (
                    <>
                      <HERBUI.Row>
                        <HERBUI.Col
                          xs={12}
                          sm={12}
                          md={12}
                          lg={2}
                          xl={2}
                          xxl={2}
                        ></HERBUI.Col>

                        <HERBUI.Col
                          xs={12}
                          sm={12}
                          md={12}
                          lg={2}
                          xl={2}
                          xxl={2}
                        >
                          <b> Recovery Amount</b>
                        </HERBUI.Col>

                        <HERBUI.Col
                          xs={12}
                          sm={12}
                          md={12}
                          lg={2}
                          xl={2}
                          xxl={2}
                        >
                          <b>DDO</b>
                        </HERBUI.Col>

                        <HERBUI.Col
                          xs={12}
                          sm={12}
                          md={12}
                          lg={2}
                          xl={2}
                          xxl={2}
                        >
                          <b>HOA</b>
                        </HERBUI.Col>
                      </HERBUI.Row>

                      {isAp && (
                        <>
                          <HERBUI.Row>
                            <HERBUI.Col
                              xs={12}
                              sm={12}
                              md={12}
                              lg={2}
                              xl={2}
                              xxl={2}
                            >
                              &nbsp; AP(24)
                            </HERBUI.Col>

                            <HERBUI.Col
                              xs={12}
                              sm={12}
                              md={12}
                              lg={2}
                              xl={2}
                              xxl={2}
                            >
                              <Field
                                type="text"
                                placeholder=""
                                name="recovery_amt_ap"
                                maxLength="15"
                                id="recovery_amt_ap"
                                className="form-control"
                              />
                              {touched.recovery_amt_ap &&
                              errors.recovery_amt_ap ? (
                                <span className="text-danger">
                                  {errors.recovery_amt_ap}
                                </span>
                              ) : null}
                            </HERBUI.Col>

                            <HERBUI.Col
                              xs={12}
                              sm={12}
                              md={12}
                              lg={2}
                              xl={2}
                              xxl={2}
                            >
                              <select
                                name="recovery_ddo_ap"
                                className="form-control"
                              >
                                <option value="0">Select</option>
                              </select>
                              {touched.recovery_ddo_ap &&
                              errors.recovery_ddo_ap ? (
                                <span className="text-danger">
                                  {errors.recovery_ddo_ap}
                                </span>
                              ) : null}
                            </HERBUI.Col>

                            <HERBUI.Col
                              xs={12}
                              sm={12}
                              md={12}
                              lg={2}
                              xl={2}
                              xxl={2}
                            >
                              <select
                                name="recovery_hoa_ap"
                                className="form-control"
                              >
                                <option value="0">Select</option>
                              </select>
                              {touched.recovery_hoa_ap &&
                              errors.recovery_hoa_ap ? (
                                <span className="text-danger">
                                  {errors.recovery_hoa_ap}
                                </span>
                              ) : null}
                            </HERBUI.Col>
                          </HERBUI.Row>
                        </>
                      )}
                      {isTs && (
                        <>
                          <HERBUI.Row>
                            <HERBUI.Col
                              xs={12}
                              sm={12}
                              md={12}
                              lg={2}
                              xl={2}
                              xxl={2}
                            >
                              &nbsp; TS(24)
                            </HERBUI.Col>

                            <HERBUI.Col
                              xs={12}
                              sm={12}
                              md={12}
                              lg={2}
                              xl={2}
                              xxl={2}
                            >
                              <Field
                                type="text"
                                placeholder=""
                                name="recovery_amt_ts"
                                maxLength="15"
                                id="recovery_amt_ts"
                                className="form-control"
                              />
                              {touched.recovery_amt_ts &&
                              errors.recovery_amt_ts ? (
                                <span className="text-danger">
                                  {errors.recovery_amt_ts}
                                </span>
                              ) : null}
                            </HERBUI.Col>

                            <HERBUI.Col
                              xs={12}
                              sm={12}
                              md={12}
                              lg={2}
                              xl={2}
                              xxl={2}
                            >
                              <select
                                name="recovery_ddo_ts"
                                className="form-control"
                              >
                                <option value="0">Select</option>
                              </select>
                              {touched.recovery_ddo_ts &&
                              errors.recovery_ddo_ts ? (
                                <span className="text-danger">
                                  {errors.recovery_ddo_ts}
                                </span>
                              ) : null}
                            </HERBUI.Col>

                            <HERBUI.Col
                              xs={12}
                              sm={12}
                              md={12}
                              lg={2}
                              xl={2}
                              xxl={2}
                            >
                              <select
                                name="recovery_hoa_ts"
                                className="form-control"
                              >
                                <option value="0">Select</option>
                              </select>
                              {touched.recovery_hoa_ts &&
                              errors.recovery_hoa_ts ? (
                                <span className="text-danger">
                                  {errors.recovery_hoa_ts}
                                </span>
                              ) : null}
                            </HERBUI.Col>
                          </HERBUI.Row>
                        </>
                      )}

                      {isCompo && (
                        <>
                          <HERBUI.Row>
                            <HERBUI.Col
                              xs={12}
                              sm={12}
                              md={12}
                              lg={2}
                              xl={2}
                              xxl={2}
                            >
                              &nbsp; Composite(14)
                            </HERBUI.Col>

                            <HERBUI.Col
                              xs={12}
                              sm={12}
                              md={12}
                              lg={2}
                              xl={2}
                              xxl={2}
                            >
                              <Field
                                type="text"
                                placeholder=""
                                name="recovery_amt_comp"
                                maxLength="15"
                                id="recovery_amt_comp"
                                className="form-control"
                              />
                              {touched.recovery_amt_comp &&
                              errors.recovery_amt_comp ? (
                                <span className="text-danger">
                                  {errors.recovery_amt_comp}
                                </span>
                              ) : null}
                            </HERBUI.Col>

                            <HERBUI.Col
                              xs={12}
                              sm={12}
                              md={12}
                              lg={2}
                              xl={2}
                              xxl={2}
                            >
                              <select
                                name="recovery_ddo_comp"
                                className="form-control"
                              >
                                <option value="0">Select</option>
                              </select>
                              {touched.recovery_ddo_comp &&
                              errors.recovery_ddo_comp ? (
                                <span className="text-danger">
                                  {errors.recovery_ddo_comp}
                                </span>
                              ) : null}
                            </HERBUI.Col>

                            <HERBUI.Col
                              xs={12}
                              sm={12}
                              md={12}
                              lg={2}
                              xl={2}
                              xxl={2}
                            >
                              <select
                                name="recovery_hoa_comp"
                                className="form-control"
                              >
                                <option value="0">Select</option>
                              </select>
                              {touched.recovery_hoa_comp &&
                              errors.recovery_hoa_comp ? (
                                <span className="text-danger">
                                  {errors.recovery_hoa_comp}
                                </span>
                              ) : null}
                            </HERBUI.Col>
                          </HERBUI.Row>
                        </>
                      )}
                      {isOg && (
                        <HERBUI.Row>
                          <HERBUI.Col
                            xs={12}
                            sm={12}
                            md={12}
                            lg={2}
                            xl={2}
                            xxl={2}
                          >
                            &nbsp; OG
                          </HERBUI.Col>

                          <HERBUI.Col
                            xs={12}
                            sm={12}
                            md={12}
                            lg={2}
                            xl={2}
                            xxl={2}
                          >
                            <Field
                              type="text"
                              placeholder=""
                              name="recovery_amt_og"
                              maxLength="15"
                              id="recovery_amt_og"
                              className="form-control"
                            />
                            {touched.recovery_amt_og &&
                            errors.recovery_amt_og ? (
                              <span className="text-danger">
                                {errors.recovery_amt_og}
                              </span>
                            ) : null}
                          </HERBUI.Col>

                          <HERBUI.Col
                            xs={12}
                            sm={12}
                            md={12}
                            lg={2}
                            xl={2}
                            xxl={2}
                          >
                            <select
                              name="recovery_ddo_og"
                              className="form-control"
                            >
                              <option value="0">Select</option>
                            </select>
                            {touched.recovery_ddo_og &&
                            errors.recovery_ddo_og ? (
                              <span className="text-danger">
                                {errors.recovery_ddo_og}
                              </span>
                            ) : null}
                          </HERBUI.Col>

                          <HERBUI.Col
                            xs={12}
                            sm={12}
                            md={12}
                            lg={2}
                            xl={2}
                            xxl={2}
                          >
                            <select
                              name="recovery_hoa_og"
                              className="form-control"
                            >
                              <option value="0">Select</option>
                            </select>
                            {touched.recovery_hoa_og &&
                            errors.recovery_hoa_og ? (
                              <span className="text-danger">
                                {errors.recovery_hoa_og}
                              </span>
                            ) : null}
                          </HERBUI.Col>
                        </HERBUI.Row>
                      )}
                    </>
                  )}
                </>
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
