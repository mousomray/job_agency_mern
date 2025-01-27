import React from 'react'
import Wrapper from '../../Common/Wrapper'
import { teamList } from '../apicall'
import { useQuery } from '@tanstack/react-query' // Import Use Query

const Team = () => {

    const getTeam = async () => {
        const response = await teamList();
        console.log("Team response...", response);
        return response
    }

    const { isLoading, isError, data: myteam } = useQuery({
        queryKey: ["mydata"],
        queryFn: getTeam
    })

    if (isLoading) {
        return <h1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>Loading...</h1>
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
                                    <h2>Meet our <em>Team</em></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="section" id="trainers">
                    <div class="container">
                        <br />
                        <br />
                        <div class="row">

                            {myteam?.map((value) => {
                                return (
                                    <>
                                        <div class="col-md-3 col-sm-6">
                                            <div class="trainer-item">
                                                <div class="image-thumb">
                                                    <img src={`${process.env.REACT_APP_BASE_URL}${value?.image}`} alt="" style={{ height: '200px' }} />
                                                </div>
                                                <div class="down-content">
                                                    <span>{value?.position}</span>
                                                    <h4>{value?.name}</h4>
                                                    <p

                                                        dangerouslySetInnerHTML={{ __html: value?.about }}

                                                    />
                                                    <ul class="social-icons">
                                                        <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                                                        <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                                                        <li><a href="#"><i class="fa fa-linkedin"></i></a></li>
                                                        <li><a href="#"><i class="fa fa-behance"></i></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}

                        </div>
                    </div>
                </section>
            </Wrapper>
        </>
    )
}

export default Team




