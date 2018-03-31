import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class ProdutosEditar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false
        }
        this.handleEditProduto = this.handleEditProduto.bind(this)
    }

    componentDidMount() {
        this.props.readProduto(this.props.match.params.id)
            .then((res) => {
                this.setState({ produto: res.data })
                this.refs.produto.value = res.data.nome
                this.refs.categoria.value = res.data.categoria
            })
    }
    handleEditProduto() {
        const produto = {
            id: this.props.match.params.id,
            nome: this.refs.produto.value,
            categoria: this.refs.categoria.value
        }

        this.props.editProduto(produto)
            .then((res) => this.setState({ redirect: '/produtos/categorias/' + produto.categoria }))

    }
    render() {
        const { categorias } = this.props
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div>
                <h2>Editar Produto</h2>
                <select ref='categoria'>
                    {categorias.map((cat) => <option key={cat.id} value={cat.id} > {cat.nome}</option>)}
                </select>
                <input
                    ref='produto'
                    placeholder='Nome do novo'
                    className='form-control' />
                <button onClick={this.handleEditProduto} className='btn btn-success'>Salvar</button>
            </div>
        )
    }
}

export default ProdutosEditar