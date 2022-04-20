import axios from 'axios';
//import Swal from 'sweetalert2';
// import { TOKEN_REMOVER_URL } from '../API/utils/UIURLS';
import { store } from '../store/index';

export const CommonAxios = async (url) => {

    let data = '';
    let dataAccount=JSON.parse(localStorage.getItem('datta-account'))
    console.log(JSON.stringify(dataAccount))
    var token = dataAccount.token
    try {
        let res = await axios({
            url: url,
            method: 'get',
            headers: { Authorization: "Bearer " + JSON.parse(token) }
        })
        if (res.status === 200) {
            data = res
        }
        return data
    }
    catch (err) {
       
        // if (err.response.status === 401) {
        //     Swal.fire({ text: "Session Expired,Please Re-Login!!", icon: 'error', confirmButtonColor: '#3085d6', confirmButtonText: "Ok", })
        //         .then(function (isConfirm) {
        //             if (isConfirm.value) {
        //                 store.dispatch({ type: 'LOGOUT' });
        //             } 
        //         });
        // } 
        // else if (err.response.status === 404) {
        //     Swal.fire({ text: "Data Not Found", icon: 'error', confirmButtonColor: '#3085d6', confirmButtonText: "Ok", })
        //         .then(function (isConfirm) {
        //             if (isConfirm.value) {
        //                 //   store.dispatch({ type: 'LOGOUT' }); 
        //             }

        //         });

        // } else if (err.response.status === 500) {

        //     Swal.fire({ text: "Could not fetch the data for that  resource", icon: 'error', confirmButtonColor: '#3085d6', confirmButtonText: "Ok", })
        //         .then(function (isConfirm) {
        //             if (isConfirm.value) {
        //                 //   store.dispatch({ type: 'LOGOUT' });
        //             }
        //         });
        //     return ''
        // }
        // store.dispatch({ type: 'HIDE_SPINNER' });
    }
    
};

export const CommonAxiosPost = async (url, values) => {
    try {
        let data = ''
        var token = JSON.parse(localStorage.getItem('token'));
        let res = await axios({
            url: url,
            method: 'post',
            data: values,
            headers: { Authorization: "Bearer " + token }
        })
        if (res.status === 200) {
            data = res
        }
        return data
    }
    catch (err) {

        // if (err.response.status === 401) {
        //     Swal.fire({
        //         text: 'Session Expired!!, please login',
        //         icon: 'error',
        //         confirmButtonColor: '#3085d6', confirmButtonText: "Ok"
        //     }).then(function (isConfirm) {
        //         if (isConfirm.value) {
        //             localStorage.clear();
        //             store.dispatch({ type: 'LOGOUT' });
        //              window.location.href = TOKEN_REMOVER_URL
        //         }
        //     });;
        // }
        // else if (err.response.status === 404) {
        //     Swal.fire({ text: "Data Not Found", icon: 'error', confirmButtonColor: '#3085d6', confirmButtonText: "Ok", })
        //         .then(function (isConfirm) {
        //             if (isConfirm.value) {
        //                 // store.dispatch({ type: 'LOGOUT' });
        //             }
        //         });
        // }
        // else if (err.response.status === 500) {
        //     Swal.fire({ text: "Could Not Fetch Data!", icon: 'error', confirmButtonColor: '#3085d6', confirmButtonText: "Ok", })
        //         .then(function (isConfirm) {
        //             if (isConfirm.value) {
        //                 // store.dispatch({ type: 'LOGOUT' });
        //             }
        //         });
        // }
        // store.dispatch({ type: 'HIDE_SPINNER' });
        // // return ''
    }
};
// export const CommonAjaxPdfDownloadGet = async (url) => {

//     var token = JSON.parse(localStorage.getItem("token"));

