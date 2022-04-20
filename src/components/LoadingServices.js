// import { API_URL, EARNING_SAVE, LOGIN, PAY_FIXATION_MASTER_BASE_URL } from './EmployeeApiis';
import {
  CommonAjaxPostWithFileUpload,
  CommonAxios,
  CommonAxiosPost,
  CommonAxiosPostPdf,
} from "./CommonAxios";
// import {
//   PRC_YEAR_MASTER_URL, PRC_TYPE_UPDATE_URL, E_SIGN_EMPLOYEE_DETAILS_URL,
//   STO_MAKER_DETAILS_URL, STO_APPROVER_EMPLOYEE_DETAILS_LIST, E_SIGN_APPROVER_DETAILS_URL, E_SIGN_CHECKER_DETAILS_URL, STO_CHECKER_DETAILS_URL, payroll_UpdateDdo_Save_Url
// } from '../../PayFixation/CommonAjax/Urls';
//import { PAYROLL_APPROVAL_AVA_WORKFLOW_SAVE_URL, PENSIONER_WORKFLOW_SAVE_URL } from '../../PayFixation/API/workFlowURLS';
import axios from "axios";
//import { PAY_HEAD_API_URL } from '../../services/ConfigService';

class LoadingServices {
  //   ddoData = (userId) => {
  //     return CommonAxios(API_URL + "/master/services/hoo/" + userId + "/ddo-master");
  //   }
  //   fectchEmployeeDetails = (ddoCode) => {
  //     return CommonAxios(API_URL + "/master/services/ddo/" + ddoCode + "/emp-master");
  //   }
  //   fectchTransferEmployeeDetails = (ddoCode) => {
  //     return CommonAxios(API_URL + "/master/services/ddo/" + ddoCode + "/emp-transfer");
  //   }
  //   fectchEmpEditDetails = (cfmsId) => {
  //     return CommonAxios(API_URL + '/master/getempdetails/' + cfmsId);
  //   }

  //   fetchIfscCodeDetails = (ifscCode) => {
  //     return CommonAxios(API_URL + '/master/ifscvalidation/' + ifscCode);
  //   }
  //   fetchPayScalesData = () => {
  //     return CommonAxios(API_URL + '/master/payscalesdata');
  //   }
  //   fetchMasterCommonDetails = () => {
  //     return CommonAxios(API_URL + '/master/getmastersdata1');
  //   }
  //   fetchDeptPostCommonDetails = (ddoCode) => {
  //     return CommonAxios(API_URL + "/master/desginationsMaster/" + ddoCode)

  //   }
  //   fectchPrcCodeDetails = () => {
  //     return CommonAxios(API_URL + '/master/getPayScalecode');
  //   }
  //   fectchEarnDeductionGroupDetails = (prcCodeValue) => {

  //     return CommonAxios(API_URL + '/master/getPaygroupdetails/' + prcCodeValue);

  //   }
  //   postDetailsSave = (postDetails) => {
  //     return CommonAxiosPost(API_URL + '/master/postdetailssave', postDetails);
  //   }
  //   basicDetailsSave = (empDetails) => {
  //     return CommonAxiosPost(API_URL + '/master/empdetailssave', empDetails)
  //   }
  //   postEarnDetails = (earnDetails) => {
  //     return CommonAxiosPost(API_URL + '/master/earndeductionsave', earnDetails)
  //   }
  //   addButtonEarningAmount = (addEarningAmountDetails) => {
  //     return CommonAxiosPost(API_URL + '/master/addearningordeduction', addEarningAmountDetails)
  //   }
  //   //Earning deductions masters
  //   fectchEarningsDetails = () => {
  //     return CommonAxios(PAY_HEAD_API_URL + "/payhead/master");

  //   }
  //   personalEmpSavings = (personalDetails) => {
  //     return CommonAxiosPost(API_URL + '/master/accountNumbersDataSaving', personalDetails)
  //   }
  //   fectchReportTypeDetails = () => {
  //     return CommonAxios(API_URL + "/master/getreport");
  //   }
  //   fectchPayrollCalendarTypeDetails = (ddoCode) => {
  //     return CommonAxiosPost(EARNING_SAVE + '/hrms/salary/reports/payroll-calendar', ddoCode);
  //   }
  //   fectchPayBillProcessingDetails = (billSummary) => {
  //     return CommonAxiosPost(EARNING_SAVE + "/hrms/services/pay-bill-processing", billSummary);
  //   }
  //   fectchPayBillDetails = (billDetails) => {
  //     return CommonAxiosPost(EARNING_SAVE + "/hrms/services/ddo/hoa-billsummary-report", billDetails);
  //   }
  //   modalPopupSave = (modalPopupDetails) => {
  //     return CommonAxiosPost(API_URL + "/master/paycalculation", modalPopupDetails);
  //   }
  //   transferInMaster = () => {
  //     return CommonAxios(API_URL + "/master/relievingtypefortransferinmaster");
  //   }
  //   FacInMaster = () => {
  //     return CommonAxios(API_URL + "/master/relievingtypeforfacinmaster");
  //   }
  //   transferOutSave = (params) => {

