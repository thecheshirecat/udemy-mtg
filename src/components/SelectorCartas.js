import React, { Component } from 'react';
import Dropdown from './Dropdown';

class SelectorCartas extends Component {
    _changeEdition = (edition) => {
        this.props.updateEditionSelected(edition);
    }
    render () {
        return (
            <form>
                {/* Edición a mostrar */}
                <Dropdown
                    label={"Set to show"}
                    id={"edicion"}
                    identificadores={this.props.fullSet.idEdiciones}
                    nombres={this.props.fullSet.nombreEdiciones}
                    loading={"Loading..."}
                    disabled={this.props.fullSet.nombreEdiciones.length === 0 ? true : false}
                    dropdownChangedValue={this._changeEdition} />
            </form>
        )
    }
}

export default SelectorCartas