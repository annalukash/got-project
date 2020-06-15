import React, {Component} from 'react';
import styled from 'styled-components';
import GotService from '../../services/service';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import { Row, Col } from 'reactstrap';


const RandomBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
`;

const RandomBlockTitle = styled.h4`
    margin-bottom: 20px;
    text-align: center;
`;

const RandomBlockTerm = styled.span`
    font-weight: bold;
`;

const Wrapper = styled.div`
    margin-top: 120px;
`;

export default class RandomChar extends Component {

    gotService = new GotService();

    state = {
        char: {},
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateCharacter();
        this.timerId = setInterval(this.updateCharacter, 4000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updateCharacter = () => {

        const id = Math.floor(Math.random() * 140 + 25); //указываем диапазон от 25 до 140
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render() {
        const { char, loading, error } = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;

        return (
            <Row className="justify-content-center align-items-center">
                <Col className="col-sm-6">
                    <Wrapper>
                        <RandomBlock className="rounded">
                            {errorMessage}
                            {spinner}
                            {content}
                        </RandomBlock>
                    </Wrapper>
                </Col>
            </Row>
            
        );
        
    }
}

const View = ({char}) => {
    const gotService = new GotService();

    const {name, gender, born, died, culture} = char;
    return (
        <>
            <RandomBlockTitle>Random Character: {gotService.isSet(name)}</RandomBlockTitle>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <RandomBlockTerm>Gender </RandomBlockTerm>
                    <span>{gotService.isSet(gender)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <RandomBlockTerm>Born </RandomBlockTerm>
                    <span>{gotService.isSet(born)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <RandomBlockTerm>Died </RandomBlockTerm>
                    <span>{gotService.isSet(died)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <RandomBlockTerm>Culture </RandomBlockTerm>
                    <span>{gotService.isSet(culture)}</span>
                </li>
            </ul>
        </>
    )
}
