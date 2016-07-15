import React, {Component} from 'react';
import {
  View,
  Image,
  TouchableHighlight,
  StyleSheet,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// for timestamp
import moment from 'moment';
import CustomRelativeTime from '../config/CustomRelativeTime';
moment.updateLocale('en', CustomRelativeTime);

export default class CommentCard extends Component {
  static propTypes = {
    commentData: React.PropTypes.object,
    nestingLevel: React.PropTypes.number,
  };

  static defaultProps = {
    nestingLevel: 0,
  }

  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: false
    }

    this.renderReplies = this.renderReplies.bind(this);
    this.renderReply = this.renderReply.bind(this);
  }

  onArrowPress() {
    this.setState({
      isCollapsed: !this.state.isCollapsed
    })
  }

  renderReplies() {
    let repliesChildrenArr = this.props.commentData.replies.data.children;
    return (
      <View>
        {repliesChildrenArr.map(this.renderReply)}
      </View>
    )
  }

  renderReply(child) {
    return <CommentCard commentData={child.data} key={child.data.id} nestingLevel={this.props.nestingLevel + 1}/>;
  }

  render() {
    let commentBody = this.state.isCollapsed ? null : <Text>{this.props.commentData.body}</Text>;
    let arrow = this.state.isCollapsed ? 'ios-arrow-forward' : 'ios-arrow-down';

    let cardContainerStyle = {
      marginLeft: this.props.nestingLevel * 10,
      margin: 1,
      borderLeftColor: '#d24919',
      borderLeftWidth: this.props.nestingLevel ? 1 : 0,
    }

    return (
        <View>
          <View style={cardContainerStyle}>
            <View style={styles.row}>

              <View style={styles.textContainer}>
                <Text style={{color: '#d24919'}}>
                  <Icon name={arrow} size={16} color="#d24919" onPress={() => this.onArrowPress()}/> {moment().from(this.props.commentData.created_utc*1000, true)}&nbsp;&bull;&nbsp;{this.props.commentData.author}&nbsp;&bull;&nbsp;{this.props.commentData.score}
                </Text>

                {commentBody}
              </View>
            </View>
          </View>
          {this.props.commentData.replies && !this.state.isCollapsed ? this.renderReplies() : null}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10
  },
  cardContainer: {
    margin: 1,
  }
});
