import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

import Post from '../../posts/containers/Post.jsx';
import Loading from '../../shared/components/Loading.jsx'

import api from '../../api';
import styles from './page.css';

class Profile extends Component {
  constructor(props){
    super(props);

    this.state = {
      user:{},
      posts: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const [
      user,
      posts,
    ] = await Promise.all([
      api.users.getSingle(this.props.match.params.id),
      api.users.getPosts(this.props.match.params.id)
    ]);

    this.setState({
      user,
      posts,
      loading: false,
    });
  }
  render() {
    if(this.state.loading){
      return <Loading/>
    }
    return (
      <section name="Profile"  className={styles.section}>
        <h2>profile of {this.state.user.name}</h2>

        <fieldset className={styles.field}>
          <legend>Basic Info</legend>
          <input type="email" value={this.state.user.email} disabled />
        </fieldset>

          {this.state.user.address && (
            <fieldset className={styles.field}>
              <legend>Address</legend>
              <address>
                {this.state.user.address.street}  <br/>
                {this.state.user.address.suite}  <br/>
                {this.state.user.address.city}  <br/>
                {this.state.user.address.zipcode}  <br/>
              </address>
            </fieldset>
          )}

          <section>
            {this.state.posts
              .map(post => (
                <Post
                  key={post.id}
                  user={this.state.user}
                  {...post}
                />
              ))
            }
          </section>

      </section>
    );
  }
}

export default Profile;
