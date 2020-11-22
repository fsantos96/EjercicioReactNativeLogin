import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, TouchableOpacity } from 'react-native';
import CardCocktail from '../CardCoctail/CardCoctail'
import * as apiService from '../../Services/apiService';
import { Container, Content, Form, Item, Label, Input, Icon, Spinner } from 'native-base';
export class HomeScreen extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
            isLoading: true,
            searchText: '',
            isSearch: false,
            error: false,
            cocktailsReference: [],
            cocktailsResults: []
          }
    }
    renderCardsCocktails = (cocktailList) => {    
        return cocktailList.map((item, index) => {
             return (<TouchableOpacity key={item.id + index} onPress={() => this.handlerOnPress(item.id) }>
                 <CardCocktail cocktail={item}></CardCocktail>
             </TouchableOpacity>)
         })
    }

    componentDidMount = () => {
        apiService.getListRandomCocktail(9).then(data => {
        this.setState({ isLoading: false, cocktailsReference: data })
        }).catch(error => {
            this.setState({ isLoading: false, cocktailsReference: [] })
        })
    }

    handlerChange = (text) => {
        if(!text) {
            this.setState({ isSearch: false});
        }
        this.setState({ searchText: text})
    }

    handlerOnPress = (id) => {

        this.props.navigation.navigate("Detail", {
            cocktailId: id
        });
    }

    handlerPressSearch = () => {
        
        if(this.state.searchText) {
            this.setState({isLoading: true, isSearch: true});
            apiService.getCocktailFilteredName(this.state.searchText).then(data => {
                this.setState({ isLoading: false, cocktailsResults: data, searchText: this.state.searchText})
            }).catch(error => {
        
            })
        }
    }

    render(){
        var content;
        if(this.state.isLoading) {
            return <Spinner color='blue' />
        } else {
            content = this.state.isSearch ? this.renderCardsCocktails(this.state.cocktailsResults) : this.renderCardsCocktails(this.state.cocktailsReference);
        }
        return (
        <Container>
            <Content>
                <Form>
                    <Item inlineLabel>
                        <Input defaultValue={this.state.searchText} placeholder="Buscar receta" onChangeText= { text => this.handlerChange(text)} />
                        <TouchableOpacity onPress={this.handlerPressSearch}>
                            <Label><Icon name='search' /></Label>
                        </TouchableOpacity>
                    </Item>
                </Form>
                <ScrollView>
                   {content}
                </ScrollView>
            </Content>
        </Container>
        );
    }
    
}
