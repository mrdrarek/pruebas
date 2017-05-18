import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Post from '../../posts/containers/Post';
import Vivienda from '../../viviendas/containers/Vivienda';

import Loading from '../../shared/components/Loading';

import api from '../../api';

import styles from './page.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      posts: [],
      loading: true,
      viviendas: [],
    };

    this.handleScroll = this.handleScroll.bind(this);
  }
  async componentDidMount() {
    this.initialFetch();
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  async initialFetch() {
    // const posts = await api.post.getList(this.state.page);
     const viviendas = await api.viviendas.getAll(this.state.page);
    this.setState({
      // posts,
      page: this.state.page + 1,
      loading: false,
      viviendas,
    });
  }
  handleScroll() {
    if (this.state.loading) return null;
    const scrolled = window.scrollY;
    const viewportHeight = window.innerHeight;
    const fullHeight = document.documentElement.clientHeight;
    if (!(scrolled + viewportHeight + 300 >= fullHeight)) {
      return null;
    }
    return this.setState({
      loading: true,
    },
    async () => {
      try {
        // const posts = await api.post.getList(this.state.page);
        const viviendas = await api.viviendas.getAll(this.state.page);
        this.setState({
          viviendas: this.state.viviendas.concat(viviendas),
          page: this.state.page + 1,
          loading: false,
        });
      } catch (err) {
          // console.log(err);
        this.setState({ loading: false });
      }
    },
    );
  }
  render() {
    return (
      <section name="Home" className={styles.section}>
        <section className={styles.list}>
        {this.state.loading && (
          <Loading />
        )}
          {this.state.viviendas
          .map(vivienda => <Vivienda key={vivienda.Vivienda.id} {...vivienda.Vivienda} fotos={vivienda.Fichero} />)
          }
          {this.state.posts
            .map(post => <Post key={post.id} {...post} />)
          }

        </section>
        <Link to="/about"> Go To About</Link>
      </section>
    );
  }
}

export default Home;
