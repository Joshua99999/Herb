import * as HERBUI from "react-bootstrap";
import { Col, Row, Button, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Formik, Field } from "formik";
import { FaEdit } from "react-icons/fa";
import DataTable from "react-data-table-component";
import LoadingServices from "../LoadingServices";

 import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
  useParams,
  useHistory,
  NavLink,
} from "react-router-dom";

const userValidationSchema = Yup.object().shape({
  searchId: Yup.string()
    .required("Search ID is Required(Min 5 & Max 12 Charcters)")
    .min(5)
    .max(12),
});

export default function PpoGetData() {

  const [empnameset, setEmpname] = useState({});
  const [apiResponse, setApiResponse] = useState({});
  const [data, setData] = React.useState({ EMPS: [] });
  const [loading, setLoading] = useState(false);
  const [empShow, setEmpShow] = useState(false);
  const history = useHistory();

  function pushToEmployeeScreen(data) {
    history.push({
      pathname: "/verificationCertificate",
      state: {
        PPOID: data.PPOID,
        NAME: data.NAME,
        ACCNO: data.ACCNO,
        BANKNAME: data.BANKNAME,
        AADHARNO: data.AADHARNO,
        
      },
    });
}
  

  const PpoGetData = (values) => {
    setEmpShow(false);

            LoadingServices.getPPOPensioner(values.searchId).then((res) => 
            {
              console.log("res............."+JSON.stringify(res))
                if (res.data) 
                {
                  setApiResponse(res.data);
                  const empData = res.data;
                 setData({ ...data, EMPS: empData.EMPS });
                setEmpShow(true);
                }
                else
                {
                alert("No Data Found");
                }
            }).catch(() => 
            {
                setTimeout(() => { }, 1000)
            })

          }

  useEffect(() => {
    callApi2();
  }, []);

  const callApi2 = async () => {
    const obj = {
      searchId: "",
     
     
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

  const columns = [
   
   
    {
        name: "PPOID",
        selector: (row) => row.PPOID,
        cell: (row, index) => (
          <Button
            size="sm"
            variant="info"
            onClick={() => pushToEmployeeScreen(row)}
          >
               { row.PPOID}
               14382004
          </Button>
        ),
        button: true,
        button: true,
      },

    {
      name: "NAME",
      selector: (row) => row.NAME,
    },
    {
      name: "ACCNO",
      selector: (row) => row.ACCNO,
    },
    {
      name: "BANKNAME",
      selector: (row) => row.BANKNAME,
    },
    {
      name: "AADHARNO",
      selector: (row) => row.AADHARNO,
    },

   
  ];

  return (
    <>
      <HERBUI.Container>
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
        <Formik
          initialValues={{ ...empnameset }}
          onSubmit={PpoGetData}
          validationSchema={userValidationSchema}
          enableReinitialize
        >
          {(props) => (
            <Form>
              <HERBUI.Card className="p-3">
                <Row className="mb-20">
                  <Col xs={12} sm={12} md={12} lg={12} xl={6} xxl={6}>
                    <label>
                      PPO ID/CFMS ID <span className="text-danger">*</span>
                    </label>
                    <Field
                      type="text"
                      name="searchId"
                      className="form-control"
                      max="12"
                    />
                    <span style={{ color: "red" }}>
                      {props.errors.searchId}
                    </span>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} xl={6} xxl={6}>
                    <br></br>
                    <Button
                      type="submit"
                      className="btn btn-success btn-sm"
                      variant="primary"
                      size="sm"
                    >
                      Get Data{" "}
                    </Button>
                  </Col>
                </Row>
              </HERBUI.Card>
            </Form>
          )}
        </Formik>
        {empShow && (
          <HERBUI.Row>
            <Col xs={12} sm={12} md={12} lg={12} xl={10} xxl={10}>
              <br></br>
              <DataTable
                columns={columns}
                pagination={true}
                progressPending={loading}
                progressComponent={<Loading />}
                paginationPerPage="30"
                data={data.EMPS}
                keyField="CFMSID"
                conditionalRowStyles={conditionalRowStyles}
              />
            </Col>
          </HERBUI.Row>
        )}
      </HERBUI.Container>
    </>
  );
}
