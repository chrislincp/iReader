import { StackNavigator, TabBarBottom, TabNavigator } from 'react-navigation';
import { BookRack, Recommend, TopList,  BookList } from '../screen/tabs';
import BookDetail from '../screen/bookDetail';
import { AppColors } from '../themes';
const Tab = TabNavigator(
  {
    BookRack: {screen: BookRack},
    Recommend: {screen: Recommend},
    TopList: {screen: TopList},
    BookList: {screen: BookList},
  },
  {
    tabBarOptions: {
      showIcon: true,
      inactiveTintColor: '#262A2F',
      activeTintColor: AppColors.themeColor,
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
    BookDetail: {screen: BookDetail},
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