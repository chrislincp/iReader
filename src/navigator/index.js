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
import BookPages from '../screen/bookPages';
import {Login, Register} from '../screen/login';
import Splash from '../screen/splash';
import {
  Config,
  Experience,
  FeedBack,
  MyBookList,
  MyComment,
  MyInfo,
  MyTopic,
  Task,
  About,
} from '../screen/mine';


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
    Splash: { screen: Splash },
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
    BookPages: {screen: BookPages},
    Config: {screen: Config},
    Experience: {screen: Experience},
    FeedBack: {screen: FeedBack},
    MyBookList: {screen: MyBookList},
    MyComment: {screen: MyComment},
    MyInfo: {screen: MyInfo},
    MyTopic: {screen: MyTopic},
    Task: {screen: Task},
    About: {screen: About},
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

const LoginStack = StackNavigator(
  {
    Login: { screen: Login },
    Register: { screen: Register },
  },
  {
    headerMode: 'none',
  },
);


const RootStack = StackNavigator(
  {
    MainStack: { screen: MainStack },
    LoginStack: {screen: LoginStack },
  },
  {
    initialRouteName: 'MainStack',
    headerMode: 'none',
    mode: 'modal',
  },
);

export default RootStack;