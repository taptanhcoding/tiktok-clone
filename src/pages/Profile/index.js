import { useParams } from 'react-router-dom';

function Profile() {
    let { nickname } = useParams();
    return <h2>Profile Page : {nickname}</h2>;
}

export default Profile;
