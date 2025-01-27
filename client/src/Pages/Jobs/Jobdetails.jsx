import React from 'react'
import Wrapper from '../../Common/Wrapper'
import { useQuery } from '@tanstack/react-query';
import { jobDetails } from '../apicall'
import { Link, useParams } from 'react-router-dom';
import Loader from '../../Common/Loader';

const Jobdetails = () => {

  const { id } = useParams();

  const getSingle = async () => {
    const response = await jobDetails(id)
    console.log("Single response...", response);
    return response
  }

  const { isLoading, isError, data: jobdetails } = useQuery({
    queryKey: ["jobdetails", id],
    queryFn: getSingle
  })
  console.log("job details data...", jobdetails)

  if (isLoading) {
    return <h1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}><Loader/></h1>
  }

  return (
    <>
      <Wrapper>

        <section class="section section-bg" id="call-to-action"
          style={{ backgroundImage: 'url(/assets/images/banner-image-1-1920x500.jpg)' }}>
          <div class="container">
            <div class="row">
              <div class="col-lg-10 offset-lg-1">
                <div class="cta-content">
                  <br />
                  <br />
                  <h2>{jobdetails?.title}</h2>
                  <p>{jobdetails?.companyname}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="site-section">
          <div class="container">
            <div class="row align-items-center mb-5">
              <div class="col-lg-8 mb-4 mb-lg-0">
                <div class="d-flex align-items-center">
                  <div class="border p-2 d-inline-block mr-3 rounded">
                    <script type="text/javascript" async=""
                      src="https://www.google-analytics.com/analytics.js"></script>
                    <img src={`${process.env.REACT_APP_BASE_URL}${jobdetails?.image}`}
                      alt="Image" data-pagespeed-url-hash="2859068494"
                      onload="pagespeed.CriticalImages.checkImageForCriticality(this);" />
                  </div>
                  <div>
                    <h2>{jobdetails?.title}</h2>
                    <div>
                      <span class="ml-0 mr-2 mb-2"><span class="mr-2"><i class="fa fa-briefcase" aria-hidden="true"></i></span>{jobdetails?.companyname}</span>
                      <span class="m-2"><span class="mr-2"><i class="fa fa-map-marker" aria-hidden="true"></i></span>{jobdetails?.location}</span>
                      <span class="m-2"><span class=" mr-2"><i class="fa fa-clock-o" aria-hidden="true"></i></span><span class="text-primary">{jobdetails?.jobSummary?.employmentStatus}</span></span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="row">
                  <div class="col-6">
                    <a href="#" class="btn btn-block btn-light btn-md"><span
                      class=" mr-2 text-danger"><i class="fa fa-heart-o" aria-hidden="true"></i></span>Save Job</a>
                  </div>
                  <div class="col-6">
                    <Link to={`/applynow/${id}`} class="btn btn-block btn-primary btn-md">Apply Now</Link>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-8">
                <div class="mb-5">
                  <h3 class="h5 d-flex align-items-center mb-4 text-primary"><span
                    class="icon-align-left mr-3"><i class="fa fa-align-left" aria-hidden="true"></i></span>Job Description</h3>
                  <p

                    dangerouslySetInnerHTML={{ __html: jobdetails?.description }}

                  />
                </div>
                <div class="mb-5">
                  <h3 class="h5 d-flex align-items-center mb-4 text-primary"><span
                    class="icon-rocket mr-3"><i class="fa fa-rocket" aria-hidden="true"></i></span>Responsibilities</h3>
                  <p

                    dangerouslySetInnerHTML={{ __html: jobdetails?.responsibilities }}

                  />
                </div>
                <div class="mb-5">
                  <h3 class="h5 d-flex align-items-center mb-4 text-primary"><span
                    class="icon-book mr-3"><i class="fa fa-book" aria-hidden="true"></i></span>Education + Experience</h3>
                  <p

                    dangerouslySetInnerHTML={{ __html: jobdetails?.educationAndExperience }}

                  />
                </div>

                <div class="row mb-5">
                  <div class="col-6">
                    <a href="#" class="btn btn-block btn-light btn-md"><span
                      class="icon-heart-o mr-2 text-danger"><i class="fa fa-heart-o" aria-hidden="true"></i></span>Save Job</a>
                  </div>
                  <div class="col-6">
                    <Link to={`/applynow/${id}`} class="btn btn-block btn-primary btn-md">Apply Now</Link>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="bg-light p-3 border rounded mb-4">
                  <h3 class="text-primary  mt-3 h5 pl-3 mb-3 ">Job Summary</h3>
                  <ul class="list-unstyled pl-3 mb-0">
                    <li class="mb-2"><strong class="text-black">Published on:</strong> <time datetime="2020-01-01">{new Date(jobdetails.createdAt).toLocaleDateString('en-GB')}</time></li>
                    <li class="mb-2"><strong class="text-black">Vacancy : </strong>{jobdetails?.jobSummary?.vacancy}</li>
                    <li class="mb-2"><strong class="text-black">Employment Status : </strong> {jobdetails?.jobSummary?.employmentStatus}</li>
                    <li class="mb-2"><strong class="text-black">Experience : </strong> {jobdetails?.jobSummary?.experience}</li>
                    <li class="mb-2"><strong class="text-black">Job Location : </strong>{jobdetails?.jobSummary?.location}</li>
                    <li class="mb-2"><strong class="text-black">Salary : </strong>{jobdetails?.jobSummary?.salary}</li>
                    <li class="mb-2"><strong class="text-black">Gender : </strong>{jobdetails?.jobSummary?.gender}</li>
                    <li class="mb-2"><strong class="text-black">Application Deadline : </strong><time datetime="2020-01-01">{new Date(jobdetails?.jobSummary?.
                      applicationDeadline).toLocaleDateString('en-GB')}</time>
                    </li>
                  </ul>
                </div>
                <div class="bg-light p-3 border rounded">
                  <h3 class="text-primary  mt-3 h5 pl-3 mb-3 ">Share</h3>
                  <div class="px-3">
                    <a href="#" class="pt-3 pb-3 pr-3 pl-0"><span class=""><i class="fa fa-facebook" aria-hidden="true"></i></span></a>
                    <a href="#" class="pt-3 pb-3 pr-3 pl-0"><span class="icon-twitter"><i class="fa fa-twitter" aria-hidden="true"></i></span></a>
                    <a href="#" class="pt-3 pb-3 pr-3 pl-0"><span class="icon-linkedin"><i class="fa fa-linkedin" aria-hidden="true"></i></span></a>
                    <a href="#" class="pt-3 pb-3 pr-3 pl-0"><span class="icon-pinterest"><i class="fa fa-pinterest" aria-hidden="true"></i></span></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </Wrapper>
    </>
  )
}

export default Jobdetails
