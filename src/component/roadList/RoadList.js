import React from 'react'
import { Link } from 'react-router-dom';

import { ReactComponent as TwoWayArrow } from '../../img/icon/twoWayArrow.svg'
import Heart from '../../img/icon/heart.png'

import style from './RoadList.module.css';

const cityTable = {
    "TPE": "臺北市",
    "NWT": "新北市",
    "TAO": "桃園市",
    "TXG": "臺中市",
    "TNN": "臺南市",
    "KHH": "高雄市",
    "KEE": "基隆市",
    "HSZ": "新竹市",
    "HSQ": "新竹縣",
    "MIA": "苗栗縣",
    "CHA": "彰化縣",
    "NAN": "南投縣",
    "YUN": "雲林縣",
    "CYQ": "嘉義縣",
    "CYI": "嘉義市",
    "PIF": "屏東縣",
    "ILA": "宜蘭縣",
    "HUA": "花蓮縣",
    "TTT": "臺東縣",
    "KIN": "金門縣",
    "PEN": "澎湖縣",
    "LIE": "連江縣"
}

const NickNameTransCity = {
    "TPE":"Taipei" ,
    "NWT":"NewTaipei" ,
    "TAO":"Taoyuan" ,
    "TXG":"Taichung" ,
    "TNN":"Tainan" ,
    "KHH":"Kaohsiung" ,
    "KEE":"Keelung" ,
    "HSZ":"Hsinchu" ,
    "HSQ":"HsinchuCounty" ,
    "MIA":"MiaoliCounty" ,
    "CHA":"ChanghuaCounty" ,
    "NAN":"NantouCounty" ,
    "YUN":"YunlinCounty" ,
    "CYQ":"ChiayiCounty" ,
    "CYI":"Chiayi" ,
    "PIF":"PingtungCounty" ,
    "ILA":"YilanCounty" ,
    "HUA":"HualienCounty" ,
    "TTT":"TaitungCounty" ,
    "KIN":"KinmenCounty" ,
    "PEN":"PenghuCounty" ,
    "LIE":"LienchiangCounty"
}

const RoadList = (props) => {
    const { roadList, onClick=()=>{}, link, searchRoad=""} = props;

    const List = roadList.map((data) => {
        const cityCode = data.RouteUID.slice(0, 3);
        const cityName = cityTable[cityCode];
        const cityFetchValue = NickNameTransCity[cityCode];
        const linkParams = link === 'bus' ? `/${link}/${cityFetchValue}/${data.RouteUID}`:`/${link}`;

        return <li key={data.RouteUID}>
            <Link
                to={{
                    pathname:linkParams,
                    state:{
                        road:data.RouteName.Zh_tw,
                        start:data.DepartureStopNameZh,
                        end:data.DestinationStopNameZh,
                        city:cityFetchValue,
                        searchRoad:searchRoad
                    }
                }}
            >
                <button className={`${style.leftSide}`} onClick={() => onClick(cityFetchValue, data.RouteName.Zh_tw, data.RouteUID)}>
                    <h1>{data.RouteName.Zh_tw}</h1>
                    <span>
                        {data.DepartureStopNameZh}
                        <TwoWayArrow />
                        {data.DestinationStopNameZh}
                    </span>
                </button>
                <div className={`${style.rightSide}`}>
                    <button>
                        <img src={Heart} alt="加入我的收藏" />
                    </button>
                    {cityName}
                </div>
            </Link>
        </li>

    })

    return (
        <div className={`${style.scrollBar}`}>
            <ul className={`${style.list}`}>
                {List}
            </ul>
        </div>
    )
}
export default RoadList;
