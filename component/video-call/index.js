// import React, { useState, useCallback, useRef, useEffect } from 'react';

// export default function VideoCall() {
//   const [myStream, setMyStream] = useState(null);
//   const [error, setError] = useState(null);
//   const videoRef = useRef(null);

//   const callVideo = useCallback(async () => {
//     try {
//       console.log("calling.....");
//       const stream = await navigator.mediaDevices.getUserMedia({
//         audio: true,
//         video: true,
//       });
//       setMyStream(stream);
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }
//       setError(null); // Reset error on success
//     } catch (e) {
//       console.error(e);
//       if (e instanceof DOMException) {
//         switch (e.name) {
//           case 'NotFoundError':
//             setError("Requested device not found. Please ensure your camera and microphone are connected.");
//             break;
//           case 'NotAllowedError':
//             setError("Permission to access device was denied. Please allow access to your camera and microphone.");
//             break;
//           case 'NotReadableError':
//             setError("Device is not readable. It may be in use by another application.");
//             break;
//           default:
//             setError("An unknown error occurred. Please try again.");
//             break;
//         }
//       } else {
//         setError("An error occurred while accessing your devices.");
//       }
//     }
//   }, []);

//   useEffect(() => {
//     if (videoRef.current && myStream) {
//       videoRef.current.srcObject = myStream;
//     }
//   }, [myStream]);

//   return (
//     <>
//       <button onClick={callVideo}>CALL</button>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {myStream && (
//         <video
//           ref={videoRef}
//           width="300px"
//           height="200px"
//           autoPlay
//           muted
//         />
//       )}
//     </>
//   );
// }

// =====================================================================================
// import React, { useState, useCallback, useRef, useEffect } from 'react';

// export default function VideoCall() {
//   const [myStream, setMyStream] = useState(null);
//   const [error, setError] = useState(null);
//   const [isAudioEnabled, setIsAudioEnabled] = useState(true);
//   const [isVideoEnabled, setIsVideoEnabled] = useState(true);
//   const [audioLevel, setAudioLevel] = useState(0);
//   const videoRef = useRef(null);
//   const audioRef = useRef({ analyser: null, dataArray: null, audioContext: null });

//   const callVideo = useCallback(async () => {
//     try {
//       console.log("calling.....");
//       const stream = await navigator.mediaDevices.getUserMedia({
//         audio: isAudioEnabled,
//         video: isVideoEnabled,
//       });
//       setMyStream(stream);
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }
//       setError(null); // Reset error on success

//       // Set up audio context for audio level detection
//       if (isAudioEnabled) {
//         const audioContext = new (window.AudioContext || window.webkitAudioContext)();
//         const analyser = audioContext.createAnalyser();
//         const source = audioContext.createMediaStreamSource(stream);
//         source.connect(analyser);
//         analyser.fftSize = 256;
//         const bufferLength = analyser.frequencyBinCount;
//         const dataArray = new Uint8Array(bufferLength);
//         audioRef.current = { analyser, dataArray, audioContext };

//         const updateAudioLevel = () => {
//           analyser.getByteFrequencyData(dataArray);
//           const level = dataArray.reduce((a, b) => a + b) / bufferLength;
//           setAudioLevel(level);
//           requestAnimationFrame(updateAudioLevel);
//         };
//         updateAudioLevel();
//       }
//     } catch (e) {
//       console.error(e);
//       if (e instanceof DOMException) {
//         switch (e.name) {
//           case 'NotFoundError':
//             setError("Requested device not found. Please ensure your camera and microphone are connected.");
//             break;
//           case 'NotAllowedError':
//             setError("Permission to access device was denied. Please allow access to your camera and microphone.");
//             break;
//           case 'NotReadableError':
//             setError("Device is not readable. It may be in use by another application.");
//             break;
//           default:
//             setError("An unknown error occurred. Please try again.");
//             break;
//         }
//       } else {
//         setError("An error occurred while accessing your devices.");
//       }
//     }
//   }, [isAudioEnabled, isVideoEnabled]);

//   useEffect(() => {
//     if (videoRef.current && myStream) {
//       videoRef.current.srcObject = myStream;
//     }
//   }, [myStream]);

