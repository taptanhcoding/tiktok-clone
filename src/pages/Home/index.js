import videos from '~/assets/video';
import ItemContainer from '../components/ItemContainer';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const listVideo = [
    {
        id: 2,
        first_name: 'Đào Lê',
        last_name: 'Phương Hoa',
        full_name: 'Đào Lê Phương Hoa',
        nickname: 'hoaahanassii',
        avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/2/627394cb56d66.jpg',
        bio: '✨ 1998 ✨\nVietnam 🇻🇳\nĐỪNG LẤY VIDEO CỦA TÔI ĐI SO SÁNH NỮA. XIN HÃY TÔN TRỌNG !',
        video: videos,
        tick: true,
        followings_count: 0,
        followers_count: 0,
        likes_count: 0,
        website_url: 'https://fullstack.edu.vn/',
        facebook_url: '',
        youtube_url: '',
        twitter_url: '',
        instagram_url: '',
        created_at: '2022-05-05 16:10:05',
        updated_at: '2022-05-05 16:11:39',
    },
    {
        id: 5,
        first_name: 'CiiN',
        last_name: 'NN',
        full_name: 'CiiN NN',
        nickname: 'cciinnn',
        avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/5/62739690f19f3.jpg',
        bio: 'KOLs/Dancer - BNdanceteam\nFB: Bùi Thảo Ly (Sịn) - IG: l.ciin\n👇🏻MONEY COVER👇🏻',
        video: videos,
        tick: false,
        followings_count: 0,
        followers_count: 0,
        likes_count: 0,
        website_url: 'https://fullstack.edu.vn/',
        facebook_url: '',
        youtube_url: '',
        twitter_url: '',
        instagram_url: '',
        created_at: '2022-05-05 16:17:39',
        updated_at: '2022-05-05 16:19:13',
    },
];

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            {listVideo.map((video) => {
                return <ItemContainer key={video.id} data={video} />;
            })}
        </div>
    );
}

export default Home;
