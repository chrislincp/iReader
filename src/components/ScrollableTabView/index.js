import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import { AppSizes, AppColors } from '../../themes';
export default class ScrollTabView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { style, children, contentStyle, tabStyle } = this.props;
    return (
      <ScrollableTabView
        style={style}
        tabBarUnderlineStyle={{
          display: 'none',
          width: 0,
          height: 0,
        }}
        renderTabBar={() => (
          <DefaultTabBar
            style={{borderWidth: AppSizes.hairLineWidth, borderColor: AppColors.dividersColor}}
            renderTab={(name, pageIndex, isTabActive, goToPage) => (
              <TouchableOpacity
                key={pageIndex}
                onPress={() => {
                  goToPage(pageIndex);
                }}
                style={[{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }, tabStyle]}
                >
                <Text style={{ color: isTabActive ? AppColors.themeColor : AppColors.textTabInitColor }}>
                  {name}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}
        >
        {children.map((child, index) => React.cloneElement(child, { style: contentStyle, key: index }))}
      </ScrollableTabView>
    )
  }
}