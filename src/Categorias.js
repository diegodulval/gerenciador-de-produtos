import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Categorias extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: null
    }

    this.loadData = this.loadData.bind(this)
    this.renderProduto = this.renderProduto.bind(this)
  }

  loadData(id) {
    this.setState({ id })
    this.props.readCategoria(id)
    this.props.loadProdutos(id)
  }

  componentDidMount() {
    const id = this.props.match.params.catId
    this.loadData(id)
  }

  componentWillReceiveProps(newProps) {
    if (newProps.match.params.catId !== this.state.id) {
      this.loadData(newProps.match.params.catId)
    }
  }

  renderProduto(prod) {
    return (
      <p key={prod.id} className='well'>
        {prod.nome}
        <button onClick={() => {
          this.props.removeProduto(prod)
            .then((res) => this.loadData(this.props.match.params.catId))
        }} >Exluir</button>
        <Link to={'/produtos/editar/' + prod.id} >Editar</Link>
      </p>
    )
  }

  render() {
    return (
      <div>
        <h1>{this.props.categoria.nome}</h1>
        {this.props.produtos.length === 0 &&
          <p className='alert alert-info'> Nenhum produto cadastrado </p>
        }
        {this.props.produtos.map(this.renderProduto)}
      </div>
    )
  }
}

export default Categorias
