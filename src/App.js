import React, { Component } from 'react';
import SelectorCartas from './components/SelectorCartas';
import './App.scss';
import ListadoCartas from './ListadoCartas';

class App extends Component {
	state = {
		cartas: [],
		multiverseId: [],
		multiverseIdeleccionada: '',
		nombreEdiciones: [],
		idEdiciones: [],
		idEdicionSeleccionada: '',
		setCompleto: [],
		paginaCargada: true
	}

	componentDidMount () {
        var nombreEdiciones = ['Select a set'];
        var idEdiciones = [''];
        // Recogemos todo el set de Modern
        fetch('http://mtgjson.com/json/Standard.json')
        .then(resp => resp.json())
        .then(data => {
            Object.keys(data).map( key => {
                // Obtenemos código y nombre de las ediciones
                idEdiciones.push(key);
                nombreEdiciones.push(data[key].name);
                return null;
            });
            // Guardamos en el State el set completo de cartas, nombres y códigos de ediciones
            this.setState({
                idEdiciones,
                nombreEdiciones,
                setCompleto: data
            })
        });
	}

	_changeEditionSelected = (idEdicionSeleccionada) => {
		// Comprobamos el id de la carta no sea null o vacío
		if(idEdicionSeleccionada === "" || idEdicionSeleccionada === null) {
			return;
		}
		// Guardamos el id de la edición seleccionada y mostramos todas sus cartas (excluyendo las Foil)
		var cartasSet = this.state.setCompleto[idEdicionSeleccionada].cards
		var cartas = []
		var multiverseId = []
		var cartaMatch = false
		this.setState({
			cartas: [],
			multiverseId: []
		}, () => {
			cartasSet.map(carta => {
				// Comprobamos que no esté repetida la carta anterior
				for(var i = 0; i < cartas.length; i++) {
					if(cartas[i].name === carta.name) {
						cartaMatch = true;
					}
				}
				if( !cartaMatch ) {
					cartas.push(carta)
					multiverseId.push(carta.multiverseId)
				}
				cartaMatch = false;
				return null;
			})
			this.setState({
				idEdicionSeleccionada,
				multiverseId,
				cartas,
				paginaCargada: false
			})
		})
		
	}

	render() {
		return (
			<div className="container">
				<h1>MTG Standard cards</h1>
				<div className="column">
					<SelectorCartas fullSet={this.state} updateEditionSelected={this._changeEditionSelected}/>
				</div>
				<div className="column cartas">
					{
						this.state.paginaCargada 
						? <p>Choose a set</p>
						: <ListadoCartas cartas={this.state.cartas} />
					}
				</div>
			</div>
		);
	}
}

export default App;
