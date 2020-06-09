import React from 'react';
import styled from 'styled-components';


const Img = styled.img`
    width: 100%;
`

const ErrorMessage = () => {
    return (
        <>
            <Img src={process.env.PUBLIC_URL + '/img/error.jpg'} alt="error"/>
            <span>Something goes wrong</span>
        </>
    )
}

export default ErrorMessage;