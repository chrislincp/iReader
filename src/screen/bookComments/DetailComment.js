import React from 'react';
import { BasePage, DataList, Text, } from '../../components';
import {
  View,
  StyleSheet,
  Image,
} from 'react-native';
import { AppColors, AppSizes, AppStyles } from '../../themes';
import { getBookCommentReply, getBookCommentDetail } from './index.service';
import { timeCompare, ifIphoneX } from '../../utils/utils';
export default class DetailComment extends BasePage {
  constructor(props) {
    super(props);
    this.state = {
      navProps: this.nav.state.params,
      loading: true,
    }
  }

  _headerProps() {
    return {
      title: '书评',
    }
  }

  componentDidMount() {
    // getBookCommentDetail({bookcommentid: this.state.id}).then(res => {
    //   console.log(res);
    //   this.setState({ detailLoading: false });
    // })
  }

  renderHeader() {
    const {navProps} = this.state;
    return (
      <View style={styles.detailWrap}>
          <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 10}}>
            <View style={{marginRight: 10}}>
              <Image style={{width: 34, height: 34, borderRadius: 17}} source={{uri: navProps.userimage}} />
            </View>
            <View style={{flex: 1, justifyContent: 'center', flexDirection: 'column'}}>
              <Text style={{flex: 1}}>{navProps.nickname}</Text>
              <Text style={[AppStyles.smallText, {justifyContent: 'flex-end'}]}>{`${timeCompare(navProps.posttime)}前`}</Text>
            </View>
          </View>
          <Text style={{lineHeight: 20}}>{navProps.title}</Text>
          <Text style={AppStyles.smallText}>{navProps.content}</Text>
        </View>
    )
  }

  _renderItem(item) {
    return (
      <View 
        style={{
          padding: 10, 
          backgroundColor: 'white',
          justifyContent: 'center', 
          flexDirection: 'row', 
          borderColor: AppColors.dividersColor,
          borderBottomWidth: StyleSheet.hairlineWidth,
          }}>
        <View style={{ marginRight: 10}}>
          <Image style={AppStyles.avatar} source={{uri: item.userimage}} />
        </View>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 12}}>
              {item.nickname}
            </Text>
            <Text style={AppStyles.smallText}>{`${timeCompare(item.posttime)}前`}</Text>
          </View>
          <View style={{minHeight: 60}}>
            <Text style={{lineHeight: 18}}>{item.content}</Text>
            {item.tofloor ? <Text style={AppStyles.smallText}>{`回复${item.tonickname} (${item.tofloor}楼)`}</Text> : null}
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>回复</Text>
            <Text style={AppStyles.smallText}>{`${item.floor}楼`}</Text>
          </View>
        </View>
      </View>
    )
  }

  getStatus(status) {
    switch (status) {
      case 'first':
        console.log('first load end');
        this.setState({ loading: false });
        break;
        default:
        break;
    }
  }

  _render() {
    const {navProps, loading} = this.state;
    console.log(navProps)
    return (
      <View 
        style={{flex: 1, backgroundColor: AppColors.backgroundColor}}
        >
        <DataList 
          style={{flex: 1}}
          service={getBookCommentReply}
          options={{bookcommentid: navProps.bookCommentid}}
          convertData={res => res.bookcommentreplylist}
          renderItem={(item) => this._renderItem(item)}
          renderHeader={() => this.renderHeader()}
          getStatus={(status) => this.getStatus(status)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  detailWrap: {
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 10,
  }
})