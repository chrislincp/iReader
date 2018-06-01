import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '..';
import IconName from '../../constants/IconName';
import {
  View,
  Text,
} from 'react-native';

export default class StarScore extends React.Component {
  static proptypes = {
    score: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    total: PropTypes.number.isRequired,
    color: PropTypes.string,
  }

  static defaultProps = {
    score: 0,
    total: 10,
    color: 'rgb(247, 186, 42)',
    emptyColor: 'rgb(239, 242, 247)',
  }

  constructor(props) {
    super(props);
    const score = props.score - 0;
    const total = props.total - 0;
    this.state = {
      fullNum: Math.floor((score / total) * 5),
      hasHalf: Math.floor((score / total) * 5) == (score / total) * 5 ? false : true,
    }
  }

  render() {
    const {fullNum, hasHalf} = this.state;
    const emptyNum = hasHalf ? (5 - (fullNum + 1)) : 5 - fullNum;
    console.log(fullNum, hasHalf, emptyNum);
    const {score, color, emptyColor} = this.props;
    let fullArr = [];
    let emptyArr = [];
    for (let i = 0; i < fullNum; i++) {
      fullArr.push(i);
    }
    for (let i = 0; i < emptyNum; i++) {
      emptyArr.push(i);
    }
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {fullNum && fullArr.map((item, i) => (
          <Icon size={20} color={color} style={{marginRight: 5}} key={i} name={IconName.star} />
        ))}
        {hasHalf && <Icon size={20} color={color} style={{marginRight: 5}} name={IconName.halfStar} />}
        {emptyArr && emptyArr.map((item, i) => (
          <Icon size={20} color={emptyColor} style={{marginRight: 5}} key={i} name={IconName.star} />
        ))}
        <Text style={{fontSize: 16, color,}}>{score}</Text>
      </View>
    )
  }
}