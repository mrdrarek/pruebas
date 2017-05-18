import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PostBody from '../../posts/containers/Post';
import Loading from '../../shared/components/Loading';
import Comments from '../../comments/components/Comment';
import api from '../../api';

import styles from './page.css';


class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: {},
      post: {},
      comments: {},
    };
    this.initialFetch = this.initialFetch.bind(this);
  }

  async componentDidMount() {
    this.initialFetch();
  }
  async initialFetch() {
    const [
      post,
      comments,
    ] = await Promise.all([
      api.post.getSingle(this.props.match.params.id),
      api.post.getComments(this.props.match.params.id),
    ]);
    const user = await api.users.getSingle(post.userId);

    this.setState({
      loading: false,
      post,
      user,
      comments,
    });
  }
  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <section name="Post" className={styles.section}>
        <PostBody
          {...this.state.post}
          user={this.state.user}
          comments={this.state.comments}
        />
        <section name="Comments">
          {this.state.comments
            .map(comment => (
              <Comments key={comment.id} {...comment} />
          ))
          }
        </section>
      </section>
    );
  }
}

export default Post;
