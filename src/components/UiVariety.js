import React, {useState} from 'react'
import styleUi from '../js/conf/styleUi';

export default function UiVariety(props) {
        const [keyUI, set_keyUI] = useState(styleUi.init);
        const [activeBtns, set_activeBtns] = useState(['btn-success', 'btn-outline-success']);
        const {UiRow, UiCard, Objects, role} = props;
        const changeUi = ( iBtn) => {
                // 变化样式组件
                set_keyUI(styleUi.arr[iBtn]);
                // 改变按钮样式
                const btns = [];
                activeBtns.forEach((item, i) => btns.push((i === iBtn) ? "btn-success": "btn-outline-success") )
                set_activeBtns(btns)
        }
        const componentUI = () => {
                switch (keyUI) {
                        case styleUi.arr[0]:
                                return <UiRow   Objects={Objects} role={role}/>                
                        case styleUi.arr[1]:
                                return <UiCard   Objects={Objects} role={role}/>
                        default:
                                return <div> Not exist this UI </div>
                }
        }
        return (
                <>
                        <button className={`btn  mx-3 ${activeBtns[0]}`} onClick={() => changeUi(0)}>List</button>
                        <button className={`btn  mx-3 ${activeBtns[1]}`} onClick={() => changeUi(1)}>Card</button>
                        <div className="mt-5">
                                { componentUI() }
                        </div>
                </>
        )
}
