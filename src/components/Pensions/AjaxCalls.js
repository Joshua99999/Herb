
import axios from 'axios';
import Swal from 'sweetalert2';
import { LOGIN_PAGE_URL, PAYROLL_LOGIN_URL } from '../../Api/WorkflowUrls';
import { store } from '../../store';

export const CommonAjaxGetRequestWithOutParams= async (url) => {   
    let res=''
    var token=JSON.parse(localStorage.getItem("eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJaajBVWEZHSDVpZjJ2ZGN2ak1rQ29QRERQc1ZLdENJajZvMHFlT1EzTERVIn0.eyJleHAiOjE2NDg2NDY2MDcsImlhdCI6MTY0ODY0MzAwNywianRpIjoiZjNiYjZhZTEtMzgxNy00NTk1LTgxMDEtNzdlYmE0ZmZjZWZlIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLmRldi5oZXJiLmFwY2Zzcy5pbi9hdXRoL3JlYWxtcy9oZXJiIiwic3ViIjoiNDk0NWQ0M2ItODdmZS00NTAyLTgyYzktZmExY2JlNWQ1MjE1IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiaGVyYi1sb2dpbiIsInNlc3Npb25fc3RhdGUiOiI2ZTBkMWZkZS03M2U5LTQwYWYtYmJjMS05YjgxZjQzMmFkZWMiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIiIsIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIlBEX0FDQ09VTlRfU1RBVE1FTlQiLCJQRF9TY2hlbWVfTWFzdGVyIiwiUGRfQ29udGlnZW50X1NjYW50aW9uIiwiQlVER0VUX0lOQk9YX09VVF9CT1giXX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6IjZlMGQxZmRlLTczZTktNDBhZi1iYmMxLTliODFmNDMyYWRlYyIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IjE0NDAzNTUzIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiMTQ0MDM1NTMiLCJnaXZlbl9uYW1lIjoiMTQ0MDM1NTMifQ.BurYYcytxSRgvq1t4RW6vY_45Dt4jRzC_PVe1Ak6RAWIY35HstOr9M0dOFxWeQWswqqNbDKslsCG14m-IETAyv_czTPqj6_myGgjH7mzCF9bXRkVXJMIjQbiGTuGkALHOBmcd0cVYEf2IFgOEBX4ClN7atl-0A2u7Kf-9uDmlUz_zevY_7v2Nf8p_xsaPCqICC2yOGPwJRgmE9rL62RB8vPe1r4UpbWXbSukLlr9CfiK7HiJQ6IUlfZ5W_fewcmKP8ersQ8c3TBECE3m9X_la_wqrHAYprVxyNShjmjcUGwdCiSdaDHs-M5hRxSCPUdD_D7Sy5rZ3TaKN3D_1KNP2g"));
    try {
        res = await axios({
            url: url,
            method: 'get',
            headers:{ Authorization: "Bearer " + token}
        })
        if(res.status === 200){
            console.log(res.status)
        }    
        return res.data
    }
    catch (err) {
        failureResponse(err);
    }
};

export function failureResponse(res){
    let errorMessage="Something Went Wrong. Please Try again";
    if(res.response!==undefined){
        if(res.response.status===401 ||res.response.status===403  ){
            errorMessage="UnAuthorised Access"; 
             
        }
        else if((res.response.status===404) || (res.response.status===500)||(res.response.status===400) ){
             if(res.response.data.errorMessage!==null && res.response.data.errorMessage!==undefined && res.response.data.errorMessage.length>0 )
             {
                 
                errorMessage=res.response.data.errorMessage;
             }
        }
    }
    else{
        errorMessage='Something Went Wrong. Please Try again';
    }
    Swal.fire({  
        text:errorMessage,  
        icon: 'error',  
        confirmButtonColor: '#4962B3',  
        confirmButtonText: 'Ok'  
    }).then(function(){
        if(res.response!==undefined){
            if(res!==undefined && res!==null && res!==''&& res.response.status!==undefined){
                if(res.response.status===401 || res.response.status===403){
                    if(localStorage.getItem('context')==='Payroll'){
                        window.location.href=PAYROLL_LOGIN_URL
                    }
                    else{
                        window.location.href=LOGIN_PAGE_URL
                    }                    
                }
            }
        }
    });
    store.dispatch({ type: 'HIDE_SPINNER' });
}
// export const CommonAjaxPostWithFileUpload= async (url,values) => {
//     let res='';
//     var token=JSON.parse(localStorage.getItem("token"));
//     try {
//         res = await axios({
//             url: url,
//             method: 'post',
//            headers:{ Authorization: "Bearer " + token},
//             data : values,
//         })
//         if(res.status === 200){
     
//             console.log(res.status)
//         }    
//         return res.data
//     }
//     catch (err) {
//         failureResponse(res);
//     }
// };


