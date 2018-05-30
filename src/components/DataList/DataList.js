import React from 'react';
import {
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import ErrorPage from '../ErrorPage';
import LoadingStatus from '../LoadingStatus';
// import { errorImg, netErrorImg, noDataList } from './index.image';

export default class DataList extends React.Component {
    static propTypes = {
      service: PropTypes.func.isRequired,
      options: PropTypes.object,
      config: PropTypes.object,
      convertData: PropTypes.func,
      renderItem: PropTypes.func.isRequired,
      renderEmpty: PropTypes.func,
      renderError: PropTypes.func,
      renderNetError: PropTypes.func,
      renderSeparator: PropTypes.func,
      renderFooter: PropTypes.func,
      style: PropTypes.object,
      getStatus: PropTypes.func,
      disabledMountLoad: PropTypes.bool,
      disabledReceiveProps: PropTypes.bool,
      noMoreLoading: PropTypes.bool,
      onEndReachedThreshold: PropTypes.number,
    }

    static defaultProps = {
      options: {},
      style: {},
      config: {
        pageNumber: 'pageNumber',
        pageSize: 'pageSize',
        size: 10,
      },
      convertData: val => val,
      getStatus: () => {},
      renderEmpty: () => null,
      renderError: () => null,
      renderNetError: () => null,
      renderSeparator: () => null,
      renderFooter: () => null,
      disabledMountLoad: false,
      disabledReceiveProps: false,
      noMoreLoading: false,
      onEndReachedThreshold: 0.1,
    };

    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        isRefresh: false,
        status: 'begin', // begin, empty, net_error, error, success, end,
        data: [],
        // onEndReachedThreshold: this.props.onEndReachedThreshold,
        pageNumber: 1,
        pageSize: this.props.config.size || 10,
        netErrorRes: ['连接到服务器失败'],
        options: {},
      };
    }

    componentDidMount() {
      this.setState({
        options: Object.assign({}, this.props.options),
      });
      if (!this.props.disabledMountLoad) this.reload();
    }

    componentWillReceiveProps(nextProps) {
      let change = false;
      const { options } = this.state;
      const nextPropsOpt = nextProps.options;
      if (Object.keys(options).length != Object.keys(nextPropsOpt).length) {
        change = true;
      } else {
        Object.keys(options).forEach((key) => {
          if (options[key] !== nextPropsOpt[key]) change = true;
        });
      }
      // console.log(options, nextPropsOpt, change);
      if (change) {
        this.setState({
          options: Object.assign({}, nextPropsOpt),
        });
        this.props = nextProps;
        if (!this.props.disabledReceiveProps) this.reload();
      }
      // this.props = nextProps;
      // this.reload();
    }

    _renderFooter() {
      const { status, loading } = this.state;
      console.log(status);
      if (status == 'end') {
        return this.props.renderFooter() ? this.props.renderFooter() :
        <Text
          style={{
           marginTop: 10,
           marginBottom: 10,
           textAlign: 'center',
           color: '#999',
         }}
        >
          没有更多了
        </Text>;
      }
      return loading ? <ActivityIndicator style={{ marginTop: 10, marginBottom: 10 }} animating={loading} /> : null;
    }

    _renderSeparator() {
      return this.props.renderSeparator();
    }

    _renderEmpty() {
      const { status } = this.state;
      switch (status) {
        case 'empty':
          return this.props.renderEmpty() ? this.props.renderEmpty() :
          <ErrorPage title="暂无数据" onPress={() => this.reload()} />;
        case 'net_error':
          return this.props.renderNetError() ? this.props.renderNetError() :
          <ErrorPage title="网络去火星了" onPress={() => this.reload()} />;
        case 'error':
          return this.props.renderError() ? this.props.renderError() :
          <ErrorPage title="对不起，出错了" onPress={() => this.reload()} />;
        default:
          return null;
      }
    }

    onRefresh() {
      this.setState({
        isRefresh: true,
      });
      this.reload();
    }

    onLoading() {
      const {
        service, options, convertData, getStatus, config,
      } = this.props;
      const {
        // status, loading, isRefresh,
        netErrorRes,
      } = this.state;
      // const forbiddenStatus = ['end', 'error', 'net_error'];
      // if (forbiddenStatus.includes(status) || loading || isRefresh) return;
      this.setState({
        loading: true,
      });
      const { data, pageNumber, pageSize } = this.state;
      const pages = {
        [config.pageNumber]: pageNumber + 1,
        [config.pageSize]: pageSize,
      };
      const params = Object.assign({}, options, pages);
      service(params).then((val) => {
        const res = convertData ? convertData(val) : val;
        this.setState({
          data: data.concat(res),
          pageNumber: res.length == pageSize ? pageNumber + 1 : pageNumber,
          status: res.length == pageSize ? 'success' : 'end',
        });
        setTimeout(() => this.setState({ loading: false }), 1000);
        getStatus('success', val, !!this.state.data.length);
      }).catch((err) => {
        console.log(err);
        this.setState({
          status: netErrorRes.includes(err) ? 'net_error' : 'error', //  判断是网络错误还是请求报错,
          loading: false,
        });
        setTimeout(() => this._ref.scrollToEnd({ animated: false }));
        getStatus('error', err, !!this.state.data.length);
      });
    }

    onScroll(event) {
      const { loading, status, data } = this.state;
      const { onEndReachedThreshold, noMoreLoading } = this.props;
      if (noMoreLoading) return;
      const { contentSize, contentOffset, layoutMeasurement } = event.nativeEvent;
      const loadMore = contentSize.height - contentOffset.y < layoutMeasurement.height + (contentSize.height * onEndReachedThreshold);
      // console.log(loadMore, reloadStatus.includes(status), loading);
      if (loadMore && !loading && status != 'end' && data.length) {
        this.onLoading();
      }
    }

    reload() {
      const {
        service, options, convertData, getStatus, config,
      } = this.props;
      this.setState({
        pageNumber: 1,
      });
      const pages = {
        [config.pageNumber]: 1,
        [config.pageSize]: this.state.pageSize,
      };
      const params = Object.assign({}, options, pages);
      service(params).then((val) => {
        const res = convertData ? convertData(val) : val;
        console.log(res);
        this.setState({
          data: res,
          isRefresh: false,
          loading: false,
          status: res.length ? res.length < this.state.pageSize ? 'end' : 'success' : 'empty',
        });
        if (res.length) this._ref.scrollToOffset({ animated: false, offset: 0 });
        getStatus('first', val, !!this.state.data.length);
      }).catch((err) => {
        this.setState({
          status: this.state.netErrorRes.includes(err) ? 'net_error' : 'error', //  判断是网络错误还是请求报错
          isRefresh: false,
          loading: false,
        });
        // Toast.show(this.state.netErrorRes.includes(err) ? '网络去火星了' : '对不起，出错了');
        getStatus('error', err, !!this.state.data.length);
      });
    }

    onChangeData(item) {
      const { data } = this.state;
      data.forEach((val, index) => {
        if (val.id == item.id) {
          data[index] = item;
        }
      });
      this.setState({ data });
    }

    render() {
      const {
        renderItem, style,
      } = this.props;
      const { data, status } = this.state;
      const emptyStatus = ['empty', 'net_error', 'error'];
      return (
        !data.length ? emptyStatus.includes(status) ? this._renderEmpty() : <LoadingStatus /> :
        <FlatList
          keyboardDismissMode="on-drag"
          onScroll={event => this.onScroll(event)}
          style={[style]}
          ref={ref => this._ref = ref}
          data={this.state.data}
          refreshing={this.state.isRefresh}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={() => this.onRefresh()}
          // onEndReached={() => this.onLoading()}
          // onEndReachedThreshold={this.state.onEndReachedThreshold}
          renderItem={({ item }) => renderItem(item)}
          ListFooterComponent={this._renderFooter()}
          ItemSeparatorComponent={() => this._renderSeparator()}
        />
      );
    }
}
