import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from "react-icons/fi"; 

import api from '../../services/api'

import './style.css'

import logoImage from '../../assets/logo.svg'

export default function NewIncident(){

    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [value, setValue] = useState()

    const ongId = localStorage.ongId

    const history = useHistory()

    async function handleNewIncident(e){
        e.preventDefault()

        const data = {
            title,
            description,
            value,
        }

        try{

           await api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            })

            history.push('/profile')

        }catch(err){
            alert('Erro ao cadastrar caso, tente novamente.')
        }
    }

    return(
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImage} alt="Be The Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link to="/profile" className="back-link">
                            <FiArrowLeft size={16} color="#e02041" />
                            Voltar para Home</Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                        name="title"
                        value={title}
                        onChange={ e => setTitle(e.target.value)}
                        placeholder="Título do caso"/>
                    <textarea
                        name="description"
                        value={description}
                        onChange={ e => setDescription(e.target.value)}
                        placeholder="Descrição" />
                    <input 
                        name="value"
                        value={value}
                        onChange={ e=> setValue(e.target.value)}
                        type="number" 
                        placeholder="Valor em Reais" />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}