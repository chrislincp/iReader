import { StackNavigator, TabBarBottom, TabNavigator } from 'react-navigation';
import { BookRack, BookMall, Top, Mine } from '../screen/tabs';
import BookDetail from '../screen/bookDetail';
import BookList from '../screen/bookList';
import BookDir from '../screen/bookDir';
import BookSortList from '../screen/bookSortList';
import { CollectList, CollectDetail } from '../screen/collectList';
import { Comments, DetailComment } from '../screen/bookComments';
import { AppColors } from '../themes';
import Search from '../screen/search';

const Tab = TabNavigator(
  {
    BookRack: {screen: BookRack},
    BookMall: {screen: BookMall},
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

const MainStack = StackNavigator(
  {
    Tab: { screen: Tab },
    BookDetail: {screen: BookDetail},
    BookList: {screen: BookList},
    BookDir: {screen: BookDir},
    Comments: {screen: Comments},
    DetailComment: {screen: DetailComment},
    CollectList: {screen: CollectList},
    CollectDetail: {screen: CollectDetail},
    BookSortList: {screen: BookSortList},
    Search: {screen: Search},
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


const RootStack = StackNavigator(
  {
    MainStack: { screen: MainStack },
  },
  {
    initialRouteName: 'MainStack',
    headerMode: 'none',
    mode: 'modal',
  },
);

export default RootStack;