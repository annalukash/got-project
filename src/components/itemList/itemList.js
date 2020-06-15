import React, {Component} from 'react';
import styled from 'styled-components';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';


const ListGroupItem = styled.li`
    cursor: pointer;
    margin-left: -25px;
    padding: 10px;
    background-color: #EEE;
    margin-bottom: 5px;

    &:hover {
        margin-left: -20px;
        background-color: #AAA;
        color: white;
        transition: all 300ms ease;
        -moz-transition: all 300ms ease;
        -webkit-transition: all 300ms ease;
        -o-transition: all 300ms ease;
    }
`;

export default class ItemList extends Component {
    
    state = {
        itemList: [],
        loading: true,
        error: false
    }

    componentWillMount() {
        this.getCharacters();
    }

    getCharacters() {
        const {getData} = this.props;

        getData()
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    renderItems(arr) {
        return arr.map((item, index) => {
            const {id} = item;
            const label = this.props.renderItem(item);

            return (
                <ListGroupItem 
                    key={index}
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(id)}
                >
                    {label}
                </ListGroupItem>
            )
        })
    }

    onCharLoaded = (itemList) => {
        this.setState({
            itemList,
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
        const {itemList, error, loading} = this.state;

        const items = this.renderItems(itemList);

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