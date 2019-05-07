import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    KeyboardAvoidingView,
} from 'react-native';
import firebase from 'react-native-firebase';

export default class App extends Component {
    state = {
        email: '',
        password: '',
        password1: '',
        password2: '',
        error: false,
    };
    //Variavel de senha e login
    login = async () => {
        let { email, password1, password2 } = this.state;

        //Faz o cadastro no Banco
        try {
            //Verfica se a senha é igual nos dois Campos
            if (password1 !== password2) {
                return this.setState({ error: true })
            }
            //Verifica se os campos estão vazios
            else if (email === '' || password1 === '' || password2 === '') {
                return this.setState({ error: true })
            }
            this.setState({ error: false })
            const user = await firebase.auth().createUserWithEmailAndPassword(email, password1);
            this.props.navigation.goBack();
        } catch (err) {
            this.setState({ error: true })
        }
    }
    //Tela de Cadastro em JSX
    render() {
        return (

            <ImageBackground source={require("../../Images/back.jpg")} style={styles.container} resizeMode='cover'>
                <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                    <Text style={styles.title}>Cadastro</Text>

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
                            value={this.state.password1}
                            onChangeText={password1 => this.setState({ password1 })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Digite novamente sua senha"
                            secureTextEntry={true}
                            value={this.state.password2}
                            onChangeText={password2 => this.setState({ password2 })}
                        />

                        <View style={styles.buttons}>
                            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.goBack()}>
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>


                            <TouchableOpacity style={styles.button} onPress={this.login}>
                                <Text style={styles.buttonText}>Cadastrar</Text>
                            </TouchableOpacity>
                        </View>
                        {this.state.error &&
                            <View style={styles.logonView}>
                                <Text style={styles.logonText}>Verifique os Campos, se todos estão corretamente digitados.</Text>
                            </View>}
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>

        );
    }
}
// Estilo da Tela
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 40,
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
        paddingHorizontal: 55,
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
