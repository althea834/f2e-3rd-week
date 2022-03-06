import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'

import style from './Header.module.css'
import { ReactComponent as Menu } from '../../img/icon/menu.svg'
import { ReactComponent as Cross } from "../../img/icon/cross.svg";

const Header = ({ className, children, pathName }) => {
    const [mbNavOpen, setMbNavOpen] = useState(false);
    const navRef = useRef();
    const busLinkRef = useRef();
    const nearbyLinkRef = useRef();
    const scheduleLinkRef = useRef();
    const collectionLinkRef = useRef();

    className = !!className ? className : '';

    const mbNavHandler = () => {
        const nav = navRef.current;
        nav.classList.toggle(style.openNav)
        setMbNavOpen(state => !state)
    }

    useEffect(() => {
        const busLink = busLinkRef.current
        const nearbyLink = nearbyLinkRef.current
        const scheduleLink = scheduleLinkRef.current
        const collectionLink = collectionLinkRef.current

        if (busLink.getAttribute('href') === pathName) busLink.classList.add(style.activeLink)
        if (nearbyLink.getAttribute('href') === pathName) nearbyLink.classList.add(style.activeLink)
        if (scheduleLink.getAttribute('href') === pathName) scheduleLink.classList.add(style.activeLink)
        if (collectionLink.getAttribute('href') === pathName) collectionLink.classList.add(style.activeLink)

        return () => {
            busLink.classList.remove(style.activeLink)
            nearbyLink.classList.remove(style.activeLink)
            scheduleLink.classList.remove(style.activeLink)
            collectionLink.classList.remove(style.activeLink)
        }
    }, [pathName])
    
    return <section>
        <header className={`${style.header} ${className}`}>
            <h1><Link to="/">Hello,Bus!</Link></h1>
            <button className={`pcHidden ${style.navSwitcherBtn}`} onClick={mbNavHandler}>
                {mbNavOpen ? <Cross /> : <Menu />}
            </button>
            <nav ref={navRef} className={`${style.nav}`}>
                <Link ref={busLinkRef} to="/bus">公車動態</Link>
                <Link ref={nearbyLinkRef} to="/nearby">附近站點</Link>
                <Link ref={scheduleLinkRef} to="/schedule">班表查詢</Link>
                <Link ref={collectionLinkRef} to="/collection">我的收藏</Link>
            </nav>
        </header>
        {children}
    </section>

}

export default Header;