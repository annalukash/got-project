import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';


const WelcomeWrapper = styled.div`
    max-width: 700px;
    width: 100%;
    margin: 350px auto 0;
    text-align: center;
`;

const WelcomeBlock = styled.div`
    color: #fff;
    font-size: 44px;
    font-weight: 700; 
    margin-bottom: 20px;
`;

const StartButton = styled.button`
    color: #fff !important;
    text-transform: uppercase;
    text-decoration: none;
    background: #ed3330;
    padding: 20px;
    border-radius: 5px;
    display: inline-block;
    border: none;
    transition: all 0.4s ease 0s;

    &:hover {
        background: #ed3330;
        letter-spacing: 1px;
        -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
        -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
        box-shadow: 5px 40px -10px rgba(0,0,0,0.57);
        transition: all 0.4s ease 0s;
    }
`;

export {StartButton};

export default class WelcomePage extends Component {
   


    render () {

        return (
            <WelcomeWrapper>
                <WelcomeBlock>Welcome to Game of Thrones DB</WelcomeBlock>
                <Link to='/randomChar/'>
                    <StartButton>
                    Let's Start
                    </StartButton>
                </Link> 
            </WelcomeWrapper>
        )
    }  
}