  //     return CommonAjaxPostWithFileUpload(EARNING_SAVE + "/hrms/transferout", params);
  //   }
  //   biometricTransferOutSave = (params) => {
  //     return CommonAjaxPostWithFileUpload(EARNING_SAVE + '/hrms/transferout-biometric', params);
  //   }
  //   transferInDetails = (params) => {
  //     return CommonAxios(EARNING_SAVE + "/hrms/transferindet/" + params);
  //   }
  //   transferInDdo = (params) => {
  //     return CommonAxios(API_URL + "/master/masterddos/" + params);
  //   }
  //   transferInSave = (params) => {
  //     return CommonAjaxPostWithFileUpload(API_URL + "/master/transferorfacinsave", params);
  //   }
  //   transferorFacInBiometricSave(params) {
  //     return CommonAjaxPostWithFileUpload(EARNING_SAVE + '/hrms/transferorfacinsave-biometric', params);
  //   }
  //   payBillSummaryPdf = (params) => {
  //     return CommonAxiosPostPdf(EARNING_SAVE + "/hrms/services/ddo/form47-summary-report/pdf", params);
  //   }
  //   paySlipSummaryPdf = (params) => {
  //     return CommonAxiosPostPdf(EARNING_SAVE + "/hrms/services/ddo/payslips-summary-report/pdf", params);
  //   }
  //   subscriptionsPdf = (params) => {
  //     return CommonAxiosPostPdf(EARNING_SAVE + "/hrms/services/ddo/subscriptions-summary-report/pdf", params);
  //   }
  //   billSummaryPdf = (params) => {
  //     return CommonAxiosPostPdf(EARNING_SAVE + "/hrms/services/ddo/hoa-billsummary-report/pdf", params);
  //   }
  //   paySlipVariationPdf = (params) => {
  //     return CommonAxiosPostPdf(EARNING_SAVE + "/hrms/services/ddo/payslips-variation-report/pdf", params);
  //   }
  //   paySlipVariationExcel = (params) => {
  //     return CommonAxiosPostPdf(EARNING_SAVE + "/hrms/services/ddo/payslips-variation-report/excel", params);
  //   }

  //   getSlaReport = (ddoCode) => {
  //     return CommonAxios(API_URL + "/master/services/ddo/" + ddoCode + "/cadre-strength");
  //   }
  //   viewTBRBillDetails = (params) => {
  //     return CommonAxios(EARNING_SAVE + "/hrms/tbrcancellationview/" + params);
  //   }
  //   submitTBRBillDetails = (params) => {
  //     return CommonAxios(EARNING_SAVE + "/hrms/tbrnumbercancellation/" + params);
  //   }
  //   ltaMappingDetails = (userId) => {
  //     return CommonAxios('http://172.16.150.19:8082/master/mastercfmsidslist' + '/' + userId);
  //   }
  //   fectchPrcTypePrcYear = () => {
  //     return CommonAxios(API_URL + '/master/payscalesdata');
  //   }
  //   SavePrcTypePrcYear = (params) => {
  //     return CommonAxiosPost(API_URL + '/master/postdetailssavemaster', params)
  //     // return CommonAxiosPost('http://172.16.160.103:8451' + '/master/postdetailssavemaster', params)

  //   }
  //   autoPopulate = (cfmsId) => {
  //     return CommonAxios(API_URL + '/master/getbasicpaymasterdetails/' + cfmsId)
  //   }
  //   loanEmpList = (userId) => {
  //     return CommonAxios(EARNING_SAVE + '/hrms/loans/ddocode/' + userId + '/' + 'emp-loan-details');
  //   }
  //   loanEmpDataList = (userId) => {
  //     return CommonAxios(EARNING_SAVE + '/hrms/loans/ddocode/' + userId + '/' + 'emps');
  //   }
  //   loanUpdateSave = (params) => {
  //     return CommonAxiosPost(EARNING_SAVE + '/hrms/loans/emp/update-loan-data', params)
  //   }
  //   loanRegistrationSave = (params) => {
  //     return CommonAxiosPost(EARNING_SAVE + '/hrms/loans/emp/new-loan-data', params)
  //   }
  //   employeeUpdationEsignSubmit(params) {
  //     return CommonAxiosPost(API_URL + "/master/esign-employee-details", params)
  //   }
  //   employeeDigitalBillSubmitFinal(params) {
  //     return CommonAxiosPost(API_URL + "/master/employee-details-submit", params)
  //   }
  //   loanEsignSubmit(params) {
  //     return CommonAxiosPost(EARNING_SAVE + "/hrms/loans/esign-loan-details", params)
  //   }
  //   loanBillSubmitFinal(params) {
  //     return CommonAxiosPost(EARNING_SAVE + "/hrms/loans/loan-details-submit", params)
  //   }
  //   transferInDigitalBillSubmitFinal(params) {
  //     return CommonAxiosPost(API_URL + "/master/esign-transfer-or-fac-in-submit", params)
  //   }
  //   facInDigitalBillSubmitFinal(params) {
  //     return CommonAxiosPost(API_URL + "/master/esign-transfer-or-fac-in-submit", params)
  //   }
  //   transfetOutDigitalBillSubmitFinal(params) {
  //     return CommonAxiosPost(API_URL + "/master/esign-transfer-out-submit", params)
  //   }
  //   loanReports(params) {
  //     return CommonAxiosPost(EARNING_SAVE + '/hrms/loans/esigned-loan-report', params)
  //   }
  //   employeeActionsReport(params) {
  //     return CommonAxios(API_URL + "/master/report-transfers-facs/" + params)
  //   }
  //   changePassword(params) {
  //     return CommonAxiosPost(LOGIN + '/login/update', params)

  //   }
  //   viewEmployeeInformation = (params) => {

  //     return CommonAxios(EARNING_SAVE + "/hrms/reports/empDetails/empId/" + params);
  //   }

  //   payFixationDDoCode(userId) {
  //     return CommonAxios(PAY_FIXATION_MASTER_BASE_URL + "hoo/" + userId + "/ddo-master");

  //   }
  //   fetchPayFixationEmployeeDetails(cfmsId) {
  //     return CommonAxios(PAY_FIXATION_MASTER_BASE_URL + "ddo/" + cfmsId + "/prc-emp-list")
  //   }
  //   fetchPrcMasterList() {
  //     return CommonAxios(PRC_YEAR_MASTER_URL)
  //   }

