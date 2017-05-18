import React, { Component } from 'react';
import firebase from 'firebase';
import FileUpload from './FileUpload';
//import './App.css';




class DrarekAm extends Component{
  constructor (){
    super();
    this.state = {
      user : null,
      pictures : []
    };

    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }
  componentWillMount(){
    firebase.auth().onAuthStateChanged(user=>{
      this.setState({user});
    });

    firebase.database().ref('pictures').on('child_added', snapshot=>{
      this.setState({
        pictures: this.state.pictures.concat(snapshot.val())
      });
    });

  }

  componentDidMount(){
    //document.addEventListener('click',this.handleLogout);
  }

  componentWillReciveProps(nextProps){

  }
  shouldComponentUpdate(nextProps,nextState){
    //aqui valida si el componente se debe actualizar
    return true;
  }
  componentWillUpdate(){
    console.log("El componente se va actualizar");
  }

  componentDidUpdate(){
    console.log("El componente se ha actualizado");
  }

  componentWillUnmount(){
    //aqui se pone todo lo necesari antes de eliminar el componente
  }

  handleAuth(){
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then(result => console.log(`${result.user.email} ha iniciado sesión`))
      .catch(error => console.log(`Error ${error.code} : ${error.message}`))
  }

  handleLogout(){
    firebase.auth().signOut()
      .then(result => console.log(`${result.user.email} ha salido`))
      .catch(error => console.log(`Error ${error.code} : ${error.message}`))
  }

  handleUpload(event){
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref(`/musica/${file.name}`);
    const task = storageRef.put(file);

    task.on('state_changed', snapshot=>{
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.setState({
        uploadValue : percentage
      })
    },error => {
      console.log(error.message)
    },()=>{
      const record = {
        photoURL:this.state.user.photoURL,
        displayName:this.state.user.displayName,
        image:task.snapshot.downloadURL
      };

      const dbRef = firebase.database().ref('pictures');
      const newPicture = dbRef.push();

      newPicture.set(record);
    }
    );
  }

  renderLoginButton(){
    if(this.state.user){
      return (
        <div>
          <img width='100' src={this.state.user.photoURL} alt={this.state.user.displayName}/>
          <p>Hola { this.state.user.displayName}!</p>
          <button onClick={this.handleLogout}>Salir</button>
          <FileUpload onUpLoad={this.handleUpload}/>

          {
            this.state.pictures.map(picture =>(
              <div>
                <img width='300' src={picture.image} />
                <br/>
                <img width='48' src={picture.photoURL} alt={picture.displayName} />
                <span>{picture.displayName}</span>
              </div>
            )).reverse()
          }
        </div>
      );
    }else{
      return (
        <button onClick={this.handleAuth}>Login con GOOGLE</button>
      );
    }
  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>DrarekAM</h2>
        </div>
        <div className="App-intro">
          {this.renderLoginButton()}
        </div>
      </div>
    );
  }
}

export default DrarekAm;
