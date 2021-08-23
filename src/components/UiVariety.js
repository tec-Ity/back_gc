import React, {useState} from 'react'
import styleUi from '../js/conf/styleUi';

export default function UiVariety(props) {
        const [keyUi, setKeyUi] = useState(styleUi.init);
        const [activeBtns, setActiveBtns] = useState(['btn-success', 'btn-outline-success']);
        const {UiRow, UiCard, Objects} = props;
        const changeUi = ( iBtn) => {
                // 变化样式组件
                setKeyUi(styleUi.arr[iBtn]);
                // 改变按钮样式
                const btns = [];
                activeBtns.forEach((item, i) => btns.push((i === iBtn) ? "btn-success": "btn-outline-success") )
                setActiveBtns(btns)
        }
        const componentUI = () => {
                switch (keyUi) {
                        case styleUi.arr[0]:
                                return <UiRow   Objects={Objects} />                
                        case styleUi.arr[1]:
                                return <UiCard   Objects={Objects} />
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
