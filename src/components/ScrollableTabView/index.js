import React from 'react';
import {
  TouchableOpacity
} from 'react-native';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import { AppSizes, AppColors } from '../../themes';
import Text from '../Text';

export default class ScrollTabView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { 
      style, 
      children, 
      underlineStyle, 
      defaultBarStyle, 
      contentStyle, 
      tabStyle, 
      activeColor, 
      initColor,
      renderTab,
    } = this.props;
    return (
      <ScrollableTabView
        style={style}
        tabBarUnderlineStyle={[{
          // display: 'none',
          width: 0,
          height: 0,
        }, underlineStyle]}
        renderTabBar={() => (
          <DefaultTabBar
            style={[{borderWidth: AppSizes.hairLineWidth, borderColor: AppColors.dividersColor}, defaultBarStyle]}
            renderTab={(name, pageIndex, isTabActive, goToPage) => {
              return renderTab ? renderTab(name, pageIndex, isTabActive, goToPage) :
              (<TouchableOpacity
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
              </TouchableOpacity>)
            }}
          />
        )}
        >
        {children.map((child, index) => React.cloneElement(child, { style: contentStyle, key: index }))}
      </ScrollableTabView>
    )
  }
}