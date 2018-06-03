import { StackNavigator, TabBarBottom, TabNavigator } from 'react-navigation';
import { BookRack, Recommend, Top, Mine } from '../screen/tabs';
import BookDetail from '../screen/bookDetail';
import BookList from '../screen/BookList';
import BookDir from '../screen/bookDir';
import { AppColors } from '../themes';
import { Comments, DetailComment } from '../screen/bookComments';
const Tab = TabNavigator(
  {
    BookRack: {screen: BookRack},
    Recommend: {screen: Recommend},
    Top: {screen: Top},
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
    BookList: {screen: BookList},
    BookDir: {screen: BookDir},
    Comments: {screen: Comments},
    DetailComment: {screen: DetailComment},
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