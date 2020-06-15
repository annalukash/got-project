import React, {Component} from 'react';
import {Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/service';
import styled from 'styled-components';
import {CharacterPage, BooksPage, HousesPage, BooksItem, WelcomePage} from '../pages';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


const AppWrapper = styled.div`
    overflow-x: hidden;
    background: url('../img/got.jpeg') center center no-repeat;
    background-size: cover;
    font-size: 16px;
    min-height: 100vh;
`;

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            randomChar: true,
            error: false
        }

        this.onToogleRandomChart = this.onToogleRandomChart.bind(this);
    }

    gotService = new GotService();

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

        if (this.state.error) {
            return <ErrorMessage/>
        }


        return (
           <Router>
                <AppWrapper> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Switch>
                            <Route exact path="/" component={WelcomePage}/>
                            <Route path="/randomChar" component={RandomChar}/>
                            <Route path="/characters" component={CharacterPage}/>
                            <Route path="/houses" component={HousesPage}/>
                            <Route path="/books" exact component={BooksPage}/>
                            <Route path="/books/:id" render={
                                ({match}) => {
                                    const {id} = match.params;
                                    return <BooksItem bookId = {id}/>
                                }
                            }/>
                        </Switch>
                    </Container>
                </AppWrapper>
           </Router>
        );
    }

};