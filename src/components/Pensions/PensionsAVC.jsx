import * as HERBUI from "react-bootstrap";
import { Col, Row, Button, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Formik, Field } from "formik";

const userValidationSchema = Yup.object().shape({
  cfms_id: Yup.string().required("Required"),
  gpo_no: Yup.string().required("Required"),
});

export default function PensionsAVC({ empUniqueId }) {
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

  const setValuestoForm = async (e) => {
    try {
      const res = await axios.get(
        "https://10.10.0.219:8451/master//pensions/getGratuityData/" +
          empUniqueId
      );
      setDefaultValues(res.data);
      if (res.data.any_recovery === "true") {
        setOpenBlock(true);
        setRecoveryBlock(true);
      }
      console.log("set default values===>" + res.data);
    } catch (e) {
      alert("exception=>" + console.log(e));
      console.log("exception===>" + e);
    }
  };

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
  const conditionalForm = async (e) => {
    try {
      const res = await axios.get(
        "https://10.10.0.219:8451/master//pensions/getBasicData/" + empUniqueId
      );
      console.log(res.data);

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

      console.log("sp_comp_amt===>" + res.data.sp_comp_amt);
      console.log("sp_ap_amt===>" + res.data.sp_ap_amt);
      console.log("sp_ts_amt===>" + res.data.sp_ts_amt);
      console.log("sp_og_sp_amt===>" + res.data.sp_og_sp_amt);
    } catch (e) {
      alert("exception=>" + console.log(e));
      console.log("exception===>" + e);
    }
  };

  const submitDetails = async (values) => {
    try {
      const req = values;
      console.log(req);
      const res = await axios.post(
        "https://10.10.0.219:8451/master/pensions/savePpoGratuityData",

        req
      );
      console.log(res.data);
    } catch (e) {
      alert("exception=>" + console.log(e));
      console.log("exception===>" + e);
    }
  };
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
                    <h1>Annual Verification text</h1>
                  </div>
                  <br></br>
                </HERBUI.Col>
              </HERBUI.Row>
              <HERBUI.Row>
                <HERBUI.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>Verification Date:</b>
                      <span className="text-danger">*</span>
                    </span>

                    <Field
                      type="text"
                      name="stopage_date"
                      className="form-control"
                      value=""
                    />
                  </HERBUI.InputGroup>
                </HERBUI.Col>

                <HERBUI.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>Upload File:</b>
                      <span className="text-danger">*</span>
                    </span>

                    <Field
                      type="file"
                      name="stopage_date"
                      className="form-control"
                      value=""
                    />
                  </HERBUI.InputGroup>
                </HERBUI.Col>

                <HERBUI.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>Remarks:</b>
                      <span className="text-danger">*</span>
                    </span>

                    <Field
                      type="text"
                      name="remarks"
                      className="form-control"
                      value=""
                    />
                  </HERBUI.InputGroup>
                </HERBUI.Col>

                <HERBUI.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                  <Button
                    type="submit"
                    className="btn btn-success btn-sm pull-right"
                    variant="primary"
                    size="sm"
                  >
                    Submit
                  </Button>
                </HERBUI.Col>
              </HERBUI.Row>
            </Form>
          )}
        </Formik>
      </HERBUI.Card>
    </>
  );
}