  //   updatePrcType(params) {
  //     return CommonAxiosPost(PRC_TYPE_UPDATE_URL, params);
  //   }
  //   fetchEsignEmployeeList(params) {
  //     return CommonAxiosPost(E_SIGN_EMPLOYEE_DETAILS_URL, params);
  //   }
  //   stoMakerDdo(userId) {
  //     return CommonAxios(PAY_FIXATION_MASTER_BASE_URL + "sto-maker/" + userId + "/ddos-list");
  //   }
  //   prcEmpListForMaker(ddoCode) {
  //     return CommonAxios(PAY_FIXATION_MASTER_BASE_URL + "sto-maker/" + ddoCode + "/emps-list");
  //   }
  //   //STO Approver
  //   serviceList(params) {
  //     return CommonAxios(API_URL + "/master/services-list/" + params)
  //   }
  //   ddoMobileUpdateView(params) {
  //     return CommonAxios(API_URL + "/master/perosnaldetailsverification/" + params)
  //   }
  //   saveUpdateMobile(params) {
  //     return CommonAxiosPost(API_URL + "/master/perosnaldetailsverification-submit", params)
  //   }
  //   enableOtp = (params) => {
  //     return CommonAxiosPost(API_URL + "/master/perosnaldetailsverification-otp-submit", params);
  //   }
  //   changePasswordFlag(params) {
  //     return CommonAxiosPost(API_URL + "/master/changepassword", params)
  //   }
  //   prcViewDetails(params) {
  //     return CommonAxios(API_URL + "/master/getaddemployeedetails/" + params)
  //   }
  //   submitViewDetails(params) {
  //     return CommonAxiosPost(API_URL + "/master/addemployeedetails-submit", params)
  //   }
  //   //STO Approver
  //   stoApproverDdo(userId) {
  //     return CommonAxios(PAY_FIXATION_MASTER_BASE_URL + "sto-submitter/" + userId + "/ddos-list");
  //   }

  //   stoChecker(ddoCode) {
  //     return CommonAxios(PAY_FIXATION_MASTER_BASE_URL + "sto-checker/" + ddoCode + "/emps-list");
  //   }
  //   fetchStoEmployeesList(params) {
  //     return CommonAxiosPost(STO_MAKER_DETAILS_URL, params);
  //   }
  //   fetchStoApproverEmployeesList(params) {
  //     return CommonAxiosPost(STO_APPROVER_EMPLOYEE_DETAILS_LIST, params);
  //   }
  //   esignApprover(userId) {
  //     return CommonAxios(PAY_FIXATION_MASTER_BASE_URL + "sto-submitter/" + userId + "/ddos-list");
  //   }
  //   fetchEsignApproverList(params) {
  //     return CommonAxiosPost(E_SIGN_APPROVER_DETAILS_URL, params);
  //   }
  //   saveWorkFlowDetails(values) {
  //     return CommonAxiosPost(PAYROLL_APPROVAL_AVA_WORKFLOW_SAVE_URL, values)
  //   }

  //   forgotPasswordDetails(params) {
  //     return CommonAxios(API_URL + '/master/perosnaldetailsverification/' + params)
  //   }
  //   submitForgotPasswordDetails(params) {
  //     return CommonAxiosPost(API_URL + '/master/forgotpasswordverification-submit', params)
  //   }
  //   forgotPasswordOtpSubmit(params) {
  //     return CommonAxiosPost(API_URL + '/master/forgotpasswordverification-otp-submit', params)
  //   }
  //   stoDetailReport(params) {
  //     return CommonAxios(API_URL + '/master/ddo-sto-details-report/' + params)
  //   }
  //   stoCheckerDdo(userId) {
  //     return CommonAxios(PAY_FIXATION_MASTER_BASE_URL + "sto-checker/" + userId + "/ddos-list");
  //   }
  //   fetchStoCheckerEmployeesList(params) {
  //     return CommonAxiosPost(STO_CHECKER_DETAILS_URL, params);
  //   }
  //   fetchEsignCheckerList(params) {
  //     return CommonAxiosPost(E_SIGN_CHECKER_DETAILS_URL, params);
  //   }
  //   esignChecker(userId) {
  //     return CommonAxios(PAY_FIXATION_MASTER_BASE_URL + "sto-checker/" + userId + "/ddos-list");
  //   }
  //   ddoGetOtp(params) {
  //     return CommonAxiosPost(API_URL + '/master/ddodetails-verification-submit', params);
  //   }
  //   submitDdoOtp(params) {
  //     return CommonAxiosPost(API_URL + '/master/ddo-details-verification-otp-submit', params)
  //   }
  //   userVerification(params) {
  //     return CommonAxiosPost(API_URL + '/master/userverification', params)
  //   }

  //   prcYearList(params) {
  //     return CommonAxios(PAY_FIXATION_MASTER_BASE_URL + "prc-year-master")
  //   }
  //   empslistprcothers(ddoCode) {
  //     return CommonAxios(API_URL + '/master/services/sto-submitter/' + ddoCode + '/emps-list-prc-others')
  //   }

  //   updateEmployeePrcYear(params) {
  //     return CommonAxiosPost(PAY_FIXATION_MASTER_BASE_URL + "sto-submitter/update-emp-prc-year", params)
  //   }
  //   empsListPrcOthers(ddoCode) {
  //     return CommonAxios(PAY_FIXATION_MASTER_BASE_URL + "sto-submitter/" + ddoCode + "/emps-list-prc-others");
  //   }

  //   annualIncrementDdoData(userId) {
  //     return CommonAxios(PAY_FIXATION_MASTER_BASE_URL + "hoo/" + userId + "/ddo-master")

  //   }

  //   annualIncrementempsList(params) {
  //     return CommonAxiosPost(EARNING_SAVE + "/hrms/increment/ddo/emps", params)
  //   }
  //   annualIncreementPrcDetails(params) {

  //     return CommonAxiosPost(EARNING_SAVE + "/hrms/increment/ddo/emp-pay-data", params)
  //   }

