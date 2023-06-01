import React from 'react';
import s from "./Page.module.css";
import Users from "../components/Users/Users";
import {motion} from "framer-motion";

const Admin = () => {
    return (
        <motion.div
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.3 }}
            transition={{ duration: 0.4}}
            className={s.page_wrapper}
        >
            <Users />
        </motion.div>
    )
}

export default Admin;