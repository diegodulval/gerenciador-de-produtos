import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Home from './Home'
import Sobre from './Sobre'
import Produtos from './Produtos'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categorias: [],
      categoria: {},
      produtos: []
    }

    this.createProduto = this.createProduto.bind(this)
    this.loadProdutos = this.loadProdutos.bind(this)
    this.removeProduto = this.removeProduto.bind(this)
    this.readProduto = this.readProduto.bind(this)
    this.editProduto = this.editProduto.bind(this)

    this.readCategoria = this.readCategoria.bind(this)
    this.loadCategorias = this.loadCategorias.bind(this)
    this.removeCategoria = this.removeCategoria.bind(this)
    this.createCategoria = this.createCategoria.bind(this)
    this.editCategoria = this.editCategoria.bind(this)
  }

  loadCategorias() {
    this.props.api.loadCategorias().then(res => {
      this.setState({
        categorias: res.data
      })
    })
  }
  readCategoria(catId) {
    this.props.api.readCategoria(catId)
      .then(res => {
        this.setState({
          categoria: res.data
        })
      })
  }
  removeCategoria(cat) {
    this.props.api.removeCategoria(cat.id).then(res => this.loadCategorias())
  }
  createCategoria(cat) {
    this.props.api.createCategoria(cat)
      .then((res) => this.loadCategorias())
  }
  editCategoria(cat) {
    this.props.api.editCategoria(cat)
      .then((res) => this.loadCategorias())
  }

  editProduto(prod) {
    return this.props.api.editProduto(prod)
  }
  loadProdutos(catId) {
    this.props.api.loadProdutos(catId)
      .then((res) => this.setState({
        produtos: res.data
      }))

  }
  createProduto(prod) {
    return this.props.api.createProduto(prod)
  }
  removeProduto(prod) {
    return this.props.api.removeProduto(prod.id)
  }
  readProduto(prodId) {
    return this.props.api.readProduto(prodId)
  }

  render() {
    return (
      <Router>
        <div>
          <nav className='navbar navbar-inverse'>
            <div className='container'>
              <div className='navbar-header'>
                <Link to='/' className='navbar-brand'>
                  Gerenciador de Produtos
              </Link>
              </div>
              <ul className='nav navbar-nav'>
                <li><Link to='/'>Inicio </Link></li>
                <li><Link to='/produtos'>Produtos </Link></li>
                <li><Link to='/sobre'>Sobre </Link></li>
              </ul>
            </div>
          </nav>
          <div className='container'>
            <Route exact path='/' component={Home} />
            <Route path='/produtos' render={(props) => {
              return (
                <Produtos
                  {...props}
                  produtos={this.state.produtos}
                  createProduto={this.createProduto}
                  loadProdutos={this.loadProdutos}
                  removeProduto={this.removeProduto}
                  readProduto={this.readProduto}
                  editProduto={this.editProduto}
                  readCategoria={this.readCategoria}
                  loadCategorias={this.loadCategorias}
                  createCategoria={this.createCategoria}
                  removeCategoria={this.removeCategoria}
                  editCategoria={this.editCategoria}
                  categorias={this.state.categorias}
                  categoria={this.state.categoria} />
              )
            }} />

            <Route exact path='/sobre' component={Sobre} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
