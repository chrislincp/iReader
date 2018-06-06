import { StackNavigator, TabBarBottom, TabNavigator } from 'react-navigation';
import { BookRack, BookMall, Top, Mine } from '../screen/tabs';
import BookDetail from '../screen/bookDetail';
import BookList from '../screen/BookList';
import BookDir from '../screen/bookDir';
import { CollectList, CollectDetail } from '../screen/collectList';
import { Comments, DetailComment } from '../screen/bookComments';
import { AppColors } from '../themes';
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

const RootStack = StackNavigator(
  {
    Tab: { screen: Tab },
    BookDetail: {screen: BookDetail},
    BookList: {screen: BookList},
    BookDir: {screen: BookDir},
    Comments: {screen: Comments},
    DetailComment: {screen: DetailComment},
    CollectList: {screen: CollectList},
    CollectDetail: {screen: CollectDetail},
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