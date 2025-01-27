import React, { useState } from 'react'
import Wrapper from '../../Common/Wrapper'
import { useQuery } from '@tanstack/react-query';
import { useForm } from "react-hook-form"; // Import React Hook Form
import { useNavigate } from 'react-router-dom';
import { jobDetails, applyJob } from '../apicall'
import { useParams } from 'react-router-dom';

const Applynow = () => {

    const { id } = useParams();
    const userid = localStorage.getItem("userid")
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const [resume, setResume] = useState(null); // For Resume
    const [loading, setLoading] = useState(false)

    const singleFunction = async () => {
        const response = await jobDetails(id)
        return response
    }

    const { data: companydata } = useQuery({
        queryKey: ["companydata"],
        queryFn: singleFunction
    })
    console.log("Company data...", companydata)

    // Data submit area 
    const onSubmit = async (data, e) => {
        e.preventDefault(); // For to stop default behavour
        setLoading(true);
        // Handling Form Data 
        const formdata = new FormData();
        formdata.append("userId", userid);
        formdata.append("jobId", companydata?._id);
        formdata.append("resume", resume);
        formdata.append("coverLetter", data.coverLetter);

        try {
            const response = await applyJob(formdata)
            console.log("Appointment Create Response...", response);
            if (response && response?.status === 201) {
                reset()
                 navigate('/jobs')
                setResume('');
                setLoading(false)
            } else {
                setLoading(false)
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            setLoading(false)
        }
    }


    return (
        <>
            <Wrapper>

                <section class="section section-bg" id="call-to-action" style={{ backgroundImage: 'url(/assets/images/banner-image-1-1920x500.jpg)' }}>
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-10 offset-lg-1">
                                <div class="cta-content">
                                    <br />
                                    <br />
                                    <h2>Apply for <em>{companydata?.title}</em> on <em>{companydata?.companyname}</em></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <!-- ***** Features Item Start ***** --> */}
                <section class="section" id="features">
                    <div class="container">
                        <div class="row text-center">
                            <div class="col-lg-6 offset-lg-3">
                                <div class="section-heading">
                                    <h2>Apply<em>now</em></h2>
                                    <img src="/assets/images/line-dec.png" alt="waves" />

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- ***** Features Item End ***** --> */}

                {/* <!-- ***** Contact Us Area Starts ***** --> */}
                <section class="section" id="contact-us" style={{ marginTop: '0' }}>
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-xs-12">
                                <div id="map">
                                    <img src={`${process.env.REACT_APP_BASE_URL}${companydata?.image}`} width="100%" height="564px" frameborder="0" style={{ border: '0' }} allowfullscreen></img>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-xs-12">
                                <div class="contact-form section-bg" style={{ backgroundImage: 'url(/assets/images/contact-1-720x480.jpg)' }}>
                                    <form id="contact" action="" method="post" onSubmit={handleSubmit(onSubmit)}>
                                        <div class="row">
                                            <div class="col-md-12 col-sm-12">

                                                <fieldset>
                                                    <input name="userId" type="text" id="userId" value={userid} readOnly required="" {...register("userId")} style={{ display: 'none' }} />
                                                </fieldset>

                                                <fieldset>
                                                    <input name="jobId" type="text" id="jobId" value={companydata?._id} readOnly required="" {...register("jobId")} style={{ display: 'none' }} />
                                                </fieldset>

                                                {/* Handle file area */}
                                                <fieldset>
                                                    <input
                                                        type="file"
                                                        onChange={(e) => setResume(e.target.files[0])}
                                                        name="resume"
                                                        accept=".pdf,.txt"
                                                        className="form-control"
                                                        style={{height:'50px'}}
                                                    />

                                                    {resume ? (
                                                        resume.type === "application/pdf" || resume.type === "text/plain" ? (
                                                            <p style={{ color: "white" }}>
                                                                {`Uploaded file: ${resume.name}`}
                                                            </p>
                                                        ) : (
                                                            <p style={{ color: "red" }}>Invalid file type! Please upload a PDF or text file.</p>
                                                        )
                                                    ) : (
                                                        <p style={{ color: "white" }}>Drag or drop content here</p>
                                                    )}
                                                </fieldset>

                                            </div>
                                            <div class="col-lg-12">
                                                <fieldset>
                                                    <textarea name="message" rows="6" id="message" placeholder="Message" required="" {...register("coverLetter")}></textarea>
                                                </fieldset>
                                            </div>
                                            <div class="col-lg-12">
                                                <fieldset>
                                                    <button type="submit" id="form-submit" class="main-button">{loading?'Loading...':'Apply'}</button>
                                                </fieldset>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- ***** Contact Us Area Ends ***** --> */}

            </Wrapper>
        </>
    )
}

export default Applynow
