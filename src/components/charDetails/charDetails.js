import React, {Component} from 'react';
import styled from 'styled-components';


const CharDetail = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
`;

const CharDetailTitle = styled.h4`
    margin-bottom: 20px;
    text-align: center;
`;

const CharDetailTerm = styled.span`
    font-weight: bold;
`;

const CharDetailError = styled.div`
    color: #fff;
    text-align: center;
    font-size: 26px; 
`;

export default class CharDetails extends Component {
    
    render() {
        return (
            <CharDetail className="rounded">
                <CharDetailTitle>John Snow</CharDetailTitle>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <CharDetailTerm>Gender</CharDetailTerm>
                        <span>male</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <CharDetailTerm>Born</CharDetailTerm>
                        <span>1783</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <CharDetailTerm>Died</CharDetailTerm>
                        <span>1820</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <CharDetailTerm>Culture</CharDetailTerm>
                        <span>First</span>
                    </li>
                </ul>
            </CharDetail>
        );
    }
}