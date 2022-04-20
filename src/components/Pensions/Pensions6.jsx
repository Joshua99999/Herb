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
  stopage_date:Yup.string().required("Required"),
  remarks:Yup.string().required("Required")
});

export default function Pensions6({ empUniqueId }) {
  const [isCompo, setIsCompo] = useState(false);
  const [isAp, setIsAp] = useState(false);
  const [isTs, setIsTs] = useState(false);
  const [isOg, setIsOg] = useState(false);
  const [openBlock, setOpenBlock] = useState(false);
  const [recoveryBlock, setRecoveryBlock] = useState(false);

  const [empCfmsId, setEmpCfmsId] = useState();
  const [defaultValues, setDefaultValues] = useState({});


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
  const submitDetails = values => {
    LoadingServices.submitstoppageDetails(values).then((res) => {
      console.log(res.data);
      if (res.data) {
        alert("Success");
      }
      else {
        alert("No Data Found");
      }
    }).catch(() => {
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
          initialValues={{stopage_date:"",remarks:""}}
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
                    <h1>Stopage Service</h1>
                  </div>
                  <br></br>
                </HERBUI.Col>
              </HERBUI.Row>
              <HERBUI.Row>
                <HERBUI.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>Stopage Date:</b>
                      <span className="text-danger">*</span>
                    </span>

                    <Field
                      type="date"
                      name="stopage_date"
                      className="form-control"
                      
                    />
                     {touched.stopage_date && errors.stopage_date ? (
                    <span className="text-danger">
                      {errors.stopage_date}
                    </span>
                  ) : null}
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
                      
                    />
                    {touched.remarks && errors.remarks ? (
                    <span className="text-danger">
                      {errors.remarks}
                    </span>
                  ) : null}
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
