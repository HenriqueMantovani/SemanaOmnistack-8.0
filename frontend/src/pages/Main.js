import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Main.css';

import api from '../services/api';

import logo from '../assets/logo.svg';
import dislike from '../assets/dislike.svg';
import like from '../assets/like.svg';

export default function Main({ match }) {
    const [users, setUsers] = useState([]); //"users" é o valor do estado e "setUsers" é uma função para atualizar ele

    // Vai fazer uma chamada Api assim que o componente for exibido em tela
    useEffect(() => {
        // Essa função vai na Api para buscar os dados dos devs na Listagem e vai armazenar para poder mostrar em tela
        async function loadUsers() {
            const response = await api.get('/devs', {
                headers: {
                    user: match.params.id, // "match.params.id" é o Id do conta Logada
                }
            })

            setUsers(response.data); // Preenche a variável "users" com o response.data
        }

        loadUsers();
    }, [match.params.id]) // toda vez que o id mudar ( Outro usuário se logando ) vai chamar a função "loadUsers"

    // função que da um um POST da API informando que o usuário logado deu um "like" em outro usuário
    async function handleLike(id) {
        await api.post(`devs/${id}/likes`, null, {
            headers: { user: match.params.id },
        })

        // Renderiza a lista novamente sem o usuário que recebeu o dislike 
        setUsers(users.filter(user => user._id != id));
    };

    // função que da um um POST da API informando que o usuário logado deu um "dislike" em outro usuário
    async function handleDisLike(id) {
        await api.post(`devs/${id}/dislikes`, null, {
            headers: { user: match.params.id },
        })

        // Renderiza a lista novamente sem o usuário que recebeu o dislike 
        setUsers(users.filter(user => user._id != id)); // Pega todos os usuarios e realiza um filtro para pegar somentes os usuários que o Id seja diferente do que recebeu Dislike
    };

    return (
        <div className="main-container">
            <Link to="/">
            <img src={logo} alt="Tindev" />
            </Link>
            {users.length > 0 ? (
                <ul>
                    {users.map(user => ( // Percorre o Array de "users"

                        <li key={user._id}>
                            <img src={user.avatar} alt="" />
                            <footer>
                                <strong>{user.name}</strong>
                                <p>{user.bio}</p>
                            </footer>

                            <div className="buttons">
                                <button type="button" onClick={() => handleDisLike(user._id)}>
                                    <img src={dislike} alt="Dislike" />
                                </button>

                                <button type="button" onClick={() => handleLike(user._id)}>
                                    <img src={like} alt="Like" />
                                </button>
                            </div>
                        </li>

                    ))}
                </ul>
            ) : (
                <div class="empty">Acabou :(</div>
            ) }

        </div>
    )
}