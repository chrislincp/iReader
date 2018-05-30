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
    const {score, color} = this.props;
    let arr = [];
    for (let i = 0; i < fullNum; i++) {
      arr.push(i);
    }
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {fullNum && arr.map((item, i) => (
          <Icon size={20} color={color} style={{marginRight: 5}} key={i} name={IconName.star} />
        ))}
        {hasHalf && <Icon size={20} color={color} style={{marginRight: 5}} name={IconName.halfStar} />}
        <Text style={{fontSize: 16, color,}}>{score}</Text>
      </View>
    )
  }
}