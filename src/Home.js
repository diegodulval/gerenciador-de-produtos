import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import logo from './assets/logo.png'
import Produto from './Produto'

class Home extends Component {

  componentDidMount() {
    this.props.loadProdutos()
  }

  render() {
    return [
      <div className="jumbotron bg" >
        <h1 className="display-3 text-center">
          <img src={logo} className="App-logo" alt="logo" width="200" /></h1>
        <p className="text-center">
          <Link className="btn btn-produtos btn-lg" to="/produtos" role="button">Produtos &raquo;</Link></p>

      </div>,
      <div className='container' >
         <h3>Produtos em Destaque</h3>
        <hr/>
        <div className='row' >
          {this.props.produtos.length === 0 &&
            <p className='alert alert-info'> Nenhum produto cadastrado </p>
          }

          {Object.keys(this.props.produtos).map((key, i) => {
            const produto = this.props.produtos[key]
            return [
              <Produto {...this.props} key={i} produto={produto} />,
            ]
          })}

        </div>
      </div>
    ]
  }
}

export default Home
