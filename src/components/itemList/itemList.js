import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Spinner from '../spinner';


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

function ItemList({getData, onItemSelected, renderItem}) {

    const [itemList, updateList] = useState([]);

    useEffect(() => {
        getCharacters();
    }, [])

    const getCharacters = () => {
        getData()
            .then((data) => {
                updateList(data)
            })
    }

    const renderItems = (arr) => {
        return arr.map((item, index) => {
            const {id} = item;
            const label = renderItem(item);

            return (
                <ListGroupItem 
                    key={index}
                    className="list-group-item"
                    onClick={() => onItemSelected(id)}
                >
                    {label}
                </ListGroupItem>
            )
        })
    }

    const items = renderItems(itemList);

    if (!itemList) {
        return <Spinner/>
    }

    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    );
}

export default ItemList;