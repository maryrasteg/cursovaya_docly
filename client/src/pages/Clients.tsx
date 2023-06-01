import React from 'react';
import s from './Page.module.css'
import ClientsList from "../components/Clients/ClientsList";
import { motion } from "framer-motion"

const Clients = () => {
    return (
        <motion.div
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.3 }}
            transition={{ duration: 0.4}}
            className={s.page_wrapper}
        >
            <ClientsList />
        </motion.div>
    )
}

export default Clients;