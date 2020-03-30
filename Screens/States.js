import React from 'react';
import { StyleSheet, Text, View,FlatList,ScrollView, } from 'react-native';
import {Spinner,Left,Body, ListItem} from 'native-base'


export default class States extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data : null,stateNames : []
        }
    }
    componentDidMount(){
        this.retrieveData()
    }
    retrieveData = () => {
        return fetch("https://api.covid19india.org/state_district_wise.json")
        .then(response => {
            let responseJson = response.json()
            .then( responseJson => {
                var data = []
                var stateNames = Object.getOwnPropertyNames(responseJson)
                for( var key in responseJson ){
                    var value = responseJson[key]; data.push(value);  
                }
                this.setState({ data , stateNames })
            } )
        })
        .catch( error => {
            console.log(error)
        } )
    }
    navigateToDistricts = (index) => {
        this.props.navigation.navigate("Districts",{
            data : this.state.data[index].districtData, stateName : this.state.stateNames[index]
        })
    }
    render(){
        if(!this.state.data){
            return(
                <View style={styles.container}>
                    <Spinner color="#EC4849" />
                </View>
            )
        }
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.mainData}>
                        <FlatList 
                            data={this.state.stateNames}
                            keyExtractor = { (item) => { return item } }
                            renderItem = { ({item, index}) => {
                                var F = item.slice(0,1)
                                return(
                                    <ListItem onPress={()=>{this.navigateToDistricts(index)}}>
                                        <Left style={[styles.roundedIcon,{ flex : 1.5 }]}>
                                            <Text style={styles.roundedIconText}> {F} </Text>
                                        </Left>
                                        <Body style={{flex : 9}}>
                                            <Text style={{fontWeight : "bold",marginLeft : 10,fontSize : 15}}> {item} </Text>
                                        </Body>        
                                    </ListItem>
                                )
                            } }
                        />
                        <View style={{height : 80}} />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  last2Days : {
  },
  roundedIcon : {
      width : 50,backgroundColor : "#B83227",borderRadius : 100,height : 50,justifyContent : "center",alignItems : "center"
  },
  roundedIconText : {
    color:"white",fontSize : 20
   }
});
