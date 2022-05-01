import './Header.scss';
import logo from '../../assets/images/logo/InStock-Logo.svg'
import { Link } from 'react-router-dom';

function Header({ active }) {

    return (
        <nav className='header'>
            <Link to='/warehouses' className='header__logo-holder'>
                <img className='header__logo' src={logo} alt='header__image' />
            </Link>
            <ul className={active === 'warehouses' ? 'header__lists header__lists--active' : 'header__lists header__lists--inactive'}>
                <Link to='/warehouses' className={active === 'warehouses' ? 'header__links header__links--active' : 'header__links header__links--inactive'}>
                    <li className='header__item'>Warehouses</li>
                </Link>
                <Link to='/inventory' className={active === 'warehouses' ? 'header__links header__links--inactive' : 'header__links header__links--active'}>
                    <li className='header__item'>Inventory</li>
                </Link>
            </ul>
        </nav>
    )
}

export default Header;