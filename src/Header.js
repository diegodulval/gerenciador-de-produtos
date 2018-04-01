import React from 'react'
import { Link } from 'react-router-dom'

import logo from './assets/logo.png'

const Header = () => {
    return (
        <nav className='navbar navbar-inverse'>
            <div className='container'>
                <div className='navbar-brand'>
                    <img src={logo} alt="logo" width="30" height="30" className="d-inline-block align-top" />
                </div>
                <div className='navbar-header'>
                    <Link to='/' className='navbar-brand'>
                        Gerenciador de Produtos
                    </Link>
                </div>
                <ul className='nav navbar-nav'>
                    <li><Link to='/produtos'>Produtos </Link></li>
                    <li><Link to='/sobre'>Sobre </Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Header