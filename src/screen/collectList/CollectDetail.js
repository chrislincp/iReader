import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { BasePage } from '../../components';
import { AppStyles, AppColors, AppSizes } from '../../themes';
import { getCollectDetail } from './index.service';
import { timeCompare } from '../../utils/utils';

export default class CollectDetail extends BasePage {
  constructor(props) {
    super(props);
    this.state = {
      screenState: 'loading',
      navProps: this.nav.state.params,
      collectInfo: {}
    }
  }

  componentDidMount() {
    const {navProps} = this.state;
    getCollectDetail({booklistid: navProps.id}).then(res => {
      this.setState({
        collectInfo: res.booklistinfo,
        screenState: 'success'
      })
    }).catch(err => {
      this.setState({
        screenState: 'error',
      })
    })
  }

  _headerProps() {
    return {
      title: this.state.navProps.title,
    }
  }

  _render() {
    const {collectInfo} = this.state;
    return (
      <ScrollView style={AppStyles.appContainer}>
        <View style={styles.detailWrap}>
          <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 10}}>
            <View style={{marginRight: 10}}>
              <Image style={{width: 34, height: 34, borderRadius: 17}} source={{uri: collectInfo.userimage}} />
            </View>
            <View style={{flex: 1, justifyContent: 'center', flexDirection: 'column'}}>
              <Text style={{flex: 1}}>{collectInfo.nickname}</Text>
              <Text style={[AppStyles.smallText, {justifyContent: 'flex-end'}]}>{`${timeCompare(collectInfo.updatetime)}前`}</Text>
            </View>
          </View>
          <Text style={{lineHeight: 20}}>{collectInfo.title}</Text>
          <Text style={AppStyles.smallText}>{collectInfo.description}</Text>
        </View>
        {collectInfo.booklist.map((item, index) => (
          <TouchableOpacity
            key={item.bookid}
            onPress={() => this.nav.push('BookDetail', {id: item.bookid})}
            style={{
              flex: 1,
              flexDirection: 'row',
              padding: 10, 
              backgroundColor: 'white',
              borderColor: AppColors.dividersColor,
              borderBottomWidth: AppSizes.hairLineWidth,
            }}
          >
            <Image style={styles.cover} source={{uri: item.bookimage}} />
            <View style={{flex: 1, flexDirection: 'column'}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>{item.bookname}</Text>
                <Text style={{color: AppColors.themeColor, fontSize: 16}}>{item.score}</Text>
              </View>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={AppStyles.smallText}>{item.author}</Text>
              </View>
              <View>
                <Text style={AppStyles.smallText}>{`${item.usercount}人在追`}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    )

  }
}

const styles = StyleSheet.create({
  detailWrap: {
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  cover: {
    width: 60,
    height: 75,
    marginRight: 10
  }
})