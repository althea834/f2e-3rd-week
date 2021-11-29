import React, { Fragment, useState, useRef } from "react";
import { Link } from "react-router-dom";

import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import Keyboard from "../../component/keyboard/Keyboard";
import ResultImg from '../../component/resultImg/ResultImg';

import style from "./Bus.module.css";
import { ReactComponent as Search } from "../../img/icon/search.svg";

const Bus = (props) => {
    const [city, setCity] = useState('')
    const [road, setRoad] = useState('')
    const cityName = useRef()

    const searchCityHandler = (e) => {
        setCity(e.target.value)
    }

    const searchRoadHandler = (e) => {
        setRoad(e.target.value)
    }

    const sliceRoadEndHandler = () => {
        setRoad(state => state.slice(0, -1))
    }

    const getBtnValueHandler = (e) => {
        setRoad(state => state + e.target.value)
    }

    const cleanHandler = () => {
        setRoad('');
    }

    return <Fragment>
        <Header className="mainColor" />
        <section className={`mainColor ${style.bottomRound}`}>
            <ul className={style.breadcrumbs}>
                <li><Link to="/">首頁</Link></li>
                <li><Link to="/bus">公車動態</Link></li>
            </ul>
            <form className={`${style.container} ${style.searchBar}`}>
                <span>*選擇縣市有助於您更快找到路線</span>
                <div className={style.searching}>
                    <input list="city" placeholder="請選擇縣市或手動輸入關鍵字" value={city} onChange={searchCityHandler} />
                    <datalist id="city" ref={cityName}>
                        <option data-value="/Taipei" value="臺北市" />
                        <option data-value="/NewTaipei" value="新北市" />
                        <option data-value="/Taoyuan" value="桃園市" />
                        <option data-value="/Taichung" value="臺中市" />
                        <option data-value="/Tainan" value="臺南市" />
                        <option data-value="/Kaohsiung" value="高雄市" />
                        <option data-value="/Keelung" value="基隆市" />
                        <option data-value="/Hsinchu" value="新竹市" />
                        <option data-value="/HsinchuCounty" value="新竹縣" />
                        <option data-value="/MiaoliCounty" value="苗栗縣" />
                        <option data-value="/ChanghuaCounty" value="彰化縣" />
                        <option data-value="/NantouCounty" value="南投縣" />
                        <option data-value="/YunlinCounty" value="雲林縣" />
                        <option data-value="/ChiayiCounty" value="嘉義縣" />
                        <option data-value="/Chiayi" value="嘉義市" />
                        <option data-value="/PingtungCounty" value="屏東縣" />
                        <option data-value="/YilanCounty" value="宜蘭縣" />
                        <option data-value="/HualienCounty" value="花蓮縣" />
                        <option data-value="/TaitungCounty" value="臺東縣" />
                        <option data-value="/KinmenCounty" value="金門縣" />
                        <option data-value="/PenghuCounty" value="澎湖縣" />
                        <option data-value="/LienchiangCounty" value="連江縣" />
                    </datalist>
                    <div className={style.road}>
                        <input type="text" placeholder="請選擇路線或手動輸入關鍵字" value={road} onChange={searchRoadHandler} />
                        <button type="submit"><Search /></button>
                    </div>
                </div>
            </form>
        </section>
        <section className={`${style.container} ${style.content}`}>
            <div className={style.result}>
                <div className={`mainColor ${style.caption}`}>搜尋結果</div>
                <div className={`${style.searchResult}`}>
                    <ResultImg />
                </div>
            </div>
            <Keyboard
                onClick={getBtnValueHandler}
                sliceEnd={sliceRoadEndHandler}
                cleanValue={cleanHandler} />
        </section>
        <Footer />
    </Fragment>
}

export default Bus;