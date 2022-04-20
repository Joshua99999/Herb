import { React, useEffect, useState } from 'react';
import { Card, Table, Modal,Button, Row, Col } from 'react-bootstrap';
import {IoFileTrayOutline } from "react-icons/io5";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Switch from 'react-switch';
import { useHistory, useLocation } from 'react-router';
import SupplyPayrollService from './SupplyPayrollService';
import { FaEdit } from 'react-icons/fa';
import * as HERBUI from "react-bootstrap"
import { NotificationManager } from 'react-notifications';


const SupplySummaryPagecomponent = () => {
  const [summaryData, setData] = useState({
    "HOA_WISE_CADRE_STRENGTH": [], "EMP_PAY_SUMMARY": [],
    "DDO_PAY_SUMMARY": {}, "PAYROLL_RULES": [], "EARNINGS_HEADS": [], "DEDUCTIONS_HEADS": []
  });
  const [checked, setChecked] = useState(false);
  const [index, setIndex] = useState();
  const history = useHistory();
  const location = useLocation();
  const [cfmsId, setCfmsId] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [attendanceDisplayList, setAttendanceDisplayList] = useState({ "ATTENDANCE": [] });

  useEffect(() => {
    let params = location.state;
    console.log("location.state..."+JSON.stringify(params))
    SupplyPayrollService.getCADRE(params).then((res) => {
      console.log("res..."+JSON.stringify(res))
      setData(res.data)
    })
  }, [location]);
  const handleChange1 = (checked, event, id) => {
    let item = summaryData.PAYROLL_RULES.find((item) => item.RULE_NO === id) || null;
    if (item !== null) {
      item.ruleChecked = checked;
      let PAYROLL_RULES = summaryData.PAYROLL_RULES;
      PAYROLL_RULES[item] = item;
      setData({ ...summaryData, PAYROLL_RULES })
    }
  }
  const attendanceCheck = (checked, event, id) => {
    console.log("## item:" + id)
    console.log("## checked:" + checked)
    let item = attendanceDisplayList.ATTENDANCE.find((item) => item.DAY_OF_MONTH === id) || null;
    if (item !== null) {
      if (checked === true) {
        item.IS_PRESENT = 'Yes'
      }
      else if (checked === false) {
        item.IS_PRESENT = 'No'
      }
      let ATTENDANCE = attendanceDisplayList.ATTENDANCE;
      ATTENDANCE[item] = item;
      setAttendanceDisplayList({ ...attendanceDisplayList, ATTENDANCE })
    }
  }
  const attendanceSave = () => {
    let attendanceParams = { "cfmsId": cfmsId, "ddocode": location.state.ddocode, "hoa": location.state.hoa, "year": location.state.year, "month": location.state.month }
    attendanceParams["attendanceList"] = attendanceDisplayList.ATTENDANCE
    SupplyPayrollService.attendanceSave(attendanceParams).then((res) => {
      if (summaryData.EMP_PAY_SUMMARY[index].CFMSID === res.data.cfmsId) {
        summaryData.EMP_PAY_SUMMARY[index].NO_OF_DAYS_IN_MONTH = res.data.NO_OF_DAYS_IN_MONTH
        summaryData.EMP_PAY_SUMMARY[index].NO_OF_DAYS_PRESENT = res.data.NO_OF_DAYS_PRESENT
        summaryData.EMP_PAY_SUMMARY[index].NO_OF_DAYS_ABSENT = res.data.NO_OF_DAYS_ABSENT
      }
      if (res.data.SCODE === "01") {
        NotificationManager.success(res.data.SDESC)
      }
      else if (res.data.SCODE === "02") {
        NotificationManager.warning(res.data.SDESC)
      }
      setShow(false)
    })
  }
  const attendanceDisplay = (CFMSID, i) => {
    setIndex(i)
    setCfmsId(CFMSID)
    let attendanceParams = { "cfmsId": CFMSID, "ddocode": location.state.ddocode, "hoa": location.state.hoa, "year": location.state.year, "month": location.state.month }
    SupplyPayrollService.attendanceDisplay(attendanceParams).then((res) => {
      if (res.data) {
        setAttendanceDisplayList(res.data)
      }
    })
    setShow(true)
  }
  const getEmployeePayroll = () => {
    history.push({
      pathname: '/payroll'
    })
  }
  const form47 = () => {
    let params = location.state
    fetch(
      'http://172.16.150.149:8082/hrms/services/ddo/form47-summary-report/pdf', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    }).then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(
          new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Form47.pdf`,);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      });
  }
  const payslip = () => {
    let params = location.state

    fetch(
      'http://172.16.150.149:8082/hrms/services/ddo/payslips-summary-report/pdf', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    }
    )
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(
          new Blob([blob]),
        );
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          `PaySlip.pdf`,
        );
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      });
  }
  const schedule = () => {
    let params = location.state
    fetch(
      'http://172.16.150.149:8082/hrms/services/ddo/subscriptions-summary-report/pdf', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    }
    )
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(
          new Blob([blob]),
        );
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          `BillSchedules.pdf`,
        );
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      });
  }
  return (
    <>
      <HERBUI.Container>

        <HERBUI.Row>
          <HERBUI.Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="page-titlespacing">
            <div className="inner-herbpage-service-title1">
              <h1> Summary</h1>
            </div>
          </HERBUI.Col>

        </HERBUI.Row>
      </HERBUI.Container>
      <HERBUI.Container className="outer-page-content-container-nodual-header ">
        <div className="top-button-strip">
          <Button type="Submit" variant="primary">SUBMIT</Button> {''}
          <Button onClick={getEmployeePayroll} type="Submit" variant="primary">BACK</Button> {' '}{''}
          <Button onClick={form47} type="Submit" variant="primary">FORM47</Button> {' '}{''}
          <Button onClick={payslip} type="Submit" variant="primary">PaySlip</Button> {''} {''}
          <Button onClick={schedule} type="Submit" variant="primary">Schedule</Button>
        </div>
        <Tabs>
          <TabList>
            <Tab>
              <IoFileTrayOutline className="tabicon" />
              Employee Attendance
            </Tab>
            <Tab>
              <IoFileTrayOutline className="tabicon" />
              CADRE STRENGTH
            </Tab>
            <Tab>
              <IoFileTrayOutline className="tabicon" />
              EMPLOYEE PAY  SUMMARY</Tab>
            <Tab>
              <IoFileTrayOutline className="tabicon" />DDO_PAY_SUMMARY</Tab>
            <Tab>
              <IoFileTrayOutline className="tabicon" />PAYROLL_RULES</Tab>
          </TabList>
          <TabPanel>
            <Table className="table  table-condensed table-striped table-bordered  table-hover table-sm">
              <thead>
                <tr>
                  <th>CFMSID</th>
                  <th>HRMSID</th>
                  <th>EMPNAME</th>
                  <th>DESIGNATION</th>
                  <th>No Of Days In Month </th>
                  <th>No Of Days Present</th>
                  <th>No Of Days Absent</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {summaryData.EMP_PAY_SUMMARY.map((item, i) => (
                  <tr key={i}>
                    <td>{item.CFMSID}</td>
                    <td>{item.HRMSID}</td>
                    <td>{item.EMPNAME}</td>
                    <td>{item.DESIGNATION}</td>
                    <td style={{ textAlign: "right" }}>{item.NO_OF_DAYS_IN_MONTH}</td>
                    <td style={{ textAlign: "right" }}>{item.NO_OF_DAYS_PRESENT}</td>
                    <td style={{ textAlign: "right" }}>{item.NO_OF_DAYS_ABSENT}</td>
                    <td><Button disabled={item.NO_OF_DAYS_IN_MONTH === item.NO_OF_DAYS_PRESENT} size="sm" variant="primary" onClick={() => attendanceDisplay(item.CFMSID, i)}><FaEdit></FaEdit></Button></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TabPanel>
          <TabPanel>
            {summaryData.HOA_WISE_CADRE_STRENGTH.map((item, i) => (
              <>
                <label for="hoa" style={{ float: 'left' }}><b>HOA:{item.HOA}</b></label>
                <br />
                <Table className="table  table-condensed table-striped table-bordered  table-hover table-sm">
                  <thead>
                    <tr>
                      <th>POSTNAME</th>
                      <th>NO OF POSTS</th>
                      <th>WORKING</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.CADRE.map((citem, j) => (
                      <tr key={i + '-' + j}>
                        <td>{citem.POST_NAME}</td>
                        <td style={{ textAlign: "right" }}>{citem.NO_OF_POSTS}</td>
                        <td style={{ textAlign: "right" }}>{citem.WORKING}</td>
                      </tr>
                    ))}

                  </tbody>
                </Table>
              </>
            ))}
          </TabPanel>
          <TabPanel>
            <Table className="table  table-condensed table-striped table-bordered  table-hover table-sm">
              <thead>
                <tr>
                  <th>CFMSID</th>
                  <th>HRMSID</th>
                  <th>EMPNAME</th>
                  <th>DESIGNATION</th>
                  <th>GROSS</th>
                  <th>DEDUCTION</th>
                  <th>NET</th>
                </tr>
              </thead>
              <tbody>
                {summaryData.EMP_PAY_SUMMARY.map((item, i) => (
                  <tr key={i}>
                    <td>{item.CFMSID}</td>
                    <td>{item.HRMSID}</td>
                    <td>{item.EMPNAME}</td>
                    <td>{item.DESIGNATION}</td>
                    <td style={{ textAlign: "right" }}>{parseInt(item.GROSS).toLocaleString()}</td>
                    <td style={{ textAlign: "right" }}>{parseInt(item.DEDUCTION).toLocaleString()}</td>
                    <td style={{ textAlign: "right" }}>{parseInt(item.NET).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TabPanel>
          <TabPanel>
            <h6>GROSS:{summaryData.DDO_PAY_SUMMARY.GROSS}</h6>
            <h6>DEDUCTION:{summaryData.DDO_PAY_SUMMARY.DEDUCTION}</h6>
            <h6>NET:{summaryData.DDO_PAY_SUMMARY.NET}</h6>
            <Row>
              <Col>
                <Card>
                  <Card.Body>
                    <Table className="table  table-condensed table-striped table-bordered  table-hover table-sm">
                      <thead>
                        <tr>
                          <th>EARNING_CODE</th>
                          <th>EARNING_DESCRIPTION</th>
                          <th>EARNING_AMOUNT </th>
                        </tr>
                      </thead>
                      <tbody>
                        {summaryData.EARNINGS_HEADS.map((item, i) => (
                          <tr key={i}>
                            <td >{item.EARNING_CODE}</td>
                            <td>{item.EARNING_DESCRIPTION}</td>
                            <td style={{ textAlign: "right" }}>{parseInt(item.EARNING_AMOUNT).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Body>
                    <Table className="table  table-condensed table-striped table-bordered  table-hover table-sm">
                      <thead>
                        <tr>
                          <th>DEDUCTION_CODE</th>
                          <th>DEDUCTION_DESCRIPTION</th>
                          <th>DEDUCTION_AMOUNT</th>
                        </tr>
                      </thead>
                      <tbody>
                        {summaryData.DEDUCTIONS_HEADS.map((item, i) => (
                          <tr key={i}>
                            <td>{item.DEDUCTION_CODE}</td>
                            <td>{item.DEDUCTION_DESCRIPTION}</td>
                            <td style={{ textAlign: "right" }}>{parseInt(item.DEDUCTION_AMOUNT).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </TabPanel>
          <TabPanel>
            <Table className="table  table-condensed table-striped table-bordered  table-hover table-sm">
              <thead>
                <tr>
                  <th>RULE_NO</th>
                  <th>RULE_DESCRIPTION</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {summaryData.PAYROLL_RULES.map((item, i) => (
                  <tr key={i}>
                    <td>{item.RULE_NO}</td>
                    <td>{item.RULE_DESCRIPTION}</td>
                    <td><Switch id={item.RULE_NO} onChange={handleChange1} checked={item.ruleChecked} /></td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Row className="mb-20">
              <Col xs={12} sm={12} md={12} lg={8} xl={8} xxl={8}  >
                &nbsp;
              </Col>
              <Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}  >
                <div className="d-grid  ">
                </div>
              </Col>
            </Row>
          </TabPanel>
        </Tabs>
      </HERBUI.Container>
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Attendance List:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table className="table  table-condensed table-striped table-bordered  table-hover table-sm">
            <thead>
              <tr>
                <th>S.No</th>
                <th>DAY_OF_MONTH</th>
                <th>IS PRESENT</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {attendanceDisplayList && attendanceDisplayList.ATTENDANCE.map((item, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td style={{ textAlign: "right" }}>{item.DAY_OF_MONTH}</td>
                  <td style={{ textAlign: "right" }}>{item.IS_PRESENT}</td>
                  <td><Switch id={item.DAY_OF_MONTH} onChange={attendanceCheck} checked={item.IS_PRESENT === 'Yes'}></Switch></td>
                </tr>
              ))}
            </tbody>
          </Table>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={attendanceSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default SupplySummaryPagecomponent;
