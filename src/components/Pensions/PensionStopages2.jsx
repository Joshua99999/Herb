import * as HERBUI from "react-bootstrap";
import { Col, Row, Button, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Formik, Field } from "formik";
import { useLocation } from "react-router";
import Pensions2 from "./Pensions2";
import Pensions3 from "./Pensions3";
import { FormikProvider, useFormik } from "formik";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import {
  IoFileTrayOutline,
  IoDocumentsOutline,
  IoCodeWorkingOutline,
  IoReturnUpForwardOutline,
} from "react-icons/io5";
import Pensions4 from "./Pensions4";
import Pensions5 from "./Pensions5";
import Pensions6 from "./Pensions6";
import Pensions7 from "./Pensions7";
import PensionStopages1 from "./PensionStopages1";
import LoadingServices from "../LoadingServices";
import PDWorkflow from "./AddNewWorkflow";
import { useDispatch, useSelector } from "react-redux";
import store from "../../store";
import PensionsStopages from "./PensionStopages";
const userValidationSchema = Yup.object().shape({
  searchId: Yup.string()
    .required("Search ID is Required(Min 5 & Max 12 Charcters)")
    .min(5)
    .max(12),
});
export default function Pensions1() {
  const totalInitialValuesFromStore = useSelector(
    (state) => state.WorkflowInitialvalues.formCreationValues
  );
  const [empnameset, setEmpname] = useState({});
  const [apiResponse, setApiResponse] = useState({});
  const [data, setData] = React.useState({ EMPS: [] });
  const [loading, setLoading] = useState(false);
  const [empShow, setEmpShow] = useState(false);
  const location = useLocation();
  const [cfmsId, setCfmsId] = useState();

  const [name, setName] = useState();
  const [fatherName, setFatherName] = useState();
  const [gender, setGender] = useState();
  const [dob, setDob] = useState();
  const [desgCode, setDesgCode] = useState();
  const [tabIndex, setTabIndex] = useState(0);

  const formik = useFormik({
    initialValues: totalInitialValuesFromStore,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  // const getEmpDetails = async (values) => {
  //   try
  //   {
  //     setEmpShow(false);
  //     const req = values;
  //      const res = await axios.get(
  //       "https://10.10.0.219:8451/master/pensions/ppoid/" + values.searchId
  //     );

  //     setApiResponse(res.data);
  //       const empData = res.data;
  //     setData({ ...data, EMPS: empData });
  //     setEmpShow(true);
  //   } catch (e) {
  //      console.log(e);
  //   }
  // };
  const [ddoCode, setDdoCode] = useState();
  const getEmpDetails = (values) => {
    setDdoCode({ ...ddoCode, employee: values.employee });

    LoadingServices.getValuestoForm(values.searchId)
      .then((res) => {
        console.log("res............." + JSON.stringify(res));
        if (res.data) {
          // setGroupList(res.data)
          // localStorage.setItem('groupListData', JSON.stringify(res.data))
          // setListOptions({ ...listOptions, groupsList: res.data })
        } else {
        }
      })
      .catch(() => {
        setTimeout(() => {}, 1000);
      });
  };

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
      callApi2();
    }
  }, [location.state]);

  const callApi2 = async () => {
    const obj = {
      searchId: "",
      title: "",
      gender: "",
      maritalstatus: "",
      religion: "",
      community: "",
      phstatus: "",
      bankIFSC: "",
      surname: "",
      bankAccountNumber: "",
      ConfirmationBankAccountNumber: "",
    };
    setEmpname(obj);
  };

  const conditionalRowStyles = [
    {
      when: (row) => row.POSID === 0,
      style: {
        backgroundColor: "red",
      },
    },
  ];
  function Loading() {
    return (
      <>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </>
    );
  }

  return (
    <>
      {/* <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data" id='formId'> */}
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
          >
            <div className="inner-herbpage-service-title1">
              <h1>Pensions Module</h1>
            </div>
          </HERBUI.Col>
        </HERBUI.Row>
      </HERBUI.Container>

      <HERBUI.Container className="outer-page-content-container ">
        <HERBUI.Card className="p-3">
          <Row className="mb-20">
            <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
              CFMS ID:<label> {cfmsId}</label>
            </Col>

            <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
              Employee Name: <label> {name}</label>
            </Col>

            <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
              Father Name: <label>{fatherName}</label>
            </Col>
          </Row>

          <Row className="mb-20">
            <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
              Gender:<label> {gender}</label>
            </Col>

            <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
              DOB: <label> {dob}</label>
            </Col>

            <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
              DESGCODE: <label>{desgCode}</label>
            </Col>
          </Row>

          <Tabs
            selectedIndex={tabIndex}
            onSelect={(index) => setTabIndex(index)}
          >
            <TabList>
              <Tab>
                <IoDocumentsOutline className="tabicon" />
                Pension Stopage
              </Tab>
              <Tab>
                <IoDocumentsOutline className="tabicon" />
                Work Flow
              </Tab>
              {/* <Tab>
                  <IoDocumentsOutline className="tabicon" />
                  WorkFlow
                </Tab> */}
            </TabList>

            <TabPanel>
              <PensionStopages1 empUniqueId={cfmsId}></PensionStopages1>
            </TabPanel>

            <TabPanel>
              <PDWorkflow formik={formik} />
              <Row className="mb-20">
                <Col xs={12} sm={12} md={12} lg={9} xl={8} xxl={8}></Col>
                <Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
                  <br></br>
                  <Button
                    type="submit"
                    className="btn btn-success btn-sm pull-right"
                    variant="primary"
                    size="sm"
                  >
                    Save
                  </Button>
                </Col>
              </Row>
            </TabPanel>
          </Tabs>
        </HERBUI.Card>
      </HERBUI.Container>
      {/* </form>
        </FormikProvider> */}
    </>
  );
}
