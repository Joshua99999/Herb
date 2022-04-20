export const initialState = { 
    isExistingData: false,   
    filterList:{},
    filterData:{},
    filterDataOption:{},
    emploayeePayrollList: '',
    year:'',
    month:'',
    noOfworkingDays:'',
    updatedEmpData: {}
    
};

//-----------------------|| PAYROLL REDUCER ||-----------------------//

const payrollReducer = (state = initialState, action) => {
    switch (action.type) {
        case "EMPLOYEE_PAYROLL": {
 console.log("##..payload..............s"+JSON.stringify(action.payload))
            const { isExistingData, filterList, filterData, filterDataOption, emploayeePayrollList , year , month, noOfworkingDays, updatedEmpData } = action.payload;
            return {
                ...state,
                isExistingData,
                filterList, filterData, filterDataOption,
                emploayeePayrollList,year, month , noOfworkingDays,updatedEmpData
                
            };
        }
        case "RESET_PAYROLL":{
            // console.log("## payload:"+JSON.stringify(action.payload))
            const { isExistingData, filterList, filterData, filterDataOption, emploayeePayrollList , year , month, noOfworkingDays, updatedEmpData } = action.payload;
            return {
                ...state,
                isExistingData,
                filterList, filterData, filterDataOption,
                emploayeePayrollList,year, month , noOfworkingDays, updatedEmpData
                
            };
        }
        default: {
            // console.log("%% enter to reducer: "+JSON.stringify(state))
            return { ...state };
        }
    }
};

export default payrollReducer;