  //   departmentReport(params) {
  //     return CommonAxios(EARNING_SAVE + '/hrms/reports/deptdetails')
  //   }
  //   deptDistrictReport(params) {
  //     return CommonAxios(EARNING_SAVE + '/hrms/reports/dists/deptId/' + params)
  //   }
  //   deptDistrictStoReport(deptId, distId) {
  //     return CommonAxios(EARNING_SAVE + '/hrms/reports/stos/deptId/distId/' + deptId + '/' + distId)
  //   }
  //   deptDistrictStoDdoReport(deptId, distCode, stoCode) {
  //     return CommonAxios(EARNING_SAVE + '/hrms/reports/ddos/deptId/distCode/stoCode/' + deptId + '/' + distCode + '/' + stoCode)
  //   }
  //   stoPaoReport() {
  //     return CommonAxios(EARNING_SAVE + '/hrms/reports/dists')
  //   }
  //   stoReport(params) {
  //     return CommonAxios(EARNING_SAVE + '/hrms/reports/stos/distId/' + params)
  //   }
  //   ddoReport(districtCode, stoCode) {
  //     return CommonAxios(EARNING_SAVE + '/hrms/reports/ddos/distCode/stoCode/' + districtCode + '/' + stoCode)
  //   }
  //   stoSubmitter(ddoCode) {
  //     return CommonAxios(PAY_FIXATION_MASTER_BASE_URL + "sto-submitter/" + ddoCode + "/emps-list");
  //   }

  //   stoDtoLevelReport(params) {
  //     return CommonAxios(EARNING_SAVE + '/hrms/reports/stos/cfmsId/' + params)
  //   }

  //   stoMobileNumbersList = (ddoCode) => {
  //     return CommonAxios(API_URL + '/master/services/ddo/' + ddoCode + '/emp-mobile-update')
  //   }

  //   stoMobileNumberUpdateSave = (params) => {
  //     return CommonAxiosPost(API_URL + '/master/empmobileUpdate', params)
  //   }

  //   fetchDDOdetails(params, values) {
  //     return CommonAxiosPost(payroll_UpdateDdo_Save_Url, params, values);
  //   }

  //   getEmployeePaySlip(params) {
  //     return axios.post(EARNING_SAVE + '/hrms/payslipviewforIndividualEmp', params)
  //   }

  //   getEmployeePayslipPdf(currentmonthpdfurl) {
  //     return axios.get(EARNING_SAVE + currentmonthpdfurl, { responseType: 'blob' })

  //   }

  //   employeePaySlipCheckOTP(params) {
  //     return axios.post(EARNING_SAVE + '/hrms/payslipOtpSubmit', params)

  //   }

  //   getAadharPaySlipDetails(params) {
  //     return axios.post(EARNING_SAVE + '/hrms/payslipviewforIndividualEmp', params)

  //   }

  //   getAadharDetails(params) {
  //     return axios.get(EARNING_SAVE + '/hrms/aadhar/aadharotp?aadharNo=' + params)

  //   }

  //   aadhatOtpSubmit(params) {
  //     return axios.post(EARNING_SAVE + '/hrms/aadhar/aadharotpvalidation', params)

  //   }
  //   pensionnnerData(params) {
  //     return axios.post(EARNING_SAVE + '/hrms/aadhar/pensionerpayslips', params)
  //   }
  //   pensionnnerDataPdf(username, password, sequenceNumber) {
  //     return axios.get(EARNING_SAVE + '/hrms/aadhar/pensionerpayslipinfo?userName=' + username + '&password=' + password + '&sequenceNumber=' + sequenceNumber, { responseType: 'blob' })
  //   }

  //   payScaleDataMaster() {
  //     return CommonAxios(EARNING_SAVE + '/hrms/payscalesdata')
  //   }
  //   // ----------------------------------------  Pending Salaries Methods -------------------------------------------- //
  //   pendingSalaryViewData(params) {
  //     return CommonAxiosPost(EARNING_SAVE + '/hrms/previous-month-salary-view', params)
  //   }
  //   pendingSalaryEarnDedDetails(params) {
  //     return CommonAxiosPost(EARNING_SAVE + '/hrms/previous-month-salary-calculation', params)
  //   }
  //   savePendingSalaryData(params) {
  //     return CommonAxiosPost(EARNING_SAVE + '/hrms/previous-month-salary-save', params)
  //   }

  //   JddetailsForReport(params) {

  //     // return CommonAxiosPost(EARNING_SAVE + "/hrms/services/ddo/emps/monthly-paydata/", params);
  //     return CommonAxiosPost(EARNING_SAVE + "/hrms/services/ddo/emps/monthly-paydata/", params);
  //     // return CommonAxiosPost('https://api.herb.apcfss.in:8448' + "/hrms/services/ddo/emps/monthly-paydata/", params);

  //   }
  //   JddetailsForReportPaySlip(params) {
  //     //Excell Purpose
  //     return CommonAxiosPostPdf(EARNING_SAVE + '/hrms/services/ddo/paydata-report/excel', params, { responseType: 'blob' })

  //   }

  //   JddetailsForReportPaySlipData(params) {
  //     //pdf purpose
  //     return CommonAxiosPostPdf(EARNING_SAVE + '/hrms/services/ddo/emp/payslip', params)
  //   }
  //   // ------------------------------------ Re Hire Services -------------------------------------------
  //   reHireEmpDetailsDisplay(params) {
  //     return CommonAxios(EARNING_SAVE + '/hrms/hire/emp-det/' + params)
  //   }
  //   reHireEmpDetailsSave(params) {

  //     return CommonAxiosPost(EARNING_SAVE + '/hrms/hire/save-biometric', params)
  //   }
  //   reHireBiometricSubmit(params) {

  //     return CommonAxiosPost(EARNING_SAVE + '/hrms/hire/submit-biometric', params)
  //   }
  //   // -----------------------------  FAC OUT Services ------------------------------------------------------------
  //   facEmpList(params) {

  //     return CommonAxios(EARNING_SAVE + '/hrms/fac-out-emp-list/' + params)
  //   }
  //   // -----------------------------  CFMS ACTIONS Services --------------------------------------------
  //   cfmsActionsList(params) {

  //     return CommonAxios(EARNING_SAVE + '/hrms/masters-actions-list')
  //   }
  //   saveCfmsActionsData(params) {

  //     return CommonAxiosPost(EARNING_SAVE + '/hrms/others-save-biometric', params)
  //   }
  //   submitBiometricCfmsActions(params) {

  //     return CommonAxiosPost(EARNING_SAVE + '/hrms/others-submit-biometric', params)
  //   }

