import React, {Component} from 'react';
import styled from 'styled-components';
import GotService from '../../services/service';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';


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

// const CharDetailError = styled.span`
//     color: #fff;
//     text-align: center;
//     font-size: 26px; 
// `;

export default class CharDetails extends Component {
    
    gotService = new GotService();

    state = {
        char: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar()
        }
    }

    updateChar() {
        const {charId} = this.props;

        if (!charId) {
            return
        }
        this.setState({loading: true})
        this.gotService.getCharacter(charId)
            .then((char) => {
                this.onCharLoaded(char)
            })
            .catch(this.onError);
        // this.foo.bar = 0
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
    
    render() {

        const {char, error, loading} = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;

        return (
            <CharDetail className="rounded">
                {errorMessage}
                {spinner}
                {content}
            </CharDetail>
        );
    }
}

const View = ({char}) => {
    const gotService = new GotService();

    const {name, gender, born, died, culture} = char;

    return (
        <>
            <CharDetailTitle>{gotService.isSet(name)}</CharDetailTitle>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <CharDetailTerm>Gender</CharDetailTerm>
                    <span>{gotService.isSet(gender)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <CharDetailTerm>Born</CharDetailTerm>
                    <span>{gotService.isSet(born)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <CharDetailTerm>Died</CharDetailTerm>
                    <span>{gotService.isSet(died)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <CharDetailTerm>Culture</CharDetailTerm>
                    <span>{gotService.isSet(culture)}</span>
                </li>
            </ul>
        </>
    ) 
}