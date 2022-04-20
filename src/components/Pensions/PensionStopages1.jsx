import * as HERBUI from "react-bootstrap";
import { Col, Card, Row, Button, FormGroup, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Formik, Field } from "formik";
import { useLocation } from "react-router";
import { CardBody } from "reactstrap";
import LoadingServices from "../LoadingServices";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import {
  IoFileTrayOutline,
  IoDocumentsOutline,
  IoCodeWorkingOutline,
  IoReturnUpForwardOutline,
} from "react-icons/io5";

const userValidationSchema = Yup.object().shape({
  //cfms_id: Yup.string().required("Required"),
  //gpo_no: Yup.string().required("Required"),
  stopType: Yup.string().required(" Select stopType"),
  stopSubType: Yup.string().required(" Select  stopSubType Reason"),
  stopDate: Yup.string().required(" Select The stopDate "),
  remarks: Yup.string().required(" Enter The Remarks "),
});

export default function PensionsStopage({ empUniqueId }) {
  // const [isCompo, setIsCompo] = useState(false);
  // const [isAp, setIsAp] = useState(false);
  // const [isTs, setIsTs] = useState(false);
  // const [isOg, setIsOg] = useState(false);
  const [openBlock, setOpenBlock] = useState(false);
  const [recoveryBlock, setRecoveryBlock] = useState(false);
  const location = useLocation();
  const [empCfmsId, setEmpCfmsId] = useState();
  const [defaultValues, setDefaultValues] = useState({});

  const [cfmsId, setCfmsId] = useState();

  const [name, setName] = useState();
  const [fatherName, setFatherName] = useState();
  const [gender, setGender] = useState();
  const [dob, setDob] = useState();
  const [desgCode, setDesgCode] = useState();
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    if (
      location.state !== undefined &&
      location.state !== "" &&
      location.state !== null
    ) {
      setCfmsId(location.state.cfmsId);
      setName(location.state.empName);
      setFatherName(location.state.fatherName);
      setGender(location.state.gender);
      setDob(location.state.dob);
      setDesgCode(location.state.desgCode);
    }
  }, [location.state]);

  const initialValues = {
    ppoId: empCfmsId,
    stopType: defaultValues.stopType ? defaultValues.stopType : "",
    stopSubType: defaultValues.stopSubType ? defaultValues.stopSubType : "",
    stopDate: defaultValues.stopDate ? defaultValues.stopDate : "",
    remarks: defaultValues.remarks ? defaultValues.remarks : "",
  };

  useEffect(() => {
    getStopType();
    setEmpCfmsId(empUniqueId);
  }, [empUniqueId, initialValues.stopType]);

  useEffect(() => {
    getValuestoForm();
  }, []);

  const getValuestoForm = (values) => {
    LoadingServices.getPPOValuestoForm1("14382004")
      .then((res) => {
        if (res.data) {
          //console.log(JSON.stringify(res.data[0]));
          setSubStopTypeId(res.data[0].stopSubType);
          setDefaultValues(res.data[0]);
        } else {
          alert("No Data Found");
        }
      })
      .catch(() => {
        console.log("Exception Occured92");
      });
  };

  const openBlock1 = (e) => {
    setOpenBlock(e.target.checked);
  };

  const openRecoveryBlock = (e) => {
    if (e.target.value === "true") setRecoveryBlock(true);
    else setRecoveryBlock(false);
  };

  const [showStopType, setStopType] = useState();
  const [showSubStopTypeAll, setSubStopTypeAll] = useState();
  const [showSubStopType, setSubStopType] = useState();

  const [SubStopTypeId, setSubStopTypeId] = useState();

  const getStopType = async (e) => {
    try {
      const stopage = await axios.get(
        "https://192.168.0.105:8451/master/pensions/stoptype"
      );
      // alert(JSON.stringify(stopage));
      // alert(JSON.stringify(stopage.data.StopTypeList));
      setStopType(stopage.data.StopTypeList);
      setSubStopTypeAll(stopage.data.StopTypeSubList);
      //if (initialValues.stopType !== "")
      if (initialValues.stopType !== "") {
        getsubStopType(initialValues.stopType, stopage.data.StopTypeSubList);
      }
    } catch (e2) {
      console.log("exceptiony===>" + e2);
    }
  };
  // const checkStoptypeSetNull = (e) => {
  //   if (initialValues.stopType !== e.target.value) {
  //     setSubStopTypeId("0");
  //   }
  // };

  const getsubStopType = (e, sublist) => {
    try {
      // alert("e.................." + e);
      // alert(
      //   "list............................................................" +
      //     JSON.stringify(sublist)
      // );
      // console.log(sublist.filter((i) => parseInt(i.stopId) === parseInt(e)));
      if (sublist !== undefined)
        setSubStopType(
          sublist.filter((i) => parseInt(i.stopId) === parseInt(e))
        );
      // setSubStopType(showSubStopTypeAll.filter((i) => i.stopId === e + ""));
    } catch (e) {
      console.log("exception125===>" + e);
    }
  };

  const onSubmit = (values) => {
    alert("*saved*");
    LoadingServices.submitPPOFormstopageDetails(values)
      .then((res) => {
        console.log(res);
        console.log(JSON.stringify(res.data));
        if (res.data) {
          alert("Success");
        } else {
          alert("No Data Found");
        }
      })
      .catch(() => {
        console.log("Exception Occured:");
      });
  };

  return (
    <>
      <HERBUI.Container className="fluidd">
        <HERBUI.Row>
          <HERBUI.Col
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            xxl={12}
            className="page-titlespacing"
          ></HERBUI.Col>
        </HERBUI.Row>
        <HERBUI.Container className="outer-page-content-container ">
          <HERBUI.Card className="p-3">
            <Formik
              initialValues={initialValues}
              validationSchema={userValidationSchema}
              onSubmit={onSubmit}
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
                    <HERBUI.Col
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      xxl={12}
                    >
                      <div className="inner-herbpage-service-title-sub">
                        <h1>Stopage Service</h1>
                      </div>
                    </HERBUI.Col>
                  </HERBUI.Row>
                  <Card.Body className="panel-body">
                    <Row>
                      <Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                        {" "}
                        <FormGroup className="form-group">
                          <label className=" control-label">Stop Type:</label>
                          <Field
                            as="select"
                            name="stopType"
                            onChange={(event) => {
                              handleChange(event);

                              getsubStopType(
                                event.target.value,
                                showSubStopTypeAll
                              );
                            }}
                            id="stopType"
                            className="form-control"
                          >
                            <option value="0">Select</option>
                            {showStopType &&
                              showStopType.map((item, i) => {
                                return (
                                  <>
                                    <option key={i} value={item.stopId}>
                                      {item.stopName}
                                    </option>
                                  </>
                                );
                              })}
                          </Field>{" "}
                          {touched.stopType && errors.stopType ? (
                            <span style={{ color: "red" }}>
                              {errors.stopType}
                            </span>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                        {" "}
                        <label className=" control-label">
                          <b>stoptype Reason: </b>
                        </label>
                        <Field
                          as="select"
                          name="stopSubType"
                          id="stopSubType"
                          className="form-control"
                          // onChange={handleChange}
                          onChange={(event) => {
                            handleChange(event);
                            // getsubStopType(event.target.value, showSubStopType);
                          }}
                        >
                          <option value="0">Select</option>
                          {showSubStopType &&
                            showSubStopType.map((item, i) => {
                              return (
                                <>
                                  <option key={i} value={item.stopSubId}>
                                    {item.stopSubName}
                                  </option>
                                </>
                              );
                            })}
                        </Field>
                        {touched.stopSubType && errors.stopSubType ? (
                          <span style={{ color: "red" }}>
                            {errors.stopSubType}
                          </span>
                        ) : null}
                      </Col>
                    </Row>
                  </Card.Body>
                  <br /> <br />
                  <HERBUI.Row>
                    <HERBUI.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                      <HERBUI.InputGroup className="mb-4p5">
                        <span className="label-text-style">
                          <b>Stopage Date:</b>
                          <span className="text-danger">*</span>
                        </span>

                        <Field
                          type="date"
                          name="stopDate"
                          className="form-control"
                          id="stopDate"
                        />
                        {touched.stopDate && errors.stopDate ? (
                          <span style={{ color: "red" }}>
                            {errors.stopDate}
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
                          id="remarks"
                        />
                        {touched.remarks && errors.remarks ? (
                          <span style={{ color: "red" }}>{errors.remarks}</span>
                        ) : null}
                      </HERBUI.InputGroup>
                    </HERBUI.Col>
                    <center>
                      <row>
                        <HERBUI.Col
                          xs={12}
                          sm={12}
                          md={12}
                          lg={3}
                          xl={3}
                          xxl={3}
                        >
                          <Button
                            type="submit"
                            className="btn btn-success btn-sm pull-right"
                            variant="primary"
                            size="sm"
                          >
                            Save & Continue
                          </Button>
                        </HERBUI.Col>
                      </row>
                      <br />
                    </center>
                  </HERBUI.Row>
                </Form>
              )}
            </Formik>
          </HERBUI.Card>
        </HERBUI.Container>
      </HERBUI.Container>
      <></>
    </>
  );
}