  //   biometricFacOutSave = (params) => {
  //     return CommonAxiosPost(EARNING_SAVE + "/hrms/transferout-biometric", params)

  //   }

  //   hoaDropdownData(cfmsId) {
  //     return CommonAxios(API_URL + '/master/hoasMaster/' + cfmsId)

  //   }
  //   //----------------------------------------------------- Annual Surrender Leave Services -------------------------------------------------------------//
  //   annualSurrenderLeaveTable(params) {
  //     return CommonAxios(EARNING_SAVE + "/hrms/surrenderleaves/" + params)
  //   }
  //   annualSurrenderLeaveDetails(params) {
  //     return CommonAxios(EARNING_SAVE + "/hrms/createsurrenderleaves/" + params)
  //   }
  //   saveAnnualSurrenderLeaveDetails = (params) => {
  //     return CommonAxiosPost(EARNING_SAVE + "/hrms/savesurrenderLeave", params)
  //   }
  //   updateSaveAnnualLeaveDetails(userId) {
  //     return CommonAxios(EARNING_SAVE + "/hrms/surrenderleaveactionview/" + userId)
  //   }
  //   biometricRequestSubmit(params) {
  //     return CommonAxiosPost(EARNING_SAVE + "/hrms/surrenderLeave-biometric", params)
  //   }
  //   submitBiometricAnnualSurrenderLeave(params) {
  //     return CommonAxiosPost(EARNING_SAVE + "/hrms/surrenderLeave-submit-biometric", params)
  //   }
  //   deleteAnnualSurrenderLeaveDetails(cfmsId) {
  //     return CommonAxios(EARNING_SAVE + "/hrms/surrenderleaveactiondelete/" + cfmsId)
  //   }
  //   // ----------------------------------------------------------- TBR Report -------------------------------------------------------------------------

  //   tbrReports(ddoCode) {
  //     return CommonAxios(EARNING_SAVE + "/hrms/tbrReport/" + ddoCode)

  //   }

  //   // doj on change service ---------------------------------------------------------------------------------------------

  //   dojChangeDDoLevelSubmit(params) {
  //     return CommonAxiosPost(API_URL + '/master/ddo-doj-correction-biometric', params)

  //   }

  //   dojOnChangeBiometricResponse(params) {
  //     return CommonAxiosPost(API_URL + '/master/ddo-doj-correction-sumbit-biometric', params)

  //   }

  //   dojOnChangeStoDetailsReport(userId) {

  //     return CommonAxios(API_URL + '/master/sto-doj-correction-details/' + userId)

  //   }

  //   dojSToLevelSubmit(params) {

  //     return CommonAxiosPost(API_URL + '/master/sto-doj-correction-biometric', params)

  //   }

  //   dojSToLevelBiometricSubmit(params) {

  //     return CommonAxiosPost(API_URL + '/master/sto-doj-correction-submit-biometric', params)

  //   }
  //   // --------------------------------------- Basic Pay Change Services --------------------------------------------------------------------------

  //   basicPayChangeEmployeesList = (ddoCode) => {

  //     return CommonAxios(API_URL + '/master/emp-payfixation/emp-details/' + ddoCode)

  //   }

  //   submitBasicPayRequestBiometric = (params) => {
  //     return CommonAxiosPost(API_URL + '/master/ddo-pay-fixation-correction-biometric', params)
  //   }

  //   SubmitBasicPayBiometricDDO = (params) => {
  //     return CommonAxiosPost(API_URL + '/master/ddo-pay-fixation-correction-sumbit-biometric', params)
  //   }

  //   basicPayChangeSTODetails = (userId) => {
  //     return CommonAxios(API_URL + '/master/sto-pay-fixation-correction-details/' + userId)
  //   }

  //   SubmitbasicPayChangeSTODetails = (params) => {
  //     return CommonAxiosPost(API_URL + '/master/sto-pay-fixation-correction-submit-biometric', params)
  //     // return CommonAxiosPost('http://172.16.160.103:8451' + '/master/sto-pay-fixation-correction-submit-biometric', params)

  //   }

  //   basicPayStoSubmit = (params) => {
  //     return CommonAxiosPost(API_URL + '/master/sto-pay-fixation-correction-biometric', params)
  //     //  return CommonAxiosPost('http://172.16.160.103:8451' + '/master/sto-pay-fixation-correction-biometric', params)

  //   }

  //   dojChangeRequestStatusReport() {
  //     return CommonAxios(API_URL + '/master/sto-doj-correction-report-details')

  //   }
  //   dojChangeServiceView(cfmsId) {
  //     return CommonAxios(API_URL + '/master/doj-correction-details-view/' + cfmsId)

  //   }

  //   basicPayChangeRequestStatusReport() {
  //     return CommonAxios(API_URL + '/master/sto-pay-fixation-correction-report-details')

  //   }

  //   setData(employee) {
  //     return CommonAxios(API_URL + '/master/pay-fixation-correction-details-view/' + employee)
  //   }

  //   ///--------------------------------------------------------------------- basic pay status report ------------------------------------------------------------------------

  //   basicPayStatusStoPaoReport(month, year) {
  //     // return CommonAxios(EARNING_SAVE + "/hrms/reports/bill-report/dists/" + month + "/" + year)
  //     return CommonAxios(EARNING_SAVE+"/hrms/reports/bill-report/dists/" + month + "/" + year)

  //   }

  //   basicPayStatusStoReport(month, year, distId) {
  //     // return CommonAxios(EARNING_SAVE + '/hrms/reports/bill-report/stos/distId/' + month + '/' + year + '/' + distId)
  //     return CommonAxios(EARNING_SAVE+'/hrms/reports/bill-report/stos/distId/' + month + '/' + year + '/' + distId)

  //   }

  //   basicPayStatusDdoReport(month, year, distId, stoCode) {
  //     return CommonAxios(EARNING_SAVE + '/hrms/reports/bill-report/ddos/distCode/stoCode/' + month + '/' + year + '/' + distId + '/' + stoCode)

