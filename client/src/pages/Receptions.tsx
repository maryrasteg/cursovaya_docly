import React from 'react';
import ReceptionsList from "../components/Receptions/ReceptionsList";
import s from "./Page.module.css";
import {motion} from "framer-motion";

const Receptions = () => {
    return (
        <motion.div
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.3 }}
            transition={{ duration: 0.4}}
            className={s.page_wrapper}
        >
            <ReceptionsList />
        </motion.div>
    )
}

export default Receptions;