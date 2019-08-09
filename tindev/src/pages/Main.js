import React, { useEffect, useState } from 'react';
import SyncStorage from '@react-native-community/async-storage';
import {
View,
Image,
StyleSheet,
Text,
TouchableOpacity
} from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';
import AsyncStorage from '@react-native-community/async-storage';

export default function Main({  navigation }) {
    const id = navigation.getParam('user');
    const [users, setUsers] = useState([]); //"users" é o valor do estado e "setUsers" é uma função para atualizar ele

    // Vai fazer uma chamada Api assim que o componente for exibido em tela
    useEffect(() => {
        // Essa função vai na Api para buscar os dados dos devs na Listagem e vai armazenar para poder mostrar em tela
        async function loadUsers() {
            const response = await api.get('/devs', {
                headers: {
                    user: id, // "match.params.id" é o Id do conta Logada
                }
            })

            setUsers(response.data); // Preenche a variável "users" com o response.data
        }

        loadUsers();
    }, [id]) // toda vez que o id mudar ( Outro usuário se logando ) vai chamar a função "loadUsers"

    // função que da um um POST da API informando que o usuário logado deu um "like" em outro usuário
    async function handleLike() {
        const [ user, ...rest ] = users;

        await api.post(`devs/${user.id}/likes`, null, {
            headers: { user: id },
        })

        // Renderiza a lista novamente sem o usuário que recebeu o dislike 
        setUsers(rest); //Passa apenas o array de usuário restante ( Que ainda nao recebeu Like ou Dislike)
    };

    async function handleDislike() {
        const [ user, ...rest ] = users;

        await api.post(`devs/${user.id}/dislikes`, null, {
            headers: { user: id },
        })

        // Renderiza a lista novamente sem o usuário que recebeu o dislike 
        setUsers(rest); //Passa apenas o array de usuário restante ( Que ainda nao recebeu Like ou Dislike)
    };

    async function handleLogout() {
        await AsyncStorage.clear();

        navigation.navigate('Login');
    }

    return (
    <View style={styles.container}>
        <TouchableOpacity onPress={handleLogout}>
            <Image style={styles.logo} source={logo} />
        </TouchableOpacity>
    

    <View style={styles.cardsContainer}>
        { users.length == 0 ? <Text style={styles.empty}>Acabou :(</Text> 
        : (
            users.map((user, index) => (
          
                <View key={user._id} style={[styles.card, { zIndex: users.length - index }]} >     {/* o zIndex estabelece qual card vai aparecer primerio, sendo o maior número o primerio */}  
                    <Image style={styles.avatar} source={{ uri: user.avatar}} />
                    <View style={styles.footer}>
                        <Text style={styles.name}>{user.name}</Text>
                        <Text style={styles.bio} numberOfLines={3}>{user.bio}</Text>
                    </View>
                </View>
                ))
        )}
    </View>

    <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleDislike}>
            <Image source={dislike}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLike}>
            <Image source={like}/>
        </TouchableOpacity>
    </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    logo: {
        marginTop: 30,
    },

    empty: {
        alignSelf: 'center',
        color: '#999',
        fontSize: 24,
        fontWeight: 'bold'
    },

    cardsContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        maxHeight: 500,
    },

    card: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        margin: 30,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

    avatar: {
        flex: 1,
        height: 300,
    },

    footer: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },

    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },

    bio: {
        fontSize: 14,
        color: '#999',
        marginTop: 2,
        lineHeight: 20
    },

    buttonsContainer: {
        flexDirection: 'row',
        marginBottom: 30,
    },

    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        elevation: 2,
    },


});