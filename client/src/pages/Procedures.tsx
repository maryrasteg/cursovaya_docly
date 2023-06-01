import React from 'react';
import s from "./Page.module.css";
import {motion} from "framer-motion";
import ProceduresList from "../components/Procedures/ProceduresList";

const Reception = () => {
    return (
        <motion.div
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.3 }}
            transition={{ duration: 0.4}}
            className={s.page_wrapper}
        >
            <ProceduresList />
        </motion.div>
    )
}

export default Reception;