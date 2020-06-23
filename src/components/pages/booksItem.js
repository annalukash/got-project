import React, {Component} from 'react';
import GotService from '../../services/service';
import ItemDetails, {Field} from '../itemDetails';
import styled from 'styled-components';
import { Row, Col } from 'reactstrap';
import {Link} from 'react-router-dom';
import {StartButton} from './welcomePage';
import {withRouter} from 'react-router-dom';

const Wrapper = styled.div`
    margin-top: 120px;
`;

const MainWrapper = styled.div`
    margin: 0 120px;
`;

const MainButton = styled(StartButton)`
    color: white;
    padding: 20px 50px;
    background: #ba2041;
`

class BooksItem extends Component {
    gotService = new GotService();

    

    render() {
        const {bookId} = this.props;

        const PrevButton = styled(StartButton)`
            background: ${(bookId <= 1) ? '#434343': '#ed3330'};
            cursor: ${(bookId <= 1) ? 'default' : 'pointer'};

            &:hover {
                background: ${(bookId <= 1) ? '#434343': '#ed3330'};
                letter-spacing: ${(bookId <= 1) ? '0px' : '1px'};
                cursor: ${(bookId <= 1) ? 'default' : 'pointer'};
            }
        `;

        const NextButton = styled(StartButton)`
            background: ${(bookId >= 12) ? '#434343': '#ed3330'};
            cursor: ${(bookId >= 12) ? 'default' : 'pointer'};

            &:hover {
                background: ${(bookId >= 12) ? '#434343': '#ed3330'};
                letter-spacing: ${(bookId >= 12) ? '0px' : '1px'};
                cursor: ${(bookId >= 12) ? 'default' : 'pointer'};
            }
        `

        const onNextBook = (bookId) => {
            if (bookId >= 12) {
                return
            }
            this.props.history.push(`/books/${+bookId + 1}`)
        }

        const onPrevBook = (bookId) => {
            if (bookId <= 1) {
                return
            }
            this.props.history.push(`/books/${+bookId - 1}`)
        }

        return (
            <>
                <Row className="justify-content-center align-items-center">
                    <Col className="col-sm-6">
                        <Wrapper>
                            <ItemDetails
                                itemId = {bookId}
                                getData={this.gotService.getBook} 
                            >
                                <Field field='numberOfPages' label='Number of pages'/>
                                <Field field='publisher' label='Publisher'/>
                                <Field field='released' label='Released'/>
                            </ItemDetails>
                        </Wrapper>
                    </Col>
                </Row>
                <Row className="justify-content-center align-items-center">
                    <Col className="col-auto">
                        <PrevButton
                            onClick = { () => onPrevBook(bookId)}
                        >Prev</PrevButton>
                    </Col>
                    <Col className="col-auto">
                        <MainWrapper>
                            <Link to='/books'>
                                <MainButton>List</MainButton>
                            </Link>
                        </MainWrapper>
                    </Col>
                    <Col className="col-auto">
                            <NextButton
                                onClick = {() => onNextBook(bookId)}
                            >Next</NextButton>
                    </Col>
                </Row>
            </>
        )
    }
}

export default withRouter(BooksItem);