import React from 'react';
import { StyleSheet, Text, View,FlatList,ScrollView } from 'react-native';
import {Spinner,Button,Left,Body, ListItem,} from 'native-base'


export default class Districts extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data : null,stateName : ""
        }
    }
    componentDidMount(){
        var data = this.props.navigation.getParam("data",null)
        var stateName = this.props.navigation.getParam("stateName",null)
        if(data && stateName){
            var values = []
            var distNames = Object.getOwnPropertyNames(data)
            for( var key in data ){
                var value = data[key]; values.push(value);  
            }
            var newArr = []
            var i = 0;
            values.forEach( each => {
                var newObj = {
                    districtName : distNames[i], distData : each 
                }
                newArr.push(newObj)
                i += 1
            } )
            this.setState({ data : newArr , stateName })
        }
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
                        <View style={{alignItems : "center"}}>
                            <Text style={{fontWeight : "bold",fontSize : 20}} > {this.state.stateName} </Text>
                        </View>
                        <FlatList 
                            data={this.state.data}
                            keyExtractor = { (item) => { return Math.random() } }
                            renderItem = { ({item}) => {
                                var F = item.districtName.slice(0,1)
                                return(
                                    <ListItem>
                                        <Left style={[styles.roundedIcon,{ flex : 1.5 }]}>
                                            <Text style={styles.roundedIconText}> {F} </Text>
                                        </Left>
                                        <Body style={{flex : 9}}>
                                            <Text style={{fontWeight : "bold",marginLeft : 10}}> {item.districtName} </Text>
                                            <View style={{marginTop : 5}}>
                                                <Button rounded bordered warning style={{marginLeft : 10}}>
                                                    <Text> Confirmed Cases  </Text>
                                                    <Text> {item.distData.confirmed} </Text>
                                                </Button>
                                            </View>
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
  roundedIcon : {
      width : 50,backgroundColor : "#B83227",borderRadius : 100,height : 50,justifyContent : "center",alignItems : "center"
  },
  roundedIconText : {
    color:"white",fontSize : 20
   }
});
