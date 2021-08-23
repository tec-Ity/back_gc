import './NavBread.css'
import { Link } from 'react-router-dom';
import confUser from '../js/conf/confUser';

export default function NavBread(props) {
        const {children, activePage} = props;
        const role = confUser.role[parseInt(localStorage.getItem('role'))].val;
        return (<>
                <nav className="bradcrumb">
                        <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to={`/${role}`}>Home</Link> </li>
                                {
                                        children === undefined
                                        ? <></>
                                        : Array.isArray(children)
                                                ?children?.map((item, index) => {
                                                        return (
                                                                <li className="breadcrumb-item" key={`breadcrumb}-${index}`}>{item} </li>
                                                        )
                                                })
                                                :  <li className="breadcrumb-item">{children} </li>
                                }
                                <li className="breadcrumb-item active" aria-current="page">{activePage}</li>
                        </ol>
                </nav>
        </> )
}