//     try {
//         let res = await axios({
//             url: url,
//             method: 'get',
//             headers: { Authorization: "Bearer " + token },
//             responseType: 'blob',
//         })
//         if (res.status === 200) {
//             return res
//         }
//     }
//     catch (res) {
//         failureResponse(res);
//     }
// };
// export const CommonAjaxPostWithFileUploadExcel = async (url, values) => {
//     let res = '';
//     var token = JSON.parse(localStorage.getItem("token"));
//     try {
//         res = await axios({
//             url: url,
//             method: 'post',
//             async: false,
//             contentType: false,
//             processData: false,
//             data: values,
//             headers: { Authorization: "Bearer " + token },
//             responseType: 'blob',
//         })
//         if (res.status === 200) {
//             console.log(res.status)
//         }
//         return res
//     }
//     catch (err) {
//         console.log(err.response.status);
//         if (err.response.status === 401) {
//             Swal.fire({
//                 text: 'Session Expired!!, please login',
//                 icon: 'error',
//                 confirmButtonColor: '#3085d6', confirmButtonText: "Ok"
//             }).then(function (isConfirm) {
//                 if (isConfirm.value) {
//                     localStorage.clear();
//                     store.dispatch({ type: 'LOGOUT' });
//                     window.location.href = TOKEN_REMOVER_URL
//                 }
//             });;
//         }
//         else if (err.response.status === 404) {
//             Swal.fire({ text: "Data Not Found", icon: 'error', confirmButtonColor: '#3085d6', confirmButtonText: "Ok", })
//                 .then(function (isConfirm) {
//                     if (isConfirm.value) {
//                         // store.dispatch({ type: 'LOGOUT' });
//                     }
//                 });
//         }
//         else if (err.response.status === 500) {
//             Swal.fire({ text: "Could Not Fetch Data!", icon: 'error', confirmButtonColor: '#3085d6', confirmButtonText: "Ok", })
//                 .then(function (isConfirm) {
//                     if (isConfirm.value) {
//                         // store.dispatch({ type: 'LOGOUT' });
//                     }
//                 });
//         }
//         store.dispatch({ type: 'HIDE_SPINNER' });
//         return ''
//     }
// };
// export const CommonAxiosGet = async (url, values) => {
//     try {
//         let data = ''
//         var token = JSON.parse(localStorage.getItem('token'));
//         let res = await axios({
//             url: url,
//             method: 'get',
//             data: values,
//             headers: { Authorization: "Bearer " + token }
//         })
//         if (res.status === 200) {
//             data = res
//         }
//         return data
//     }
//     catch (err) {

//         if (err.response.status === 401) {
//             Swal.fire({
//                 text: 'Session Expired!!, please login',
//                 icon: 'error',
//                 confirmButtonColor: '#3085d6', confirmButtonText: "Ok"
//             }).then(function (isConfirm) {
//                 if (isConfirm.value) {
//                     localStorage.clear();
//                     store.dispatch({ type: 'LOGOUT' });
//                     window.location.href = TOKEN_REMOVER_URL
//                 }
//             });;
//         }
//         else if (err.response.status === 404) {
//             Swal.fire({ text: "Data Not Found", icon: 'error', confirmButtonColor: '#3085d6', confirmButtonText: "Ok", })
//                 .then(function (isConfirm) {
//                     if (isConfirm.value) {
//                         // store.dispatch({ type: 'LOGOUT' });
//                     }
//                 });
//         }
//         else if (err.response.status === 500) {
//             Swal.fire({ text: "Could Not Fetch Data!", icon: 'error', confirmButtonColor: '#3085d6', confirmButtonText: "Ok", })
//                 .then(function (isConfirm) {
//                     if (isConfirm.value) {
//                         // store.dispatch({ type: 'LOGOUT' });
//                     }
//                 });
//         }
//         store.dispatch({ type: 'HIDE_SPINNER' });
//         return ''
//     }
// };
// export const CommonAxiosDelete = async (url, values) => {
//     try {
//         let data = ''
//         var token = JSON.parse(localStorage.getItem('token'));
//         let res = await axios({
//             url: url,
//             method: 'post',
//             data: values,
//             headers: { Authorization: "Bearer " + token }
//         })
//         if (res.status === 200) {
//             data = res
//         }
//         return data
//     }
//     catch (err) {

//         if (err.response.status === 401) {
//             Swal.fire({
//                 text: 'Session Expired!!, please login',
//                 icon: 'error',
//                 confirmButtonColor: '#3085d6', confirmButtonText: "Ok"
//             }).then(function (isConfirm) {
//                 if (isConfirm.value) {
//                     localStorage.clear();
//                     store.dispatch({ type: 'LOGOUT' });
//                     window.location.href = TOKEN_REMOVER_URL
//                 }
//             });;
//         }
//         else if (err.response.status === 404) {
//             Swal.fire({ text: "Data Not Found", icon: 'error', confirmButtonColor: '#3085d6', confirmButtonText: "Ok", })
//                 .then(function (isConfirm) {
//                     if (isConfirm.value) {
//                         // store.dispatch({ type: 'LOGOUT' });
//                     }
//                 });
//         }
//         else if (err.response.status === 500) {
//             Swal.fire({ text: "Could Not Fetch Data!", icon: 'error', confirmButtonColor: '#3085d6', confirmButtonText: "Ok", })
//                 .then(function (isConfirm) {
//                     if (isConfirm.value) {
//                         // store.dispatch({ type: 'LOGOUT' });
//                     }
//                 });
//         }
//         store.dispatch({ type: 'HIDE_SPINNER' });
//         return ''
//     }
// };

