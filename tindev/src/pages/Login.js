import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { 
View,
StyleSheet,
Image,
TextInput,
TouchableOpacity,
Text
} from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';

export default function Login({navigation}) {
    const [user, setUser] = useState('');

    // Apos logar na aplicação e o usuário ter um "F5" na Main ou sair do aplicativo e abrir dnv...
    useEffect(() => {
        AsyncStorage.getItem('user').then(user => { // Vai la no AsyncStorage e buca se o 'user' está presente 
            if(user) {                              // e navega diretamente para rota
                nagivation.navigate('Main', { user })
            }
        })
    }, []);

    // Função que navega para a pagina Main
    async function handleLogin() {
        const response = await api.post('/devs', { username: user }); // Faz a chamda a Api

        const { _id } = response.data; // pega o id do usuário na api consumida

        await AsyncStorage.setItem('user', _id);

        navigation.navigate('Main', { _id });
    }
    return (
        <View style={styles.container}>
            <Image source={logo} />

            <TextInput 
                autoCapitalize="none" // Tira a Caixa Alta
                autoCorrect={false} // Tira o corretor Automático
                placeholder="Digite seu usuário no Github"
                style={styles.input}
                value={user}
                onChangeText={setUser}
            />

            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },

    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15,
    },

    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#DF4723',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    }
});