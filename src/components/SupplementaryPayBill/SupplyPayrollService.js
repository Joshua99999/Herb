import { SUPPLY_API_URL } from "../../services/ConfigService";
import axiosServices from "../../services/axiosService";



class SupplyPayrollService {

    ddoData(userId) {
        
        return axiosServices.get(SUPPLY_API_URL + "/ddo/" + userId + "/emps");
    }
    
    empData(params) {
        return axiosServices.post(SUPPLY_API_URL + "/ddo/payroll", params)
    }

    addEarnings() {
        return axiosServices.get(SUPPLY_API_URL + "/payhead/master")
    }

    excludePayroll(params){
        return axiosServices.post(SUPPLY_API_URL + "/exclude/emp/payroll", params)
    }

    resetStructure(params){
        return axiosServices.post(SUPPLY_API_URL+"/emp/payroll-reset",params)
    }
    SaveStructure(params){
        return axiosServices.post(SUPPLY_API_URL+"/save-emp-payroll",params)
    }

    getCADRE(params){
        return axiosServices.post(SUPPLY_API_URL+"/pay-bill-processing",params)
    }

    getEarningAmout(params){
        return axiosServices.post(SUPPLY_API_URL+"/add/emp/payhead",params)
    }

    selectedEmp(params){
        return axiosServices.post(SUPPLY_API_URL+"/emp/payroll-data",params)
    }

    attendanceDisplay(params){
        console.log("$$$$$$$$$$$$$$....."+JSON.stringify(params))
        return axiosServices.post(SUPPLY_API_URL+"/emp/attendance/display",params)
    }
    attendanceSave(params){
        console.log("$$$$$$$$$$$$$$....."+JSON.stringify(params))
        return axiosServices.post(SUPPLY_API_URL+"/emp/attendance/save",params)
    }

    form47(params){
        return axiosServices.post(SUPPLY_API_URL+"/ddo/form47-summary-report/pdf", { params: params }, {responseType:'blob'})
    }

    payslip(params){
        return axiosServices.post(SUPPLY_API_URL+"/ddo/payslips-summary-report/pdf" , {params : params} , {responseType:'blob'})
    }
     
    schedule(params){
        return axiosServices.post(SUPPLY_API_URL + "/ddo/subscriptions-summary-report/pdf" , {params: params} , {responseType:'blob'})
    }
}

export default new SupplyPayrollService();