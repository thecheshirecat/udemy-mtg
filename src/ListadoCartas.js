import React, { Component } from 'react'
import Carta from './components/Carta'

class ListadoCartas extends Component {
    render () {
        return (
            this.props.cartas.map( carta => (
                <Carta key={carta.tcgplayerProductId} carta={carta} />
            ))
        )
    }
}

export default ListadoCartas