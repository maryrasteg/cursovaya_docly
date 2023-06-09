import React from 'react';
import s from "./Page.module.css";
import Client from "../components/Client/Client";
import {motion} from "framer-motion";

const ClientPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.3 }}
            transition={{ duration: 0.4}}
            className={s.page_wrapper}
        >
            <Client />
        </motion.div>
    )
}

export default ClientPage;