  //   }
  //   // ----------------------------------------------------------------- Vacant Positions -------------------------------------------------------------------------------
  //   viewVacantPositionDetails(positionId) {
  //     return CommonAxios(API_URL + '/master/position-vaccant-view-details/' + positionId)
  //   }

  //   saveVacantPositionDetails(positionId) {
  //     return CommonAxios(API_URL + '/master/position-vaccant-save-details/' + positionId)
  //   }

  //   /// -------------------------------------- CFMS DATA DISPLAY ---------------------------------------------------------------------------------------------------

  //   viewCfmsData(ddoCode) {
  //     return CommonAxios(EARNING_SAVE + '/hrms/ddo-org-data/' + ddoCode)

  //   }
  //   cfmsEmployeesData(ddoCode) {
  //     return CommonAxios(EARNING_SAVE + '/hrms/employee-data/' + ddoCode)

  //   }

  //   /// -------------------------------------- Reports Urls New ---------------------------------------------------------------------------------------------------

  //   reportform47(params) {
  //     return CommonAxiosPostPdf(EARNING_SAVE + "/hrms/salary/reports/form47-summary-report/pdf", params, { responseType: 'blob' })

  //   }
  //   reportPayslip(params) {
  //     return CommonAxiosPostPdf(EARNING_SAVE + '/hrms/salary/reports/payslips-summary-report/pdf', params, { responseType: 'blob' })

  //   }
  //   reportSubscriptions(params) {
  //     return CommonAxiosPostPdf(EARNING_SAVE + '/hrms/salary/reports/subscriptions-summary-report/pdf', params, { responseType: 'blob' })

  //   }
  //   reportPaySlipVariationExcell(params) {
  //     return CommonAxiosPostPdf(EARNING_SAVE + '/hrms/salary/reports/payslips-variation-report/excel', params, { responseType: 'blob' })

  //   }
  //   reportPaySlipsExcell(params) {
  //     return CommonAxiosPostPdf(EARNING_SAVE + '/hrms/salary/reports/payslips-report/excel', params, { responseType: 'blob' })

  //   }

  //   getMobileNumbers = (params) => {
  //     return CommonAxios(API_URL + '/master/emp-peronal-details-view/' + params)
  //   }
  //   employeeMobileUpdate = (cfmsId, mobileNumber) => {
  //     return CommonAxios(API_URL + '/master/emp-peronal-details-save/' + cfmsId + '/' + mobileNumber)
  //   }
  //   getDistrictData = (params) => {
  //     return CommonAxios(API_URL + '/master/emp-peronal-details-view/' + params)
  //   }
  //   UpdateDistrictBasicPayDetails(params) {
  //     return CommonAxiosPost(API_URL + '/master/basicPayChangess-save', params)
  //   }

  //   getDdoAadharDetails = (params) => {
  //     return CommonAxios(EARNING_SAVE + '/hrms/get-ddo-bio-exist-details/' + params)
  //   }

  //   getPositionList = (params) => {
  //     return CommonAxios(EARNING_SAVE + '/hrms/get-ddo-bio-position-details/' + params)
  //   }

  //   getchnameAndHrmsId = (params) => {
  //     return CommonAxios(EARNING_SAVE + '/hrms/get-ddo-bio-emp-details/' + params)
  //   }

  //   UpdateDDOAadharDetails(params) {
  //     return CommonAxiosPost(EARNING_SAVE + '/hrms/get-ddo-bio-save-details', params)
  //   }
  //   getBlueScreenDetails = (params) => {
  //     return CommonAxios(EARNING_SAVE + '/hrms/blue-screen-emp-details/' + params)

  //   }
  //   getPayscaleCode() {
  //     return CommonAxios(API_URL + '/master/getPayScalecode')
  //   }

  //   getPositionsDataForBlueScreen = (params) => {
  //     return CommonAxios(EARNING_SAVE + '/hrms/blue-screen-position-details/' + params)
  //   }
  //   submitBlueScreenDetails(params) {
  //     return CommonAxiosPost(EARNING_SAVE + '/hrms/blue-screen-emp-save-details', params)
  //   }

  //   getOrgsWithOnBlurinBlueScreen = (params) => {
  //     return CommonAxios(EARNING_SAVE + '/hrms/blue-screen-org-details/' + params)

  //   }
  //   // ---------------------------------- RTC Employees Excel Upload ----------------------------------------------------------//
  //   saveRTCEmployeesData(params) {
  //     return CommonAxiosPostPdf(EARNING_SAVE + '/hrms/rtc-employees/bulkimport', params, { responseType: 'blob' })
  //   }
  //   //pension workflow
  //   pensionWorkFlowDdoData = (userId) => {
  //     return CommonAxios(EARNING_SAVE + '/hrms/pension-workflow/sto-ddo-code/' + userId);
  //   }

  //   getDetailsforPensionersWOrkFlow = (ddoCode) => {
  //     return CommonAxios(EARNING_SAVE + '/hrms/pension-workflow/sto-emp-list/' + ddoCode);
  //   }

  //   deletePensionWorkFlowData(positionId) {
  //     return CommonAxios(EARNING_SAVE + '/hrms/pension-workflow/sto-delete-emp/' + positionId)
  //   }

  //   savePensionerWorkFlowDetails(values) {
  //     return CommonAxiosPost(PENSIONER_WORKFLOW_SAVE_URL, values)
  //   }

  //   // ------------------------------- New Joinee Profoma ------------------------------------------------------------------------- //
  //   stateMandalVillagesList() {
  //     return CommonAxios(EARNING_SAVE + '/hrms/empId/listofstates/01')
  //   }
  //   newJoineeProformaMastersList() {
  //     return CommonAxios(API_URL + '/master/empMaster/empId-creation-masters')
  //   }
  //   departmentOfficeLevel(userId) {
  //     return CommonAxios(API_URL + '/master/empMaster/department-office-level/' + userId)
  //   }
  //   saveNewEmployeeJoineeProforma(params) {
  //     return CommonAxiosPost(EARNING_SAVE + '/hrms/empId/empDetailsSave', params)

