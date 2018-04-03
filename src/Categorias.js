import React, { Component } from 'react'

import Produto from './Produto'

class Categorias extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: null
    }

    this.loadData = this.loadData.bind(this)
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

  render() {
    return (
      <div>
        <h3>{this.props.categoria.nome}</h3>
        <hr />
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

    )
  }
}

export default Categorias
