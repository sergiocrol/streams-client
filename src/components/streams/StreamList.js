import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchStreams } from '../../actions';

class StreamList extends Component {

  state = {
    streamList: {}
  }

  componentDidMount() {
    this.props.fetchStreams();
    this.setState({
      streamList: this.props.fetchStreams()
    });
  }

  renderAdmin = stream => {
    const { currentUserId } = this.props;
    if (currentUserId && stream.userId === currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
          <Link to={`/streams/delete/${stream.id}`} className="ui button negative">
            <i className="fitted trash alternate icon"></i>
          </Link>
        </div>
      )
    }
  }

  renderList = () => {
    const { streams } = this.props;
    return streams.map(stream => {
      return (
        <div className="item" key={stream.id}>
          {this.renderAdmin(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link to={`/streams/${stream.id}`} className="header">
              {stream.title}
            </Link>
            <div className="description">
              {stream.description}
            </div>
          </div>
        </div>
      )
    })
  }

  renderCreate = () => {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link className="ui button primary" to="/streams/new">Create Stream</Link>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">
          {this.renderList()}
        </div>
        {this.renderCreate()}
      </div>
    )
  }
};

const mapStateToPros = state => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
}

export default connect(mapStateToPros, { fetchStreams })(StreamList);