import * as HERBUI from "react-bootstrap";
import { Col, Row, Button, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Formik, Field } from "formik";
import DataTable from "react-data-table-component";
import LoadingServices from "../LoadingServices";

const userValidationSchema = Yup.object().shape({
  discription: Yup.string().required("Required"),
});

export default function AddAllowance() {
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

  // const List = async (e) => {
  //   try {
  //     const res = await axios.get(
  //       "https://10.10.0.219:8451/master//pensions/getAllowanceCodes/"
  //     );
  //     console.log("data...." + JSON.stringify(res.data));
  //     setApiResponse(res.data);
  //     console.log("LIST====>" + res.data);
  //     const empData = res.data;
  //     setData({ ...data, EMPS: empData.EMPS });
  //     setEmpShow(true);
  //   } catch (e) {
  //     alert("exception=>" + console.log(e));
  //     console.log("exception===>" + e);
  //   }
  // };
  const List = () => {
 
    LoadingServices.getPPOValuestoForm5().then((res) => 
    {
      console.log("fill data===>"+res.data.inward_no);
         if (res.data) 
        { 
          console.log("data...." + JSON.stringify(res.data));
      setApiResponse(res.data);
      console.log("LIST====>" + res.data);
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
        console.log("Exception Occured");
    })

  }

  // const submitDetails = async (values) => {
  //   try {
  //     const req = values;
  //     console.log(req);
  //     const res = await axios.post(
  //       "https://10.10.0.219:8451/master/pensions/saveAllowanceCodes",

  //       req
  //     );
  //     List();
  //   } catch (e) {
  //     alert("exception=>" + console.log(e));
  //     console.log("exception===>" + e);
  //   }
  // };

  const submitDetails = (values) => {
         
    LoadingServices.submitPPOForm5Details(values).then((res) => 
    {
      console.log(res.data);
         if (res.data) 
        { 
          List();
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
      name: "ALLOWANCEID",
      selector: (row) => row.ALLOWANCEID,
    },

    {
      name: "DESCRIPTION",
      selector: (row) => row.DESCRIPTION,
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
                <br></br>
                <HERBUI.Row>
                  <HERBUI.Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <div className="inner-herbpage-service-title-sub">
                      <h1>Add Allowance</h1>
                    </div>
                    <br></br>
                  </HERBUI.Col>
                </HERBUI.Row>
                <HERBUI.Row>
                  <HERBUI.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                    <HERBUI.InputGroup className="mb-4p5">
                      <span className="label-text-style">
                        <b>Allowance Name:</b>
                        <span className="text-danger">*</span>
                      </span>

                      <Field
                        type="text"
                        name="discription"
                        className="form-control"
                      />
                      {touched.discription && errors.discription ? (
                        <span className="text-danger">
                          {errors.discription}
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

          {empShow && (
            <HERBUI.Row>
              <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <br></br>
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
