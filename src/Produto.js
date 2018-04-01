import React, { Component } from 'react'
import { Link } from "react-router-dom"

class Produto extends Component {
  render() {
    const { produto } = this.props
    return (
      <div className='col-md-3'>
        <div className="card" >
          <img className="card-img-top img-responsive" src="https://source.unsplash.com/200x100" alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">{produto.nome}</h5>
            <p className="card-text">Some quick example text.</p>
            <Link className="btn btn-outline-primary btn-sm" to={'/produtos/editar/' + produto.id} >Editar</Link>
            <button className="btn btn-outline-danger btn-sm" onClick={() => {
              this.props.removeProduto(produto)
                .then((res) => this.loadData(produto.categoria))
            }} >Exluir</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Produto
