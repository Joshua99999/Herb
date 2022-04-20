import { useState } from "react";
import AuthService from "../services/AuthService";

import { useDispatch } from "react-redux";
import { Row, Col, Button, Alert } from "react-bootstrap";

import * as Yup from "yup";
import { Formik } from "formik";
import { ACCOUNT_INITIALIZE } from "../store/actions";

function Login() {
  const dispatcher = useDispatch();

  return (
    <>
      <Formik
        initialValues={{
          username: "",
          password: "",
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().max(255).required("Username is required"),
          password: Yup.string().max(255).required("Password is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            dispatcher({
                type: ACCOUNT_INITIALIZE,
                payload: {
                  isLoggedIn: true,
                  user: { user: "user" },
                  token: "ghgkl",
                },
              });

            AuthService.login(values.username, values.password)
              .then(function (response) {
                if (response.status === 200) {
                  let jsonData = response.data;
                  console.log("jsonData..." + JSON.stringify(jsonData));
                  jsonData["username"] = values.username;
                  dispatcher({
                    type: ACCOUNT_INITIALIZE,
                    payload: {
                      isLoggedIn: true,
                      user: jsonData,
                      token: response.data.access_token,
                    },
                  });
                  setStatus({ success: true });
                  setSubmitting(false);
                } else {
                  setStatus({ success: false });
                  setErrors({ submit: response.data.error_description });
                  setSubmitting(false);
                }
              })
              .catch(function (error) {
                let msg = error.message;
                if (error.response) {
                  if (error.response.status === 401) {
                    msg = error.response.data.error_description;
                  }
                }

                setStatus({ success: false });
                setErrors({ submit: msg });
                setSubmitting(false);
              });
          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <div className="row align-items-center g-lg-5 py-5">
            <div className="form-floating mb-3">
              <div className="container col-xl-10 col-xxl-8 px-4 py-5">
                <form
                  noValidate
                  onSubmit={handleSubmit}
                  className="p-4 p-md-5 border rounded-3 bg-light"
                >
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      error={touched.username && errors.username}
                      placeholder="Username"
                      name="username"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.username}
                    />
                    <label htmlFor="username">Username</label>
                    {touched.username && errors.username && (
                      <small className="text-danger form-text">
                        {errors.username}
                      </small>
                    )}
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      error={touched.password && errors.password}
                      placeholder="Password"
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="password"
                      value={values.password}
                    />
                    <label htmlFor="password">Password</label>
                    {touched.password && errors.password && (
                      <small className="text-danger form-text">
                        {errors.password}
                      </small>
                    )}
                  </div>

                  {errors.submit && (
                    <Col sm={12}>
                      <Alert variant="danger">{errors.submit}</Alert>
                    </Col>
                  )}

                  <Row>
                    <Col mt={2}>
                      <Button
                        className="btn-block"
                        color="primary"
                        disabled={isSubmitting}
                        size="large"
                        type="submit"
                        variant="primary"
                      >
                        Login
                      </Button>
                    </Col>
                  </Row>
                </form>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}

export default Login;
