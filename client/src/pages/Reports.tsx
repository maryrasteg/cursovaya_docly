import React from 'react';
import s from "./Page.module.css";
import ReportCard from "../components/ReportCard/ReportCard";
import {ReactComponent as ReceptionsIcon} from "../components/ReportCard/assets/document.svg"
import {ReactComponent as GrowIcon} from "../components/ReportCard/assets/grow.svg"
import {ReactComponent as ClientsIcon} from "../components/ReportCard/assets/clients.svg"
import {ReactComponent as TargetIcon} from "../components/ReportCard/assets/target.svg"
import {ReactComponent as EffectivityIcon} from "../components/ReportCard/assets/effectivity.svg"
import {ReactComponent as MetricsIcon} from "../components/ReportCard/assets/metrics.svg"
import {motion} from "framer-motion";

const Reports = () => {
    return (
        <motion.div
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.3 }}
            transition={{ duration: 0.4}}
            className={s.page_wrapper}
        >
           <div className={s.report_card_wrapper}>
               <ReportCard active={true} action={"subboost"} name={'Приемы за месяц'} icon={<ReceptionsIcon />}/>
               <ReportCard active={false} action={"subboost"} name={'Динамика приыбыли'} icon={<GrowIcon />}/>
               <ReportCard active={false} action={"subboost"} name={'Динамика клиентов'} icon={<ClientsIcon />}/>
               <ReportCard active={false} action={"subboost"} name={'Целевая аудитория'} icon={<TargetIcon />}/>
               <ReportCard active={false} action={"subboost"} name={'Статистика врачей'} icon={<MetricsIcon />}/>
               <ReportCard active={false} action={"subboost"} name={'Эффективность рекламы'} icon={<EffectivityIcon />}/>

           </div>
        </motion.div>
    )
}

export default Reports;