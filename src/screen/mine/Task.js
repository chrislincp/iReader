import React from 'react';
import { BasePage, TitleBar } from '../../components';
import { AppStyles, AppColors, AppSizes } from '../../themes';
import {
  View,
  ScrollView,
  Text,
  StyleSheet
} from 'react-native';

export default class Task extends BasePage {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  _headerProps() {
    return {
      title: '任务'
    }
  }

  _render() {
    return (
      <View style={AppStyles.appContainer}>
        <ScrollView>
          <TitleBar title="新手任务" right={<View />} />
          <View style={styles.line}>
            <Text>完善个人资料</Text>
            <Text style={styles.up}>+20点经验</Text>
          </View>
          <TitleBar title="等级特权" style={{marginTop: 10}} right={<View />} />
          <View style={[styles.line, styles.underline]}>
            <Text>每日启动</Text>
            <Text style={styles.up}>+10点经验</Text>
          </View>
          <View style={[styles.line, styles.underline]}>
            <Text>发布话题/书单/书评</Text>
            <Text style={styles.up}>+5点经验</Text>
          </View>
          <View style={[styles.line, styles.underline]}>
            <Text>收到10鲜花</Text>
            <Text style={styles.up}>+10点经验</Text>
          </View>
          <View style={[styles.line]}>
            <Text>收到10鸡蛋</Text>
            <Text style={styles.down}>-10点经验</Text>
          </View>
          <TitleBar title="特供任务" style={{marginTop: 10}} right={<View />} />
          <View style={styles.line}>
            <Text>给APP好评</Text>
            <Text style={styles.up}>+50点经验</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
  },
  underline: {
    borderBottomWidth: AppSizes.hairLineWidth,
    borderColor: AppColors.dividersColor,
  },
  up: {
    color: AppColors.success,
  },
  down: {
    color: AppColors.darkGray,
  }
})