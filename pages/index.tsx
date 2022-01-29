import type { NextPage } from "next";
import { useState, useEffect } from "react";
import styled from "../styles/Audiorecorder.module.css";
import useRecorder from "./hooks/useRecorder";

const AudioRecorder = () => {
  let {audioURL, isRecording, startRecording, stopRecording, blob} =
    useRecorder();

  useEffect(() => {
    console.log(blob);

    if (blob) {
      var formData = new FormData();
      // downloadBlob(audioURL);
      formData.append("booze", blob, "booze.ogg");
      fetch("/speech", {
        body: formData,
        method: "POST",
        mode: "no-cors",
      })
        .then((response) => response)
        .then((data) => console.log(data));
    }
  }, [audioURL, blob]);

  return (
    <div className={styled.recordControls}>
      <audio src={audioURL} controls />
      <div className={styled.controlButtons}>
        <button onClick={startRecording} disabled={isRecording}>
          start recording
        </button>
        <button onClick={stopRecording} disabled={!isRecording}>
          stop recording
        </button>
      </div>
    </div>
  );
};

const AudioTranscript = () => {
  const [transcriptsText, setTranscriptsText] = useState<string[]>([]);
  return (
    <div>
      {transcriptsText.map((text: string, i) => (
        <p key={i}>{text}</p>
      ))}
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <div className={styled.container}>
      <AudioRecorder />
      <AudioTranscript />
    </div>
  );
};

export default Home;
