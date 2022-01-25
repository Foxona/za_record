import type { NextPage } from "next";
import { useState, useRef, useEffect } from "react";
import styled from "../styles/Audiorecorder.module.css";
import useRecorder from "./hooks/useRecorder";

const AudioRecorder = () => {
  let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();
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
  const [transcriptsText, setTranscriptsText] = useState<string[]>([
    "Привет",
    "Как дела я тут нормально",
    "Ага проверка сообщений",
  ]);
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
