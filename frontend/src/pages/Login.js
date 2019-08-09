import React, { useState } from 'react';
import './Login.css';

import api from '../services/api';

import logo from '../assets/logo.svg';

export default function Login({ history }) {
    // Estados states
    const [username, setUsername] = useState(''); //"users" é o valor do estado e "setUsers" é uma função para atualizar ele

    // Função apenas de tese, se estamos pegando o valor digitado no input
    async function handleSubmit(e) {
        e.preventDefault(); // Vai prevenir que o From redirecione para a outra pagina

        //constante que vai pegar o Json retornado pela Api // Envia o username no corpo dessa requisição (username)
        const response = await api.post('/devs', {
            username,
        });
        
        const { _id } = response.data; // Pega o Id do Json retornado pela Api

        history.push(`/dev/${_id}`); // Vai para página Main
    }

    return (
        <div className="login-container">
            <form onSubmit={ handleSubmit }>
                <img src={logo} alt="Tindev"/>
                <input 
                    placeholder="Digite seu usuário do Github"
                    value={username} // Vai preencher essa variável automaticamnete com o valor que o ussuario digitar nesse campo ( Atraves da liinha de codigo abaixo )
                    onChange={e => setUsername(e.target.value)} // O "e.target.value" é o valor que ele digitou no input
                />
                <button typer="submit">Enviar</button>
            </form>       
        </div>
    );
}
