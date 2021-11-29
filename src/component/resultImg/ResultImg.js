import React from "react";

import style from './ResultImg.module.css';
import Search from '../../img/search.png';
import NotFound from '../../img/notFound.png'


const ResultImg = ({state}) => {
    let text = !!state ? '很抱歉，找不到符合的路線' : '尋找您的公車路線';

    state = !!state ? NotFound :  Search; 

    return <figure className={`${style.image}`}>
    <img  src={state} alt={text} />
    <figcaption>{text}</figcaption>
</figure>
}

export default ResultImg;