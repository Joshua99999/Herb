import * as HERBUI from "react-bootstrap";
import { Col, Row, Button } from "react-bootstrap";
import * as Yup from "yup";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Formik, Field } from "formik";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from "react-toastify";
import LoadingServices from "../LoadingServices";

const userValidationSchema = Yup.object().shape({
  inward_no: Yup.string().required("Required"),
  eofc_no: Yup.string().required("Required"),
  eofc_date: Yup.string().required("Required"),
  pension_class_id: Yup.string().required("Required"),
  state_id: Yup.string().required("Required"),
  pension_category: Yup.string().required("Required"),
  commitment_hoa: Yup.string().required("Required"),
  pensioner_status: Yup.string().required("Required"),
  sto: Yup.string().required("Required"),
  authorizing_authority: Yup.string().required("Required"),
  effective_date: Yup.string().required("Required"),
  ag_lf_file_no: Yup.string().required("Required"),
  autherization_date: Yup.string().required("Required"),
  ppo_no: Yup.string().required("Required"),
  retirement_category: Yup.string().required("Required"),
  pension_rules: Yup.string().required("Required"),
  pension_parent_dept: Yup.string().required("Required"),
  qualifying_service_days: Yup.string().required("Required"),
  qualifying_service_months: Yup.string().required("Required"),
  qualifying_service_years: Yup.string().required("Required"),
  non_qualifying_service_days: Yup.string().required("Required"),
  non_qualifying_service_months: Yup.string().required("Required"),
  non_qualifying_service_years: Yup.string().required("Required"),
  weightage_days: Yup.string().required("Required"),
  weightage_months: Yup.string().required("Required"),
  weightage_years: Yup.string().required("Required"),
  service_restriction_days: Yup.string().required("Required"),
  service_restriction_months: Yup.string().required("Required"),
  service_restriction_years: Yup.string().required("Required"),
  pay_scale: Yup.string().required("Required"),
  grade: Yup.string().required("Required"),
  level: Yup.string().required("Required"),

  //,AuthorizingAuthority: Yup.string().required("Required"),EffectiveDate: Yup.string().required("Required"),AGLFFileNo: Yup.string().required("Required"),AutherizationDate: Yup.string().required("Required"),PPONo: Yup.string().required("Required"),RetirementCategory: Yup.string().required("Required"),PensionRules: Yup.string().required("Required"),PensionParentDepartment: Yup.string().required("Required"),QualifyingServiceDays: Yup.string().required("Required"),QualifyingServiceMonths: Yup.string().required("Required"),QualifyingServiceYears: Yup.string().required("Required"),NonQualifyingServiceDays: Yup.string().required("Required"),NonQualifyingServiceMonths: Yup.string().required("Required"),NonQualifyingServiceYears: Yup.string().required("Required"),WeightageDays: Yup.string().required("Required"),WeightageMonths: Yup.string().required("Required"),WeightageYears: Yup.string().required("Required"),ServiceRestrictionDays: Yup.string().required("Required"),ServiceRestrictionMonths: Yup.string().required("Required"),ServiceRestrictionYears: Yup.string().required("Required"),PayScale: Yup.string().required("Required"),Grade: Yup.string().required("Required"),Level: Yup.string().required("Required")
});

