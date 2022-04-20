import * as HERBUI from "react-bootstrap";
import { Col, Row, Button, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Formik, Field } from "formik";
import DataTable from "react-data-table-component";

const userValidationSchema = Yup.object().shape({
  discription: Yup.string().required("Required"),
});

export default function PPOList() {
  const setValues = {
    discription: "",
  };
  const [apiResponse, setApiResponse] = useState({});
  const [data, setData] = React.useState({ EMPS: [] });
  const [loading, setLoading] = useState(false);
  const [empShow, setEmpShow] = useState(false);
  useEffect(() => {
    List();
  }, []);

  const List = async (e) => {
    try {
      const res = await axios.get(
        "https://10.10.0.219:8451/master//pensions/getMainData/"
      );
      console.log("data...." + JSON.stringify(res.data));
      setApiResponse(res.data);
      console.log("LIST====>" + res.data);
      const empData = res.data;
      setData({ ...data, EMPS: empData.EMPS });
      setEmpShow(true);
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
        "https://10.10.0.219:8451/master/pensions/saveAllowanceCodes",

        req
      );
      List();
    } catch (e) {
      alert("exception=>" + console.log(e));
      console.log("exception===>" + e);
    }
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
      name: "S.No",
      cell: (row, index) => index + 1,
      selector: (row) => row.slno,
    },
    {
      name: "PPO ID",
      selector: (row) => row.ppo_id,
    },

    {
      name: "PPO NO",
      selector: (row) => row.ppo_no,
    },

    {
      name: "NAME",
      selector: (row) => row.sp_name,
    },

    {
      name: "FATHER NAME",
      selector: (row) => row.fp_name,
    },

    {
      name: "IFSC CODE",
      selector: (row) => row.ifsccode,
    },

    {
      name: "BANK ACCOUNT NO",
      selector: (row) => row.bank_accno,
    },

    {
      name: "SPOP",
      selector: (row) => row.spop,
    },

    {
      name: "EFPOP",
      selector: (row) => row.efpop,
    },

    {
      name: "FP",
      selector: (row) => row.fp,
    },

    {
      name: "Action",
      cell: (row, index) => (
        <Button size="sm" variant="info">
          ACTION
        </Button>
      ),
    },
  ];
  return (
    <>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <HERBUI.Container className="outer-page-content-container ">
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
                      <h1>PPO LIST</h1>
                    </div>
                    <br></br>
                  </HERBUI.Col>
                </HERBUI.Row>
              </Form>
            )}
          </Formik>

          {empShow && (
            <HERBUI.Row>
              <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <DataTable
                  columns={columns}
                  pagination={true}
                  progressPending={loading}
                  progressComponent={<Loading />}
                  paginationPerPage="50"
                  data={data.EMPS}
                  keyField="CFMSID"
                  conditionalRowStyles={conditionalRowStyles}
                />
              </Col>
            </HERBUI.Row>
          )}
        </HERBUI.Card>
      </HERBUI.Container>
    </>
  );
}
