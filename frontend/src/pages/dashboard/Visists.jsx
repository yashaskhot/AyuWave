import React from 'react';
import '../../Styles/Dashboard.css';

const Visits = () => {
  return (
    <div className='visit mx-2 '>
      <div className='d-flex justify-content-between'>
        <h1 className='mx-3'>Visits</h1>
        <button className='btn btn-outline-primary my-1 mx-4'>See all</button>
      </div>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Page Name</th>
            <th>Visitors</th>
            <th>Unique Users</th>
            <th>Bounce Rate</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>argon</td>
            <td >4,569</td>
            <td>340</td>
            <td>46.53%</td>
          </tr>
          <tr>
            <td>argon</td>
            <td >4,569</td>
            <td>340</td>
            <td>46.53%</td>
          </tr>
          <tr>
            <td>argon</td>
            <td >4,569</td>
            <td>340</td>
            <td>46.53%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Visits;
