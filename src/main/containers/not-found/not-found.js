import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import './not-found.scss'

const { Link } = Typography;

function NotFound() {
    const navigate = useNavigate();

    return(
        <div className="main-wrap">
            <span className="not-found-wrap">
                <img src='/data-not-found.webp' className="not-found-img"/>
                Page not found please return to main page to start working here is a <Link onClick={() => navigate('/')}>link</Link>
            </span>
        </div>
    )
}

export default NotFound;