//   return (
//     <>
//       <div>
//         <label>
//           <input
//             type="checkbox"
//             checked={isAudioEnabled}
//             onChange={() => setIsAudioEnabled(prev => !prev)}
//           />
//           Enable Microphone
//         </label>
//         <label>
//           <input
//             type="checkbox"
//             checked={isVideoEnabled}
//             onChange={() => setIsVideoEnabled(prev => !prev)}
//           />
//           Enable Camera
//         </label>
//       </div>
//       <button onClick={callVideo}>CALL</button>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {myStream && (
//         <div style={{ position: 'relative', width: '300px', height: '200px', margin: 'auto', marginTop: '20px' }}>
//           {isVideoEnabled ? (
//             <video
//               ref={videoRef}
//               width="100%"
//               height="100%"
//               autoPlay
//               muted={!isAudioEnabled}
//             />
//           ) : (
//             <div style={{ width: '100%', height: '100%', backgroundColor: 'black', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//               No Camera Available
//             </div>
//           )}
//           <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
//             <div
//               style={{
//                 width: '100px',
//                 height: '100px',
//                 borderRadius: '50%',
//                 backgroundColor: '#4caf50',
//                 animation: audioLevel > 0 ? 'pulse 0.5s infinite' : 'none'
//               }}
//             />
//           </div>
//           <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', width: '50%', height: '10px', backgroundColor: 'gray' }}>
//             <div
//               style={{
//                 height: '100%',
//                 width: `${audioLevel / 2}px`,
//                 backgroundColor: '#4caf50',
//                 transition: 'width 0.1s ease'
//               }}
//             />
//           </div>
//         </div>
//       )}
//       <style jsx>{`
//         @keyframes pulse {
//           0% {
//             transform: scale(1);
//           }
//           50% {
//             transform: scale(1.1);
//           }
//           100% {
//             transform: scale(1);
//           }
//         }
//       `}</style>
//     </>
//   );
// }


import React, { useState, useCallback, useRef, useEffect } from 'react';

export default function VideoCall() {
  const [myStream, setMyStream] = useState(null);
  const [error, setError] = useState(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [audioLevel, setAudioLevel] = useState(0);
  const videoRef = useRef(null);
  const audioRef = useRef({ analyser: null, dataArray: null, audioContext: null });

  const callVideo = useCallback(async () => {
    try {
      console.log("calling.....");
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: isAudioEnabled,
        video: isVideoEnabled,
      });
      setMyStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setError(null); // Reset error on success

      // Set up audio context for audio level detection
      if (isAudioEnabled) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        audioRef.current = { analyser, dataArray, audioContext };

        const updateAudioLevel = () => {
          analyser.getByteFrequencyData(dataArray);
          const level = dataArray.reduce((a, b) => a + b) / bufferLength;
          setAudioLevel(level);
          requestAnimationFrame(updateAudioLevel);
        };
        updateAudioLevel();
      }
    } catch (e) {
      console.error(e);
      if (e instanceof DOMException) {
        switch (e.name) {
          case 'NotFoundError':
            setError("Requested device not found. Please ensure your camera and microphone are connected.");
            break;
          case 'NotAllowedError':
            setError("Permission to access device was denied. Please allow access to your camera and microphone.");
            break;
          case 'NotReadableError':
            setError("Device is not readable. It may be in use by another application.");
            break;
          default:
            setError("An unknown error occurred. Please try again.");
            break;
        }
      } else {
        setError("An error occurred while accessing your devices.");
      }
    }
  }, [isAudioEnabled, isVideoEnabled]);

  useEffect(() => {
    if (videoRef.current && myStream) {
      videoRef.current.srcObject = myStream;
    }
  }, [myStream]);

  return (
    <>
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <button onClick={() => setIsAudioEnabled(prev => !prev)} style={{ marginRight: '10px' }}>
          {isAudioEnabled ? '🎤' : '🔇'}
        </button>
        <button onClick={() => setIsVideoEnabled(prev => !prev)}>
          {isVideoEnabled ? '📷' : '📵'}
        </button>
      </div>
      <button onClick={callVideo}>CALL</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {myStream && (
        <div style={{ position: 'relative', width: '300px', height: '200px', margin: 'auto', marginTop: '20px' }}>
          {isVideoEnabled ? (
            <video
              ref={videoRef}
              width="100%"
              height="100%"
              autoPlay
              muted={!isAudioEnabled}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', backgroundColor: 'black', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              No Camera Available
            </div>
          )}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <div
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                backgroundColor: '#4caf50',
                transition: 'all 0.5s ease',
                transform: `scale(${1 + audioLevel / 256})`
              }}
            />
          </div>
          <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', width: '50%', height: '10px', backgroundColor: 'gray' }}>
            <div
              style={{
                height: '100%',
                width: `${audioLevel / 2}px`,
                backgroundColor: '#4caf50',
                transition: 'width 0.1s ease'
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
