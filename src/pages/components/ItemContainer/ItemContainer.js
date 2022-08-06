import { faFlag } from '@fortawesome/free-regular-svg-icons';
import {
    faHeart,
    faLink,
    faMessage,
    faPause,
    faPlay,
    faShare,
    faVolumeMute,
    faVolumeUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import HeadLessTippy from '@tippyjs/react/headless';

import Button from '~/components/Button';
import {
    FbIcon,
    LinkIcon,
    MessageIcon,
    MessageListIcon,
    MusicIcon,
    MuteIcon,
    PauseIcon,
    TagIcon,
    VolumeIcon,
    WhatsAppIcon,
} from '~/components/Icons';
import Image from '~/components/image';
import styles from './ItemContainer.module.scss';
import BoxUser from '~/components/BoxUser';
import config from '~/config';
import Menu from '~/components/Popper/Menu';

const MENU_NAVS = [
    {
        icon: <TagIcon />,
        title: 'Nhúng',
        to: config.routes.home,
    },
    {
        icon: <MessageListIcon />,
        title: 'Gửi đến bạn bè',
        to: config.routes.home,
    },
    {
        icon: <FbIcon />,
        title: 'Chia sẻ với Facebook',
        to: config.routes.home,
    },
    {
        icon: <WhatsAppIcon />,
        title: 'Chia sẻ với WhatsApp',
        to: config.routes.home,
    },
    {
        icon: <LinkIcon />,
        title: 'Sao Chép Liên Kết',
        to: config.routes.home,
    },
];

const cx = classNames.bind(styles);
function ItemContainer({ data }) {
    const [isPlay, setPlay] = useState(false);
    const [isLike, setLike] = useState(false);
    const [mute, setMute] = useState(1);
    const box = useRef();
    const lastMute = useRef();
    const videoElement = useRef();
    const volumeControl = useRef();
    const volumeBar = useRef();
    const volumeBox = useRef();
    const nicknameE = useRef();
    useEffect(() => {
        window.addEventListener('scroll', () => {
            let dist = box.current.getBoundingClientRect().top;
            if (dist <= 350 && dist > -300) {
                videoElement.current.play();
                setPlay(true);
            } else {
                videoElement.current.pause();
                setPlay(false);
            }
        });
        videoElement.current.volume = mute;
        var elem = volumeBox.current,
            div = volumeControl.current,
            y = 0,
            mousedown = false;
        if (elem && div) {
            // div event mousedown
            div.addEventListener(
                'mousedown',
                function (e) {
                    // mouse state set to true
                    mousedown = true;
                    // subtract offset
                    y = div.offsetTop - e.clientY;
                },
                true,
            );

            // div event mouseup
            div.addEventListener(
                'mouseup',
                function (e) {
                    // mouse state set to false
                    mousedown = false;
                },
                true,
            );

            elem.addEventListener(
                'mouseup',
                function (e) {
                    // mouse state set to false
                    mousedown = false;
                },
                true,
            );

            // element mousemove to stop
            elem.addEventListener(
                'mousemove',
                function (e) {
                    e.preventDefault();
                    // Is mouse pressed
                    if (mousedown) {
                        // Now we calculate the difference upwards ( y + e.clientY in 5 -44 )
                        let posY =
                            e.clientY + y >= 48
                                ? 48
                                : e.clientY + y <= 0
                                ? 0
                                : e.clientY + y;
                        let top = posY == 0 ? 6 : posY;
                        div.style.top = top + 'px';
                        let score = posY / 48;
                        volumeBar.current.style.transform = `scaleY(${1 - score})`;
                        setMute(1 - score);
                        lastMute.current = 1 - score;
                    }
                },
                true,
            );
        }
    }, [mute]);

    const handleVolumeControl = (e) => {
        var y = e.clientY;
        let posY = 596 - y >= 48 ? 48 : 590 - y <= 0 ? 0 : 590 - y;
        let bottom = posY == 0 ? 8 : posY;
        volumeControl.current.style.top = 'unset';
        volumeControl.current.style.bottom = bottom + 'px';
        let score = posY / 48;
        volumeBar.current.style.transform = `scaleY(${score})`;
        setMute(score);
        lastMute.current = score;
    };

    const handleHover = () => {
        nicknameE.current.style = 'text-decoration: underline';
    };

    const handleLeave = () => {
        nicknameE.current.style = 'text-decoration: none';
    };
    return (
        <div className={cx('wrapper')} ref={box}>
            <BoxUser user={data} placement="bottom-start">
                <span
                    className={cx('avatar-wp')}
                    onMouseOver={handleHover}
                    onMouseLeave={handleLeave}
                >
                    <Image src={data.avatar} className={cx('avatar-ct')} />
                </span>
            </BoxUser>
            <span className={cx('main')}>
                <div className={cx('info')}>
                    <BoxUser
                        user={data}
                        placement="bottom-start"
                        className={cx('box-user')}
                    >
                        <div
                            className={cx('name')}
                            onMouseOver={handleHover}
                            onMouseLeave={handleLeave}
                        >
                            <span ref={nicknameE} className={cx('nickname')}>
                                {data.nickname}
                            </span>
                            <span className={cx('fullname')}>{data.full_name}</span>
                        </div>
                    </BoxUser>
                    <Button small outline className={cx('follow-btn')}>
                        Follow
                    </Button>
                    <div className={cx('desc')}>{data.bio}</div>
                    <div className={cx('music')}>
                        <Link to="/">
                            {<MusicIcon className={cx('music-icon')} />} Đào Lê Phương Hoa
                        </Link>
                    </div>
                </div>
                <div className={cx('media')}>
                    <div class={cx('media-content')}>
                        <div className={cx('video')}>
                            <video
                                ref={videoElement}
                                className={cx('video-tag')}
                                src={data.video.video4}
                                loop
                            />
                        </div>
                        <div className={cx('report')}>
                            <FontAwesomeIcon
                                icon={faFlag}
                                className={cx('report-icon')}
                            />
                            Báo cáo
                        </div>
                        <div className={cx('video-play')}>
                            {isPlay ? (
                                <div
                                    className={cx('pause')}
                                    onClick={() => {
                                        setPlay((prev) => !prev);
                                        videoElement.current.pause();
                                    }}
                                >
                                    <PauseIcon />
                                </div>
                            ) : (
                                <div
                                    className={cx('play')}
                                    onClick={() => {
                                        setPlay((prev) => !prev);
                                        videoElement.current.play();
                                    }}
                                >
                                    <FontAwesomeIcon icon={faPlay} />
                                </div>
                            )}
                        </div>
                        <HeadLessTippy
                            interactive
                            placement="top"
                            render={(attrs) => (
                                <div
                                    className={cx('volume-box')}
                                    tabIndex="-1"
                                    {...attrs}
                                >
                                    <div className={cx('volume-change')} ref={volumeBox}>
                                        <div
                                            className={cx('volume-control')}
                                            onMouseDown={handleVolumeControl}
                                        ></div>
                                        <div
                                            ref={volumeControl}
                                            className={cx('volume-circle')}
                                        ></div>
                                        <div
                                            ref={volumeBar}
                                            className={cx('volume-bar')}
                                            onMouseDown={handleVolumeControl}
                                        ></div>
                                    </div>
                                </div>
                            )}
                        >
                            <div className={cx('volume')}>
                                {!!mute ? (
                                    <button
                                        className={cx('volume-icon')}
                                        onClick={() => {
                                            setMute(0);
                                        }}
                                    >
                                        <VolumeIcon />
                                    </button>
                                ) : (
                                    <button
                                        className={cx('volume-icon')}
                                        onClick={() => {
                                            setMute(lastMute.current || 1);
                                        }}
                                    >
                                        <MuteIcon />
                                    </button>
                                )}
                            </div>
                        </HeadLessTippy>
                    </div>
                    <div className={cx('media-actions')}>
                        <button
                            className={cx('action')}
                            onClick={() => {
                                setLike((prev) => !prev);
                            }}
                        >
                            <span className={cx('action-icon', { active: isLike })}>
                                <FontAwesomeIcon
                                    className={cx('action-icon-i')}
                                    icon={faHeart}
                                />
                            </span>
                            <strong className={cx('action-title')}>26.6k</strong>
                        </button>
                        <button className={cx('action')}>
                            <span className={cx('action-icon')}>
                                <FontAwesomeIcon
                                    className={cx('action-icon-i')}
                                    icon={faMessage}
                                />
                            </span>
                            <strong className={cx('action-title')}>537</strong>
                        </button>
                        <Menu
                            items={MENU_NAVS}
                            placement="top-start"
                            positionArrow="bottom"
                        >
                            <button className={cx('action')}>
                                <span className={cx('action-icon')}>
                                    <FontAwesomeIcon
                                        className={cx('action-icon-i')}
                                        icon={faShare}
                                    />
                                </span>
                                <strong className={cx('action-title')}>1030</strong>
                            </button>
                        </Menu>
                    </div>
                </div>
            </span>
        </div>
    );
}

export default ItemContainer;
