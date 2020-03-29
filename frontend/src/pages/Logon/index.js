import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from "react-icons/fi"; 

import api from '../../services/api'
import './style.css'

import herosImage from '../../assets/heroes.png'
import logoImage from '../../assets/logo.svg'

export default function Logon(){

    const [id, setID] = useState()
    const history = useHistory()

    async function handleLogin(e){

        e.preventDefault()

        try{

            const response = await api.post('sessions' , { id })

            if(response.data.name){
               localStorage.setItem('ongId', id) 
               localStorage.setItem('ongName', response.data.name) 
               history.push('/profile')
            }

        }catch(err){
            console.log(err)
            alert("Falha no login, tente novamente")
        }
    }

    return(
        <>
            <div className="logon-container">
                <section className="form">
                    <img src={logoImage} alt="Be The Hero" />
                    <form onSubmit={handleLogin}>
                        <h1>Faça logon</h1>
                        <input 
                        onChange={ e => setID(e.target.value)}
                        name="id"
                        value={id}
                        placeholder="Seu ID" />
                        <button className="button" type="submit">Entrar</button>

                        <Link to="/register" className="back-link">
                            <FiLogIn size={16} color="#e02041" />
                            Não tenho cadastro</Link>
                    </form>

                </section>
                <img  src={ herosImage }  />
            </div>
        </>

    )
}