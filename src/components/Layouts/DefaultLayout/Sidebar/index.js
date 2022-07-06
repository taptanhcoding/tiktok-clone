import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <>
            <h2>Sidebar</h2>
            <Link to="/following">to Following</Link>
        </>
    );
}

export default Sidebar;
