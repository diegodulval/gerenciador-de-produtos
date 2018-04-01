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
                this.refs.descricao.value = res.data.descricao
                this.refs.categoria.value = res.data.categoria
            })
    }
    handleEditProduto() {
        const produto = {
            id: this.props.match.params.id,
            nome: this.refs.produto.value,
            descricao: this.refs.descricao.value,
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
            <div className='form'>
                <h4>Editar Produto</h4>
                <div className='form-group  mt-3'>
                    <label for="categoria">Categoria</label>
                    <select className='form-control ' ref='categoria' id='categoria'>
                        {categorias.map((cat) => <option key={cat.id} value={cat.id} > {cat.nome}</option>)}
                    </select>
                </div>
                <div className="form-group mt-3">
                    <label for="produto">Nome</label>
                    <input
                        id='produto'
                        ref='produto'
                        placeholder='Nome do novo produto'
                        className='form-control' />
                </div>
                <div className="form-group mt-3">
                    <label for="descricao">Descrição</label>
                    <textarea ref='descricao' id='descricao' className="form-control" rows="3"></textarea>
                </div>
                <button onClick={this.handleEditProduto} className='btn btn-success mt-3'>Salvar</button>
            </div>
        )
    }
}

export default ProdutosEditar