import type { NextPage } from "next";
import { useState, useEffect } from "react";
import styled from "../styles/Audiorecorder.module.css";
import useRecorder from "./hooks/useRecorder";

const AudioRecorder = (props) => {
  let { audioURL, isRecording, startRecording, stopRecording, blob } =
    useRecorder();

  useEffect(() => {
    if (blob) {
      var formData = new FormData();
      // downloadBlob(audioURL);
      formData.append("booze", blob, "booze.ogg");
      fetch("/speech", {
        body: formData,
        method: "POST",
        mode: "no-cors",
      })
        .then((response) => response.json())
        .then((data) => {
          props.setTranscriptsText([...props.transcriptsText, data.result]);
        });
    }
  }, [blob]);

  const audioTranscript = (transcriptsText: string[]) => {
    return (
      <div>
        {transcriptsText.map((text: string, i) => (
          <p key={i}>{text}</p>
        ))}
      </div>
    );
  };

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
      <div>
        {props.transcriptsText && audioTranscript(props.transcriptsText)}
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  const [transcriptsText, setTranscriptsText] = useState<string[]>([]);

  return (
    <div className={styled.container}>
      <AudioRecorder
        setTranscriptsText={setTranscriptsText}
        transcriptsText={transcriptsText}
      />
      {/* <AudioTranscript transcriptsText={transcriptsText} /> */}
    </div>
  );
};

export default Home;
