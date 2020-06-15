import React, {Component} from 'react';
import GotService from '../../services/service';
import ItemDetails, {Field} from '../itemDetails';
import styled from 'styled-components';
import { Row, Col } from 'reactstrap';

const Wrapper = styled.div`
    margin-top: 120px;
`;

export default class BooksItem extends Component {
    gotService = new GotService();

    render() {
        return (
            <Row className="justify-content-center align-items-center">
                <Col className="col-sm-6">
                    <Wrapper>
                        <ItemDetails
                            itemId = {this.props.bookId}
                            getData={this.gotService.getBook} 
                        >
                            <Field field='numberOfPages' label='Number of pages'/>
                            <Field field='publisher' label='Publisher'/>
                            <Field field='released' label='Released'/>
                        </ItemDetails>
                    </Wrapper>
                </Col>
            </Row>
        )
    }
}