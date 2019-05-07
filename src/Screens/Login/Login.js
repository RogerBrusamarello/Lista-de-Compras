import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import firebase from 'react-native-firebase';
import { createStackNavigator, createAppContainer } from "react-navigation";


export default class App extends Component {
  state = {
    email: '',
    password: '',
    isAuthenticated: false,
    error: false,
  };

  //Variavel de senha e login
  login = async () => {
    const { email, password } = this.state;

    //TESTA SE A SENHA TA CERTA
    try {
      //Verifica se os campos foram preenchidos
      if (email === '' || password === '') {
        return this.setState({ error: true })
      }
      this.setState({ error: false })
      const user = await firebase.auth()
        .signInWithEmailAndPassword(email, password);
      this.setState({ isAuthenticated: true });
    } catch (err) {
      this.setState({ error: true })
    }
  }
  // TELA DE LOGIN EM JSX
  render() {
    return (
      <ImageBackground source={require("../../Images/back.jpg")} style={styles.container} resizeMode='cover'>
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
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

              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Cadastro')}>
                <Text style={styles.buttonText}>Cadastrar</Text>
              </TouchableOpacity>
            </View>
            {this.state.isAuthenticated ? this.props.navigation.navigate('Home') : null}
            {this.state.error && <View style={styles.logonView}><Text style={styles.logonText}>Senha ou Usuário incorreto</Text></View>}
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
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
    fontSize: 35,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    color: '#FFF'
  }
});