export default function Pensions2({ empUniqueId }) {
  const [empCfmsId, setEmpCfmsId] = useState();
  const [DdoList, setDdoList] = useState();
  const [PenStatusList, setPenStatusList] = useState();
  const [PayScaleList, setPayScaleList] = useState();
  const [RetCatList, setRetCatList] = useState();
  const [StoList, setStoList] = useState();
  const [DeptList, setDeptList] = useState();
  const [Authorize, setAuthorize] = useState();

  const [EffectiveDate, setEffectiveDate] = useState({ EffectiveDate: "" });
  const [AutherizationDate, setAutherizationDate] = useState({
    AutherizationDate: "",
  });
  const [defaultValues, setDefaultValues] = useState({
    inward_no: "",
  });

  const days = [{ value: "", label: "Select" }];
  obj = {};
  for (var i = 1; i < 32; i++) {
    var obj = {};
    obj["value"] = i;
    obj["label"] = i;
    days.push(obj);
  }

  const months = [{ value: "", label: "Select" }];
  obj = {};
  for (var i = 1; i < 13; i++) {
    var obj = {};
    obj["value"] = i;
    obj["label"] = i;
    months.push(obj);
  }

  const years = [{ value: "", label: "Select" }];
  obj = {};
  for (var i = 1; i < 46; i++) {
    var obj = {};
    obj["value"] = i;
    obj["label"] = i;
    years.push(obj);
  }

  useEffect(() => {
    setValuestoForm();
    setSelectBoxValues();
    // callApiX();
  }, []);

  useEffect(() => {
    setEmpCfmsId(empUniqueId);
  }, [empUniqueId]);

  const setValuestoForm = (values) => {
    LoadingServices.getPPOValuestoForm("14382004")
      .then((res) => {
        if (res.data) {
          setDefaultValues(res.data);
        } else {
          alert("No Data Found");
        }
      })
      .catch(() => {
        console.log("Exception Occured");
      });
  };
  const setSelectBoxValues = (values) => {
    LoadingServices.getPPOValues(empUniqueId)
      .then((res) => {
        console.log("fill data===>" + res.data.inward_no);
        if (res.data) {
          setPenStatusList(res.data.pension_status);
          setStoList(res.data.STO);
          setRetCatList(res.data.retirement_category);
          setPayScaleList(res.data.pay_scale);
          setDeptList(res.data.Departments);
          setAuthorize(res.data.Authorize);
          //Authorize
        } else {
          alert("No Data Found");
        }
      })
      .catch(() => {
        console.log("Exception Occured");
      });
  };

  const callApiX = async (e) => {
    try {
      const res = await axios.get(
        "https://172.16.195.34:8451/master/pensions/getReEmp"
      );
      // console.log(res.data);
      setPenStatusList(res.data.List);
    } catch (e) {
      alert("exception=>" + console.log(e));
      console.log("exception===>" + e);
    }
    try {
      const res = await axios.get(
        "https://172.16.195.34:8451/master/pensions/getPpoMSto"
      );
      setStoList(res.data.List);
    } catch (e) {
      alert("exception=>" + console.log(e));
      console.log("exception===>" + e);
    }
    try {
      const res = await axios.get(
        "https://172.16.195.34:8451/master/pensions/getPenRules"
      );
      setRetCatList(res.data.List);
    } catch (e) {
      alert("exception=>" + console.log(e));
      console.log("exception===>" + e);
    }
    try {
      const res = await axios.get(
        "https://172.16.195.34:8451/master/pensions/getPenEmp"
      );
      setPayScaleList(res.data.List);
    } catch (e) {
      alert("exception=>" + console.log(e));
      console.log("exception===>" + e);
    }
    try {
      const res = await axios.get(
        "https://172.16.195.34:8451/master/pensions/getDepts"
      );
      setDeptList(res.data.List);
    } catch (e) {
      alert("exception=>" + console.log(e));
      console.log("exception===>" + e);
    }
  };

  //alert(JSON.stringify(defaultValues));
  //alert(defaultValues.authorizing_authority);
  const initialValues = {
    cfms_id: empCfmsId,
    inward_no: defaultValues.inward_no ? defaultValues.inward_no : "",
    eofc_no: defaultValues.eofc_no ? defaultValues.eofc_no : "",
    eofc_date: defaultValues.eofc_date ? defaultValues.eofc_date : "",
    pension_class_id: defaultValues.pension_class_id
      ? defaultValues.pension_class_id
      : "",
    state_id: defaultValues.state_id ? defaultValues.state_id : "",
    pension_category: defaultValues.pension_category
      ? defaultValues.pension_category
      : "",
    commitment_hoa: defaultValues.commitment_hoa
      ? defaultValues.commitment_hoa
      : "",
    pensioner_status: defaultValues.pensioner_status
      ? defaultValues.pensioner_status
      : "",
    sto: defaultValues.sto ? defaultValues.sto : "",
    authorizing_authority: defaultValues.authorizing_authority
      ? defaultValues.authorizing_authority
      : "",
    effective_date: defaultValues.effective_date
      ? defaultValues.effective_date
      : "",
    ag_lf_file_no: defaultValues.ag_lf_file_no
      ? defaultValues.ag_lf_file_no
      : "",
    autherization_date: defaultValues.autherization_date
      ? defaultValues.autherization_date
      : "",
    ppo_no: defaultValues.ppo_no ? defaultValues.ppo_no : "",
    retirement_category: defaultValues.retirement_category
      ? defaultValues.retirement_category
      : "",
    pension_rules: defaultValues.pension_rules
      ? defaultValues.pension_rules
      : "",
    pension_parent_dept: defaultValues.pension_parent_dept
      ? defaultValues.pension_parent_dept
      : "",
    qualifying_service_days: defaultValues.qualifying_service_days
      ? defaultValues.qualifying_service_days
      : "",
    qualifying_service_months: defaultValues.qualifying_service_months
      ? defaultValues.qualifying_service_months
      : "",
    qualifying_service_years: defaultValues.qualifying_service_years
      ? defaultValues.qualifying_service_years
      : "",
    non_qualifying_service_days: defaultValues.non_qualifying_service_days
      ? defaultValues.non_qualifying_service_days
      : "",
    non_qualifying_service_months: defaultValues.non_qualifying_service_months
      ? defaultValues.non_qualifying_service_months
      : "",
    non_qualifying_service_years: defaultValues.non_qualifying_service_years
      ? defaultValues.non_qualifying_service_years
      : "",
    weightage_days: defaultValues.weightage_days
      ? defaultValues.weightage_days
      : "",
    weightage_months: defaultValues.weightage_months
      ? defaultValues.weightage_months
      : "",
    weightage_years: defaultValues.weightage_years
      ? defaultValues.weightage_years
      : "",
    service_restriction_days: defaultValues.service_restriction_days
      ? defaultValues.service_restriction_days
      : "",
    service_restriction_months: defaultValues.service_restriction_months
      ? defaultValues.service_restriction_months
      : "",
    service_restriction_years: defaultValues.service_restriction_years
      ? defaultValues.service_restriction_years
      : "",
    pay_scale: defaultValues.pay_scale ? defaultValues.pay_scale : "",
    grade: defaultValues.grade ? defaultValues.grade : "",
    level: defaultValues.level ? defaultValues.level : "",
    entered_by: "",
  };
  const onSubmit = (values) => {
    LoadingServices.submitPPOForm1Details(values)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          alert("Success");
        } else {
          alert("No Data Found");
        }
      })
      .catch(() => {
        console.log("Exception Occured");
      });
  };
  return (
    <>
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
              <Row className="mb-20">
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <div className="inner-herbpage-service-title-sub">
                    <h1>Pensioner Basic Information</h1>
                  </div>
                </Col>
              </Row>

              <Row className="mb-20">
                <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                  <label>
                    Inward No <span className="text-danger">*</span>
                  </label>
                  <Field
                    type="text"
                    name="inward_no"
                    className="form-control"
                  />

                  {touched.inward_no && errors.inward_no ? (
                    <span className="text-danger">{errors.inward_no}</span>
                  ) : null}
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                  <label>
                    Eoffice No <span className="text-danger">*</span>
                  </label>
                  <Field type="text" name="eofc_no" className="form-control" />

                  {touched.eofc_no && errors.eofc_no ? (
                    <span className="text-danger">{errors.eofc_no}</span>
                  ) : null}
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                  <label>
                    Eoffice Date <span className="text-danger">*</span>
                  </label>
                  <Field
                    type="date"
                    name="eofc_date"
                    className="form-control"
                  />

                  {touched.eofc_date && errors.eofc_date ? (
                    <span className="text-danger">{errors.eofc_date}</span>
                  ) : null}
                </Col>
              </Row>

              <Row className="mb-20">
                <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                  <label>
                    Pension Class <span className="text-danger">*</span>
                  </label>
                  <Field
                    type="hidden"
                    name="cfms_id"
                    id="cfms_id"
                    className="form-control"
                    value={empCfmsId}
                  />
                  <Field
                    as="select"
                    name="pension_class_id"
                    className="form-control"
                    // onChange={(e) => {
                    //   handleChange(e);
                    //   callApi2(e);
                    // }}

                    onChange={(e) => {
                      handleChange(e);
                    }}
                  >
                    <option value="">Select</option>
                    <option value="1">Service-Normal</option>
                    <option value="2">Service-Provisional</option>
                    <option value="3">Service-Voluntary</option>
                    <option value="4">Service-Invalid</option>
                    <option value="5">Service-Prorata</option>
                    <option value="10">Direct Family</option>
                    <option value="11">Service-Compulsorly-Retirement</option>
                    <option value="14">Service-V.S.(Only DCRG)</option>
                    <option value="19">Service-Comp.Allowance</option>
                    <option value="22">Service-PenCut</option>
                    <option value="6">Family-Normal</option>
                    <option value="7">Family-Share</option>
                    <option value="8">Family-Minor</option>
                    <option value="9">Family-PC-MR</option>
                    <option value="12">Family-Extraordinary</option>
                    <option value="13">COMPASSIONATE ALLOWANCE</option>
                    <option value="15">Family-Widow[GO.315]</option>
                    <option value="16">Family-unmarried[GO.315]</option>
                    <option value="17">Family-Divorced[GO.315]</option>
                    <option value="18">Family-Parent[GO.315]</option>
                    <option value="20">Family-Share-minor</option>
                    <option value="21">NPS-FAMILY-Pension</option>
                    <option value="23">Family-Childless-Widow[GO.315]</option>
                    <option value="24">Direct Family</option>
                  </Field>

                  {touched.pension_class_id && errors.pension_class_id ? (
                    <span className="text-danger">
                      {errors.pension_class_id}
                    </span>
                  ) : null}
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                  <label>
                    Region(State Code)<span className="text-danger">*</span>
                  </label>
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
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                  <label>
                    Pension Category<span className="text-danger">*</span>
                  </label>
                  <Field
                    as="select"
                    name="pension_category"
                    className="form-control"
                    onChange={handleChange}
                  >
                    <option value="0">Select</option>
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
                  {touched.pension_category && errors.pension_category ? (
                    <span className="text-danger">
                      {errors.pension_category}
                    </span>
                  ) : null}
                </Col>
              </Row>

              <Row className="mb-20">
                <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                  <label>
                    Commitment HOA<span className="text-danger">*</span>
                  </label>
                  <Field
                    type="text"
                    name="commitment_hoa"
                    className="form-control"
                  />

                  {touched.commitment_hoa && errors.commitment_hoa ? (
                    <span className="text-danger">{errors.commitment_hoa}</span>
                  ) : null}
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                  <label>
                    Pensioner Status<span className="text-danger">*</span>
                  </label>
                  <Field
                    as="select"
                    name="pensioner_status"
                    className="form-control"
                    onChange={handleChange}
                  >
                    <option value="0">Select</option>
                    {PenStatusList &&
                      PenStatusList.map((item, i) => {
                        return (
                          <>
                            <option key={i} value={item.code}>
                              {item.description}
                            </option>
                          </>
                        );
                      })}
                  </Field>
                  {touched.pensioner_status && errors.pensioner_status ? (
                    <span className="text-danger">
                      {errors.pensioner_status}
                    </span>
                  ) : null}
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                  <label>
                    STO<span className="text-danger">*</span>
                  </label>
                  <Field
                    as="select"
                    name="sto"
                    className="form-control"
                    onChange={handleChange}
                  >
                    <option value="0">Select</option>
                    {StoList &&
                      StoList.map((item, i) => {
                        return (
                          <>
                            <option key={i} value={item.stocode}>
                              {item.stocode}-{item.stoname}
                            </option>
                          </>
                        );
                      })}
                  </Field>
                  {touched.sto && errors.sto ? (
                    <span className="text-danger">{errors.sto}</span>
                  ) : null}
                </Col>
              </Row>

              <Row className="mb-20">
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <div className="inner-herbpage-service-title-sub">
                    <h1>Pensioner Sanction Order</h1>
                  </div>
                </Col>
              </Row>

              <Row className="mb-20">
                <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                  <label>
                    Authorizing Authority <span className="text-danger">*</span>
                  </label>
                  {/* <Select name="AuthorizingAuthority" className="" options={DdoList} isSearchable={true} isClearable={true} getOptionValue={option => option.DDOCODE}
                                            required={true} getOptionLabel={option => option.loan_type_code + "---" + option.category_desc}  />
                                             */}

                  <Field
                    as="select"
                    name="authorizing_authority"
                    className="form-control"
                    onChange={handleChange}
                  >
                    <option value="">--Select--</option>

                    {Authorize &&
                      Authorize.map((item, i) => {
                        return (
                          <>
                            <option key={i} value={item.docSrcId}>
                              {item.name}
                            </option>
                          </>
                        );
                      })}
                  </Field>

                  {touched.authorizing_authority &&
                  errors.authorizing_authority ? (
                    <span className="text-danger">
                      {errors.authorizing_authority}
                    </span>
                  ) : null}
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                  <label>
                    Effective Date<span className="text-danger">*</span>
                  </label>
                  <Field
                    type="date"
                    name="effective_date"
                    className="form-control"
                  />
                  {/* <Field
                    type="date"
                    showPopperArrow={false}
                    dateFormat="dd/MM/yyyy"
                    maxDate={new Date()}
                    name="effective_date"
                    showMonthDropdown
                    showYearDropdown
                    selected={EffectiveDate?.EffectiveDate}
                    onChange={(date) => {
                      let event = {
                        target: { name: "effective_date", value: date },
                      };
                      handleChange(event);
                      setEffectiveDate({
                        ...EffectiveDate,
                        EffectiveDate: date,
                      });
                    }}
                    placeholderText="Select Date"
                    className="form-control"
                  /> */}

                  {touched.effective_date && errors.effective_date ? (
                    <span className="text-danger">{errors.effective_date}</span>
                  ) : null}
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                  <label>
                    AG/LF File No<span className="text-danger">*</span>
                  </label>
                  <Field
                    type="text"
                    name="ag_lf_file_no"
                    className="form-control"
                  />

                  {touched.ag_lf_file_no && errors.ag_lf_file_no ? (
                    <span className="text-danger">{errors.ag_lf_file_no}</span>
                  ) : null}
                </Col>
              </Row>

              <Row className="mb-20">
                <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                  <label>
                    Autherization Date<span className="text-danger">*</span>
                  </label>
                  <Field
                    type="date"
                    name="autherization_date"
                    className="form-control"
                  />
                  {/* <Field
                    type="date"
                    showPopperArrow={false}
                    dateFormat="dd/MM/yyyy"
                    maxDate={new Date()}
                    name="autherization_date"
                    showMonthDropdown
                    showYearDropdown
                    selected={AutherizationDate?.AutherizationDate}
                    onChange={(date) => {
                      let event = {
                        target: { name: "autherization_date", value: date },
                      };
                      handleChange(event);
                      setAutherizationDate({
                        ...AutherizationDate,
                        AutherizationDate: date,
                      });
                    }}
                    // placeholderText="Select Date"
                    className="form-control"
                  /> */}

                  {touched.autherization_date && errors.autherization_date ? (
                    <span className="text-danger">
                      {errors.autherization_date}
                    </span>
                  ) : null}
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                  <label>
                    PPO No<span className="text-danger">*</span>
                  </label>
                  <Field type="text" name="ppo_no" className="form-control" />

                  {touched.ppo_no && errors.ppo_no ? (
                    <span className="text-danger">{errors.ppo_no}</span>
                  ) : null}
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                  <label>
                    Retirement Category<span className="text-danger">*</span>
                  </label>
                  <Field
                    as="select"
                    name="retirement_category"
                    className="form-control"
                    onChange={handleChange}
                  >
                    <option value="0">Select</option>
                    {RetCatList &&
                      RetCatList.map((item, i) => {
                        return (
                          <>
                            <option key={i} value={item.penRuleId}>
                              {item.description}
                            </option>
                          </>
                        );
                      })}
                  </Field>

                  {touched.retirement_category && errors.retirement_category ? (
                    <span className="text-danger">
                      {errors.retirement_category}
                    </span>
                  ) : null}
                </Col>
              </Row>

              <Row className="mb-20">
                <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                  <label>
                    Pension Rules<span className="text-danger">*</span>
                  </label>
                  <Field
                    as="select"
                    name="pension_rules"
                    className="form-control"
                    onChange={handleChange}
                  >
                    <option value="0">Select</option>
                    <option value="01">Service-Normal</option>
                    <option value="02">Service-Provisional</option>
                    <option value="03">Service-Voluntary</option>
                    <option value="04">Service-Invalid</option>
                    <option value="05">Service-Prorata</option>
                    <option value="06">Family-Normal</option>
                    <option value="07">Family-Share</option>
                    <option value="08">Family-Minor</option>
                    <option value="09">Family-PC-MR</option>
                    <option value="10">Direct Family</option>
                    <option value="11">Service-Compulsorly-Retirement</option>
                    <option value="12">Family-Extraordinary</option>
                    <option value="13">COMPASSIONATE ALLOWANCE</option>
                    <option value="14">Service-V.S.(Only DCRG)</option>
                    <option value="15">Family-Widow[GO.315]</option>
                    <option value="16">Family-unmarried[GO.315]</option>
                    <option value="17">Family-Divorced[GO.315]</option>
                    <option value="18">Family-Parent[GO.315]</option>
                    <option value="19">Service-Comp.Allowance</option>
                    <option value="20">Family-Share-minor</option>
                    <option value="21">NPS-FAMILY-Pension</option>
                    <option value="22">Service-PenCut</option>
                    <option value="23">Family-Childless-Widow[GO.315]</option>
                    <option value="24">Direct Family</option>
                  </Field>
                  {touched.pension_rules && errors.pension_rules ? (
                    <span className="text-danger">{errors.pension_rules}</span>
                  ) : null}
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                  <label>
                    Pension Parent Department
                    <span className="text-danger">*</span>
                  </label>
                  <Field
                    as="select"
                    name="pension_parent_dept"
                    className="form-control"
                    onChange={handleChange}
                  >
                    <option value="0">Select</option>
                    {DeptList &&
                      DeptList.map((item, i) => {
                        return (
                          <>
                            <option key={i} value={item.dept_code}>
                              {item.dept_name}
                            </option>
                          </>
                        );
                      })}
                  </Field>
                  {touched.pension_parent_dept && errors.pension_parent_dept ? (
                    <span className="text-danger">
                      {errors.pension_parent_dept}
                    </span>
                  ) : null}
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                  -
                </Col>
              </Row>

              <Row className="mb-20">
                <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                  <label>
                    Qualifying Service Days
                    <span className="text-danger">*</span>
                  </label>
                  <Field
                    as="select"
                    name="qualifying_service_days"
                    className="form-control"
                    onChange={handleChange}
                  >
                    {days.map(({ value, label }, index) => (
                      <option value={value}>{label}</option>
                    ))}
                  </Field>
                  {touched.qualifying_service_days &&
                  errors.qualifying_service_days ? (
                    <span className="text-danger">
                      {errors.qualifying_service_days}
                    </span>
                  ) : null}
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                  <label>
                    Qualifying Service Months
                    <span className="text-danger">*</span>
                  </label>
                  <Field
                    as="select"
                    name="qualifying_service_months"
                    className="form-control"
                    onChange={handleChange}
                  >
                    {months.map(({ value, label }, index) => (
                      <option value={value}>{label}</option>
                    ))}
                  </Field>
                  {touched.qualifying_service_months &&
                  errors.qualifying_service_months ? (
                    <span className="text-danger">
                      {errors.qualifying_service_months}
                    </span>
                  ) : null}
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                  <label>
                    Qualifying Service Years
                    <span className="text-danger">*</span>
                  </label>
                  <Field
                    as="select"
                    name="qualifying_service_years"
                    className="form-control"
                    onChange={handleChange}
                  >
                    {years.map(({ value, label }, index) => (
                      <option value={value}>{label}</option>
                    ))}
                  </Field>
                  {touched.qualifying_service_years &&
                  errors.qualifying_service_years ? (
                    <span className="text-danger">
                      {errors.qualifying_service_years}
                    </span>
                  ) : null}
                </Col>
              </Row>

              <Row className="mb-20">
                <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                  <label>
                    Non Qualifying Service Days{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <Field
                    as="select"
                    name="non_qualifying_service_days"
                    className="form-control"
                    onChange={handleChange}
                  >
                    {days.map(({ value, label }, index) => (
                      <option value={value}>{label}</option>
                    ))}
                  </Field>
                  {touched.non_qualifying_service_days &&
                  errors.non_qualifying_service_days ? (
                    <span className="text-danger">
                      {errors.non_qualifying_service_days}
                    </span>
                  ) : null}
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                  <label>
                    Non Qualifying Service Months
                    <span className="text-danger">*</span>
                  </label>
                  <Field
                    as="select"
                    name="non_qualifying_service_months"
                    className="form-control"
                    onChange={handleChange}
                  >
                    {months.map(({ value, label }, index) => (
                      <option value={value}>{label}</option>
                    ))}
                  </Field>
                  {touched.non_qualifying_service_months &&
                  errors.non_qualifying_service_months ? (
                    <span className="text-danger">
                      {errors.non_qualifying_service_months}
                    </span>
                  ) : null}
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                  <label>
                    Non Qualifying Service Years
                    <span className="text-danger">*</span>
                  </label>
                  <Field
                    as="select"
                    name="non_qualifying_service_years"
                    className="form-control"
                    onChange={handleChange}
                  >
                    {years.map(({ value, label }, index) => (
                      <option value={value}>{label}</option>
                    ))}
                  </Field>
                  {touched.non_qualifying_service_years &&
                  errors.non_qualifying_service_years ? (
                    <span className="text-danger">
                      {errors.non_qualifying_service_years}
                    </span>
                  ) : null}
                </Col>
              </Row>

              <Row className="mb-20">
                <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                  <label>
                    Weightage Days<span className="text-danger">*</span>
                  </label>
                  <Field
                    as="select"
                    name="weightage_days"
                    className="form-control"
                    onChange={handleChange}
                  >
                    {days.map(({ value, label }, index) => (
                      <option value={value}>{label}</option>
                    ))}
                  </Field>
                  {touched.weightage_days && errors.weightage_days ? (
                    <span className="text-danger">{errors.weightage_days}</span>
                  ) : null}
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                  <label>
                    Weightage Month<span className="text-danger">*</span>
                  </label>
                  <Field
                    as="select"
                    name="weightage_months"
                    className="form-control"
                    onChange={handleChange}
                  >
                    {months.map(({ value, label }, index) => (
                      <option value={value}>{label}</option>
                    ))}
                  </Field>
                  {touched.weightage_months && errors.weightage_months ? (
                    <span className="text-danger">
                      {errors.weightage_months}
                    </span>
                  ) : null}
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                  <label>
                    Weightage Year<span className="text-danger">*</span>
                  </label>
                  <Field
                    as="select"
                    name="weightage_years"
                    className="form-control"
                    onChange={handleChange}
                  >
                    {years.map(({ value, label }, index) => (
                      <option value={value}>{label}</option>
                    ))}
                  </Field>
                  {touched.weightage_years && errors.weightage_years ? (
                    <span className="text-danger">
                      {errors.weightage_years}
                    </span>
                  ) : null}
                </Col>
              </Row>

              <Row className="mb-20">
                <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                  <label>
                    Service Restriction Days
                    <span className="text-danger">*</span>
                  </label>
                  <Field
                    as="select"
                    name="service_restriction_days"
                    className="form-control"
                    onChange={handleChange}
                  >
                    {days.map(({ value, label }, index) => (
                      <option value={value}>{label}</option>
                    ))}
                  </Field>
                  {touched.service_restriction_days &&
                  errors.service_restriction_days ? (
                    <span className="text-danger">
                      {errors.service_restriction_days}
                    </span>
                  ) : null}
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                  <label>
                    Service Restriction Month
                    <span className="text-danger">*</span>
                  </label>
                  <Field
                    as="select"
                    name="service_restriction_months"
                    className="form-control"
                    onChange={handleChange}
                  >
                    {months.map(({ value, label }, index) => (
                      <option value={value}>{label}</option>
                    ))}
                  </Field>
                  {touched.service_restriction_months &&
                  errors.service_restriction_months ? (
                    <span className="text-danger">
                      {errors.service_restriction_months}
                    </span>
                  ) : null}
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                  <label>
                    Service Restriction year
                    <span className="text-danger">*</span>
                  </label>
                  <Field
                    as="select"
                    name="service_restriction_years"
                    className="form-control"
                    onChange={handleChange}
                  >
                    {years.map(({ value, label }, index) => (
                      <option value={value}>{label}</option>
                    ))}
                  </Field>
                  {touched.service_restriction_years &&
                  errors.service_restriction_years ? (
                    <span className="text-danger">
                      {errors.service_restriction_years}
                    </span>
                  ) : null}
                </Col>
              </Row>

              <Row className="mb-20">
                <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                  <label>
                    Pay Scale <span className="text-danger">*</span>
                  </label>
                  <Field
                    as="select"
                    name="pay_scale"
                    className="form-control"
                    onChange={handleChange}
                  >
                    <option value="0">Select</option>
                    {PayScaleList &&
                      PayScaleList.map((item, i) => {
                        return (
                          <>
                            <option key={i} value={item.empId}>
                              {item.description}
                            </option>
                          </>
                        );
                      })}
                  </Field>
                  {touched.pay_scale && errors.pay_scale ? (
                    <span className="text-danger">{errors.pay_scale}</span>
                  ) : null}
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                  <label>
                    Grade<span className="text-danger">*</span>
                  </label>
                  <Field type="text" name="grade" className="form-control" />

                  {touched.grade && errors.grade ? (
                    <span className="text-danger">{errors.grade}</span>
                  ) : null}
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                  <label>
                    Level<span className="text-danger">*</span>
                  </label>
                  <Field type="text" name="level" className="form-control" />

                  {touched.level && errors.level ? (
                    <span className="text-danger">{errors.level}</span>
                  ) : null}
                </Col>
              </Row>

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
