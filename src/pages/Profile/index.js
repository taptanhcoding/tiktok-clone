import { useParams } from 'react-router-dom';

function Profile() {
    let { nickname } = useParams();
    console.log(nickname);
    return <h2>Profile Page</h2>;
}

export default Profile;
