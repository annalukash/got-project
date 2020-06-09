import React, {Component} from 'react';
import styled from 'styled-components';
import GotService from '../../services/service';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';


const ListGroupItem = styled.li`
    cursor: pointer;
`;

export default class ItemList extends Component {

    gotService = new GotService();

    state = {
        charList: [],
        loading: true,
        error: false
    }

    componentWillMount() {
        this.getCharacters();
    }

    getCharacters() {
        this.gotService.getAllCharacters()
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    renderItems(arr) {
        return arr.map((item, index) => {
            return (
                <ListGroupItem 
                    key={index}
                    className="list-group-item"
                    onClick={() => this.props.onCharSelected(item.id)}
                >
                    {item.name}
                </ListGroupItem>
            )
        })
    }

    onCharLoaded = (charList) => {
        this.setState({
            charList,
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
        const {charList, error, loading} = this.state;

        const items = this.renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;
 
        return (
            <ul className="item-list list-group">
                {errorMessage}
                {spinner}
                {content}
            </ul>
        );
    }
}