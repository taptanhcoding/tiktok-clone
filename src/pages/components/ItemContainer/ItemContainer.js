import {
    faPause,
    faPlay,
    faVolumeMute,
    faVolumeUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import styles from './ItemContainer.module.scss';

const cx = classNames.bind(styles);
function ItemContainer({ data }) {
    console.log(data.video);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('info')}>
                <div className={cx('name')}>
                    <span className={cx('nickname')}>{data.nickname}</span>
                    <span className={cx('fullname')}>{data.full_name}</span>
                    <Button small outline>
                        Follow
                    </Button>
                </div>
                <div className={cx('desc')}>{data.bio}</div>
                <div className={cx('music')}></div>
            </div>
            <div className={cx('media')}>
                <div className={cx('video')}>
                    <video height="484px" src={data.video.video1} controls />
                    <div className={cx('controls')}>
                        <div className={cx('p')}>
                            <div className="play">
                                <FontAwesomeIcon icon={faPlay} />
                            </div>
                            <div className="pause">
                                <FontAwesomeIcon icon={faPause} />
                            </div>
                        </div>
                        <div className="volume">
                            <input type="range" />
                            <button>
                                <FontAwesomeIcon icon={faVolumeMute} />
                            </button>
                            <button>
                                <FontAwesomeIcon icon={faVolumeUp} />
                            </button>
                        </div>
                    </div>
                </div>
                <div className={cx('action')}></div>
            </div>
        </div>
    );
}

export default ItemContainer;
