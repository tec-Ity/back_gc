import React from 'react'
import { FormattedMessage } from 'react-intl'; 
import { useSelector } from 'react-redux';
import {selectUser} from '../../features/authSlice'
import { getLang } from '../../js/lang/language';
export default function HomeRole() {

        const curUser = useSelector(selectUser);

        return (
                <div className="text-center mt-5">
                        <FormattedMessage
                        id='hello'
                        description='say hello to Howard.'
                        defaultMessage='Hello, Howard 111'
                        />
                        <h1>Welcom to Union City manage System </h1>
                        {
                                (curUser && curUser.code)
                                ?(<>
                                        <h2>Your code is <span className="text-info">{curUser.code}</span></h2>
                                        <h2>Your Identity is <span className="text-info">{getLang('role')[curUser.role]}</span></h2>
                                </>
                                )
                                :<h2>Pleace contact System Manage, Because can't find the backend server</h2>
                        }
                </div>
        )
}
