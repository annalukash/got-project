import React, {Component} from 'react';
import styled from 'styled-components';
import GotService from '../../services/service';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';


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

export default class RandomChar extends Component {
    constructor(props) {
        super(props);
        this.updateCharacter();
    }

    gotService = new GotService();

    state = {
        char: {},
        loading: true,
        error: false
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

    updateCharacter() {
        const id = Math.floor(Math.random() * 140 + 25); //указываем диапазон от 25 до 140
        // let id = 1500000000;
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
            <RandomBlock className="rounded">
                {errorMessage}
                {spinner}
                {content}
            </RandomBlock>
        );
        

        
    }
}

const View = ({char}) => {
    const {name, gender, born, died, culture} = char;
    return (
        <>
            <RandomBlockTitle>Random Character: {name}</RandomBlockTitle>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <RandomBlockTerm>Gender </RandomBlockTerm>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <RandomBlockTerm>Born </RandomBlockTerm>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <RandomBlockTerm>Died </RandomBlockTerm>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <RandomBlockTerm>Culture </RandomBlockTerm>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}
