import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import Home from './Screens/Home'
import States from './Screens/States'
import Districts from './Screens/Districts'

const mainNavigator = createStackNavigator({
  Home : { screen : Home },
  States : { screen : States },
  Districts : { screen : Districts }
},
  { 
    defaultNavigationOptions : {
      headerStyle : {
        backgroundColor : "#0ABDE3",
      },
      headerTintColor : "white",
      headerTitle : "Covid 19"
    }
   }
)

const App = createAppContainer(mainNavigator)
export default App