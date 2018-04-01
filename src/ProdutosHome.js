import React, { Component } from 'react'
import Produto from './Produto'

class ProdutoHome extends Component {
    componentDidMount() {
        this.props.loadProdutos()
    }
    render() {
        return (
            <div className='row' >
                {this.props.produtos.length === 0 &&
                    <p className='alert alert-info'> Nenhum produto cadastrado </p>
                }

                {Object.keys(this.props.produtos).map((key, i) => {
                    const produto = this.props.produtos[key]
                    return [
                        <Produto key={i} produto={produto} />,
                    ]
                })}
            </div>
        )
    }
}

export default ProdutoHome
