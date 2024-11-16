import React from 'react';
import '../../Styles/Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faSun } from '@fortawesome/free-solid-svg-icons';

import DoughnutChart from './DoughnutChart';
import Visists from './Visists';
import Traffic from './Traffic';
import BarChart from './Barchart1';
// import BarChart from './Barchart'; // Correct the import statement


const dashboard = () => {
  return (

    <>
<div className='row cont'>
<div className=' row  col-lg-2 col-12 card_1 '>
  <div className='col-9'>
    <h2>TRAFFIC</h2>
    <h1>350,897</h1>
    <p><FontAwesomeIcon icon={faArrowUp}/> 3.48%  Since Last Month</p>
  </div>
  <div className='col-3'>
    <FontAwesomeIcon icon={faSun}/>
  </div>
</div>
<div className='row card_1 col-lg-2 col-12'>
  <div className='col-9'>
    <h2>TRAFFIC</h2>
    <h1>350,897</h1>
    <p><FontAwesomeIcon icon={faArrowUp}/> 3.48%  Since Last Month</p>
  </div>
  <div className='col-3'>
    <FontAwesomeIcon icon={faSun}/>
  </div></div>
<div className='row card_1 col-lg-2 col-12'>
  <div className='col-9'>
    <h2>TRAFFIC</h2>
    <h1>350,897</h1>
    <p><FontAwesomeIcon icon={faArrowUp}/> 3.48%  Since Last Month</p>
  </div>
  <div className='col-3'>
    <FontAwesomeIcon icon={faSun}/>
  </div></div>
<div className='row card_1 col-lg-2 col-12'>
  <div className='col-9'>
    <h2>TRAFFIC</h2>
    <h1>350,897</h1>
    <p><FontAwesomeIcon icon={faArrowUp}/> 3.48%  Since Last Month</p>
  </div>
  <div className='col-3'>
    <FontAwesomeIcon icon={faSun}/>
  </div></div>

</div>
<div className='charts row'>
<div className='col-lg-8 col-12'>
<BarChart/>
</div>
<div className='col-lg-4 col-12 d-flex justify-content-center'>
<DoughnutChart/>
</div>
</div>
<div className='row'>
  <div className='col-lg-8 col-12'><Visists/></div>
  <div className='col-lg-4 col-12'>
    <Traffic/>
  </div>

</div>

</>
  )
}

export default dashboard