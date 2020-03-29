import React, { useState, useEffect } from 'react'
import { Link , useHistory} from 'react-router-dom'
import { FiPower, FiTrash2 } from "react-icons/fi"; 

import './style.css'

import logoImage from '../../assets/logo.svg'
import api from '../../services/api';

export default function Profile(){

    const [incidents, setInsidents] = useState([])
    const history = useHistory()

    const ongName = localStorage.ongName
    const ongId = localStorage.ongId


    useEffect(() => {

        api.get('/profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {

            setInsidents(response.data)
        })

    }, [ongId])

    async function handleDeleteIncident(id){

        try{

            await api.delete(`/incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            }).then(() => {
                alert('Excluido com sucesso!')
            })

            setInsidents(incidents.filter( incident => incident.id !== id))

        }catch(err){
            alert('Erro a deletar caso, tente novamente. ')
        }

    }

    function handleLogOut(){

        localStorage.clear()
        history.push('/')

    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImage} alt="Be The Hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link to="/incidents/new"  className="button">
                    Cadastrar novo caso
                </Link>
                <button onClick={handleLogOut} type="button"><FiPower size={18} color="#e02041"/></button>
            </header>

            <h1>Casos Cadastrados</h1>
            <ul>
                {incidents.map( insident => (
                    <li key={insident.id}>

                        <strong>CASO:</strong>
                        <p>{insident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{insident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{
                            Intl.NumberFormat('pt-br', { style: 'currency', currency: "BRL"})
                            .format(insident.value)}</p>

                        <button 
                            onClick={ () => { handleDeleteIncident(insident.id)} }
                            type="button"><FiTrash2 size={20} color="#a8a8b3"/></button>
                    </li>
                ))}
            </ul>
        </div>
    )
}