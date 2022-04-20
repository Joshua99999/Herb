import * as HERBUI from "react-bootstrap";
import { Col, Row, Button, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Formik, Field } from "formik";
import { toast, ToastContainer } from "react-toastify";
import LoadingServices from "../LoadingServices";
const userValidationSchema = Yup.object().shape({
  cfms_id: Yup.string().required(" Required"),
});

export default function Pensions3({ empUniqueId }) {
  useEffect(() => {
    setValuestoForm();
  }, []);

  // const setValuestoForm = async (e) => {
  //   try {
  //     const res = await axios.get(
  //     "https://10.10.0.219:8451/master//pensions/getBasicData/"   + empUniqueId
  //     );
  //     console.log(res.data);
  //     setDefaultValues(res.data);
  //     if (res.data.scode === "01") {
  //       toast.success(res.data.SDESC, { autoClose: false });
  //     }
  //   } catch (e) {
  //     alert("exception=>" + console.log(e));
  //     console.log("exception===>" + e);
  //   }
  // };

  const setValuestoForm = (values) => {
 
    LoadingServices.getPPOValuestoForm2(empUniqueId).then((res) => 
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

  const [empCfmsId, setEmpCfmsId] = useState();
  const [defaultValues, setDefaultValues] = useState({});

  const setValues = {
    cfms_id: empCfmsId,
    sp_from: defaultValues.sp_from ? defaultValues.sp_from : "",
    sp_up_to: defaultValues.sp_up_to ? defaultValues.sp_up_to : "",
    sp_og_sp_amt: defaultValues.sp_og_sp_amt ? defaultValues.sp_og_sp_amt : "",
    sp_comp_amt: defaultValues.sp_comp_amt ? defaultValues.sp_comp_amt : "",
    sp_ap_amt: defaultValues.sp_ap_amt ? defaultValues.sp_ap_amt : "",
    sp_ts_amt: defaultValues.sp_ts_amt ? defaultValues.sp_ts_amt : "",
    sp_cut_from: defaultValues.sp_cut_from ? defaultValues.sp_cut_from : "",
    sp_cut_up_to: defaultValues.sp_cut_up_to ? defaultValues.sp_cut_up_to : "",
    sp_cut_per: defaultValues.sp_cut_per ? defaultValues.sp_cut_per : "",
    sp_cut_amt_fixed: defaultValues.sp_cut_amt_fixed
      ? defaultValues.sp_cut_amt_fixed
      : "",
    sp_amt_after_cut: defaultValues.sp_amt_after_cut
      ? defaultValues.sp_amt_after_cut
      : "",
    sp_total_amt: defaultValues.sp_total_amt ? defaultValues.sp_total_amt : "",
    fp_from: defaultValues.fp_from ? defaultValues.fp_from : "",
    fp_up_to: defaultValues.fp_up_to ? defaultValues.fp_up_to : "",
    fp_og_nfp_amt: defaultValues.fp_og_nfp_amt
      ? defaultValues.fp_og_nfp_amt
      : "",
    fp_comp_amt: defaultValues.fp_comp_amt ? defaultValues.fp_comp_amt : "",
    fp_ap_amt: defaultValues.fp_ap_amt ? defaultValues.fp_ap_amt : "",
    fp_ts_amt: defaultValues.fp_ts_amt ? defaultValues.fp_ts_amt : "",
    fp_total_amt: defaultValues.fp_total_amt ? defaultValues.fp_total_amt : "",
    efp_from: defaultValues.efp_from ? defaultValues.efp_from : "",
    efp_up_to: defaultValues.efp_up_to ? defaultValues.efp_up_to : "",
    efp_og_efp_amt: defaultValues.efp_og_efp_amt
      ? defaultValues.efp_og_efp_amt
      : "",
    efp_comp_amt: defaultValues.efp_comp_amt ? defaultValues.efp_comp_amt : "",
    efp_ap_amt: defaultValues.efp_ap_amt ? defaultValues.efp_ap_amt : "",
    efp_ts_amt: defaultValues.efp_ts_amt ? defaultValues.efp_ts_amt : "",
    efp_total_amt: defaultValues.efp_total_amt
      ? defaultValues.efp_total_amt
      : "",
    police_seva: defaultValues.police_seva ? defaultValues.police_seva : "",
    uttama_seva: defaultValues.uttama_seva ? defaultValues.uttama_seva : "",
    visishta_seva: defaultValues.visishta_seva
      ? defaultValues.visishta_seva
      : "",
    member_type: defaultValues.member_type ? defaultValues.member_type : "",
    membership_fee: defaultValues.membership_fee
      ? defaultValues.membership_fee
      : "",

    ifsc_code: defaultValues.ifsc_code ? defaultValues.ifsc_code : "",
    bank_acc_no: defaultValues.bank_acc_no ? defaultValues.bank_acc_no : "",
  };

  useEffect(() => {
    setEmpCfmsId(empUniqueId);
  }, [empUniqueId]);

  // const submitDetails = async (values) => {
  //   try {
  //     const req = values;
  
  //     console.log(req);
  //     const res = await axios.post(
  //       "https://10.10.0.219:8451/master/pensions/savePpoBasicData",

  //       req
  //     );
  //     console.log(res.data);
  //   } catch (e) {
  //     alert("exception=>" + console.log(e));
  //     console.log("exception===>" + e);
  //   }
  // };

  const submitDetails = (values) => {
         
    LoadingServices.submitPPOForm2Details(values).then((res) => 
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
        <HERBUI.Row>
          <HERBUI.Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <div className="inner-herbpage-service-title-sub">
              <h1>Pensioner Basic Information</h1>
            </div>
            <br></br>
          </HERBUI.Col>
        </HERBUI.Row>
        <Formik
          initialValues={setValues}
          onSubmit={submitDetails}
          validationSchema={userValidationSchema}
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
                <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>SP From (DOC):</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      type="hidden"
                      name="cfms_id"
                      className="form-control"
                      value={empCfmsId}
                    />
                    <Field
                      type="date"
                      placeholder="SP From (DOC)"
                      name="sp_from"
                      
                      className="form-control"
                    />

                    {touched.sp_from && errors.sp_from ? (
                      <span className="text-danger">{errors.sp_from}</span>
                    ) : null}
                  </HERBUI.InputGroup>
                </HERBUI.Col>
                <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>SP Upto:</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      type="date"
                      placeholder="SP Upto"
                      name="sp_up_to"
                     
                      className="form-control"
                    />
                    {touched.sp_up_to && errors.sp_up_to ? (
                      <span className="text-danger">{errors.sp_up_to}</span>
                    ) : null}
                  </HERBUI.InputGroup>
                </HERBUI.Col>
                <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>OG/SP Amt(04):</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      type="text"
                      placeholder="OG/SP Amt(04)"
                      name="sp_og_sp_amt"
                      maxLength="15"
                      className="form-control"
                    />
                    {touched.sp_og_sp_amt && errors.sp_og_sp_amt ? (
                      <span className="text-danger">{errors.sp_og_sp_amt}</span>
                    ) : null}
                  </HERBUI.InputGroup>
                </HERBUI.Col>
              </HERBUI.Row>

              <HERBUI.Row>
                <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>Service Pen.Comp(14):</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      type="text"
                      placeholder="Service Pen.Comp"
                      name="sp_comp_amt"
                      maxLength="15"
                      className="form-control"
                    />
                    {touched.sp_comp_amt && errors.sp_comp_amt ? (
                      <span className="text-danger">{errors.sp_comp_amt}</span>
                    ) : null}
                  </HERBUI.InputGroup>
                </HERBUI.Col>
                <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>Service Pen.AP(24):</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      type="text"
                      placeholder="Service Pen.AP(24)"
                      name="sp_ap_amt"
                      maxLength="15"
                      className="form-control"
                    />
                    {touched.sp_ap_amt && errors.sp_ap_amt ? (
                      <span className="text-danger">{errors.sp_ap_amt}</span>
                    ) : null}
                  </HERBUI.InputGroup>
                </HERBUI.Col>
                <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>Service Pen.TS(34):</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      type="text"
                      placeholder="Service Pen.TS(34)"
                      name="sp_ts_amt"
                      maxLength="15"
                      className="form-control"
                    />
                    {touched.sp_ts_amt && errors.sp_ts_amt ? (
                      <span className="text-danger">{errors.sp_ts_amt}</span>
                    ) : null}
                  </HERBUI.InputGroup>
                </HERBUI.Col>
              </HERBUI.Row>

              <HERBUI.Row>
                <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>SP Cut From:</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      type="date"
                      placeholder="SP Cut From"
                      name="sp_cut_from"
                     
                      className="form-control"
                    />
                    {touched.sp_cut_from && errors.sp_cut_from ? (
                      <span className="text-danger">{errors.sp_cut_from}</span>
                    ) : null}
                  </HERBUI.InputGroup>
                </HERBUI.Col>
                <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>SP Cut Upto:</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      type="date"
                      placeholder="SP Cut Upto"
                      name="sp_cut_up_to"
                     
                      className="form-control"
                    />
                    {touched.sp_cut_up_to && errors.sp_cut_up_to ? (
                      <span className="text-danger">{errors.sp_cut_up_to}</span>
                    ) : null}
                  </HERBUI.InputGroup>
                </HERBUI.Col>
                <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>SP Cut Perecentage:</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      type="text"
                      placeholder="SP Cut Perecentage"
                      name="sp_cut_per"
                      maxLength="15"
                      className="form-control"
                    />
                    {touched.sp_cut_per && errors.sp_cut_per ? (
                      <span className="text-danger">{errors.sp_cut_per}</span>
                    ) : null}
                  </HERBUI.InputGroup>
                </HERBUI.Col>
              </HERBUI.Row>

              <HERBUI.Row>
                <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>SP Cut Amt(Fixed):</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      type="text"
                      placeholder="SP Cut Amt(Fixed)"
                      name="sp_cut_amt_fixed"
                      maxLength="15"
                      className="form-control"
                    />
                    {touched.sp_cut_amt_fixed && errors.sp_cut_amt_fixed ? (
                      <span className="text-danger">
                        {errors.sp_cut_amt_fixed}
                      </span>
                    ) : null}
                  </HERBUI.InputGroup>
                </HERBUI.Col>
                <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>SP Amt After Cut:</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      type="text"
                      placeholder="SP Amt After Cut"
                      name="sp_amt_after_cut"
                      maxLength="15"
                      className="form-control"
                    />
                    {touched.sp_amt_after_cut && errors.sp_amt_after_cut ? (
                      <span className="text-danger">
                        {errors.sp_amt_after_cut}
                      </span>
                    ) : null}
                  </HERBUI.InputGroup>
                </HERBUI.Col>
                <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>Service Pension Total(Rs):</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      type="text"
                      placeholder="Service Pension Total(Rs)"
                      name="sp_total_amt"
                      maxLength="15"
                      className="form-control"
                    />
                    {touched.sp_total_amt && errors.sp_total_amt ? (
                      <span className="text-danger">{errors.sp_total_amt}</span>
                    ) : null}
                  </HERBUI.InputGroup>
                </HERBUI.Col>
              </HERBUI.Row>

              <HERBUI.Row>
                <HERBUI.Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>Service Pension Words:</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      type="text"
                      placeholder="Service Pension Words"
                      name="words1"
                      maxLength="15"
                      className="form-control"
                      readOnly={true}
                    />
                    {touched.words1 && errors.words1 ? (
                      <span className="text-danger">{errors.words1}</span>
                    ) : null}
                  </HERBUI.InputGroup>
                </HERBUI.Col>
              </HERBUI.Row>

              <div className="inner-herbpage-service-title-sub">
                <h1>Family pension Details</h1>
              </div>
              <br></br>

              <HERBUI.Row>
                <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>Family Pension From:</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      type="date"
                      placeholder="Family Pension From"
                      name="fp_from"
                      
                      className="form-control"
                    />
                    {touched.fp_from && errors.fp_from ? (
                      <span className="text-danger">{errors.fp_from}</span>
                    ) : null}
                  </HERBUI.InputGroup>
                </HERBUI.Col>
                <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>Family Pension To:</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      type="date"
                      placeholder="Family Pension To"
                      name="fp_up_to"
                      
                      className="form-control"
                    />
                    {touched.fp_up_to && errors.fp_up_to ? (
                      <span className="text-danger">{errors.fp_up_to}</span>
                    ) : null}
                  </HERBUI.InputGroup>
                </HERBUI.Col>
                <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>OG/NFP Amt(04):</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      type="text"
                      placeholder="OG/NFP Amt(04)"
                      name="fp_og_nfp_amt"
                      maxLength="15"
                      className="form-control"
                    />
                    {touched.fp_og_nfp_amt && errors.fp_og_nfp_amt ? (
                      <span className="text-danger">
                        {errors.fp_og_nfp_amt}
                      </span>
                    ) : null}
                  </HERBUI.InputGroup>
                </HERBUI.Col>
              </HERBUI.Row>

              <HERBUI.Row>
                <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>Family Pen.Comp(14):</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      type="text"
                      placeholder="Family Pen.Comp(14)"
                      name="fp_comp_amt"
                      maxLength="15"
                      className="form-control"
                    />
                    {touched.fp_comp_amt && errors.fp_comp_amt ? (
                      <span className="text-danger">{errors.fp_comp_amt}</span>
                    ) : null}
                  </HERBUI.InputGroup>
                </HERBUI.Col>
                <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>Family Pen.AP(24):</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      type="text"
                      placeholder="Family Pen.AP(24)"
                      name="fp_ap_amt"
                      maxLength="15"
                      className="form-control"
                    />
                    {touched.fp_ap_amt && errors.fp_ap_amt ? (
                      <span className="text-danger">{errors.fp_ap_amt}</span>
                    ) : null}
                  </HERBUI.InputGroup>
                </HERBUI.Col>
                <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>Family Pen.TS(34):</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      type="text"
                      placeholder="Family Pen.TS(34)"
                      name="fp_ts_amt"
                      maxLength="15"
                      className="form-control"
                    />
                    {touched.fp_ts_amt && errors.fp_ts_amt ? (
                      <span className="text-danger">{errors.fp_ts_amt}</span>
                    ) : null}
                  </HERBUI.InputGroup>
                </HERBUI.Col>
              </HERBUI.Row>

              <HERBUI.Row>
                <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>Family Pen.Total:</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      type="text"
                      placeholder="Family Pen.Total"
                      name="fp_total_amt"
                      maxLength="15"
                      className="form-control"
                    />
                    {touched.fp_total_amt && errors.fp_total_amt ? (
                      <span className="text-danger">{errors.fp_total_amt}</span>
                    ) : null}
                  </HERBUI.InputGroup>
                </HERBUI.Col>
                <HERBUI.Col xs={12} sm={12} md={12} lg={8} xl={8} xxl={8}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>Amount In Words:</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      type="text"
                      placeholder="Amount In Words"
                      name="words2"
                      maxLength="15"
                      className="form-control"
                      readOnly={true}
                    />
                    {touched.words2 && errors.words2 ? (
                      <span className="text-danger">{errors.words2}</span>
                    ) : null}
                  </HERBUI.InputGroup>
                </HERBUI.Col>
              </HERBUI.Row>

              <div className="inner-herbpage-service-title-sub">
                <h1>Enhanced Family Pension</h1>
              </div>
              <br></br>

              <HERBUI.Row>
                <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>EFP From:</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      type="date"
                      placeholder="EFP From"
                      name="efp_from"
                      
                      className="form-control"
                    />
                    {touched.efp_from && errors.efp_from ? (
                      <span className="text-danger">{errors.efp_from}</span>
                    ) : null}
                  </HERBUI.InputGroup>
                </HERBUI.Col>
                <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>EFP Upto:</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      type="date"
                      placeholder="EFP Upto"
                      name="efp_up_to"
                      maxLength="15"
                      className="form-control"
                    />
                    {touched.efp_up_to && errors.efp_up_to ? (
                      <span className="text-danger">{errors.efp_up_to}</span>
                    ) : null}
                  </HERBUI.InputGroup>
                </HERBUI.Col>
                <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>OG/EFP Amt(04):</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      type="text"
                      placeholder="OG/EFP Amt(04)"
                      name="efp_og_efp_amt"
                      maxLength="15"
                      className="form-control"
                    />
                    {touched.efp_og_efp_amt && errors.efp_og_efp_amt ? (
                      <span className="text-danger">
                        {errors.efp_og_efp_amt}
                      </span>
                    ) : null}
                  </HERBUI.InputGroup>
                </HERBUI.Col>
              </HERBUI.Row>

              <HERBUI.Row>
                <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>Enh.Family Comp(14):</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      type="text"
                      placeholder="Enh.Family Comp(14)"
                      name="efp_comp_amt"
                      maxLength="15"
                      className="form-control"
                    />
                    {touched.efp_comp_amt && errors.efp_comp_amt ? (
                      <span className="text-danger">{errors.efp_comp_amt}</span>
                    ) : null}
                  </HERBUI.InputGroup>
                </HERBUI.Col>
                <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>Enh.Family AP(24):</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      type="text"
                      placeholder="Enh.Family AP(24)"
                      name="efp_ap_amt"
                      maxLength="15"
                      className="form-control"
                    />
                    {touched.efp_ap_amt && errors.efp_ap_amt ? (
                      <span className="text-danger">{errors.efp_ap_amt}</span>
                    ) : null}
                  </HERBUI.InputGroup>
                </HERBUI.Col>
                <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>Enh.Family TS(34):</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      type="text"
                      placeholder="Enh.Family TS(34)"
                      name="efp_ts_amt"
                      maxLength="15"
                      className="form-control"
                    />
                    {touched.efp_ts_amt && errors.efp_ts_amt ? (
                      <span className="text-danger">{errors.efp_ts_amt}</span>
                    ) : null}
                  </HERBUI.InputGroup>
                </HERBUI.Col>
              </HERBUI.Row>

              <HERBUI.Row>
                <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>Enh.Family Total:</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      type="text"
                      placeholder="Enh.Family Total"
                      name="efp_total_amt"
                      maxLength="15"
                      className="form-control"
                    />
                    {touched.efp_total_amt && errors.efp_total_amt ? (
                      <span className="text-danger">
                        {errors.efp_total_amt}
                      </span>
                    ) : null}
                  </HERBUI.InputGroup>
                </HERBUI.Col>
                <HERBUI.Col xs={12} sm={12} md={12} lg={8} xl={8} xxl={8}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>Amount in Words:</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      type="text"
                      placeholder="Amount in Words"
                      name="words3"
                      maxLength="15"
                      className="form-control"
                      readOnly={true}
                    />
                    {touched.words3 && errors.words3 ? (
                      <span className="text-danger">{errors.words3}</span>
                    ) : null}
                  </HERBUI.InputGroup>
                </HERBUI.Col>
              </HERBUI.Row>

              <div className="inner-herbpage-service-title-sub">
                <h1>Award Amounts</h1>
              </div>
              <br></br>

              <HERBUI.Row>
                <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>Police Seva:</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      type="text"
                      placeholder="Police Seva"
                      name="police_seva"
                      maxLength="15"
                      className="form-control"
                    />
                    {touched.police_seva && errors.police_seva ? (
                      <span className="text-danger">{errors.police_seva}</span>
                    ) : null}
                  </HERBUI.InputGroup>
                </HERBUI.Col>
                <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>Uttama Seva:</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      type="text"
                      placeholder="Uttama Seva"
                      name="uttama_seva"
                      maxLength="15"
                      className="form-control"
                    />
                    {touched.uttama_seva && errors.uttama_seva ? (
                      <span className="text-danger">{errors.uttama_seva}</span>
                    ) : null}
                  </HERBUI.InputGroup>
                </HERBUI.Col>
                <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>Visishta Seva:</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      type="text"
                      placeholder="Visishta Seva"
                      name="visishta_seva"
                      maxLength="15"
                      className="form-control"
                    />
                    {touched.visishta_seva && errors.visishta_seva ? (
                      <span className="text-danger">
                        {errors.visishta_seva}
                      </span>
                    ) : null}
                  </HERBUI.InputGroup>
                </HERBUI.Col>
              </HERBUI.Row>

              <div className="inner-herbpage-service-title-sub">
                <h1>Membership Fee</h1>
              </div>
              <br></br>

              <HERBUI.Row>
                <HERBUI.Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>Member Type:</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      as="select"
                      name="member_type"
                      className="form-control"
                    >
                      <option value="0">Select</option>
                      <option value="guested">Value1</option>
                      <option value="2">Value2</option>
                    </Field>
                    {touched.member_type && errors.member_type ? (
                      <span className="text-danger">{errors.member_type}</span>
                    ) : null}
                  </HERBUI.InputGroup>
                </HERBUI.Col>
                <HERBUI.Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>Membership Fee:</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      as="select"
                      name="membership_fee"
                      className="form-control"
                    >
                      <option value="0">Select</option>
                      <option value="1">Value1</option>
                      <option value="2">Value2</option>
                    </Field>
                    {touched.membership_fee && errors.membership_fee ? (
                      <span className="text-danger">
                        {errors.membership_fee}
                      </span>
                    ) : null}
                  </HERBUI.InputGroup>
                </HERBUI.Col>
              </HERBUI.Row>

              <div className="inner-herbpage-service-title-sub">
                <h1>Bank Details</h1>
              </div>
              <br></br>

              <HERBUI.Row>
                <HERBUI.Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>IFSC Code:</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      type="text"
                      placeholder="IFSC Code"
                      name="ifsc_code"
                      maxLength="15"
                      className="form-control"
                    />
                    {touched.ifsc_code && errors.ifsc_code ? (
                      <span className="text-danger">{errors.ifsc_code}</span>
                    ) : null}
                  </HERBUI.InputGroup>
                </HERBUI.Col>
                <HERBUI.Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                  <HERBUI.InputGroup className="mb-4p5">
                    <span className="label-text-style">
                      <b>Account Number:</b>
                      <span className="text-danger">*</span>
                    </span>
                    <Field
                      type="text"
                      placeholder="Account Number"
                      name="bank_acc_no"
                      maxLength="15"
                      className="form-control"
                    />
                    {touched.bank_acc_no && errors.bank_acc_no ? (
                      <span className="text-danger">{errors.bank_acc_no}</span>
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
