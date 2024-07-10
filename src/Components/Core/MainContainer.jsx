import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainContainerData from "../../Alldata/MainContainerData";

function MainContainer() {
    const [cameras, setCameras] = useState([]);
    const [lenses, setLenses] = useState([]);
    const [accessories, setAccessories] = useState([]);

    useEffect(() => { 
        const camerasData = MainContainerData.filter(item => item.Name === "Camera");
        const lensesData = MainContainerData.filter(item => item.Name === "Lens");
        const accessoriesData = MainContainerData.filter(item => item.Name === "Accessiores");

        setCameras(camerasData);
        setLenses(lensesData);
        setAccessories(accessoriesData);
    }, []);

    const user = sessionStorage.getItem('token');

    return (
        <>
            {user ?
                <>
                    <div className="conatiner-fluid design">
                        <div className="container">
                            {/* Camera Section */}
                            {cameras.map((item) => (
                                <div className="row my-2" key={item.id}>
                                    <div className="col-lg-8   d-flex justify-content-center align-items-center">
                                        <div className="row g-0">
                                            <div className="col-lg-8 col-12">
                                                <h2>Camera</h2>{item.Name}
                                                <p>Dive into the world of cutting-edge camera technology with CamSharp. Discover unparalleled precision and performance in every shot. From high-resolution sensors to advanced autofocus systems, our cameras redefine clarity and detail. Whether you're capturing landscapes, portraits, or action shots, CamSharp ensures every frame exceeds expectations. Experience the art of photography with unmatched quality and reliability.
                                                </p>
                                                <Link to={`/items/${item.Name.toLowerCase()}`}>
                                                    <div className="btn text-capitalize rounded-8">know More</div>
                                                </Link>
                                            </div>
                                            <div className="col-lg-4 col-12 my-2">
                                                <div className="card p-lg-3 p-1">
                                                    <h5 className='text-center'>Camera</h5>
                                                    {[item.ImgSrc2].map((imgSrc, index) => (
                                                        <img src={imgSrc} alt={`${item.Name} ${index + 1}`} key={index} className="img-fluid mx-auto" loading="lazy" data-src={imgSrc} />
                                                    ))}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-12 d-lg-block d-md-block d-none">
                                        <div className="container-fluid">
                                            <div className="row g-0">

                                                <div className="col-12">
                                                    <img src="img/7.png" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Lens Section */}
                            {lenses.map((item) => (
                                <div className="row my-2" key={item.id}>
                                    <div className="col-lg-4 col-12 d-lg-block d-md-block d-none">
                                        <img src="img/10.png" alt="" />
                                    </div>

                                    <div className="col-lg-8 col-12 d-flex justify-content-center align-items-center">
                                        <div className="row mobileViewDashboard">
                                            <div className="col-lg-4 col-12">
                                                <div className="card p-lg-3 p-1">
                                                    <h5 className='text-center'>{item.Name}</h5>
                                                    {[item.ImgSrc2].map((imgSrc, index) => (
                                                        <img src={imgSrc} alt={`${item.Name} ${index + 1}`} key={index} className="img-fluid mx-auto" loading="lazy" data-src={imgSrc} />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="col-lg-8 my-2  col-12">
                                                <h2>{item.Name}</h2>
                                                <p>  Delve into the art of photography with CamSharp lenses. Crafted for precision and clarity, our lenses capture every detail with breathtaking clarity and depth. From wide-angle vistas to intimate close-ups, explore a world of optical excellence. Designed for professionals and enthusiasts alike, CamSharp lenses redefine visual storytelling. Elevate your photography with lenses that deliver unmatched sharpness, contrast, and color accuracy. Discover a new perspective with CamSharp.
                                                </p>
                                                <Link to={`/items/${item.Name.toLowerCase()}`}>
                                                    <div className="btn text-capitalize rounded-6">Get a Trial</div>
                                                </Link>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))}

                            {/* Accessories Section */}
                            {accessories.map((item) => (
                                <div className="row my-2" key={item.id}>
                                    <div className="col-lg-8 d-flex justify-content-center align-items-center">
                                        <div className="row g-0">
                                            <div className="col-lg-8 col-12">
                                                <h2>{item.name}</h2>
                                                <p>Enhance every shot with CamSharp accessories designed to empower your creativity. From versatile tripods that stabilize your frame to high-capacity memory cards that capture every moment, our range of accessories ensures you never miss a beat. Whether you're a seasoned photographer or a budding enthusiast, CamSharp accessories are your trusted companions in capturing life's most memorable moments. Discover the perfect complement to your photography journey with CamSharp.</p>
                                                <Link to={`/items/${item.Name.toLowerCase()}`}><div className="btn text-capitalize rounded-6">try it</div></Link>
                                            </div>
                                            <div className="col-lg-4 col-12 my-2">
                                                <div className="card p-lg-3 p-1">
                                                    <h5 className='text-center'>{item.name}</h5>
                                                    {[item.ImgSrc2].map((imgSrc, index) => (
                                                        <img src={imgSrc} alt={`${item.Name} ${index + 1}`} key={index} className="img-fluid mx-auto" loading="lazy" data-src={imgSrc} />
                                                    ))}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-12 d-lg-block d-md-block d-none">
                                        <div className="container-fluid">
                                            <div className="row g-0">

                                                <div className="col-12">
                                                    <img src="img/4.png" alt="" />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>

                </>
                :
                <>
                    <div className="container-fluid design g-0">
                        <div className="container g-0 p-1">

                            <section className="row ">
                                <div className="col-lg-6 col-12 d-flex justify-content-center align-items-center">
                                    <div className="">
                                        <h1 style={{ fontSize: '3.5rem' }}>Capture Every <span className='text-warning'> Moment </span>   with  <br /> the Perfect Camera</h1>
                                        <h5 className='text-decoration-underline my-4'># Rent the Best Cameras, Lenses, and Gear for Every Occasion with  <span className='text-warning'>CamSharp</span>.</h5>
                                        <Link to="/signup"> <button className="btn rounded-6 text-capitalize " style={{ fontSize: '3vh' }}>Lets Start</button></Link>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <img src="img/dashboard21.png" alt="dashbaord1" title='Beautiful Moments' className='img-fluid w-100' />
                                </div>
                            </section>

                            <section className="row  mobileViewDashboard">
                                <div className="col-lg-6 col-12">
                                    <img src="img/9.png" alt="bike riding boy" className='img-fluid w-100' />
                                </div>
                                <div className="col-lg-6">

                                    <h1 className='heading' style={{ fontSize: '3.5rem' }}> <span className='text-warning'>Capture the Thrill </span> On Bike Riding Photography</h1>
                                    <h3 className=' my-4 heading2'>
                                        Feel the rush as our expert photographers freeze the exhilarating moments of your bike rides. Whether you're cruising through city streets or tearing up rugged trails, we specialize in capturing the perfect shot that reflects your passion and adventure. Experience the ultimate blend of speed, style, and storytelling with our bike riding photography services. Make your memories unforgettable with CamSharp!
                                    </h3>
                                    <Link to="/products" ><button className="btn rounded-6 text-capitalize ms-3" style={{ fontSize: '3vh' }}>Check it out</button></Link>
                                </div>
                            </section>

                            <section className="row ">
                                <div className="col-lg-6 col-12">
                                    <h1 className='heading' style={{ fontSize: '3.5rem' }}>Preserving Precious Moments <span className='text-warning'>Childhood Bike </span>  Rides</h1>
                                    <h3 className=' my-4 heading2'>
                                        Capture the innocence and joy of childhood bike rides with our heartfelt photography. As a grown-up, relive the moments you missed by documenting the adventures of the little ones. Our photographers understand the importance of preserving these memories, creating a visual keepsake that tells a story of love, nostalgia, and cherished dreams. Let CamSharp help you save these beautiful memories for the future.
                                    </h3>
                                    <Link to="/Gallery" ><button className="btn rounded-6 text-capitalize ms-3" style={{ fontSize: '3vh' }}>Memorize yours Moments</button></Link>
                                </div>
                                <div className="col-lg-6">
                                    <img src="img/3.png" alt="bike riding boy" className='img-fluid w-100' />
                                </div>
                            </section>

                            <section className="row  mobileViewDashboard">
                                <div className="col-lg-6 col-12">
                                    <img src="img/6.png" alt="bike riding boy" className='img-fluid w-100' />
                                </div>
                                <div className="col-lg-6">
                                    <h1 className='heading' style={{ fontSize: '3.5rem' }}><span className='text-warning'>Capturing Childhood Bonds </span>   Playing  Friends on Bikes</h1>
                                    <h3 className=' my-4 heading2'>
                                        Celebrate the timeless bond of friendship with our bike riding photography sessions. Let one young adventurer capture the spirit and joy of another, creating a visual story that they will cherish forever. These moments of camaraderie and fun are fleeting, but with CamSharp, you can preserve them for a lifetime. Our expert photographers know how to capture the essence of these precious friendships, turning them into unforgettable memories.
                                    </h3>
                                    <Link to="/Gallery"> <button className="btn rounded-6 text-capitalize ms-3" style={{ fontSize: '3vh' }}>Capture yours Moments</button></Link>
                                </div>
                            </section>

                            <section className="row ">
                                <div className="col-lg-6 d-lg-block d-md-block d-none">
                                    <img src="img/4.png" alt="bike riding boy" className='img-fluid w-100' />
                                </div>
                                <div className="col-lg-6">
                                    <div className="accordion w-100" id="accordionExample">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingOne">
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                    Accordion Item #1
                                                </button>
                                            </h2>
                                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                    <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingTwo">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                    Accordion Item #2
                                                </button>
                                            </h2>
                                            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                    <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingThree">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                    Accordion Item #3
                                                </button>
                                            </h2>
                                            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                    <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingFour">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                                    Accordion Item #4
                                                </button>
                                            </h2>
                                            <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                    <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                        </div>

                    </div>
                </>
            }



        </>
    );
}

export default MainContainer;
