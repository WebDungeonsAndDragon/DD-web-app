import React, { useRef, useEffect } from "react";

const AudioPlayer = ({ src }) => {
  const audioRef = useRef(null);
  useEffect(() => {
    audioRef.current.play();
  }, []);

  return <audio ref={audioRef} src={src} />;
};

export default AudioPlayer;
