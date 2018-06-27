import React, { Component } from 'react';
import RootSiblings from 'react-native-root-siblings';
import ToastContainer, { positions, durations } from './ToastContainer';


let lastToast = null;

let defaultOptions = {};

class Toast extends Component {
  static propTypes = ToastContainer.propTypes;
  static positions = positions;
  static durations = durations;
  static setDefaultOptions = (options) => {
    defaultOptions = options;
  }

  // convenience method
  static showLoading = function (message, options) {
    const opts = Object.assign({ duration: 9007199254740992 }, options, { showLoading: true });

    this.show(message, opts);
  }

  static showSuccess = function (message, options) {
    const opts = Object.assign({}, options, { image: defaultOptions.imageSuccess ? defaultOptions.imageSuccess : require('./image/success.png') });

    this.show(message, opts);
  }

  static showFail = function (message, options) {
    const opts = Object.assign({}, options, { image: defaultOptions.imageFail ? defaultOptions.imageFail : require('./image/error.png') });

    this.show(message, opts);
  }

  static showInfo = function (message, options) {
    const opts = Object.assign({}, options, { image: defaultOptions.imageInfo ? defaultOptions.imageInfo : require('./image/info.png') });

    this.show(message, opts);
  }

  static showWarn = function (message, options) {
    const opts = Object.assign({}, options, { image: defaultOptions.imageWarn ? defaultOptions.imageWarn : require('./image/warn.png') });

    this.show(message, opts);
  }

  static hide = function () {
    if (lastToast != null) {
      lastToast.destroy();
    }
  }


  // raw method
  static show = (message, options) => {
    if (lastToast != null) {
      lastToast.destroy();
    }

    const RawDefaultOptions = {
      duration: durations.SHORT,
      position: positions.CENTER,

    };

    const opts = Object.assign(RawDefaultOptions, defaultOptions, options);

    const onHidden = opts.onHidden;

    const hidenFunc = function () {
      toast && toast.destroy();
      onHidden && onHidden();
    };

    opts.onHidden = hidenFunc;

    let toast = new RootSiblings(<ToastContainer
      {...opts}
      visible
    >
      {message}
    </ToastContainer>);

    lastToast = toast;

    return toast;
  };

  static hide = (toast) => {
    if (toast instanceof RootSiblings) {
      toast.destroy();
    }

    if (lastToast != null) {
      lastToast.destroy();
    }
  };


  _toast = null;

  constructor(props) {
    super(props);
  }


  componentWillMount = () => {
    this._toast = new RootSiblings(<ToastContainer
      {...this.props}
      duration={0}
    />);
  };

  componentWillReceiveProps = (nextProps) => {
    this._toast.update(<ToastContainer
      {...nextProps}
      duration={0}
    />);
  };

  componentWillUnmount = () => {
    this._toast.destroy();
  };

  render() {
    return null;
  }
}

export { RootSiblings as Manager };
export default Toast;
