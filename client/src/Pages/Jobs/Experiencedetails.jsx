import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../../Common/Wrapper'
import Categories from './Categories'
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { singleExperience } from '../apicall'
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../Common/Loader';

const Experiencedetails = () => {

  const { slug } = useParams();

  const getExperiencewisedata = async () => {
    const response = await singleExperience(slug)
    console.log("Experience wise data...", response)
    return response
  }

  const { isLoading, isError, data: experiencewisedata } = useQuery({
    queryKey: ['catwisedata', slug],
    queryFn: getExperiencewisedata
  })

  if (isLoading) {
    return <h1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}><Loader /></h1>
  }

  return (
    <>
      <Wrapper>

        {/* <!-- ***** Call to Action Start ***** --> */}
        <section class="section section-bg" id="call-to-action" style={{ backgroundImage: 'url(/assets/images/banner-image-1-1920x500.jpg)' }}
        >
          <div class="container">
            <div class="row">
              <div class="col-lg-10 offset-lg-1">
                <div class="cta-content">
                  <br />
                  <br />
                  <h2>Our <em>Jobs</em></h2>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- ***** Call to Action End ***** --> */}

        {/* <!-- ***** Fleet Starts ***** --> */}
        <section class="section" id="trainers">
          <div class="container">
            <br />
            <br />

            <div class="row">

              {/*Categories*/}
              <Categories />

              <div class="col-lg-8">
                <div class="row">

                  {experiencewisedata?.map((value) => {
                    return (
                      <>
                        <div class="col-md-6">
                          <div class="trainer-item">
                            <div class="image-thumb">
                              <img src={`${process.env.REACT_APP_BASE_URL}${value?.image}`} alt="" style={{ height: '200px' }} />
                            </div>
                            <div class="down-content">
                              <span> <sup>$</sup>70 000 </span>

                              <h4>{value?.title}</h4>

                              <p>{value?.
                                companyname}</p>

                              <ul class="social-icons">
                                <li><Link to={`/jobdetails/${value?._id}`}>+ View More</Link></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </>
                    )
                  })}

                </div>
              </div>
            </div>


          </div>
        </section>
        {/* <!-- ***** Fleet Ends ***** --> */}
        <br />

      </Wrapper>
    </>
  )
}

export default Experiencedetails







