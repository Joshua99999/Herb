import { useEffect, useState } from "react";
import * as HERBUI from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ErrorMessage, Field } from "formik";
import { GrMandriva } from "react-icons/gr";
import { WorkFlow_URL } from "../../Api/WorkflowUrls";
import { useSelector } from "react-redux";
import DataTable from "../EmployeeUpdation/DataTable";
import { blmSetModalPopupData } from "./popup";

import { store } from "../../store";
import { CommonAxios } from "../CommonAxios";
const SearchProcessor = (props) => {
  let Approver = props.details;
  let statedata = useSelector(state => state.DeleteData)
  const [data,setData]=useState([])
  let removeData = statedata.DeleteRow;
  const ddoFinderColumns = [
    {
      dataField: 'employeeCode',
      text: 'Employee Code',
      sort: true,

    },
    {
      dataField: 'employeeName',
      text: 'Employee Name',
      sort: true,

    }, {
      dataField: 'positionId',
      text: 'Position ID',
      sort: true,
    }, {
      dataField: 'positionName',
      text: 'Position Name',
      sort: true,
    },
    {
      dataField: 'orgUnit',
      text: 'Org Unit',
      sort: true,
    },
    {
      dataField: 'orgUnitDesc',
      text: 'Org Unit Description',
      sort: true,
    },
    {
      dataField: 'ddoCode',
      text: 'DDO Code',
      sort: true,
    },
    {
      dataField: 'ddoCodeDesc',
      text: 'DDO Code Description',
      sort: true,
    },
    {
      formatter: favoriteFormatter,
      text: 'Favourite',
      sort: true,
    },
  ];
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      let count = 0;
      let result = ''
      props.formik.values.Workflow.map((item) => {
        if (parseInt(item.processor) == parseInt(row.positionId)) {
          result = true;
        }
      })
      if (result !== true) {
        props.formik.setFieldValue('Workflow[' + props.index + '].processor', row.positionId)
        props.formik.setFieldValue('Workflow[' + props.index + '].processorName', row.employeeName)
        props.formik.setFieldValue('Workflow[' + props.index + '].level', props.index + 1)
        props.formik.setFieldValue('Workflow[' + props.index + '].positionName', row.positionName)
        props.formik.setFieldValue('Workflow[' + props.index + '].EmployeeCode', row.employeeCode)
      }
      else {
        blmSetModalPopupData.errorAlert("Position Already Selected");
      }
      hideModal();
    },
  }
  const [datatableDetails, setDatatableDetails] = useState({ headers: ddoFinderColumns, body: [], keyField: 'ddoCode', rowEvents: rowEvents });
  const [employeedata, setEmployeData] = useState([]);
  const [placeData, setPlaceData] = useState('');
  const [responsedata, setResponseData] = useState([]);
  const [count, setCount] = useState(1);
  function favoriteFormatter(value, context) {
    return (
      <div
        style={{
          textAlign: "center",
          cursor: "pointer",
          lineHeight: "normal"
        }}>
        <button type="button" onClick={() => alert("hii")}><GrMandriva size={25} /></button>
      </div>
    )
  }
  function hideModal() {
    props.hideModal()
  }
  
  
  const placeHolderData = (e) => {
    const value = e.target.value;
    setEmployeData(value);
    if (value == 5) {
      setPlaceData('Favourites')
    }
    else if (value == 1) {
      setPlaceData("Search by Employee ID")
    }
    else if (value == 2) {
      setPlaceData("Search by Position")
    }
    else if (value == 4) {
      setPlaceData("Search by Office")
    }
    else if (value == 3) {
      setPlaceData("Search by DDO Code")
    }
  }
  function OpenReport() {
    const value = props.formik.values.favorite;
    const value1 = props.formik.values.searchData;
    CommonAxios(WorkFlow_URL + value + "/" + value1).then((response) => {
      if (response !== undefined && response !== '') {
        store.dispatch({ type: "PDWORKFLOW_DATA", payload: response });
        setData(response.data)
      }
    });
  }
  useEffect(()=>{
    setDatatableDetails(prevState => ({
      ...prevState,
      body: data
    }))

  },[data])
  
  return (
    <>
      <HERBUI.Row>
        <HERBUI.Col>
          <Field type='text' name="favorite" autoComplete='off'
            component='select' className="form-control required" onClick={placeHolderData}>
            <option>-----Select-----</option>
            <option value="1">Search by Employee ID</option>
            <option value="2">Search by Position</option>
            <option value="3">Search by DDO Code</option>
            <option value="4">Search by Office</option>
            <option value="5">Favourite</option>
          </Field>
          <ErrorMessage name='favorite' className="text-error" component="div" />
        </HERBUI.Col>
        <HERBUI.Col>
          <Field type='text' name="searchData" autoComplete='off' placeholder={placeData} className="form-control required" ></Field>
          <ErrorMessage name='searchData' className="text-error" component="div" />
        </HERBUI.Col>
        <HERBUI.Col>
          <button type="button" className="btn btn-primary" onClick={OpenReport}>Search</button>
        </HERBUI.Col>
      </HERBUI.Row>
      <HERBUI.Row>
        <DataTable plotData={datatableDetails} />
        {/* <DataTable plotData={datatableDetails}> 
       </DataTable> */}
      </HERBUI.Row>
    </>
  )
}
export default SearchProcessor;