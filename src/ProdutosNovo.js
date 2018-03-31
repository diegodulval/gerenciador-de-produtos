import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class ProdutoNovo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false
        }
        this.handleNewProduto = this.handleNewProduto.bind(this)
    }

    handleNewProduto() {
        const produto = {
            nome: this.refs.produto.value,
            categoria: this.refs.categoria.value
        }

        this.props.createProduto(produto)
        .then((res) => this.setState({redirect: '/produtos/categorias/' + produto.categoria}))
    }

    render() {
        const { categorias } = this.props
        if(this.state.redirect){
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div>
                <h2>Novo Produto</h2>
                <select ref='categoria'>
                    {categorias.map((cat) => <option key={cat.id} value={cat.id} > {cat.nome}</option>)}
                </select>
                <input
                    ref='produto'
                    placeholder='Nome do novo produto'
                    className='form-control' />
                <button onClick={this.handleNewProduto} className='btn btn-success'>Salvar</button>
            </div>
        )
    }
}

export default ProdutoNovo