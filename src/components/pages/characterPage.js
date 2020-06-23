import React, {Component} from 'react';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/service';
import RowBlock from '../rowBlock';
import styled from 'styled-components';
import { Row, Col } from 'reactstrap';

const Wrapper = styled.div`
    margin-top: 120px;
    text-align: center;
`;

export default class CharacterPage extends Component {

    gotService = new GotService();

    state = {
        selectedItem: 130,
        error: false   
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    onItemSelected = (id) => {
        console.log(id)
        this.setState({
            selectedItem: id
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
                            getData = {this.gotService.getAllCharacters}
                            renderItem = {({name, gender}) => `${name} (${gender})`}
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
                            itemId = {this.state.selectedItem}
                            getData={this.gotService.getCharacter}    
                        >
                            <Field field='gender' label='Gender'/>
                            <Field field='born' label='Born'/>
                            <Field field='died' label='Died'/>
                            <Field field='culture' label='Culture'/>
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