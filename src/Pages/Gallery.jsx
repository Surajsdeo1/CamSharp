import React from 'react';
import profileImages from '../Images/boy.webp';

function Gallery() {
  return (
   <>
   <div className="container mt-4">
      <div className="row">
       
          <div  className="col-md-6 col-lg-4 mb-4">
            <div className="card">
              <img src={profileImages} className="card-img-top" alt="Post" />
              <div className="card-body">
                <h5 className="card-title">Suraj Singh Deo</h5>
                <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium molestias quis nulla earum commodi atque!</p>
                <div className="d-flex justify-content-between align-items-center">
                  <button className="btn btn-primary">Like</button>
                  <span> 15</span>
                </div>
              </div>
            </div>
          </div>
      
      </div>
    </div>
   </>
  )
}

export default Gallery