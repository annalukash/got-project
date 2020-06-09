import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../characterPage'


export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            randomChar: true,
            error: false
        }

        this.onToogleRandomChart = this.onToogleRandomChart.bind(this);
    }

    componentDidCatch() {
        console.log('error')
        this.setState({
            error: true
        })
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

        if (this.state.error) {
            return <ErrorMessage/>
        }

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
                    <CharacterPage/>
                </Container>
            </>
        );
    }

};