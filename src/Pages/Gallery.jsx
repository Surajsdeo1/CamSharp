import React from 'react';
import profileImages from '../Images/boy.webp';

function Gallery() {
  return (
   <>
    <div className="container mt-4">
        <div className="row">
        {[1,2,3,4,5].map((items,index)=>(
          <div className="col-md-6 col-lg-4 mb-4">
          
            <div key={index} className="card h-100">
              <div className="card-header d-flex justify-content-between border-0 bg-transparent p-2">
                <h5 className="card-title mb-0">Suraj Singh Deo</h5>
                <h5 className=" mb-0"><i class="fi fi-bs-progress-download"></i></h5>
              </div>
              <img src={ profileImages} className="card-img-top" alt="Post" />
              <div className="card-body d-flex flex-column">
                <p className="card-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium molestias quis nulla earum commodi atque!
                </p>
                <div className="mt-auto d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="d-flex align-items-center gap-4">
                      <div className="text-center">
                        <button className="btn btn-primary"><i class="fi fi-bs-heart"></i></button>
                        <h1 className="mt-2 mb-0"><span className="text-muted">15 likes</span></h1>
                      </div>
                      <div className="text-center">
                        <button className="btn btn-primary"><i class="fi fi-bs-comment-alt"></i></button>
                        <h1 className="mt-2 mb-0"><span className="text-muted">15 comments</span></h1>
                      </div>
                      <div className="text-center">
                        <button className="btn btn-primary"><i class="fi fi-bs-share"></i></button>
                        <h1 className="mt-2 mb-0"><span className="text-muted">15 shares</span></h1>
                      </div>
                    </div>
                    <button className="btn btn-primary">Share</button>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
          ))}
        </div>
      </div>
   </>
  )
}

export default Gallery