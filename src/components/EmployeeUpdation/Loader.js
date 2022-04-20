import { useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useSelector } from 'react-redux';
import payroll from '../../payroll.css';

const Loader=()=>
{
   
        const state=useSelector(state=>state.spinner);
    return(
        <div>
           
  {state.showSpinner&&
<div className="fp-container">
            <Spinner animation="border"  size="500"   variant="info" className="fp-loader" /> 
        </div>

  }
  </div>
    )
}

export default Loader;