// export const CommonAxiosPostPdf = async (url, values) => {
//     let data = ''
//     var token = JSON.parse(localStorage.getItem('token'));
//     try {
//         let res = await axios({
//             url: url,
//             method: 'post',
//             data: values,
//             responseType: 'blob',
//             headers: { Authorization: "Bearer " + token }
//         })
//         if ((res.status === 200) && (res !== undefined)) {

//             data = res
//         }
//     }
//     catch (err) {

//         if (err.response.status === 401) {
//             Swal.fire({
//                 text: 'Session Expired!!, please login',
//                 icon: 'error',
//                 confirmButtonColor: '#3085d6', confirmButtonText: "Ok"
//             }).then(function (isConfirm) {
//                 if (isConfirm.value) {
//                     localStorage.clear();
//                     store.dispatch({ type: 'LOGOUT' });
//                     window.location.href = TOKEN_REMOVER_URL
//                 }
//             });;
//         }
//         else if (err.response.status === 404) {
//             Swal.fire({ text: "Data Not Found", icon: 'error', confirmButtonColor: '#3085d6', confirmButtonText: "Ok", })
//                 .then(function (isConfirm) {
//                     if (isConfirm.value) {
//                         // store.dispatch({ type: 'LOGOUT' });
//                     }
//                 });
//         }
//         else if (err.response.status === 500) {
//             Swal.fire({ text: "Could Not Fetch Data!", icon: 'error', confirmButtonColor: '#3085d6', confirmButtonText: "Ok", })
//                 .then(function (isConfirm) {
//                     if (isConfirm.value) {
//                         // store.dispatch({ type: 'LOGOUT' });
//                     }
//                 });
//         }
//         store.dispatch({ type: 'HIDE_SPINNER' });
//         return ''
//     }
//     return data
// };
// export const CommonAxiosGetsPdf = async (url, values) => {
//     let data = ''
//     var token = JSON.parse(localStorage.getItem('token'));
//     try {
//         let res = await axios({
//             url: url,
//             method: 'get',
//             // data: values,
//             responseType: 'blob',
//             headers: { Authorization: "Bearer " + token }
//         })
//         if ((res.status === 200) && (res !== undefined)) {

//             data = res
//         }
//     }
//     catch (err) {

//         if (err.response.status === 401) {
//             Swal.fire({
//                 text: 'Session Expired!!, please login',
//                 icon: 'error',
//                 confirmButtonColor: '#3085d6', confirmButtonText: "Ok"
//             }).then(function (isConfirm) {
//                 if (isConfirm.value) {
//                     localStorage.clear();
//                     store.dispatch({ type: 'LOGOUT' });
//                     window.location.href = TOKEN_REMOVER_URL
//                 }
//             });;
//         }
//         else if (err.response.status === 404) {
//             Swal.fire({ text: "Data Not Found", icon: 'error', confirmButtonColor: '#3085d6', confirmButtonText: "Ok", })
//                 .then(function (isConfirm) {
//                     if (isConfirm.value) {
//                         // store.dispatch({ type: 'LOGOUT' });
//                     }
//                 });
//         }
//         else if (err.response.status === 500) {
//             Swal.fire({ text: "Could Not Fetch Data!", icon: 'error', confirmButtonColor: '#3085d6', confirmButtonText: "Ok", })
//                 .then(function (isConfirm) {
//                     if (isConfirm.value) {
//                         // store.dispatch({ type: 'LOGOUT' });
//                     }
//                 });
//         }
//         store.dispatch({ type: 'HIDE_SPINNER' });
//         return ''
//     }
//     return data
// };
// export function failureResponse(res) {
//     let errorMessage = "Something Went Wrong. Please Try again";
//     if (res.request !== undefined) {
//         if (res.request.status === 401 || res.request.status === 403) {
//             errorMessage = "UnAuthorised Access";
//         }
//         else if ((res.request.status === 404) || (res.request.status === 500) || (res.request.status === 400)) {
//             if (res.response.data.errorMessage !== null && res.response.data.errorMessage !== undefined && res.response.data.errorMessage.length > 0) {
//                 errorMessage = res.response.data.errorMessage;
//                 store.dispatch({ type: 'HIDE_SPINNER' });
//             }
//         }
//     }
//     else {
//         errorMessage = "Something Went Wrong. Please Try Again";
//     }
//     Swal.fire({
//         title: errorMessage,
//         icon: 'warning',
//         confirmButtonColor: '#8CD4F5',
//         confirmButtonText: 'Ok!'
//     });
// }
// export const CommonAjaxPostWithFileUpload = async (url, values) => {

