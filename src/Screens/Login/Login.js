import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  KeyboardAvoidingView
} from 'react-native';
import firebase from 'react-native-firebase';
//import { createStackNavigator, createAppContainer } from "react-navigation";

const { width, height } = Dimensions.get("screen");


export default class App extends Component {

  initialState = {
    email: '',
    password: '',
    error: false,
  };

  state = {
    ...this.initialState,
  };


  //Variavel de senha e login
  login = async () => {
    const { email, password } = this.state;

    //TESTA SE A SENHA TA CERTA
    try {
      //Verifica se os campos foram preenchidos
      if (email == '' || password == '') {
        return this.setState({ error: true })
      }
      this.setState({ error: false })
      const user = await firebase.auth()
        .signInWithEmailAndPassword(email, password);
      this.props.navigation.navigate('Home')
    } catch (err) {
      this.setState({ error: true })
    }
  }

  goToRegister = () => {
    this.setState({ ...this.initialState });
    this.props.navigation.navigate('Cadastro');
  }
  // TELA DE LOGIN EM JSX
  render() {
    return (

      <View style={styles.container}>
        <Image source={require("../../Images/back.jpg")} style={styles.Image} resizeMode='cover' />

        <Text style={styles.title}>Lista de Compras</Text>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />

          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={this.login}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => this.goToRegister()}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
          {this.state.error && <View style={styles.logonView}><Text style={styles.logonText}>Senha ou Usuário incorreto</Text></View>}

        </View>
      </View>

    );
  }
}
// ESTILO DA TELA
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Image: {
    width,
    height,
    top: 0,
    left: 0,
    position: 'absolute',
  },
  input: {
    height: 45,
    backgroundColor: '#FFF',
    alignSelf: 'stretch',
    borderColor: '#EEE',
    borderWidth: 1,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    height: 45,
    backgroundColor: '#CBCBCB',
    alignSelf: 'stretch',
    paddingHorizontal: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 40,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold'
  },
  logonView: {
    height: 45,
    backgroundColor: '#CBCBCB',
    alignSelf: 'stretch',
    paddingHorizontal: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 40,
  },
  logonText: {
    color: '#FFF',
    fontWeight: 'bold'
  },
  title: {
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    color: '#FFF'
  }
});