import React, { Component } from 'react'

const addDropdownOptions = (identificadores, nombres, mensajeCarga) => {
    var opciones = [];
    if(nombres.length > 0) {
        for(var i = 0; i < nombres.length; i++) {
            var ultimaOpcion = opciones[opciones.length-1];
            if( ultimaOpcion !== nombres[i] ) {
                opciones.push(
                    <option value={identificadores[i]} key={identificadores[i]}>{nombres[i]}</option>
                )
            }
        }
    }
    else {
        opciones.push(<option value="null" key={0}>{mensajeCarga}</option>);
    }
    return opciones;
}

class Dropdown extends Component {
    _changeSelection = (e) => {
        var optionValue = e.target.value;
        this.props.dropdownChangedValue(optionValue)
    }
    render() {
        return (
            <div className="input">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <select 
                    id={this.props.id}
                    disabled={this.props.disabled}
                    onChange={this._changeSelection}>
                    {
                        addDropdownOptions(this.props.identificadores, this.props.nombres, this.props.loading)
                    }
                </select>
            </div>
        )
    }
}

export default Dropdown;