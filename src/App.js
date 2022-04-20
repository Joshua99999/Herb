//import logo from './logo.svg';
import Login from './components/LoginComponent';
import Container from 'react-bootstrap/Container';
import React from 'react';
import './App.css';
import './payroll.css';
import { BrowserRouter as Router } from "react-router-dom";
import routes, { renderRoutes } from './routes';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import NotificationContainer from 'react-notifications/lib/NotificationContainer';
import Loader from './components/EmployeeUpdation/Loader';


function App() {
  return (
    <>
      <div className="main_section">  </div>
      <React.Fragment>
        <Header />
        <Router>{renderRoutes(routes)}</Router>
        {/* <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login}></Route>
        <Route path="/payroll" exact component={PayrollMain}></Route>
        <Route path="/payrolllist" exact component={EmployeePayrollList}></Route>
        <Route path="/empstructure" exact component={EmployeeStructure}></Route>
      </Switch>
    </BrowserRouter> */}
        <Loader/>
        <Footer />
      </React.Fragment>

      <NotificationContainer />

    </>

  );
}

export default App;
