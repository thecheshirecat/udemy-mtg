import React, { Component } from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

class Carta extends Component {
    render() {
        const { multiverseId, name } = this.props.carta
        return (
            <div className="carta">
                <LazyLoadComponent
                    placeholder={<span className="lazyload" />}
                    threshold={100}>
                    <img
                        alt={name}
                        src={`http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${multiverseId}&type=card`} />
                </LazyLoadComponent>
            </div>
                
        );
    }
}

export default Carta;