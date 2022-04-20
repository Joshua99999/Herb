import * as HERBUI from "react-bootstrap";
import { Col, Row, Button, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Formik, Field } from "formik";
import LoadingServices from "../LoadingServices";

const userValidationSchema = Yup.object().shape({
  state_id: Yup.string().required("Required"),
  emp_id: Yup.string().required("Required"),
  present_rps: Yup.string().required("Required"),
  allowance_id: Yup.string().required("Required"),
  go_no: Yup.string().required("Required"),
  go_wef: Yup.string().required("Required"),
  doc_id: Yup.string().required("Required"),
  per1: Yup.string().required("Required"),
});

export default function AddDR({ empUniqueId }) {
  const setValues = {
    state_id: "",
    emp_id: "",
    present_rps: "",
    allowance_id: "",
    go_no: "",
    go_wef: "",
    go_wet: "2022-01-01",
    doc_id: "",
    per1: "",
    entered_by: "",
  };

  // const submitDetails = async (values) => {
  //   try {
  //     const req = values;
  //     console.log(req);
  //     const res = await axios.post(
  //       "https://10.10.0.219:8451/master//pensions/saveDrOthAllowance",

  //       req
  //     );
  //     console.log(res.data);
  //   } catch (e) {
  //     alert("exception=>" + console.log(e));
  //     console.log("exception===>" + e);
  //   }
  // };

  const submitDetails = (values) => {
         
    LoadingServices.submitPPOForm6Details(values).then((res) => 
    {
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
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <HERBUI.Container className="outer-page-content-container ">
                <HERBUI.Card className="p-3">
                  <HERBUI.Row>
                    <HERBUI.Col
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      xxl={12}
                    >
                      <div className="inner-herbpage-service-title-sub">
                        <h1>Add DR</h1>
                      </div>
                      <br></br>
                    </HERBUI.Col>
                  </HERBUI.Row>
                  <HERBUI.Row>
                    <HERBUI.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                      <HERBUI.InputGroup className="mb-4p5">
                        <span className="label-text-style">
                          <b>State:</b>
                          <span className="text-danger">*</span>
                        </span>

                        <Field
                          type="hidden"
                          name="entered_by"
                          className="form-control"
                        ></Field>

                        <Field
                          type="hidden"
                          name="go_wet"
                          className="form-control"
                        ></Field>

                        <Field
                          as="select"
                          name="state_id"
                          className="form-control"
                          onChange={handleChange}
                        >
                          <option value="">Select</option>
                          <option value="01">Andra Pradesh</option>
                          <option value="02">Central</option>
                          <option value="03">Tamilnadu</option>
                          <option value="04">Karnataka</option>
                          <option value="05">Kerala</option>
                          <option value="06">Maharashtra</option>
                          <option value="07">West Bengal</option>
                          <option value="08">Orissa</option>
                          <option value="09">Madhya Pradesh</option>
                          <option value="10">Gujarat</option>
                          <option value="11">Bihar</option>
                          <option value="12">Rajasthan</option>
                          <option value="13">Nagaland</option>
                          <option value="14">Burma</option>
                          <option value="15">Goa</option>
                          <option value="16">Panjab</option>
                          <option value="17">Uttar Pradesh</option>
                          <option value="18">Haryana</option>
                          <option value="19">Himachal Pradesh</option>
                          <option value="20">Assam</option>
                          <option value="21">Jammu and Kashmir</option>
                          <option value="22">Manipur</option>
                          <option value="23">Sikkim</option>
                          <option value="24">Tripura</option>
                          <option value="25">Meghalaya</option>{" "}
                          <option value="33">PONDICHARY</option>
                          <option value="34">ARUNACHAL PRADESH</option>
                          <option value="35">CHHATTISGARH </option>
                          <option value="36">UTTARANCHAN PRADESH</option>
                          <option value="37">MIZORAM</option>
                          <option value="38">JHARKHAND</option>
                          <option value="44">Uttaranchal</option>
                          <option value="45">Mizoram</option>
                        </Field>

                        {touched.state_id && errors.state_id ? (
                          <span className="text-danger">{errors.state_id}</span>
                        ) : null}
                      </HERBUI.InputGroup>
                    </HERBUI.Col>

                    <HERBUI.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                      <HERBUI.InputGroup className="mb-4p5">
                        <span className="label-text-style">
                          <b>Emp ID:</b>
                          <span className="text-danger">*</span>
                        </span>

                        <Field
                          as="select"
                          name="emp_id"
                          className="form-control"
                          onChange={handleChange}
                        >
                          <option value="">Select</option>
                          <option value="01">Civil Pension</option>
                          <option value="02">AST Pension</option>
                          <option value="03">FA Pension</option>
                          <option value="04">Political Pension</option>
                          <option value="05">W & E Pension</option>
                          <option value="06">Monsob Mamool</option>
                          <option value="07">Jaghir Pension</option>
                          <option value="08">Youmaih</option>
                          <option value="09">C P Pension</option>
                          <option value="10">zilla parishad</option>
                          <option value="11">municipal</option>
                          <option value="12">Fa & Funeral expenses</option>
                          <option value="13">Gratuity payment</option>
                          <option value="14">Commutation Payment</option>
                          <option value="15">Income-TAX Deduction</option>
                          <option value="16">VO/VRO/VAO/PS</option>
                          <option value="17">NPS-SuperAnnuation</option>
                          <option value="18">NPS-Family-Pension</option>
                          <option value="19">APSWREIS & KVIB Pension</option>
                          <option value="99">OTHGOVTS</option>
                        </Field>

                        {touched.emp_id && errors.emp_id ? (
                          <span className="text-danger">{errors.emp_id}</span>
                        ) : null}
                      </HERBUI.InputGroup>
                    </HERBUI.Col>

                    <HERBUI.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                      <HERBUI.InputGroup className="mb-4p5">
                        <span className="label-text-style">
                          <b>Preset RPS:</b>
                          <span className="text-danger">*</span>
                        </span>

                        <Field
                          type="text"
                          name="present_rps"
                          className="form-control"
                        ></Field>

                        {touched.present_rps && errors.present_rps ? (
                          <span className="text-danger">
                            {errors.present_rps}
                          </span>
                        ) : null}
                      </HERBUI.InputGroup>
                    </HERBUI.Col>

                    <HERBUI.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                      <HERBUI.InputGroup className="mb-4p5">
                        <span className="label-text-style">
                          <b>Allowance:</b>
                          <span className="text-danger">*</span>
                        </span>

                        <Field
                          as="select"
                          name="allowance_id"
                          className="form-control"
                          onChange={handleChange}
                        >
                          <option value="">Select</option>
                          <option value="01">Dearness Relief</option>
                          <option value="02">Interium Relief</option>
                          <option value="03">Festival Advance</option>
                          <option value="04">Medical Allowence</option>
                          <option value="05">Domestic Help Allow</option>
                          <option value="10">Deduction</option>
                        </Field>

                        {touched.allowance_id && errors.allowance_id ? (
                          <span className="text-danger">
                            {errors.allowance_id}
                          </span>
                        ) : null}
                      </HERBUI.InputGroup>
                    </HERBUI.Col>
                  </HERBUI.Row>

                  <HERBUI.Row>
                    <HERBUI.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                      <HERBUI.InputGroup className="mb-4p5">
                        <span className="label-text-style">
                          <b>DOC ID:</b>
                          <span className="text-danger">*</span>
                        </span>

                        <Field
                          type="text"
                          name="doc_id"
                          className="form-control"
                        ></Field>

                        {touched.doc_id && errors.doc_id ? (
                          <span className="text-danger">{errors.doc_id}</span>
                        ) : null}
                      </HERBUI.InputGroup>
                    </HERBUI.Col>
                    <HERBUI.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                      <HERBUI.InputGroup className="mb-4p5">
                        <span className="label-text-style">
                          <b>G.O NO:</b>
                          <span className="text-danger">*</span>
                        </span>

                        <Field
                          type="text"
                          name="go_no"
                          className="form-control"
                        ></Field>

                        {touched.go_no && errors.go_no ? (
                          <span className="text-danger">{errors.go_no}</span>
                        ) : null}
                      </HERBUI.InputGroup>
                    </HERBUI.Col>

                    <HERBUI.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                      <HERBUI.InputGroup className="mb-4p5">
                        <span className="label-text-style">
                          <b>G.O WEF:</b>
                          <span className="text-danger">*</span>
                        </span>

                        <Field
                          type="text"
                          name="go_wef"
                          className="form-control"
                        ></Field>

                        {touched.go_wef && errors.go_wef ? (
                          <span className="text-danger">{errors.go_wef}</span>
                        ) : null}
                      </HERBUI.InputGroup>
                    </HERBUI.Col>

                    <HERBUI.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                      <HERBUI.InputGroup className="mb-4p5">
                        <span className="label-text-style">
                          <b>Percentage:</b>
                          <span className="text-danger">*</span>
                        </span>

                        <Field
                          type="text"
                          name="per1"
                          className="form-control"
                        ></Field>

                        {touched.per1 && errors.per1 ? (
                          <span className="text-danger">{errors.per1}</span>
                        ) : null}
                      </HERBUI.InputGroup>
                    </HERBUI.Col>
                  </HERBUI.Row>
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
                        SUBMIT
                      </Button>
                    </Col>
                  </Row>
                </HERBUI.Card>
              </HERBUI.Container>
            </Form>
          )}
        </Formik>
      </HERBUI.Card>
    </>
  );
}
