import { StackNavigator, TabBarBottom, TabNavigator } from 'react-navigation';
import { BookRack, Recommend, Top,  BookList, Mine } from '../screen/tabs';
import BookDetail from '../screen/bookDetail';
import TopList from '../screen/TopList';
import BookDir from '../screen/bookDir';
import { AppColors } from '../themes';
const Tab = TabNavigator(
  {
    BookRack: {screen: BookRack},
    Recommend: {screen: Recommend},
    Top: {screen: Top},
    // BookList: {screen: BookList},
    Mine: {screen: Mine},
  },
  {
    tabBarOptions: {
      showIcon: true,
      inactiveTintColor: AppColors.textTabInitColor,
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
    TopList: {screen: TopList},
    BookDir: {screen: BookDir},
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