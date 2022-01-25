import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import styles from "../styles/Home.module.css";

const AudioRecorder = () => {
  const [playerUrl, setPlayerUrl] = useState("");
  const player = useRef();
  const [stopButton, setStopButton] = useState()
  // const downloadLink = document.getElementById('download');
  // const stopButton = document.getElementById('stop');

  const handleOnChange = (e: any) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    // Do something with the audio file.
    setPlayerUrl(url);
  };

  const handleSuccess = function (stream) {
    console.log(window);
    console.log(player);
    if (window.URL) {
      player.current.srcObject = stream;
    } else {
      player.current.src = stream;
    }

    const context = new AudioContext();
    const source = context.createMediaStreamSource(stream);
    const processor = context.createScriptProcessor(1024, 1, 1);

    source.connect(processor);
    processor.connect(context.destination);

    processor.onaudioprocess = function (e) {
      // Do something with the data, e.g. convert it to WAV
      console.log(e.inputBuffer);
    };

    const options = { mimeType: "audio/webm" };
    const recordedChunks = [];
    const mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.addEventListener("dataavailable", function (e) {
      if (e.data.size > 0) recordedChunks.push(e.data);
    });

    mediaRecorder.addEventListener("stop", function () {
      downloadLink.href = URL.createObjectURL(new Blob(recordedChunks));
      downloadLink.download = "acetest.wav";
    });

    stopButton.addEventListener("click", function () {
      mediaRecorder.stop();
    });

    mediaRecorder.start();
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(handleSuccess);
  }, []);

  return (
    <>
      <input type="file" accept="audio/*" capture onChange={handleOnChange} />
      <audio controls ref={player} src={playerUrl} />
      <a id="download">Download</a>
      <button ref={stopButton}>Stop</button>
    </>
  );
};

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <AudioRecorder />
    </div>
  );
};

export default Home;
