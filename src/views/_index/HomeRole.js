import React from 'react'
import { useSelector } from 'react-redux';
import {selectUser} from '../../features/authSlice'
import { getLang } from '../../js/lang/frontLang';
export default function HomeRole() {

        const curUser = useSelector(selectUser);

        return (
                <div className="text-center mt-5">
                        <h1>Welcom to Union City manage System </h1>
                        <h2>Your code is <span className="text-info">{curUser.code}</span></h2>
                        <h2>Your Identity is <span className="text-info">{getLang('role')[curUser.role]}</span></h2>
                </div>
        )
}
