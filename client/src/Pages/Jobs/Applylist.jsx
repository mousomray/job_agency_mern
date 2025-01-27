import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Avatar, Card, CardContent, Grid, Typography, Pagination } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { applyList } from '../apicall';
import { useQuery } from '@tanstack/react-query' // Import Use Query 


const Applylist = () => {

    const getApplylist = async () => {
        const response = await applyList();
        console.log("Kakra response...", response)
        return response
    }

    const { data: applydata } = useQuery({
        queryKey: ["applydata"],
        queryFn: getApplylist
    })

    console.log("apply list...", applydata)

    return (
        <>
            {/*Table Area Start*/}
            <TableContainer component={Paper}>
                <h1>Your Applied Job Are...</h1>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead style={{ backgroundColor: 'skyblue', color: 'white' }}>
                        <TableRow>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="center">Image</TableCell>
                            <TableCell align="center">Company</TableCell>
                            <TableCell align="center">Category</TableCell>
                            <TableCell align="center">Location</TableCell>
                            <TableCell align="center">Employment Status</TableCell>
                            <TableCell align="center">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {applydata?.length !== 0 ? (
                            applydata?.slice(0, applydata.length).reverse().map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center" component="th" scope="row">
                                        {row?.jobId?.title}
                                    </TableCell>
                                    <TableCell align="center"><img src={`${process.env.REACT_APP_BASE_URL}${row?.jobId?.image}`} alt="" style={{ height: '50px' }} /></TableCell>
                                    <TableCell align="center">
                                        {row?.jobId?.companyname}
                                    </TableCell>
                                    <TableCell align="center">{row?.jobId?.category}</TableCell>
                                    <TableCell align="center">{row?.jobId?.jobSummary?.location}</TableCell>
                                    <TableCell align="center">{row?.jobId?.jobSummary?.employmentStatus}</TableCell>
                                    <TableCell align="center">{row?.status}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <p style={{ color: 'red' }}>No application Found</p>
                        )}

                        {/* <!-- End blog entries list --> */}
                    </TableBody>

                </Table>
            </TableContainer>

            {/*Table Area End*/}
        </>
    )
}

export default Applylist
