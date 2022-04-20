/* eslint-disable array-callback-return */
import Swal from "sweetalert2";
export const blmSetModalPopupData =
{
  errorAlert: (errorMessage,redirectUrl) => {
    Swal.fire({
      icon: 'warning',
      text: errorMessage,
      confirmButtonText: 'Ok',
      confirmButtonClass: "swal-button--confirm"
    });
  },
//   successAlert: (errorMessage) => {
//     Swal.fire({
//       text: errorMessage,
//       icon: 'success',
//       confirmButtonText: 'Ok',
//       confirmButtonClass: "swal-button--confirm"
//     }).then(
//       function(){
//         window.location.href=WORK_CENTER_URL;
//       }
//     );
//   },
//   errorAlertWithRedirection: (errorMessage,redirectUrl) => {
//     Swal.fire({
//       icon: 'error',
//       text: errorMessage,
//       confirmButtonText: 'Ok',
//       confirmButtonClass: "swal-button--confirm"
//     }).then(function(){
//       window.location.href=PAYROLL_LOGIN_URL;
//     });
//   }
}