//     let res = '';
//     var token = JSON.parse(localStorage.getItem("token"));
//     try {
//         res = await axios({
//             url: url,
//             method: 'post',
//             async: false,
//             contentType: false,
//             processData: false,
//             data: values,
//             headers: { Authorization: "Bearer " + token },
//         })
//         if (res.status === 200) {

//         }
//         return res
//     }
//     catch (err) {

//         if (err.response.status === 401) {
//             Swal.fire({
//                 text: 'Session Expired!!, please login',
//                 icon: 'error',
//                 confirmButtonColor: '#3085d6', confirmButtonText: "Ok"
//             }).then(function (isConfirm) {
//                 if (isConfirm.value) {
//                     localStorage.clear();
//                     store.dispatch({ type: 'LOGOUT' });
//                     window.location.href = TOKEN_REMOVER_URL
//                 }
//             });;
//         }
//         else if (err.response.status === 404) {
//             Swal.fire({ text: "Data Not Found", icon: 'error', confirmButtonColor: '#3085d6', confirmButtonText: "Ok", })
//                 .then(function (isConfirm) {
//                     if (isConfirm.value) {
//                         // store.dispatch({ type: 'LOGOUT' });
//                     }
//                 });
//         }
//         else if (err.response.status === 500) {
//             Swal.fire({ text: "Could Not Fetch Data!", icon: 'error', confirmButtonColor: '#3085d6', confirmButtonText: "Ok", })
//                 .then(function (isConfirm) {
//                     if (isConfirm.value) {
//                         // store.dispatch({ type: 'LOGOUT' });
//                     }
//                 });
//         }
//         store.dispatch({ type: 'HIDE_SPINNER' });
//         return ''
//     }
// };
// export const CommonAjaxPdfDownload = async (url, values) => {
//     var token = JSON.parse(localStorage.getItem("token"));
//     try {
//         let res = await axios({
//             url: url,
//             method: 'post',
//             headers: { Authorization: "Bearer " + token },
//             responseType: 'blob',
//             data: values,
//         })
//         if (res.status === 200) {
//             var a = document.createElement("a");
//             document.body.appendChild(a);
//             const file = new Blob(
//                 [res.data],
//                 { type: 'application/pdf' });
//             const fileURL = URL.createObjectURL(file);
//             a.href = fileURL;
//             a.download = 'Basic Pay';
//             a.target = '_blank';
//             a.click();
//             window.open(fileURL);
//         }
//     }
//     catch (err) {

//         if (err.response.status === 401) {
//             Swal.fire({
//                 text: 'Session Expired!!, please login',
//                 icon: 'error',
//                 confirmButtonColor: '#3085d6', confirmButtonText: "Ok"
//             }).then(function (isConfirm) {
//                 if (isConfirm.value) {
//                     localStorage.clear();
//                     store.dispatch({ type: 'LOGOUT' });
//                     window.location.href = TOKEN_REMOVER_URL
//                 }
//             });;
//         }
//         else if (err.response.status === 404) {
//             Swal.fire({ text: "Data Not Found", icon: 'error', confirmButtonColor: '#3085d6', confirmButtonText: "Ok", })
//                 .then(function (isConfirm) {
//                     if (isConfirm.value) {
//                         // store.dispatch({ type: 'LOGOUT' });
//                     }
//                 });
//         }
//         else if (err.response.status === 500) {
//             Swal.fire({ text: "Could Not Fetch Data!", icon: 'error', confirmButtonColor: '#3085d6', confirmButtonText: "Ok", })
//                 .then(function (isConfirm) {
//                     if (isConfirm.value) {
//                         // store.dispatch({ type: 'LOGOUT' });
//                     }
//                 });
//         }
//         store.dispatch({ type: 'HIDE_SPINNER' });
//         return ''
//     }
//     //return data
// };