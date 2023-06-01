import React from 'react';
import s from "./Page.module.css";
import CurrentReception from "../components/Reception/Reception";
import {motion} from "framer-motion";

const Reception = () => {
    return (
        <motion.div
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.3 }}
            transition={{ duration: 0.4}}
            className={s.page_wrapper}
        >
            <CurrentReception />
        </motion.div>
    )
}

export default Reception;