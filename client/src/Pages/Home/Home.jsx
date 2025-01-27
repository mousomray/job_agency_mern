import React from 'react'
import Wrapper from '../../Common/Wrapper'
import Homejoblist from './Homejoblist'
import Testimonials from './Testimonials'

const Home = () => {
  return (
    <>
      <Wrapper>

        {/* <!-- ***** Main Banner Area Start ***** --> */}
        <div class="main-banner" id="top">
          <video autoplay muted loop id="bg-video">
            <source src="/assets/images/video.mp4" type="video/mp4" />
          </video>

          <div class="video-overlay header-text">
            <div class="caption">
              <h2>Find the perfect <em>Job</em></h2>
              <div class="main-button">
                {/* <form method="post" class="search-jobs-form">
                  <div class="row mb-5">
                    <div class="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                      <input type="text" class="form-control form-control-lg"
                        placeholder="Job title, Company..." />
                    </div>
                    <div class="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                      <div class="dropdown bootstrap-select" style={{ width: '100%' }}>
                        <select class="form-control" data-style="btn-white btn-lg" data-width="100%"
                          data-live-search="true" title="Select Region" tabindex="-98">
                          <option>Select Region</option>
                          <option>Anywhere</option>
                          <option>San Francisco</option>
                          <option>Palo Alto</option>
                          <option>New York</option>
                          <option>Manhattan</option>
                          <option>Ontario</option>
                          <option>Toronto</option>
                          <option>Kansas</option>
                          <option>Mountain View</option>
                        </select>

                      </div>
                    </div>
                    <div class="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                      <div class="dropdown bootstrap-select" style={{ width: '100%' }}>
                        <select class="form-control" data-style="btn-white btn-lg" data-width="100%"
                          data-live-search="true" title="Select Job Type" tabindex="-98">
                          <option>Select Job Type</option>
                          <option>Part Time</option>
                          <option>Full Time</option>
                        </select>

                      </div>
                    </div>
                    <div class="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                      <button type="submit"
                        class="btn btn-primary btn-lg btn-block text-white btn-search"><span
                          class=" mr-2"><i class="fa fa-search" aria-hidden="true"></i></span>Search Job</button>
                    </div>
                  </div>

                </form> */}
                {/* <!-- <a href="contact.html">Contact Us</a> --> */}
              </div>
            </div>
          </div>
        </div>
        {/* <!-- ***** Main Banner Area End ***** --> */}

        {/*Job list in Home page*/}
        <Homejoblist />

        {/*Testimonials*/}
        <Testimonials />

      </Wrapper>
    </>
  )
}

export default Home
