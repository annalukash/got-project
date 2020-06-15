import React, {Component} from 'react';
import GotService from '../../services/service';
import ErrorMessage from '../errorMessage';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import RowBlock from '../rowBlock';
import { Row, Col } from 'reactstrap';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin-top: 120px;
    text-align: center;
`;


export default class HousesPage extends Component {
    gotService = new GotService();

    state = {
        selectedHouse: 3,
        error: false   
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    onItemSelected = (id) => {
        this.setState({
            selectedHouse: id
        })
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage/>
        }

        const itemList = (
            <Row>
                <Col>
                    <Wrapper>
                        <ItemList 
                            onItemSelected = {this.onItemSelected}
                            getData = {this.gotService.getAllHouses}
                            renderItem = {(item) => item.name}
                        />
                    </Wrapper>
                </Col>
            </Row> 
        )

        const itemDetails = (
            <Row>
                <Col>
                    <Wrapper>
                        <ItemDetails
                            itemId = {this.state.selectedHouse}
                            getData={this.gotService.getHouse}
                        >
                            <Field field='region' label='Region'/>
                            <Field field='words' label='Words'/>
                            <Field field='titles' label='Titles'/>
                            <Field field='ancestralWeapons' label='Ancestral Weapons'/>
                        </ItemDetails>
                    </Wrapper>
                </Col>
            </Row>  
        )
        
        return (
            <RowBlock left={itemList} right={itemDetails}/>
        )
    } 
}