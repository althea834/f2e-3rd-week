import React from 'react';
import {Link } from 'react-router-dom'

import style from './Header.module.css'

const Header = ({ className }) => {
    className = !!className ? className : '';

    return <header className={`${style.header} ${className}`}>
        <h1><Link to="/">Hello,Bus!</Link></h1>
        <nav className={style.nav}>
            <Link to="/bus">公車動態</Link>
            <Link to="/nearby">附近站點</Link>
            <Link to="/schedule">班表查詢</Link>
            <Link to="/collection">我的收藏</Link>
        </nav>
    </header>
}

export default Header;