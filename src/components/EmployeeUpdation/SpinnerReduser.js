const initialSpinnerValues=
  {
    showSpinner:false  

}

  export default function SpinnerReducer(spinnerValues= initialSpinnerValues, action) {
    switch (action.type) {
      case "SHOW_SPINNER":
        return {
          ...spinnerValues,
          showSpinner:true
        };

        case "HIDE_SPINNER":
            return {
              ...spinnerValues,
              showSpinner:false
            };

      default:
        return spinnerValues;
    }
  }