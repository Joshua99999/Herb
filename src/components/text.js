import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {useState,useEffect} from 'react';
import React from 'react';
import {useFormik } from "formik";
import * as Yup from 'yup';
// import '../../App.css';
import Footer from '../../Footer/Footer';
import * as HERBUI from "react-bootstrap"
import FormHeader from '../../Header/FormHeader';
import 'react-tabs/style/react-tabs.css';
import '../../expenditure.css';
import { IconName } from "react-icons/io5";
// import  {blmWorkCenterMap,blmWorkCenterTabConst} from  '../Components/BlmWorkCenterTableHeader';
// import BillGenerationModal from '../Container/BillGenerationModal';
import useAPIRequest from '../../Api/utils/useAPIRequest';
import { useDispatch, useSelector } from 'react-redux';
import {blmCreateListUpdateInStore, blmMainListSetInModalUp,blmSubListSetInModalUp} from '../../store/actions/BlmWorkCenterAction';
import ModalPopUp from '../../Components/shared/ModalPopUp';
import { useHistory } from 'react-router';
import { EXPENDITURE_WORKCENTER_URL} from '../../Api/utils/BLMURLS';
import {tableHeadersMap,tableBodyMap} from '../../service/BillSubmitionWorkCenterTableHeader'
import DataTable from '../../Components/shared/DataTable';
import { appendSerialNo } from '../../service/commonServices';
import { IoFileTrayOutline,IoDocumentsOutline,IoCodeWorkingOutline,IoReturnUpForwardOutline,IoNavigateOutline } from "react-icons/io5";
 
// import '../expenditure.css';

const   WorkCenter = () => {
  let url={
    url:EXPENDITURE_WORKCENTER_URL,
    method: 'get',
    data: {}
}
const state=useSelector(state=>state.blmworkCenterDetails);
const [tabIndex, setTabIndex] = useState(0);
const [datatableDetails, setDatatableDetails] = useState({headers:tableHeadersMap.get(tabIndex),body:[],keyField:'Status'});
const history =useHistory();
const dispatch=useDispatch();
const [urlParams, setUrlParams] = useState(url);
const [apiData,setApidata]=useAPIRequest( urlParams);
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);

function modalSelect(event)
  {
    if( event.target.closest("button").getAttribute('data-service-type')==='MainBillType')
    {
      dispatch(blmSubListSetInModalUp(event));
    }
    else if(event.target.closest("button").getAttribute('data-id')=='returnBack' )
    {
      dispatch(blmMainListSetInModalUp());
     } else{
        history.push("blmform/"+event.target.closest("button").getAttribute('data-id'));
      }
  }
function billCreationModal()
{
   dispatch(blmMainListSetInModalUp());
   setShow(true);
 }
 useEffect(() => {
  if(apiData!=null)
  {
    dispatch(blmCreateListUpdateInStore(apiData));
    setDatatableDetails(prevState => ({
      ...prevState,
      headers:tableHeadersMap.get(tabIndex),
      body:appendSerialNo(apiData.intrayDetailsList)
  }));
  }
 },[apiData]);

 useEffect(() => {
  setDatatableDetails(prevState => ({
      ...prevState,
      headers:tableHeadersMap.get(tabIndex),
      body:appendSerialNo(state[tableBodyMap.get(tabIndex)])
  }));
 },[tabIndex]);

 return (
  <>
  <div className="main_section">  </div>
  <HERBUI.Container>
     <HERBUI.Row>
       <HERBUI.Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="page-titlespacing">
         <div className="inner-herbpage-service-nodual-header-title1">
           <h1>Work Center</h1>
         </div>
       </HERBUI.Col>
     </HERBUI.Row>
   </HERBUI.Container>
   <HERBUI.Container  className="outer-page-content-container-nodual-header ">
       <FormHeader formHeading=''></FormHeader>  
       <div className="top-button-strip">
           <ModalPopUp show={show} onClosePopup={handleClose} onselectValue={modalSelect}></ModalPopUp>
           <button type="submit" className="btn btn-success btn-sm" onClick={billCreationModal}> Create Bill </button>&nbsp;
           <button type="submit" className="btn btn-primary btn-sm" onClick={billCreationModal}> Search Bill </button>
         </div>
       <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
         <TabList>
           <Tab>
             <IoFileTrayOutline className="tabicon"/>
             Intray  </Tab>
           <Tab>
           <IoDocumentsOutline className="tabicon"/>
             Draft</Tab>
           <Tab>
           <IoCodeWorkingOutline className="tabicon" />
             Substitute</Tab>
           <Tab>
           <IoReturnUpForwardOutline className="tabicon" />
             Sent</Tab>
           <Tab>
           <IoNavigateOutline className="tabicon" />
             Tracked</Tab>
         </TabList>
         <TabPanel> 
           <DataTable plotData={datatableDetails}></DataTable>
           
         </TabPanel>
         <TabPanel>
           <DataTable plotData={datatableDetails}></DataTable>
         </TabPanel>
         <TabPanel>
           <DataTable plotData={datatableDetails}></DataTable>
         </TabPanel>
         <TabPanel>
           <DataTable plotData={datatableDetails}></DataTable>
         </TabPanel>
         <TabPanel>
           <DataTable plotData={datatableDetails}></DataTable>
         </TabPanel>
       
       </Tabs>
     </HERBUI.Container>
     <Footer></Footer>
     </>
    );
  };
  export  default  WorkCenter;