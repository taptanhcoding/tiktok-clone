// import { useRef, useEffect } from 'react';
// import HeadLessTippy from '@tippyjs/react/headless';

// function Volume() {
//     const volumeControl = useRef();
//     const volumeBar = useRef();
//     const volumeBox = useRef();

//     useEffect(() => {
//         var elem = volumeBox.current,
//             div = volumeControl.current,
//             y = 0,
//             mousedown = false;

//         // div event mousedown
//         div.addEventListener(
//             'mousedown',
//             function (e) {
//                 // mouse state set to true
//                 mousedown = true;
//                 // subtract offset
//                 y = div.offsetTop - e.clientY;
//             },
//             true,
//         );

//         // div event mouseup
//         div.addEventListener(
//             'mouseup',
//             function (e) {
//                 // mouse state set to false
//                 mousedown = false;
//             },
//             true,
//         );

//         // element mousemove to stop
//         elem.addEventListener(
//             'mousemove',
//             function (e) {
//                 // Is mouse pressed
//                 if (mousedown) {
//                     // Now we calculate the difference upwards
//                     div.style.top = e.clientY + y + 'px';
//                 }
//             },
//             true,
//         );
//     }, [mute]);

//     // Hàm xử lý khic click lên thanh volume
//     const handleVolumeControl = (e) => {
//         var y = e.pageY;
//         let posY = 596 - y >= 48 ? 48 : 590 - y <= 0 ? 0 : 590 - y;
//         let bottom = posY == 0 ? 8 : posY;
//         volumeControl.current.style.bottom = bottom + 'px';
//         let score = posY / 48;
//         volumeBar.current.style.transform = `scaleY(${score})`;
//     };
//     return (
//         <HeadLessTippy
//             visible
//             interactive
//             placement="top"
//             render={(attrs) => (
//                 <div className={cx('volume-box')} tabIndex="-1" {...attrs}>
//                     <div className={cx('volume-change')} ref={volumeBox}>
//                         <div
//                             className={cx('volume-control')}
//                             onMouseDown={handleVolumeControl}
//                         ></div>
//                         <div ref={volumeControl} className={cx('volume-circle')}></div>
//                         <div
//                             ref={volumeBar}
//                             className={cx('volume-bar')}
//                             onMouseDown={handleVolumeControl}
//                         ></div>
//                     </div>
//                 </div>
//             )}
//         >
//             <div className={cx('volume')}>
//                 {!!mute ? (
//                     <button
//                         className={cx('volume-icon')}
//                         onClick={() => {
//                             setMute(0);
//                         }}
//                     >
//                         <VolumeIcon />
//                     </button>
//                 ) : (
//                     <button
//                         className={cx('volume-icon')}
//                         onClick={() => {
//                             setMute(lastMute.current || 1);
//                         }}
//                     >
//                         <MuteIcon />
//                     </button>
//                 )}
//             </div>
//         </HeadLessTippy>
//     );
// }

// export default Volume;
