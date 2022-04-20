import { ErrorMessage, Field, FieldArray } from "formik";
import { useEffect,useState} from "react";
import * as HERBUI from "react-bootstrap";
import { RiLoginBoxLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { BiTrash } from "react-icons/bi";
import AddNewWorkFlowPopup from "./AddNewWorkFlowPopup";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import TableHeader from "./TableHeader";
import { store } from '../../store';

const PDWorkflow = ({formik,values,fieldArrayProps}) =>{
  let statedata = useSelector(state=>state.DeleteData)
  let storeData = statedata.workflowTable;
  let removeData = statedata.DeleteRow;
  const [data,setData]=useState([])
  const [deletedata,setdeleteData]=useState([])
    const [show,setShow]=useState(false);
    const [state,setState]=useState(false);
    const [showTableData,setShowTableData] = useState(false);
    const tableHeaderDetails= [
    { label:'Processor Position',isMandatory:false,showField:true} , { label:'Processor',isMandatory:false,showField:true},
    { label:'Activity',isMandatory:false,showField:true},{ label:'Start Date',isMandatory:false,showField:true},
    { label:'End Date',isMandatory:false,showField:true}, { label:'Status',isMandatory:false,showField:true}, { label:'Action',isMandatory:false,showField:true}];
   function OpenModalPopup(){
    setShow(true);
   }
   function closeModal(){
    setShow(false);
    } 
  const deleteRow=(item,index)=> {
      Swal.fire({
        text: 'Do you want to delete ?',icon: 'question',showCancelButton: true,
        confirmButtonColor: '#3085d6',cancelButtonColor: '#d33',confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
        let newList = data.filter((data) => parseInt(data.processor) !== parseInt(item.processor));
        store.dispatch({type:"workflowTableData", payload:newList});
         deletedata.remove([index]);
          Swal.fire({
            text: 'Deleted Successfully',icon: 'success'
          })
        }})
      }
       useEffect(()=>{
        setData(storeData)
        setdeleteData(removeData)
       },[data,storeData,deletedata,removeData])
    return(
        <>
          <div className="inner-herbpage-service-title-sub mb-4p5">
              <h1>WORKFLOW</h1>
              </div>
              <div className="table-responsive">
        </div>
        <HERBUI.Row>
        <HERBUI.Col xs={12} sm={12} md={12} lg={10} xl={10} xxl={10}/>
        <HERBUI.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
             <button type="button" onClick={OpenModalPopup} className="btn btn-success"><RiLoginBoxLine/> Add New Workflow</button>
        </HERBUI.Col>
        <div className="table-responsive">
       <table className="table table-hover table-sm" style={{textAlign:"center"}} >
       <TableHeader headerValues={tableHeaderDetails} />
                 <tbody>
            {data!==undefined && data.map((item,index)=>(
                <tr key={index} id="myTable">  
                 <td>{item.positionName}</td>
                <td>{item.processor}</td>
                <td>{item.activity}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                <BiTrash size="25px" color="red" onClick={()=>deleteRow(item,index)}/>
                  </td>
                </tr>
            ))}   
              </tbody>       
          </table>
          </div>
          <br></br>
          </HERBUI.Row>
      <AddNewWorkFlowPopup  show={show}  hideModal={closeModal} formik={formik}/>             
        </>
    )
}
export default PDWorkflow;