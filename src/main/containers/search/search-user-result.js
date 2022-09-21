import { useEffect } from "react"
import UserList from "../../components/user-list/user-list"
import { Typography} from 'antd';
import Navbar from "../../../core/containers/navbar/navbar";
import './search-user-result.scss'

const {Title} = Typography;

function SearchUser () {

    useEffect(() => {

    });

    return (<div>
        <Navbar />
        <div className="search-body">
            <UserList fromSearch={true} />
        </div>

    </div>)
}

export default SearchUser