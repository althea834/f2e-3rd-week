import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from 'react-router-dom'

import Footer from "../../component/footer/Footer";
import Keyboard from "../../component/keyboard/Keyboard";
import ResultImg from '../../component/resultImg/ResultImg';
import RoadList from "../../component/roadList/RoadList";

import style from "./Bus.module.css";
import { ReactComponent as Search } from "../../img/icon/search.svg";
import useFetch from "../../hook/useFetch";
import Header from "../../component/header/Header";
import Breadcrumbs from "../../component/UI/breadcrumbs/Breadcrumbs";

const cityValueTable = [
    { "Taipei": "臺北市" },
    { "NewTaipei": "新北市" },
    { "Taoyuan": "桃園市" },
    { "Taichung": "臺中市" },
    { "Tainan": "臺南市" },
    { "Kaohsiung": "高雄市" },
    { "Keelung": "基隆市" },
    { "Hsinchu": "新竹市" },
    { "HsinchuCounty": "新竹縣" },
    { "MiaoliCounty": "苗栗縣" },
    { "ChanghuaCounty": "彰化縣" },
    { "NantouCounty": "南投縣" },
    { "YunlinCounty": "雲林縣" },
    { "ChiayiCounty": "嘉義縣" },
    { "Chiayi": "嘉義市" },
    { "PingtungCounty": "屏東縣" },
    { "YilanCounty": "宜蘭縣" },
    { "HualienCounty": "花蓮縣" },
    { "TaitungCounty": "臺東縣" },
    { "KinmenCounty": "金門縣" },
    { "PenghuCounty": "澎湖縣" },
    { "LienchiangCounty": "連江縣" },
]

const Bus = (props) => {
    const [city, setCity] = useState('')
    const [road, setRoad] = useState('')
    const [roadList, setRoadList] = useState([])
    const [browserCity, setBrowserCity] = useState('')
    const { loading, fetchData } = useFetch()
    const location = useLocation();
    const pathName = location.pathname

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

    // 初始位置
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((data) => {
            const { coords } = data
            const url = `https://gist.motc.gov.tw/gist_api/V3/Map/GeoLocating/District/LocationX/${coords.longitude}/LocationY/${coords.latitude}`

            const applyLocation = (locationArray) => {
                const [location] = locationArray
                setBrowserCity(location.City)
            }

            fetchData(url, applyLocation)
        })
    }, [fetchData])

    // 搜尋路線
    useEffect(() => {
        if (!road) {
            setRoadList([])
            return
        }

        const cityURL = cityValueTable.reduce((key, cityObj) => {
            if (Object.values(cityObj)[0] === city) {
                key = Object.keys(cityObj)[0]
            }
            return key
        }, '')

        if (!city && !browserCity) {
            cityValueTable.forEach((cityObj) => {
                const [key] = Object.keys(cityObj)
                fetchData(
                    `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${key}/${road}?$select=RouteUID%2CRouteName%2CDepartureStopNameZh%2C%20DestinationStopNameZh&$top=1`
                    , (data) => {
                        if (data.length === 0) return

                        const [objData] = data
                        setRoadList(roadList => ([...roadList, objData]))
                    }
                )
            })
        }

        if (!!city || !!browserCity) {
            fetchData(
                `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${!!cityURL ? cityURL : browserCity}/${road}?$select=RouteUID%2CRouteName%2CDepartureStopNameZh%2C%20DestinationStopNameZh&$top=30`
                , (data) => {
                    if (data.length === 0) return
                    setRoadList(roadList => ([...roadList, ...data]))
                }
            )
        }

        return function resetRoadList() {
            setRoadList([])
        }

    }, [road, city, browserCity, fetchData])

    return <section className={style.frameContainer}>
        <Header className={`mainColor ${style.header}`} pathName={pathName} >
            <section className={`mainColor ${style.bottomRound}`}>
                <Breadcrumbs />
                <form className={`${style.container} ${style.searchBar}`}>
                    <span>*選擇縣市有助於您更快找到路線</span>
                    <div className={style.searching}>
                        <input list="city" placeholder="請選擇縣市或手動輸入關鍵字" onChange={searchCityHandler} />
                        <datalist id="city" >
                            {cityValueTable.map((cityObj, idx) => <option key={idx} data-value={Object.keys(cityObj)[0]} value={Object.values(cityObj)[0]}></option>)}
                        </datalist>
                        <div className={style.road}>
                            <input type="text" placeholder="請選擇路線或手動輸入關鍵字" value={road} onChange={searchRoadHandler} />
                            <button type="submit"><Search /></button>
                        </div>
                    </div>
                </form>
            </section>   
        </Header>
        <section className={`${style.container} ${style.content}`}>
            <div className={style.result}>
                <div className={`mainColor mbHidden ${style.caption} `}>搜尋結果</div>
                <div className={`${style.searchResult}`}>
                    {!road && < ResultImg state={true} />}
                    {road && roadList.length > 0 && <RoadList roadData={roadList} />}
                    {road && !loading && roadList.length === 0 && <ResultImg />}
                </div>
            </div>
            <Keyboard
                onClick={getBtnValueHandler}
                sliceEnd={sliceRoadEndHandler}
                cleanValue={cleanHandler} />
        </section>
        <Footer className={`mbHidden`} />
    </section>
}

export default Bus;