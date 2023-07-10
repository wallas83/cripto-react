import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useSelectMonedas } from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas'
import { Error } from './Error'


const InputSubmit = styled.input`
background-color: #9497FF;
border: none;
width: 100%;
padding: 10px;
color: #FFF;
font-weight: 700;
text-transform: uppercase;
font-size: 20px;
border-radius: 5px;
transition: background-color .3s ease;
margin-top: 30px;

&:hover{
    background-color: #7A7DFE;
    cursor: pointer;
}
`
export const Formulario = ({setMonedas}) => {
    const [cripto, setCripto] = useState([]);
    const [error, setError] = useState(false);
    const [moneda, SelectMonedas] = useSelectMonedas('Elige tu moneda', monedas);
    const [criptoMoneda, SelectCriptomonedas] = useSelectMonedas('Elige tu moneda', cripto);

    useEffect(() => {
        const consultarApi = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD";
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            const arrayCriptos = resultado.Data.map(cripto => {
                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }
                return objeto
            })
            setCripto(arrayCriptos);
        }

        consultarApi();
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        if ([moneda, criptoMoneda].includes('')) {
            
            setError(true);
            return
        }
        setError(false);
        setMonedas({
            moneda,
            criptoMoneda
        })

    }

    return (
        <>
        {error && <Error>Todos los campos obligatorios</Error>}
            <form
                onSubmit={handleSubmit}
            >
                <SelectMonedas />
                <SelectCriptomonedas />
                <InputSubmit
                    type='submit'
                    value='Cotizar'
                />
            </form>
        </>
    )
}
