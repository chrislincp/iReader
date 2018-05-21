import { StackNavigator, TabBarBottom, TabNavigator } from 'react-navigation';
import { BookRack, Recommend, RankingList } from '../screen/tabs';

const Tab = TabNavigator(
  {
    BookRack: {screen: BookRack},
    Recommend: {screen: Recommend},
    RankingList: {screen: RankingList},
  },
  {
    tabBarOptions: {
      showIcon: true,
      inactiveTintColor: '#B9C4CE',
      activeTintColor: '#262A2F',
      style: {
        backgroundColor: 'white',
      },
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    lazy: false,
  },
);

const RootStack = StackNavigator(
  {
    Tab: { screen: Tab },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
        flex: 1,
      },
    },
  },
);

export default RootStack;