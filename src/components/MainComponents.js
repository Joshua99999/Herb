import { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as HERBUI from "react-bootstrap" 
import { BiCheckCircle,BiUserCircle} from "react-icons/bi";

class Main extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <>
            <HERBUI.Container>
      <HERBUI.Row>
        <HERBUI.Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="page-titlespacing">
          <div className="inner-herbpage-service-title1">
            <h1> Payroll</h1>
          </div>
        </HERBUI.Col>

      </HERBUI.Row>
    </HERBUI.Container> 
                <Container  className="outer-page-content-container ">
                    <HERBUI.Row>
                        <HERBUI.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                        <Card  >
                        <Card.Body>
                        <BiCheckCircle className="landing-icon-for-demo"/>
                            <Link to="/payroll">Regular Pay Bill </Link>
                        </Card.Body>
                        
                    </Card>
                        </HERBUI.Col>

                        <HERBUI.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                        <Card  >
                        <Card.Body>
                        <BiCheckCircle className="landing-icon-for-demo"/>
                            <Link to="/supplyPayroll">Supplementary Pay Bill </Link>
                        </Card.Body>
                        
                    </Card>
                        </HERBUI.Col>

                        <HERBUI.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                        <Card  >
                        <Card.Body>
                            <BiUserCircle className="landing-icon-for-demo"/>
                         <Link to="/ddoCode">Employee Updation</Link>
                        </Card.Body> 
                    </Card>
                    </HERBUI.Col>
                    <HERBUI.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
      
                        <Card  >
                        <Card.Body>
                            <BiUserCircle className="landing-icon-for-demo"/>
                        <Link to="/reports">Reports</Link>
                      
                        </Card.Body> 
                    </Card>
                    </HERBUI.Col>
                    <HERBUI.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                            <Card  >
                                <Card.Body>
                                    <BiUserCircle class="landing-icon-for-demo" />
                                    <Link to="/transferIn">Transfer In</Link>
                                </Card.Body>
                            </Card>
                        </HERBUI.Col>

                        <HERBUI.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                            <Card  >
                                <Card.Body>
                                    <BiUserCircle class="landing-icon-for-demo" />
                                    <Link to="/pensions">Pensions</Link>
                                </Card.Body>
                            </Card>
                        </HERBUI.Col>
                    </HERBUI.Row>
                   

           
                </Container>
            </>
        );
    }
}

export default Main;