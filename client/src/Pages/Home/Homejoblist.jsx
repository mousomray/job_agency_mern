import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import { Button } from '@mui/material';
import { jobList } from '../apicall'
import { Link } from 'react-router-dom';

const Homejoblist = () => {

    const dispatch = useDispatch();
    const { jobdata, totalpage, totaldata, loading } = useSelector((state) => state.Showjob)
    const [currentPage, setCurrentPage] = useState(1); // Current page

    // Handle For Pagination
    const handleOnChange = (e, pageno) => {
        setCurrentPage(pageno);
    };

    useEffect(() => {
        dispatch(jobList({ page: currentPage, perpage: 6 }));
    }, [currentPage]);

    console.log("All jobs...", jobdata)

    console.log("Total pages...", totalpage)
    console.log("Total data...", totaldata)
    console.log("Current page...", currentPage)

    return (
        <>
            {/* <!-- ***** Cars Starts ***** --> */}
            <section class="section" id="trainers">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 offset-lg-3">
                            <div class="section-heading">
                                <h2>{jobdata.length} jobs Listed</h2>

                            </div>
                        </div>
                    </div>

                    {jobdata?.map((value) => {
                        return (
                            <>
                                <ul class="job-listings">
                                    <li class="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center">
                                        <Link to={`/jobdetails/${value?._id}`}></Link>
                                        <div class="job-listing-logo">
                                            <img
                                                src={`${process.env.REACT_APP_BASE_URL}${value?.image}`}
                                                alt="Free Website Template by Free-Template.co" class="img-fluid"
                                                style={{ height: '100px', width: '100%' }}
                                            />
                                        </div>
                                        <div class="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
                                            <div class="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                                                <h2>{value?.title}</h2>
                                                <strong>{value?.companyname}</strong>
                                            </div>
                                            <div class="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                                                <span class="icon-room">{value?.location}</span>
                                            </div>
                                            <div class="job-listing-meta">
                                                <span class="badge badge-danger">{value?.jobSummary?.employmentStatus}
                                                </span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </>
                        )
                    })}

                    <br />

                    <div class="row pagination-wrap">
                        <div class="col-md-6 text-center text-md-left mb-4 mb-md-0">
                            <span>Showing 1-{jobdata?.length} Of {totaldata} Jobs</span>
                        </div>
                        <div class="col-md-6 text-center text-md-right">
                            <div class="custom-pagination ml-auto">

                                {jobdata?.length !== 0 ? (
                                    <Pagination
                                        count={totalpage}
                                        page={currentPage}
                                        onChange={handleOnChange}
                                        variant="outlined"
                                        shape="rounded"
                                    />
                                ) : null}

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- ***** Cars Ends ***** --> */}
        </>
    )
}

export default Homejoblist






