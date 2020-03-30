import React from 'react';
import { StyleSheet, Text, View,FlatList,ScrollView } from 'react-native';
import {Spinner,Button,Card,Left,Body, ListItem, CardItem} from 'native-base'


export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data : null,last2Days : [],today : {},stateData : []
        }
    }
    componentDidMount(){
        this.retrieveData()
    }
    retrieveData = () => {
        return fetch("https://api.covid19india.org/data.json")
        .then(response => {
            let responseJson = response.json()
            .then( responseJson => {
                if(responseJson.cases_time_series){
                    var last2Days = responseJson.cases_time_series
                    last2Days = last2Days.slice(last2Days.length-2,last2Days.length)
                    last2Days = last2Days.reverse()
                }else{
                    var last2Days = []
                }
                var today = responseJson.statewise[0]
                var stateData = responseJson.statewise.slice(1,responseJson.statewise.length)
                this.setState({ data : responseJson,last2Days, today, stateData })
            } )
        })
        .catch( error => {
            console.log(error)
        } )
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
                    <View style={styles.today}>
                        <Card>
                            <CardItem>
                                <Button style={{flex : 1}} rounded bordered warning>
                                    <Text> Active </Text>
                                    <Text> {this.state.today.active} </Text>
                                </Button>
                                <Button style={{flex : 1}} rounded bordered success>
                                    <Text> Recovered </Text>
                                    <Text> {this.state.today.recovered} </Text>
                                </Button>
                                <Button style={{flex : 1}} rounded bordered danger>
                                    <Text> Death </Text>
                                    <Text> {this.state.today.deaths} </Text>
                                </Button>                                    
                            </CardItem>
                            <CardItem>
                                <Button style={{flex : 1}} rounded bordered primary>
                                    <Text> Confirmed</Text> 
                                    <Text> {this.state.today.confirmed} </Text>
                                </Button>
                                <Button onPress={()=>{ this.props.navigation.navigate("States") }} style={{flex : 1}} 
                                    rounded bordered >
                                    <Text> District Wise Data </Text>
                                </Button>
                            </CardItem>
                        </Card>
                    </View>
                    <View style={styles.last2Days}>
                            <FlatList 
                                data={this.state.last2Days}
                                keyExtractor={(item)=>{return item.date}}
                                renderItem = { ({item}) => {
                                    var I = item.date.indexOf(" ")
                                    return(
                                        <ListItem>
                                            <Left style={[styles.roundedIcon,{flex : 1.5}]}>
                                                <Text style={styles.roundedIconText}> {item.date.slice(0,I)} </Text>
                                            </Left>
                                            <Body style={{flex : 8}}>
                                                <Text style={{fontWeight : "bold",marginLeft : 10}}> {item.date} </Text>
                                                <View style={{flexDirection : "row"}}>
                                                    <Button rounded bordered primary style={{marginLeft : 20}}> 
                                                        <Text> Recovered {item.dailyrecovered}</Text>
                                                    </Button>
                                                    <Button rounded bordered warning style={{marginLeft : 40}}>
                                                        <Text>Confirmed {item.dailyconfirmed}</Text>
                                                    </Button>
                                                </View> 
                                            </Body>
                                        </ListItem>
                                    )
                                } }
                            />
                    </View>
                    <View style={styles.mainData}>
                        <FlatList 
                            data={this.state.stateData}
                            keyExtractor = { (item) => { return Math.random() } }
                            renderItem = { ({item}) => {
                                var F = item.state.slice(0,1)
                                return(
                                    <ListItem>
                                        <Left style={[styles.roundedIcon,{ flex : 1.5 }]}>
                                            <Text style={styles.roundedIconText}> {F} </Text>
                                        </Left>
                                        <Body style={{flex : 9}}>
                                            <Text style={{fontWeight : "bold",marginLeft : 10}}> {item.state} </Text>
                                            <View style={{flexDirection : "row",marginTop : 5}}>
                                                <Button rounded bordered warning style={{marginLeft : 10}}>
                                                    <Text> Active  </Text>
                                                    <Text> {item.active} </Text>
                                                </Button>
                                                <Button rounded bordered success style={{marginLeft : 10}}>
                                                    <Text> Recovered  </Text>
                                                    <Text> {item.recovered}  </Text>
                                                </Button>
                                                <Button rounded bordered danger style={{marginLeft : 10}}>
                                                    <Text> Deaths  </Text>
                                                    <Text> {item.deaths} </Text>
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
  last2Days : {
  },
  roundedIcon : {
      width : 50,backgroundColor : "#B83227",borderRadius : 100,height : 50,justifyContent : "center",alignItems : "center"
  },
  roundedIconText : {
    color:"white",fontSize : 20
   }
});
