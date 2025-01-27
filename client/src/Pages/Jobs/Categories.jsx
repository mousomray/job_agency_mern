import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import { allCategories, allStatus, allExperience, allLocation } from '../apicall'

const Categories = () => {

    const { data: catdata } = useQuery({
        queryKey: ["catdata"],
        queryFn: allCategories
    })
    console.log("Cat data...", catdata)

    const { data: statusdata } = useQuery({
        queryKey: ["statusdata"],
        queryFn: allStatus
    })
    console.log("status data...", statusdata)

    const { data: experiencedata } = useQuery({
        queryKey: ["experiencedata"],
        queryFn: allExperience
    })
    console.log("experience data...", experiencedata)

    const { data: locationdata } = useQuery({
        queryKey: ["locationdata"],
        queryFn: allLocation
    })
    console.log("location data...", locationdata)

    return (
        <>
            <div class="col-lg-4">

                <h5 style={{ marginBottom: '15px' }}>Category</h5>
                {catdata?.map((item) => {
                    return (
                        <>
                            <div>
                                <label>
                                    <span><Link to={`/categorydetails/${item.slug}`}>{item.name}</Link></span>
                                </label>
                            </div>

                        </>
                    )
                })}
                <br />

                <h5 style={{ marginBottom: '15px' }}>Employment Status</h5>
                {statusdata?.map((item) => {
                    return (
                        <>
                            <div>
                                <label>
                                    <span><Link to={`/employmentstatusdetails/${item.slug}`}>{item.name}</Link></span>
                                </label>
                            </div>

                        </>
                    )
                })}
                <br />

                <h5 style={{ marginBottom: '15px' }}>Experience Status</h5>
                {experiencedata?.map((item) => {
                    return (
                        <>
                            <div>
                                <label>
                                    <span><Link to={`/experiencedetails/${item.slug}`}>{item.name}</Link></span>
                                </label>
                            </div>

                        </>
                    )
                })}
                <br />

                <h5 style={{ marginBottom: '15px' }}>Location</h5>
                {locationdata?.map((item) => {
                    return (
                        <>
                            <div>
                                <label>
                                    <span><Link to={`/locationdetails/${item.slug}`}>{item.name}</Link></span>
                                </label>
                            </div>

                        </>
                    )
                })}
                <br />

            </div >
        </>
    )
}

export default Categories
