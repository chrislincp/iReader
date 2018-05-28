import React from 'react';
import { BasePage } from '../../components';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import LoadingStatus from '../../components/LoadingStatus';
import { getBookDetail, getBookHotComment } from './index.service';
export default class BookDetail extends BasePage {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    const {id} = this.nav.state.params;
    Promise.all([
      getBookDetail({bookid: id}),
      getBookHotComment({bookid: id})
    ]).then(res => {
      console.log(res)
      this.setState({
        loading: false,
      })
    }).catch(err => {
      console.log(err);
    })
  }

  _headerProps() {
    return {
      title: '书籍详情',
    }
  }

  _render() {
    const {loading} = this.state;
    return (
      loading ? 
      <LoadingStatus /> :
      <ScrollView style={{flex: 1}}>
      </ScrollView>
    )
  }
}