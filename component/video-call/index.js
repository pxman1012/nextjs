import React, { useState, useCallback, useRef, useEffect } from 'react';

export default function VideoCall() {
  const [myStream, setMyStream] = useState(null);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  const callVideo = useCallback(async () => {
    try {
      console.log("calling.....");
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setError(null); // Reset error on success
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
  }, []);

  useEffect(() => {
    if (videoRef.current && myStream) {
      videoRef.current.srcObject = myStream;
    }
  }, [myStream]);

  return (
    <>
      <button onClick={callVideo}>CALL</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {myStream && (
        <video
          ref={videoRef}
          width="300px"
          height="200px"
          autoPlay
          muted
        />
      )}
    </>
  );
}
