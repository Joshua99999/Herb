import axios from 'axios';
import { API_URL, EARNING_SAVE } from './EmployeeApiis';

class LoadingServices {


  ddoData = (userId) => {
    
    return axios.get(API_URL + "/master/services/hoo/" + userId + "/ddo-master");
  }

  fectchEmployeeDetails = (ddoCode) => {
    return axios.get(API_URL + "/master/services/ddo/" + ddoCode + "/emp-master");
  }
  fectchEmpEditDetails = (cfmsId) => {
    return axios.get(API_URL + '/master/getempdetails' + "/" + cfmsId);
  }
  fetchIfscCodeDetails = (ifscCode) => {
    return axios.get(API_URL + '/master/ifscvalidation' + "/" + ifscCode);
  }

  fetchPayScalesData = () => {
    return axios.get(API_URL + '/master/payscalesdata');
  }
  fetchMasterCommonDetails = () => {
    return axios.get(API_URL + '/master/getmastersdata1');

  }
  fetchDeptPostCommonDetails = () => {
    return axios.get(API_URL + '/master/getmastersdata2');
  }


  fectchPrcCodeDetails = () => {
    return axios.get(API_URL + '/master/getPayScalecode');
  }

  fectchEarnDeductionGroupDetails = (prcCodeValue) => {
    //Modal popup details
    return axios.get(API_URL + '/master/getPaygroupdetails' + "/" + prcCodeValue);
  }

  postDetailsSave = (postDetails) => {
    return axios.post(API_URL + '/master/postdetailssave', postDetails);
  }

  basicDetailsSave = (empDetails) => {
    return axios.post(API_URL + '/master/empdetailssave', empDetails)
  }



  postEarnDetails = (earnDetails) => {
    console.log("earning deduction..." + API_URL + '/master/earndeductionsave')
    return axios.post(API_URL + '/master/earndeductionsave', earnDetails)
  }
  addButtonEarningAmount = (addEarningAmountDetails) => {
    
    console.log("addEarningAmountDetails urllllllll..." + EARNING_SAVE + '/hrms/services/add/emp/payhead')
    return axios.post(EARNING_SAVE + '/hrms/services/add/emp/payhead', addEarningAmountDetails)

  }
  //Earning deductions masters
  fectchEarningsDetails = () => {
    return axios.get(EARNING_SAVE + "/hrms/services/payhead/master");
  }

  personalEmpSavings = (personalDetails) => {
    return axios.post(API_URL + '/master/accountNumbersDataSaving', personalDetails)
  }


  fectchReportTypeDetails = () => {
    return axios.get(API_URL + "/master/getreport");
  }
  fectchPayrollCalendarTypeDetails = (ddoCode) => {
    return axios.post(EARNING_SAVE + "/hrms/services/ddo/payroll-calendar", ddoCode);
  }
  fectchPayBillProcessingDetails = (billSummary) => {
    return axios.post(EARNING_SAVE + "/hrms/services/pay-bill-processing", billSummary);
  }
  fectchPayBillDetails = (billDetails) => {
    return axios.post(EARNING_SAVE + "/hrms/services/ddo/hoa-billsummary-report", billDetails);
  }
  modalPopupSave = (modalPopupDetails) => {
    return axios.post(API_URL + "/master/paycalculation", modalPopupDetails);
  }
  transferOutType = () => {
    console.log("transferout master api....." + API_URL + "/master/relievingtype")
    return axios.get(API_URL + "/master/relievingtype");
  }
  transferOutSave = (params) => {
    return axios.post(API_URL + "/master/transferout", params);
  }
  transferInDetails = (params) => {
    return axios.get(API_URL + "/master/transferindet/"+ params);
  }
  transferInDdo = (params) => {
    return axios.get(API_URL + "/master/masterddos/"+ params);
  }
  transferInSave = (params) => {
    return axios.post(API_URL + "/master/transferorfacinsave", params);
  }
}
export default new LoadingServices();