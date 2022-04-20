  import *  as Yup from 'yup';
 import React, {  useState, useEffect } from "react";
 import axios from "axios";
 import {Form,Formik,Field} from 'formik';
 import  "./css/style.css";
 import { BrowserRouter as Router, Route, Switch,useRouteMatch,useParams,useHistory,NavLink} from "react-router-dom";
 


 
  const testSchema=Yup.object().shape({
  title: Yup.string().required("Title is Required")
  ,gender: Yup.string().required("Gender is Required")
  ,empname: Yup.string().required() 
  ,surname: Yup.string().required("Sur Name is Required").min(3, "Atleast 3 Charcters")
  ,maritalstatus: Yup.string().required("Marital Status is Required")
  ,religion: Yup.string().required("Marital Status is Required")
  ,community: Yup.string().required("Community is Required")
  ,phstatus: Yup.string().required("PH Status is Required") 
	,bankIFSC:Yup.string().required().min(11).max(11).uppercase()
	,bankAccountNumber:Yup.string().required().min(8).max(27)
	,ConfirmationBankAccountNumber:Yup.string().required().min(8).max(27) 

})
//let test="rakesh";
let   test;
export  function EmpPersonalDetails() 
{
	const [empnameset, setEmpname] = useState({});
 
	 
	const SubmitForm= async (values)=>
	{
		try
		{ 
		const req=values;
 		const res = await  axios.post("http://172.16.195.72:8181/Employee",req);
		 console.log(res.data);
		 alert(res.data.messages);
		}
		catch(e)

		{
			console.log(e);
		}
 
 	}
	useEffect(() => 
	{
 	  callApi2();
	}, []);
  
	 
  
	const callApi2 = async () => 
	{
	 
		const req={"userid":"admin","password":"admin"}
	 // const res = await axios.post("https://testing.apcfss.in/HCM/login",req);
	 const res = await axios.post("http://172.16.195.72:8181/setEmployee",req);
 
 
 	const myArray = JSON.parse(JSON.stringify(res.data[0]));
	 const obj={empname:myArray[3],title:myArray[1],gender:myArray[2],maritalstatus:myArray[5],religion:myArray[6],community:myArray[7],phstatus:myArray[8],bankIFSC:myArray[9],surname:myArray[4],bankAccountNumber:myArray[10],ConfirmationBankAccountNumber:myArray[10]}

 	setEmpname(obj);

  
 	   
	};
 
    return (
        <Formik initialValues={{...empnameset}} onSubmit={SubmitForm} validationSchema={testSchema} enableReinitialize>
            {(props)=>
            (
         <Form>
             { 
			 <div className="container">  
				 <br/>
				 <br/>
		<div className="panel panel-primary">
      <div className="panel-heading">Employee Profile</div>
      <div className="panel-body">

	  <div className="row">
 
	  <div className="alert alert-success">
   
  <NavLink to='/EmpPersonalDetails'>EmpPersonalDetails</NavLink> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  
  <NavLink to='/EmpContactDetails'>EmpContactDetails</NavLink> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  
  <NavLink to='/EmpFamilyDetails'>EmpFamilyDetails</NavLink>

</div>

<div className="alert alert-success">
  <strong>Personal Details Section</strong>  
  

</div>

</div>
			                                 <div className="row">
			                                   <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
		                                   	    <div className="form-group">
											      <label className="control-label star">Title</label>  
												  {/* <select name="c"  onChange={props.handleChange}  className="form-control">
		                                          <option value="">Select</option>
		                                         <option value="Mrs">Mrs</option>
		                                           <option value="Mr">Mr</option>
			                                        </select> */}

													<Field name="title" as="select" className="form-control">
   <option value="">select</option>
   <option value="Mrs">Mrs</option>
		                                           <option value="Mr">Mr</option>
 </Field>

			                                      <span className="err">{props.errors.title}</span>
  		                                        </div>     
		                                        </div>

											

												<div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
		                                   	    <div className="form-group">
											      <label className="control-label star">Name</label>  
												  <Field type="text" name="empname"  className="form-control" />
			                                      <span className="err">{props.errors.empname}</span>
  		                                        </div>      
		                                        </div>	

												   <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
		                                   	    <div className="form-group">
											      <label className="control-label star">Sur Name</label>  
												  <Field type="text" name="surname"  className="form-control"/>
			                                      <span className="err">{props.errors.surname}</span>
  		                                        </div>     
		                                        </div>											 
											 </div>



											 <div className="row">

											 <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
		                                   	    <div className="form-group">
											      <label className="control-label star">Gender</label>  
												  <Field  as="select"  name="gender" onChange={props.handleChange}  className="form-control">
		                                          <option value="">Select</option>
		                                         <option value="M">Male</option>
		                                           <option value="F">Female</option>
			                                        </Field>
			                                      <span className="err">{props.errors.gender}</span>
  		                                        </div>     
		                                        </div>
			                                

												<div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
		                                   	    <div className="form-group">
											      <label className="control-label star">Marital Status</label>  
												  <Field  as="select"  name="maritalstatus" onChange={props.handleChange}  className="form-control">
		                                          <option value="">Select</option>
		                                         <option value="M">Married</option>
		                                           <option value="N">Not Married</option>
			                                        </Field>
			                                      <span className="err">{props.errors.maritalstatus}</span>
  		                                        </div>     
		                                        </div>

												<div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
		                                   	    <div className="form-group">
											      <label className="control-label star">Religion</label>  
												  <Field  as="select"  name="religion" onChange={props.handleChange}  className="form-control">
		                                          <option value="">Select</option>
		                                         <option value="H">Hindu</option>
		                                         <option value="M">Muslim</option>
												 <option value="C">Christain</option>
			                                        </Field>
			                                      <span className="err">{props.errors.religion}</span>
  		                                        </div>     
		                                        </div>												 
											 </div>


											 <div className="row">
			                                   
											 <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
		                                   	    <div className="form-group">
											      <label className="control-label star">Community</label>  
												  <Field  as="select"  name="community" onChange={props.handleChange}  className="form-control">
		                                          <option value="">Select</option>
		                                         <option value="SC">SC</option>
		                                        <option value="ST">ST</option>
												<option value="BC">BC</option>
												<option value="OC">OC</option>
			                                        </Field>
			                                      <span className="err">{props.errors.community}</span>
  		                                        </div>     
		                                        </div>

												<div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
		                                   	    <div className="form-group">
											      <label className="control-label star">PH Status</label>  
												  <Field  as="select"  name="phstatus" onChange={props.handleChange}  className="form-control">
		                                          <option value="">Select</option>
		                                         <option value="Y">Yes</option>
		                                           <option value="N">No</option>
			                                        </Field>
			                                      <span className="err">{props.errors.phstatus}</span>
  		                                        </div>     
		                                        </div>
												<div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
												 
                                                  </div>
												</div>

												<div className="row">
			                                   
											 <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
		                                   	    <div className="form-group">
											      <label className="control-label star">Bank IFSC</label>  
												  <Field type="text" name="bankIFSC"  className="form-control" />			                                    
			                                      <span className="err">{props.errors.bankIFSC}</span>
  		                                        </div>     
		                                        </div>

												<div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
		                                   	    <div className="form-group">
												   <label className="control-label star">Bank  Account Number</label>  
												  <Field type="password" name="bankAccountNumber"  className="form-control" />
			                                      <span className="err">{props.errors.bankAccountNumber}</span>
  		                                        </div>     
		                                        </div>
												<div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
		                                   	    <div className="form-group">
												   <label className="control-label star">Confirm Bank  Account Number</label>  
												  <Field type="text" name="ConfirmationBankAccountNumber"  className="form-control" />
			                                      <span className="err">{props.errors.ConfirmationBankAccountNumber}</span>
  		                                        </div>     
		                                        </div>
												</div>

   

<div className="row">
												  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
													<br></br>
												<input type="submit" value="submit"  className="btn btn-success pull-left" onClick={SubmitForm}/>
                                                  </div>

												  </div>


</div> 


											 </div>

											 </div>



 
             
             }
         </Form>
            ) 
         }
         </Formik>
    )
		}
