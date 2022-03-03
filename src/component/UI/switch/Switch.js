import React from "react";

import style from './Switch.module.css';

const Switch = ({ onClick }) => {

    return <div className={`${style.searchMode}`}>
        僅提供無障礙車輛之路線
        <label class={`${style.switch}`} onClick={onClick}>
            <input type="checkbox" />
            <span class={`${style.slider}`}></span>
        </label>
    </div>
}

export default Switch;