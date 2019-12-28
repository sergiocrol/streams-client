import React, { Component, Fragment} from 'react';
import Modal from '../Modal';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';
import history from '../../history';

class StreamDelete extends Component {

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = () => {
    this.props.deleteStream(this.props.match.params.id);
  }

  renderActions = () => {
    return (
      <Fragment>
        <button className="ui button negative" onClick={this.onSubmit}>Delete</button>
        <Link to="/" className="ui button">Cancel</Link>
      </Fragment>
    );
  }

  render() {
    const title = this.props.stream ? `Are you sure you want to delete the stream: ${this.props.stream.title}?` : 'Are you sure you want to delete this stream?';
    return (
      <Modal 
        title="Delete Stream" 
        subtitle={title}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
        onSubmit={this.onSubmit}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);