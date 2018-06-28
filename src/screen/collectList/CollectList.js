import React from 'react';
import {
  View,
} from 'react-native';
import { BasePage, DataList, CollectItem } from '../../components';
import { AppStyles } from '../../themes';
import { getCollectList } from './index.service';

export default class CollectList extends BasePage {
  constructor(props) {
    super(props);
    this.state = {
      options: this.nav.state.params.options,
    }
  }

  _headerProps() {
    return {
      title: this.nav.state.params.title,
    }
  }

  _renderItem(item) {
    return <CollectItem key={item.key} item={item} onPress={() => this.nav.push('CollectDetail', item)} />
  }

  _render() {
    return (
      <View style={AppStyles.appContainer}>
        <DataList 
          service={getCollectList}
          options={this.state.options}
          convertData={res => res.booklistlist}
          renderItem={(item) => this._renderItem(item)}
          />
      </View>
    )

  }
}