// export const CommonAjaxPostRequest=async(url,values)=>{
//     let res='';
//     var token=JSON.parse(localStorage.getItem("token"));
//     try{
//          res = await axios({
//             url: url,
//             method: 'post',
//             data : values,
//             headers:{ Authorization: "Bearer " + token}
//         })
//         if(res.status === 200){
     
//             console.log(res.status)
//         }    
//         return res.data
//     }
//     catch (err) {
//         store.dispatch({type:'HIDE_SPINNER'});
//         failureResponse(err);
//     }
// };
// export const CommonAjaxDeleteRequest=async(url,values)=>{
//     let res='';
//     var token=JSON.parse(localStorage.getItem("token"));
//     try{
//         res= await axios.delete(url,{
//         headers:{ Authorization: "Bearer " + token} ,
//         data: values,
//         })  ;
//       if(res.status === 200){
     
//         console.log(res.status)
//     }    
//     return res.data
//     }
//     catch (err) {
//         store.dispatch({type:'HIDE_SPINNER'});
//         failureResponse(res);
//     }
// };
// export const CommonAjaxPostSecurityRequest=async(url)=>{
//     let res='';
//     var urlencoded = new URLSearchParams();
//     urlencoded.append('client_id',CLIENT_ID);
//     urlencoded.append('grant_type',GRANT_TYPE);
//     urlencoded.append('client_secret',CLIENT_SECRET);
//     urlencoded.append('username',14002781);
//     urlencoded.append('password','password');
//     var Headers={
//         'Content-Type': 'application/x-www-form-urlencoded',
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Methods":"POST"
//     }
//     try{
//         res = await axios.post(url,urlencoded,Headers);
//         if(res.status === 200){
            
//             console.log(res.status)
//         }
//         return res.data   
//     }
//     catch (err) {
//         failureResponse(res);
//     }
// };

// export function failureResponse(res){
//     let errorMessage="Something Went Wrong. Please Try again";
//     if(res.response!==undefined){
//         if(res.response.status===401 ||res.response.status===403  ){
//             errorMessage="UnAuthorised Access"; 
             
//         }
//         else if((res.response.status===404) || (res.response.status===500)||(res.response.status===400) ){
//              if(res.response.data.errorMessage!==null && res.response.data.errorMessage!==undefined && res.response.data.errorMessage.length>0 )
//              {
                 
//                 errorMessage=res.response.data.errorMessage;
//              }
//         }
//     }
//     else{
//         errorMessage='Something Went Wrong. Please Try again';
//     }
//     Swal.fire({  
//         text:errorMessage,  
//         icon: 'error',  
//         confirmButtonColor: '#4962B3',  
//         confirmButtonText: 'Ok'  
//     }).then(function(){
//         if(res.response!==undefined){
//             if(res!==undefined && res!==null && res!==''&& res.response.status!==undefined){
//                 if(res.response.status===401 || res.response.status===403){
//                     if(localStorage.getItem('context')==='Payroll'){
//                         window.location.href=PAYROLL_LOGIN_URL
//                     }
//                     else{
//                         window.location.href=LOGIN_PAGE_URL
//                     }                    
//                 }
//             }
//         }
//     });
//     store.dispatch({ type: 'HIDE_SPINNER' });
// }
// export const CommonAjaxLoginRequest=async(url,values)=>{
//     let res='';
//     try{
//         res = await axios({
//             url: url,
//             method: 'post',
//             data : values,
//         })
//         if(res.status === 200){
            
//             console.log(res.status)
//         }
//         return res.data   
//     }
//     catch (err) {
//         console.error(err);
//         return res;
//     }
// };
// export const CommonAjaxPutRequest=async(url,values)=>{
//     try{
//         let res = await axios({
//             url: url,
//             method: 'put',
//             data:values
//         })
//         if(res.status === 200){
     
//             console.log(res.status)
//         }    
//         return res.data
//     }
//     catch (err) {
//         store.dispatch({type:'HIDE_SPINNER'});
//          console.error(err);
//     }
// };

// export const CommonAjaxPdfDownload=async(url)=>{
//     var token=JSON.parse(localStorage.getItem("token"));
//    try{
//        let res=await axios({
//            url: url,
//            method: 'get',
//            headers:{ Authorization: "Bearer " + token},
//            responseType: 'blob',
           
//        })
//        if(res.status===200){
//            var a = document.createElement("a");
//            document.body.appendChild(a);
//            const file = new Blob(
//            [res.data], 
//                {type: 'application/pdf'});
//                const fileURL = URL.createObjectURL(file);
//                a.href = fileURL;
//                a.download = 'entity';
//                a.target='_blank';
//                a.click();
//                window.open(fileURL);
//        }
//    }
//    catch (res) {
//        failureResponse(res);
//    }
// };