  //   }
  //   getNewJoineeProfomaDDORequests(userId) {
  //     return CommonAxios(EARNING_SAVE + '/hrms/empId/listofemployees/' + userId)
  //   }
  //   submitRequestBiometricNewJoineeProforma(params) {
  //     return CommonAxiosPost(EARNING_SAVE + '/hrms/empId/emp-details-ddo-biometric', params)
  //   }
  //   submitBiometricDDONewJoineeProfoma(params) {
  //     return CommonAxiosPost(EARNING_SAVE + '/hrms/empId/emp-details-ddo-submit-biometric', params)
  //   }
  //   getstoApprovalPendingDetailsNewJoineeProforma(userId) {
  //     return CommonAxios(EARNING_SAVE + '/hrms/empId/regular-employee-pending-sto/' + userId)
  //   }
  //   viewIndividualEMPSTOPendingNewJoineeProfomaDetails(employeeId) {
  //     return CommonAxios(EARNING_SAVE + '/hrms/empId/regular-employee-pending-sto-emp-details/' + employeeId)
  //   }
  //   positionValueValidation(positionId) {
  //     return CommonAxios(EARNING_SAVE + '/hrms/empId/position-vaccant-validation/' + positionId)

  //   }
  //   aadharValueValidation(aadharId) {
  //     return CommonAxios(EARNING_SAVE + '/hrms/empId/adhar-validation/' + aadharId)
  //   }
  //   panValueValidation(panNo) {
  //     return CommonAxios(EARNING_SAVE + '/hrms/empId/pan-validation/' + panNo)
  //   }
  //   bankAccountValueValidation(bankAccountNo) {
  //     return CommonAxios(EARNING_SAVE + '/hrms/empId/bank-account-no-validation/' + bankAccountNo)
  //   }
  //   cadreStrengthValidation(params) {
  //     return CommonAxiosPost(EARNING_SAVE + '/hrms/empId/cadre-strength-validation', params)
  //   }
  //   rejectNewJoineeProfomaAtSTO(params) {
  //     return CommonAxiosPost(EARNING_SAVE + "/hrms/empId/regular-employee-pending-sto-rejection", params)
  //   }
  //   stoBiometricNewJoineeProfoma(userId) {
  //     return CommonAxios(EARNING_SAVE + '/hrms/empId/sto-biometric/' + userId)
  //   }
  //   generateHrmsId(empNumber) {
  //     return CommonAxios(EARNING_SAVE + '/hrms/empId/regular-employee-pending-sto-hrms-id-gen/' + empNumber)
  //   }
  //   generateCfmsId(empNumber) {
  //     return CommonAxios(EARNING_SAVE + '/hrms/empId/regular-employee-pending-sto-cfms-id-gen/' + empNumber)
  //   }

  //   //// pensioneer View & Update Screen

  //   pensioneerViewDdoList(userId) {
  //     return CommonAxios(EARNING_SAVE + '/hrms/pensioner-update/ddoCodes/' + userId)
  //   }

  //   pensioneerViewEmpList(ddoCode) {
  //     return CommonAxios(EARNING_SAVE + '/hrms/pensioner-update/emps-list/' + ddoCode)
  //   }

  //   pensioneerViewIndividualEmpList(cfmsId) {
  //     return CommonAxios(EARNING_SAVE + '/hrms/pensioner-update/emps-det/' + cfmsId)
  //   }
  //   /// ------- Volunteer New Joinee Profoma ---------------------------- //

  //   VolunteersnewJoineeProformaMastersList() {
  //     return CommonAxios(API_URL + '/master/empMaster/volunteer-creation-masters')

  //   }
  //   VolunteerEmpGroupList(cfmsId) {

  //     return CommonAxios(API_URL + '/master/empMaster/volunteer-creation-master-emp-group/' + cfmsId)
  //   }
  //   VolunteerNewJoineeProfomaSave(params) {

  //     return CommonAxiosPost(EARNING_SAVE + '/hrms/vounteer-emp-id-gen/empDetailsSave', params)
  //   }
  //   volunteerListDDOLevelNewJoineeProforma(userId) {

  //     return CommonAxios(EARNING_SAVE + '/hrms/vounteer-emp-id-gen/listofemployees/' + userId)
  //   }
  //   volunteerSubmitRequestDDOLevelBiometric(params) {

  //     return CommonAxiosPost(EARNING_SAVE + '/hrms/vounteer-emp-id-gen/emp-details-ddo-biometric', params)
  //   }
  //   volunteerSubmitDDOLevelBiometric(params) {

  //     return CommonAxiosPost(EARNING_SAVE + '/hrms/vounteer-emp-id-gen/emp-details-ddo-submit-biometric', params)
  //   }
  //   getSTOVolunteerSTOLevelList(userId) {

  //     return CommonAxios(EARNING_SAVE + '/hrms/vounteer-emp-id-gen/volunteer-employee-pending-sto/' + userId)
  //   }
  //   viewIndividualVolunteerEMPSTOPendingNewJoineeProfomaDetails(empId) {

  //     return CommonAxios(EARNING_SAVE + '/hrms/vounteer-emp-id-gen/volunteer-employee-pending-sto-emp-details/' + empId)
  //   }
  //   volunteerNewJoineeProfomaRejectEmp(params) {

  //     return CommonAxiosPost(EARNING_SAVE + '/hrms/vounteer-emp-id-gen/volunteer-employee-pending-sto-rejection', params)
  //   }
  //   volunteerGenerateHrmsID(empNumber) {

  //     return CommonAxios(EARNING_SAVE + '/hrms/vounteer-emp-id-gen/volunteer-employee-pending-sto-hrms-id-gen/' + empNumber)
  //   }
  //   volunteerGenerateCfmsID(empNumber) {

  //     return CommonAxios(EARNING_SAVE + '/hrms/vounteer-emp-id-gen/volunteer-employee-pending-sto-cfms-id-gen/' + empNumber)
  //   }

  // //Master data Corrections
  //  // ----------------------- Employee Master Data Updation by DDO -----------------------------

