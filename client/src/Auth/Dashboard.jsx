import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { profilePage } from './authslice'
import { useQuery } from '@tanstack/react-query' // Import Use Query 
import Wrapper from '../Common/Wrapper';
import Applylist from '../Pages/Jobs/Applylist'
import Loader from '../Common/Loader'

const Dashboard = () => {

    const getDashboarddata = async () => {
        const response = await profilePage() 
        return response
    }

    const { isLoading, isError, data: dashboarddata, error, refetch } = useQuery({
        queryKey: ['dashboard'],
        queryFn: getDashboarddata // This line of code work as same as useEffect()
    })

    console.log("Dashboard response...", dashboarddata);


    // For Loading 
    if (isLoading) {
        return (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                <h1><Loader/></h1>
            </div>
        )

    }

    // For Error
    if (isError) {
        return <h1>{error.message}</h1>
    }

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f2f5',
        marginTop: '70px'
    };

    const cardStyle = {
        width: '400px',
        padding: '20px',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
        borderRadius: '15px',
        backgroundColor: '#ffffff',
        textAlign: 'center',
    };

    const headerStyle = {
        fontSize: '36px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '20px',
    };

    const imageStyle = {
        height: '180px',
        width: '180px',
        borderRadius: '50%',
        border: '4px solid #007BFF',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
        objectFit: 'cover',
        marginBottom: '20px',
    };

    const textStyle = {
        fontSize: '18px',
        color: '#555',
        marginBottom: '10px',
    };

    const linkButtonStyle = {
        display: 'inline-block',
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        color: '#fff',
        textDecoration: 'none',
        borderRadius: '5px',
        fontSize: '16px',
    };

    const homeButtonStyle = {
        ...linkButtonStyle,
        backgroundColor: '#007BFF',
    };

    const deleteButtonStyle = {
        ...linkButtonStyle,
        backgroundColor: '#dc3545',
    };

    const footerStyle = {
        marginTop: '20px',
        fontSize: '14px',
        color: '#888',
    };

    return (
        <>
            <Wrapper>

                <div style={containerStyle}>
                    <div style={cardStyle}>
                        <h1 style={headerStyle}>Welcome {dashboarddata?.name} </h1>
                        <img
                            src={`${process.env.REACT_APP_BASE_URL}${dashboarddata?.image}`}
                            alt="Profile"
                            style={imageStyle}
                        />
                        <div style={textStyle}><b>Name:</b> {dashboarddata?.name}</div>
                        <div style={textStyle}><b>User ID:</b> {dashboarddata?._id}</div>
                        <div style={textStyle}><b>Email:</b> {dashboarddata?.email}</div>
                        <div style={textStyle}><b>City:</b> {dashboarddata?.city}</div>
                        <div style={textStyle}><b>Role:</b> {dashboarddata?.role}</div>
                        <Link to="/" style={homeButtonStyle}>Back to Home</Link>
                    </div>
                </div>

                {/*Job apply area*/}
                <Applylist/>

            </Wrapper>
        </>
    )
}

export default Dashboard