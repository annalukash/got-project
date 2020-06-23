import React, {Component} from 'react';
import styled from 'styled-components';
import GotService from '../../services/service';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';


const ItemDetail = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
`;

const ItemDetailTitle = styled.h4`
    margin-bottom: 20px;
    text-align: center;
`;

const ItemDetailTerm = styled.span`
    font-weight: bold;
`;


const Field = ({item, field, label}) => {
    const gotService = new GotService();
    
    return (
        <li className="list-group-item d-flex justify-content-between">
            <ItemDetailTerm>{label}</ItemDetailTerm>
            <span>{gotService.isSet(item[field])}</span>
        </li>     
    )
}

export {
    Field
}

export default class ItemDetails extends Component {
    
    gotService = new GotService();

    state = {
        item: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem()
        }
    }

    updateItem() {
        const {itemId, getData} = this.props;

        if (!itemId) {
            return;
        }

        this.setState({loading: true})

        getData(itemId)
            .then((response) => {
                this.onItemLoaded(response);
            })
    }

    onItemLoaded = (item) => {
        this.setState({
            item,
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

        const {item, error, loading} = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View item={item} children={this.props.children}/> : null;

        return (
            <ItemDetail className="rounded">
                {errorMessage}
                {spinner}
                {content}
            </ItemDetail>
        );
    }
}

const View = ({item, children}) => {
    const gotService = new GotService();

    const {name} = item;
    return (
        <>
            <ItemDetailTitle>{gotService.isSet(name)}</ItemDetailTitle>
            <ul className="list-group list-group-flush">
                {
                    React.Children.map(children, (child) => {
                        return React.cloneElement(child, {item})
                    })
                }
            </ul>
        </>
    ) 
}