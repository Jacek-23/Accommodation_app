import React from 'react';
import style from './Menu.module.css';
import useAuth from '../../../hooks/useAuth';
import { Link, NavLink } from 'react-router-dom';

function Menu() {
  const [auth, setAuth] = useAuth();

  const logout = (e) => {
    e.preventDefault();
    setAuth(false)
    //auth.logout();
  }

  return (
    <div className={`${style.menuContainer} breadcrum`}>
      <ul className={style.menu}>
        <li className={style.menuItem}>
          <NavLink exact to="/" activeClassName={`${style.menuItemActive} nav-link`} >
            Home
          </NavLink>
        </li>
        {auth ? (
            <>
              <li className={style.menuItem}>
                <NavLink to="/profil" activeClassName={`${style.menuItemActive} nav-link`} >
                  Mój profil
                </NavLink>
              </li>
              <li className={style.menuItem}>
                <a href="#" onClick={logout}>Wyloguj</a>
              </li>
            </>
          ) : (
            <>
              <li className={style.menuItem}>
                <NavLink activeClassName={`${style.menuItemActive} nav-link`} to="/rejestracja">
                  Zarejestruj
                </NavLink>
              </li>
              <li className={style.menuItem}>
                <NavLink activeClassName={`${style.menuItemActive} nav-link`} to="/zaloguj">
                  Zaloguj
                </NavLink>
              </li>
            </>
          )
        }
      </ul>
    </div>
  );
}

export default Menu;