import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'

import { CITY_VALUE_TABLE } from "../../util/constant";
import Footer from "../../component/footer/Footer";
import Keyboard from "../../component/keyboard/Keyboard";
import ResultImg from '../../component/resultImg/ResultImg';
import RoadList from "../../component/roadList/RoadList";

import style from "./Schedule.module.css";
import { ReactComponent as Search } from "../../img/icon/search.svg";
import { ReactComponent as CloseBtn } from '../../img/icon/cross.svg';
import useFetch from "../../hook/useFetch";
import Header from "../../component/header/Header";
import Breadcrumbs from "../../component/UI/breadcrumbs/Breadcrumbs";
import Modal from "../../component/UI/modal/Modal";

const Schedule = (props) => {
    const [city, setCity] = useState('');
    const [road, setRoad] = useState('');
    const [roadList, setRoadList] = useState([]);
    const [browserCity, setBrowserCity] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [schedule, setSchedule] = useState([]);
    const { loading, fetchData } = useFetch();
    const location = useLocation();
    const pathName = location.pathname;

    const searchCityHandler = (e) => {
        const cityValue = CITY_VALUE_TABLE.reduce((key, cityObj) => {
            if (Object.values(cityObj)[0] === e.target.value) {
                key = Object.keys(cityObj)[0]
            }
            return key
        }, '')
        setCity(cityValue)
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

    const closeModalHandler = () => {
        setIsOpen(false)
    }

    const showScheduleHandler = (cityName) => {
        setCity(cityName)
        setIsOpen(true)
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
        let url = ''

        if(!!city){
            url = `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${city}/${road}?$select=RouteUID%2CRouteName%2CDepartureStopNameZh%2C%20DestinationStopNameZh&$top=30`;
        }else if(!!browserCity){
            url = `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${browserCity}/${road}?$select=RouteUID%2CRouteName%2CDepartureStopNameZh%2C%20DestinationStopNameZh&$top=30`;
        }else{
            url = `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/Taipei/${road}?$select=RouteUID%2CRouteName%2CDepartureStopNameZh%2C%20DestinationStopNameZh&$top=30`;
        }

        const applyRoad = (data) => {
            if (data.length === 0){
                setRoadList([])
            }

            setRoadList(roadList=> {
                const sameRoad = roadList.filter(road => {
                    return data.some(route => route.RouteUID === road.RouteUID) 
                })
    
                const newRoad = data.filter(route => {
                    return roadList.every(road => road.RouteUID !== route.RouteUID)
                })
                return [...sameRoad, ...newRoad]
            })
        }

        fetchData(url, applyRoad)
        
        return function resetRoadList() {
            setRoadList([])
        }

    }, [road, city, browserCity, fetchData])

    // 取得班表
    useEffect(() => {
        if (!road) return
        if (typeof city !== "string") return
        if (!isOpen) return

        fetchData(
            `https://ptx.transportdata.tw/MOTC/v2/Bus/Schedule/City/${city}/${road}?%24select=RouteName%2CSubRouteName%2CDirection%2CTimetables&%24format=JSON`
            , (data) => {
                console.log(data)
            }
        )

    }, [isOpen, city, road, fetchData])

    return <section className={style.frameContainer}>
        <Header className={`secondColor ${style.header}`} pathName={pathName} >
            <section className={`secondColor ${style.bottomRound}`}>
                <Breadcrumbs />
                <form className={`${style.container} ${style.searchBar}`}>
                    <span>*選擇縣市有助於您更快找到路線</span>
                    <div className={style.searching}>
                        <input list="city" placeholder="請選擇縣市或手動輸入關鍵字" onChange={searchCityHandler} />
                        <datalist id="city" >
                            {CITY_VALUE_TABLE.map((cityObj, idx) => <option key={idx} data-value={Object.keys(cityObj)[0]} value={Object.values(cityObj)[0]}></option>)}
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
                <div className={`secondColor mbHidden ${style.caption} `}>搜尋結果</div>
                <div className={`${style.searchResult}`}>
                    {!road && < ResultImg state={true} />}
                    {road && roadList.length > 0 &&
                        <RoadList
                            roadList={roadList}
                            onClick={showScheduleHandler}
                            link="schedule"
                        />}
                    {road && !loading && roadList.length === 0 && <ResultImg />}
                </div>
            </div>
            <Keyboard
                onClick={getBtnValueHandler}
                sliceEnd={sliceRoadEndHandler}
                cleanValue={cleanHandler} />
        </section>
        <Modal isOpen={isOpen}>
            <section className="sheet">
                <div className={`mbHidden ${style.caption}`}>
                    <button type="button" onClick={closeModalHandler}><CloseBtn /></button>
                    <h1 className="roadName">{`${road}班次表`}</h1>
                </div>
                { }
            </section>
        </Modal>
        <Footer className={`mbHidden secondColor`} />
    </section>
}

export default Schedule;