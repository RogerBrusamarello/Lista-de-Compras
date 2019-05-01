import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
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
        {this.state.isAuthenticated ? <Text Sytle={styles.logonText}>Logado com Sucesso</Text> : null}
        {this.state.error && <Text Sytle={styles.logonText}>Senha ou Usuário incorreto</Text>}
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
    backgroundColor: '#A020F0', // COR FICOU PERFEITO
    padding: 20,
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
    backgroundColor: '#EE82EE',
    alignSelf: 'stretch',
    paddingHorizontal: 64,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold'
  },

  logonText: {
    color: '#FFF',
    fontWeight: 'bold'
  }
});
