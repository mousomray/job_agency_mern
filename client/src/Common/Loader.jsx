import React from 'react'
import { Comment } from 'react-loader-spinner'

const Loader = () => {
    return (
        <>
            <Comment
                visible={true} 
                height="200"
                width="200"
                ariaLabel="comment-loading"
                wrapperStyle={{}}
                wrapperClass="comment-wrapper"
                color="#fff"
                backgroundColor="#F4442E"
            />
        </>
    )
}

export default Loader