  //  getEmployeeDDODetails(params) {
  //   return CommonAxiosPost(EARNING_SAVE + '/hrms/master-data-corrections/empDetails', params)

  // }

  // submitMasterDDOEmpDetails(params) {

  //   // return CommonAxiosPost('http://172.16.160.103:8448/hrms/master-data-corrections/emp-data-correction', params)

  //   return CommonAxiosPost(EARNING_SAVE + '/hrms/master-data-corrections/emp-data-correction', params)

  // }

  // submitBiometricMasterDDOEmpDetails(params) {

  //   // return CommonAxiosPost('http://172.16.160.103:8448/hrms/master-data-corrections/emp-data-correction-submit-biometric', params)

  //   return CommonAxiosPost(EARNING_SAVE + '/hrms/master-data-corrections/emp-data-correction-submit-biometric', params)

  // }
  // viewProcessedMasterDataUpdationReport(userId) {

  //   // return CommonAxios('http://172.16.160.103:8448/hrms/master-data-corrections/emp-data-correction-ddo-confirmed-list/' + userId)

  //   return CommonAxios(EARNING_SAVE + '/hrms/master-data-corrections/emp-data-correction-ddo-confirmed-list/' + userId)

  // }

  // ///--------------------------------------------------------------------- Volunteer pay status report ------------------------------------------------------------------------

  // volunteerPayStatusStoPaoReport(month, year) {
  //   return CommonAxios(EARNING_SAVE + "/hrms/reports/bill-report/dists/vvwv/" + month + "/" + year)

  // }

  // volunteerPayStatusStoReport(month, year, distId) {
  //   return CommonAxios(EARNING_SAVE + '/hrms/reports/bill-report/stos/distId/vvwv/' + month + '/' + year + '/' + distId)

  // }

  // volunteerPayStatusDdoReport(month, year, distId, stoCode) {
  //   return CommonAxios(EARNING_SAVE+'/hrms/reports/bill-report/ddos/distCode/stoCode/vvwv/' + month + '/' + year + '/' + distId + '/' + stoCode)

  // }

  // ///--------------------------------------------------------------------- Gsws pay status report ------------------------------------------------------------------------

  // gswsPayStatusStoPaoReport(month, year) {
  //   return CommonAxios(EARNING_SAVE + "/hrms/reports/bill-report/dists/gsws/" + month + "/" + year)

  // }

  // gswsPayStatusStoReport(month, year, distId) {
  //   return CommonAxios(EARNING_SAVE + '/hrms/reports/bill-report/stos/distId/gsws/' + month + '/' + year + '/' + distId)

  // }

  // gswsPayStatusDdoReport(month, year, distId, stoCode) {
  //   return CommonAxios(EARNING_SAVE + '/hrms/reports/bill-report/ddos/distCode/stoCode/gsws/' + month + '/' + year + '/' + distId + '/' + stoCode)

  // }

  getPPOPensioner(searchID) {
    return CommonAxios(
      "https://192.168.0.105:8451/master/pensions/ppoid/" + searchID
    );
  }

  getPPOValuestoForm(searchID) {
    return CommonAxios(
      "https://192.168.0.105:8451/master/pensions/getPData/" + searchID
    );
  }

  submitPPOForm1Details(req) {
    return CommonAxiosPost(
      "https://192.168.0.105:8451/master/pensions/savePpoTestData/",
      req
    );
  }
  submitPPOFormstopageDetails(req) {
    return CommonAxiosPost(
      "https://192.168.0.105:8451/master/pensions/savePpoStopData/",
      req
    );
  }
  getPPOValuestoForm2(searchID) {
    return CommonAxios(
      "https://192.168.0.105:8451/master//pensions/getPpoStopData?cfmsId=14382004" +
        searchID
    );
  }
  getPPOValuestoForm1(searchID) {
    return CommonAxios(
      "https://192.168.0.105:8451/master//pensions/getPpoStopData?cfmsId=" +
        searchID
    );
  }
  submitPPOForm2Details(req) {
    return CommonAxiosPost(
      "https://192.168.0.105:8451/master/pensions/savePpoBasicData",
      req
    );
  }
  getconditionalForm3(searchID) {
    return CommonAxios(
      "https://192.168.0.105:8451/master/pensions/getBasicData/" + searchID
    );
  }

  getPPOValuestoForm3(searchID) {
    return CommonAxios(
      "https://192.168.0.105:8451/master/pensions/getCommutationData/" +
        searchID
    );
  }
  submitPPOForm3Details(req) {
    return CommonAxiosPost(
      "https://192.168.0.105:8451/master/pensions/savePpoCommutationData",
      req
    );
  }

  getPPOValuestoForm4(searchID) {
    return CommonAxios(
      "https://192.168.0.105:8451/master/pensions/getGratuityData/" + searchID
    );
  }
  submitPPOForm4Details(req) {
    return CommonAxiosPost(
      "https://192.168.0.105:8451/master/pensions/savePpoGratuityData",
      req
    );
  }

  getPPOValuestoForm5() {
    return CommonAxios(
      "https://192.168.0.105:8451/master/pensions/getAllowanceCodes/"
    );
  }
  submitPPOForm5Details(req) {
    return CommonAxiosPost(
      "https://192.168.0.105:8451/master/pensions/saveAllowanceCodes",
      req
    );
  }
  submitPPOForm6Details(req) {
    return CommonAxiosPost(
      "https://192.168.0.105:8451/master/pensions/saveDrOthAllowance",
      req
    );
  }
  submitstoppageDetails(req) {
    return CommonAxiosPost(
      "https://192.168.0.105:8451/master/pensions/saveDrOthAllowance",
      req
    );
  }
  submitavcDetails(req) {
    return CommonAxiosPost(
      "https://192.168.0.105:8451/master/pensions/saveDrOthAllowance",
      req
    );
  }
  getPPOValues() {
    return CommonAxios(
      "https://192.168.0.105:8451/master/pensions/getSelectLists"
    );
  }
}
export default new LoadingServices();
