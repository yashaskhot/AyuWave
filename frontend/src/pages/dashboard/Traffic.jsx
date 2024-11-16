import React from 'react'
import '../../Styles/Dashboard.css';

const Traffic = () => {
  return (
    <div className='visit mx-2 '>
    <div className='d-flex justify-content-between'>
      <h1 className='mx-3'>Show Traffic</h1>
      <button className='btn btn-outline-primary my-1 mx-4'>See all</button>
    </div>
    <table className='table table-bordered'>
      <thead>
        <tr>
          <th>Page Name</th>
          <th>Visitors</th>
       
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>argon</td>
          <td >4,569</td>
        
        </tr>
        <tr>
          <td>argon</td>
          <td >4,569</td>
        
        </tr>
        <tr>
          <td>argon</td>
          <td >4,569</td>
        
        </tr>
      </tbody>
    </table>
  </div>
  )
}

export default Traffic