import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

import ProdutosHome from './ProdutosHome'
import Categorias from './Categorias'
import ProdutosNovo from './ProdutosNovo'
import ProdutosEditar from './ProdutosEditar'

class Produtos extends Component {

  constructor(props) {
    super(props)
    this.state = {
      editingCategoria: ''
    }
    this.handleNewCategoria = this.handleNewCategoria.bind(this)
    this.handleEditCategoria = this.handleEditCategoria.bind(this)
    this.renderCategorias = this.renderCategorias.bind(this)
    this.editCategoria = this.editCategoria.bind(this)
    this.cancelEditing = this.cancelEditing.bind(this)
  }

  componentDidMount() {
    this.props.loadCategorias()
  }

  editCategoria(cat) {
    this.setState({
      editingCategoria: cat.id
    })
  }
  cancelEditing() {
    this.setState({
      editingCategoria: ''
    })
  }

  handleEditCategoria(key) {
    if (key.keyCode === 13) {
      this.props.editCategoria({
        id: this.state.editingCategoria,
        nome: this.refs['cat-' + this.state.editingCategoria].value
      })
      this.setState({
        editingCategoria: ''
      })
    }
  }

  handleNewCategoria(key) {
    if (key.keyCode === 13) {
      this.props.createCategoria({ nome: this.refs.categoria.value })
      this.refs.categoria.value = ''
    }
  }

  renderCategorias(cat) {
    return (
      <li key={cat.id}>
        {this.state.editingCategoria === cat.id &&
          <div className='input-group'>
            <div className='input-group-btn'>
              <input onKeyUp={this.handleEditCategoria} type='text' className='form-control' defaultValue={cat.nome} ref={'cat-' + cat.id} />
              <button onClick={this.cancelEditing} className='btn'> Cancelar </button>
            </div>
          </div>
        }
        {this.state.editingCategoria !== cat.id &&
          <div>
            <button className='btn btn-outline-danger btn-sm' onClick={() => this.props.removeCategoria(cat)}>
              <span className='fa fa-remove' ></span>
            </button>
            <button className='btn btn-outline-info btn-sm' onClick={() => this.editCategoria(cat)}>
              <span className='fa fa-edit' ></span>
            </button>
            <Link to={`/produtos/categorias/${cat.id}`}> {cat.nome} </Link>
          </div>
        }
      </li>)
  }

  render() {
    const { match } = this.props
    const { categorias } = this.props
    return (
      <div>
        <div className="jumbotron bg" >  </div>
        <div className='container' >

          <div className='row'>
            <div className='col-md-3'>
              <h3>Categorias</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {this.props.categorias.length === 0 &&
                  <p className='alert alert-info'> Nenhuma categoria cadastrada </p>
                }
                {categorias.map(cat => this.renderCategorias(cat))}
              </ul>
              <div className='well well-sm'>
                <input type='text'
                  onKeyUp={this.handleNewCategoria}
                  ref='categoria'
                  className='form-control'
                  placeholder='Nova categoria' />
              </div>

            </div>
            <div className='col-md-9'>
              <div className='row'>
                <div className='col-md-9'>
                  <h1>Produtos</h1>
                </div>
                <div className='col-md-3 text-right'>
                  <Link to='/produtos/novo'>
                    <button type="button" className="btn btn-outline-info ">
                      Novo Produto
              </button>
                  </Link>
                </div>
              </div>
              <Route exact path={match.url } render={(props) => {
                return (
                  <ProdutosHome
                    {...props}
                    loadProdutos={this.props.loadProdutos}
                    produtos={this.props.produtos}
                    />
                )
              }} />
              <Route exact path={match.url + '/novo'} render={(props) => {
                return (
                  <ProdutosNovo
                    {...props}
                    categorias={categorias}
                    createProduto={this.props.createProduto} />
                )
              }} />
              <Route exact path={match.url + '/categorias/:catId'} render={(props) => {
                return (
                  <Categorias
                    {...props}
                    readCategoria={this.props.readCategoria}
                    loadProdutos={this.props.loadProdutos}
                    removeProduto={this.props.removeProduto}
                    produtos={this.props.produtos}
                    categoria={this.props.categoria} />
                )
              }} />
              <Route exact path='/produtos/editar/:id' render={(props) => {
                return (
                  <ProdutosEditar {...props}
                    readProduto={this.props.readProduto}
                    editProduto={this.props.editProduto}
                    categorias={this.props.categorias}
                    categoria={this.props.categoria}
                  />)
              }} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Produtos
