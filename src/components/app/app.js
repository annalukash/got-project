import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';


export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            randomChar: true
        }

        this.onToogleRandomChart = this.onToogleRandomChart.bind(this);
    }

    onToogleRandomChart() {
        this.setState(({randomChar}) => {
            return {
                randomChar: !randomChar
            }
            
        })
    }

    render() {
        const char = this.state.randomChar ? <RandomChar/> : null;

        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            <button
                                onClick = {this.onToogleRandomChart}
                            >Toogle</button>
                            {char}
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList />
                        </Col>
                        <Col md='6'>
                            <CharDetails />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }

};