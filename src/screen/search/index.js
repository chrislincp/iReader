import React from 'react';
import NavigatorServer from '../../navigator/navigatorServer';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Keyboard,
} from 'react-native';
import {
  BasePage, Icon, DataList, BookItem, Input,
} from '../../components';
import IconName from '../../constants/IconName';
import { AppColors, AppStyles, AppSizes } from '../../themes';
import { searchHotKeys, searchKeyWord } from './index.service';
import DeviceStorage from '../../utils/deviceStorage';

export default class Search extends BasePage {
  constructor(props) {
    super(props);
    this.state = {
      keyWord: '',
      page: 1,
      hotKeyWords: [],
      searchHistory: [],
    }
  }

  _headerProps() {
    return {
      left: <View />,
      title: (
        <View style={{
          width: '100%',
          height: 30,
          borderRadius: 30,
          marginLeft: 15,
          flexDirection: 'row',
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
      }}
      >
        <Icon 
          name={IconName.search} 
          color={AppColors.textGreyColor} 
          size={16}
          style={{
            marginLeft: 15,
            marginRight: 15,
          }}
          />
        <Input 
          autoFocus
          placeholder="请输入书名或作者名"
          clearButtonMode="while-editing"
          style={{
            flex: 1,
            backgroundColor: 'white',
            height: 30,
          }}
          value={this.state.keyWord} 
          returnKeyType="search"
          onSubmitEditing={() => this.convertSearchHistory(this.state.keyWord)}
          onChangeText={(val) => this.setState({keyWord: val})} />
      </View>
      ),
      right: (
        <TouchableOpacity 
          style={{padding: 15}}
          onPress={() => {
            Keyboard.dismiss();
            NavigatorServer.goBack();
          }}
          >
          <Text style={{color: 'white'}}>取消</Text>
        </TouchableOpacity>
      ),
      leftStyle: { flex: 0 },
      centerStyle: { flex: 1 },
      rightStyle: { flex: 0 },
    }
  }

  componentDidMount() {
    this.getHotKeyWords();
    this.getHistory();
  }

  getHistory() {
    DeviceStorage.get('SearchHistory').then((res) => {
      if (res) {
        this.setState({
          searchHistory: res,
        });
      }
    });
  }


  getHotKeyWords() {
    DeviceStorage.get('HotKeyWords').then((res) => {
      if (res && res.length) {
        this.setState({
          hotKeyWords: res,
        });
      } else {
        this.refreshHotWords();
      }
    });
  }

  deleteHistory() {
    DeviceStorage.delete('SearchHistory');
    this.setState({
      searchHistory: [],
    });
  }

  convertSearchHistory(val) {
    const { searchHistory } = this.state;
    searchHistory.reverse();
    let i;
    searchHistory.forEach((history, index) => {
      if (history == val) i = index;
    });
    if (i || i == 0) searchHistory.splice(i, 1);
    if (val) searchHistory.push(val);
    searchHistory.reverse();
    DeviceStorage.save('SearchHistory', searchHistory);
    this.setState({
      searchHistory,
    });
  }

  refreshHotWords() {
    const {page} = this.state;
    searchHotKeys({page}).then(res => {
      if (res.success == 1) {
        DeviceStorage.save('HotKeyWords', res.keywordlist);
        this.setState({
          hotKeyWords: res.keywordlist,
          page: page + 1,
        })
      }
    }).catch(err => {
      console.log(err);
    })
  }


  search(val) {
    this.setState({keyWord: val});
    this.convertSearchHistory(val);
  }

  goDetail(item) {
    this.convertSearchHistory(item.bookname);
    this.nav.push('BookDetail', {id: item.bookid});
  }

  _renderItem(item) {
    return <BookItem key={item.bookid} item={item} onPress={() => this.goDetail(item)} />
  }

  _render() {
    const {options, keyWord, hotKeyWords, searchHistory} = this.state;
    return (
      <View style={AppStyles.appContainer}>
        {keyWord ? 
        <DataList 
          convertData={res => res.booklist}
          service={searchKeyWord} 
          options={{key: keyWord}} 
          renderItem={(item) => this._renderItem(item)}
          /> : 
          <ScrollView>
            <View style={{backgroundColor: 'white', padding: 15, marginBottom: 15}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text>大家都在搜</Text>
                </View>
                <Icon 
                  onPress={() => this.refreshHotWords()}
                  iconStyle={{paddingTop: 3}} 
                  color={AppColors.textGreyColor} 
                  text="换一批" name={IconName.refresh} 
                  size={20}
                  />
              </View>
              <View style={{marginTop: 10, flexDirection: 'row', flexWrap: 'wrap'}}>
                {hotKeyWords.map((item, index) => (
                  <TouchableOpacity 
                    key={index}
                    onPress={() => this.search(item.Keyword)}
                    style={styles.btn}>
                    <Text>{item.Keyword}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={{backgroundColor: 'white', padding: 15, marginBottom: 15}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text>搜索历史</Text>
                </View>
                <Icon 
                  onPress={() => this.deleteHistory()}
                  iconStyle={{paddingTop: 3}} 
                  color={AppColors.textGreyColor} 
                  text="清空" name={IconName.trash} 
                  size={20}
                  />
              </View>
              <View style={{marginTop: 10, flexDirection: 'row', flexWrap: 'wrap'}}>
                {searchHistory.map((item, index) => (
                  <TouchableOpacity 
                    key={index}
                    onPress={() => this.search(item)}
                    style={styles.btn}>
                    <Text>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
          }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  btn: {
    justifyContent: 'center', 
    alignItems: 'center', 
    height: 30,
    borderColor: AppColors.themeColor,
    borderWidth: AppSizes.hairLineWidth,
    borderRadius: 15,
    minWidth: 50,
    paddingLeft: 8,
    paddingRight: 8,
    marginRight: 8,
    marginBottom: 8,
    }
})