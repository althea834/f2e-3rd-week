import React, { Fragment } from 'react';
// 公車搜尋結果
import Header from '../../component/header/Header';
import Breadcrumbs from '../../component/UI/breadcrumbs/Breadcrumbs';

import style from './RoadInfo.module.css';

const RoadInfo = (props) => {
    return <Fragment>
        <Header className="lightColor" />
        <section className={`lightColor`}>
            <Breadcrumbs />
        </section>
        <section className={`${style.container} ${style.content}`}>

        </section>
    </Fragment>
}

export default RoadInfo
