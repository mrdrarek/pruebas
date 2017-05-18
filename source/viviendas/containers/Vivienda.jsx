import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import api from '../../api';

import styles from './vivienda.css';


class Vivienda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      vivienda: props.vivienda || null,
      fotos: props.fotos || null,
      domain: "http://www.urbenia.es/",
    };

  }
  async componentDidMount() {
    /* const [
      user,
      comments,
    ] = await Promise.all([
      !this.state.user ? api.users.getSingle(this.props.userId) : Promise.resolve(null),
      !this.state.comments ? api.post.getComments(this.props.id) : Promise.resolve(null),

    ]);

    this.setState({
      loading:false,
      user : user || this.state.user,
      comments : comments || this.state.comments
    })*/
  }

  render() {

    return (
      <article id={`vivienda-${this.props.id}`} className={styles.vivienda}>
        <div className={styles.vivienda_inner}>
          <div className={styles.foto}>
            {this.state.fotos[0] && (
              <img alt="foto" height="190px" src={`http://www.urbenia.es/${this.state.fotos[0].path}`} />
            )}
          </div>
        <div className={styles.vivienda_info}>
            <h2 className={styles.title}>
              <Link to={`/vivienda/${this.props.id}`}>
                {this.props.titulo_vivienda_web}
              </Link>
            </h2>
            <p className={styles.body}>
              {this.props.textopublicidad}
              {this.props.pvp_venta}
            </p>
            {!this.state.loading && (
              <div></div>
            )}
          </div>
        </div>
      </article>
    );
  }
}

Vivienda.propTyeps = {
  id:PropTypes.number,
  userId:PropTypes.number,
  title:PropTypes.string,
  body:PropTypes.string,
};


export default Vivienda;
