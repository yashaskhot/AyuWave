import React from 'react';
import '../Styles/Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../Components/Navbar';
const Product = () => {
  return (
   <>
   <Navbar/>
    <div class="container-fluid  main-section">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="heading-section">
             <div className=''>
              <h2 className='text-center'>Stay Healthy</h2>
              <p>
              {/* <FontAwesomeIcon icon={faCartPlus}/> */}
              </p>
              </div>
              <div class="heading-borders">
                <span class="selected"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-3 col-md-6">
            <div class="famous-product">
             
              <h3>Acacia</h3>
              <img src="data:image/jpeg;base64,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"/>
              <div class="price">
                <h4>₹60.00 </h4>
                <p>220gr/600cal</p>
                <span>
                <FontAwesomeIcon icon={faPlusCircle} className='icon'/>
                </span>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="famous-product">
             
              <h3> Acebrofylline</h3>
              <img src="https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2022/07/medications_fever_GettyImages155141637_Thumb.jpg"/>
              <div class="price">
                <h4>₹120.00 </h4>
                <p>220gr/600cal</p>
                <span>
                <FontAwesomeIcon icon={faPlusCircle} className='icon'/>
                </span>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="famous-product">
             
              <h3>Paracetamol</h3>
              <img src="https://scopeblog.stanford.edu/wp-content/uploads/2018/05/medications.jpg"/>
              <div class="price">
                <h4>₹80.00 </h4>
                <p>220gr/600cal</p>
                <span>
                <FontAwesomeIcon icon={faPlusCircle} className='icon'/>
                </span>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="famous-product">
             
              <h3>Serratiopeptidase</h3>
              <img src="https://www.feednavigator.com/var/wrbm_gb_food_pharma/storage/images/_aliases/wrbm_large/5/3/6/6/3086635-1-eng-GB/US-Sales-of-medically-important-antibiotics-used-in-feed-jumps.jpg"/>
              <div class="price">
                <h4>₹20.00 </h4>
                <p>220gr/600cal</p>
                <span>
                <FontAwesomeIcon icon={faPlusCircle} className='icon'/>
                </span>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="famous-product">
             
              <h3>Aciclovir</h3>
              <img src="https://globalnews.ca/wp-content/uploads/2013/04/pharmacy-e1373658758585.jpg?quality=85&strip=all"/>
              <div class="price">
                <h4>₹75.00 </h4>
                <p>220gr/600cal</p>
                <span>
                <FontAwesomeIcon icon={faPlusCircle} className='icon'/>
                </span>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="famous-product">
             
              <h3> Albuterol</h3>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw9vhYXv2D7SEcG_ou5-VL5Qta4Pq6lpXAMA&usqp=CAU"/>
              <div class="price">
                <h4>₹46.00 </h4>
                <p>220gr/600cal</p>
                <span>
                <FontAwesomeIcon icon={faPlusCircle} className='icon'/>
                </span>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="famous-product">
             
              <h3>Methylcobalamin </h3>
              <img src="https://images.indianexpress.com/2017/07/medicines-l.jpg"/>
              <div class="price">
                <h4>₹87.00 </h4>
                <p>220gr/600cal</p>
                <span>
                  <i class="fa fa-plus"></i>
                </span>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="famous-product">
             
              <h3>Dollo</h3>
              <img src="https://www.usnews.com/object/image/00000142-927c-d33c-abc6-ff7d897b0025/44851WideModern_Pills_130719.jpg?update-time=1505311772332&size=responsive640"/>
              <div class="price">
                <h4>₹52.50 </h4>
                <p>220gr/600cal</p>
                <span>
                <FontAwesomeIcon icon={faPlusCircle} className='icon'/>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Product