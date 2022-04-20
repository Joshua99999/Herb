import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useState, useEffect } from 'react';
import React from 'react';
import * as HERBUI from "react-bootstrap"
import LoadingServices from './LoadingServices';
import 'react-tabs/style/react-tabs.css';
import BasicDetails from './BasicDetails'
import PostDetails from './PostDetails'
import PersonalDetails from './PersonalDetails';
import EarningandDeduction from './EarningandDeduction';
import {useLocation } from 'react-router';
import { IoFileTrayOutline, IoDocumentsOutline, IoCodeWorkingOutline, IoReturnUpForwardOutline } from "react-icons/io5";
export default function Home(props) {
    const [tabIndex, setTabIndex] = useState(0);
    const [cfmsId, setCfmsId] = useState();
    const [ddoCode, setDdoCode] = useState();

    const [commonApiDataList, setCommonApiDataList] = useState({
        postDetails: {
            deptId:'',
            postId:2,
            cfmsId:'',
            serviceRuleId:'',
            cadrecode: '',
            daimpcode: '',
            ccacategory: '',
            gpfcategory: '',
            gisno: '',
            hracode: '',
            prccode:''
           
        },
        EarnDeductionsSummary:[]
        
    });
    const [commonMasterDetailsList, setCommonMasterDetailsList] = useState();
    
    const location = useLocation();

    useEffect(() => {
        let cfmsId = location.state.employeeCfmsId.CFMSID
        setCfmsId((cfmsId))

        let ddoCode = location.state.ddoCode
        console.log("employee home..."+JSON.stringify(location.state))
        setDdoCode((ddoCode))
       

        LoadingServices.fectchEmpEditDetails(cfmsId).then(res => {
            setCommonApiDataList(res.data[0]);
            
           
        })

        LoadingServices.fetchMasterCommonDetails().then(res => {
            setCommonMasterDetailsList(res.data);
        })


    }, [])

    return (
        <>
            <div className="main_section">  </div>
            <HERBUI.Container>
                <HERBUI.Row>
                    <HERBUI.Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="page-titlespacing mb-5 mt-4">
                        <div className="inner-herbpage-service-nodual-header-title1">
                            <h1>Employee Updation</h1>
                            
                        </div>
                    </HERBUI.Col>
                </HERBUI.Row>
            </HERBUI.Container>
            <HERBUI.Container className="outer-page-content-container-nodual-header ">
                <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
                    <TabList>
                        <Tab>
                            <IoFileTrayOutline className="tabicon" />
                            Basic Details  </Tab>
                        <Tab>
                            <IoDocumentsOutline className="tabicon" />
                            Post Details</Tab>
                        <Tab>
                            <IoCodeWorkingOutline className="tabicon" />
                            Personal Details</Tab>
                        <Tab>
                            <IoReturnUpForwardOutline className="tabicon" />
                            Earnings & Deductions</Tab>
                        

                    </TabList>
                    <TabPanel>
                        <BasicDetails data={commonApiDataList} masterData={commonMasterDetailsList} />
                    </TabPanel>
                    <TabPanel>
                        <PostDetails data={commonApiDataList.postDetails[0]} masterData={commonMasterDetailsList} />
                    </TabPanel>
                    <TabPanel>
                        <PersonalDetails data={commonApiDataList} masterData={commonMasterDetailsList} />
                    </TabPanel>
                    <TabPanel>
                        <EarningandDeduction data={commonApiDataList} masterData={commonMasterDetailsList} />
                    </TabPanel>
                </Tabs>
            </HERBUI.Container>
           

        </>
    );
}
