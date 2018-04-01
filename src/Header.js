import React from 'react'
import { Link } from 'react-router-dom'

import logo from './assets/logo.png'

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
            <div className='container'>
                <div className='navbar-brand'>
                    <img src={logo} alt="logo" width="30" height="30" className="d-inline-block align-top" />
                </div>
                <div className='navbar-header'>
                    <Link to='/' className='navbar-brand'>
                        Gerenciador de Produtos
                    </Link>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <li><Link className="nav-item nav-link active" to='/'>Home </Link></li>
                        <li><Link className="nav-item nav-link active" to='/produtos'>Produtos </Link></li>
                        <li><Link className="nav-item nav-link active" to='/sobre'>Sobre </Link></li>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header