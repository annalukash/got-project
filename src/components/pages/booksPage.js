import React, {Component} from 'react';
import GotService from '../../services/service';
import ErrorMessage from '../errorMessage';
import ItemList from '../itemList';
import {withRouter} from 'react-router-dom';
import styled from 'styled-components';
import { Row, Col } from 'reactstrap';

const Wrapper = styled.div`
    margin-top: 120px;
    text-align: center;
`;


class BooksPage extends Component {
    gotService = new GotService();

    state = {
        error: false   
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage/>
        }
        
        return (
            <Row className="justify-content-center align-items-center">
                <Col className="col-sm-6">
                <Wrapper>
                    <ItemList 
                        onItemSelected={(itemId) => {
                            this.props.history.push(`/books/${itemId}`)
                        }}
                        getData = {this.gotService.getAllBooks}
                        renderItem = {({name}) => name}
                    />
                </Wrapper>
                </Col>
            </Row>  
        )
    } 
}

export default withRouter(BooksPage);