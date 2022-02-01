import type { NextPage } from "next";
import { useState, useEffect } from "react";
import styled from "../styles/Audiorecorder.module.css";
import useRecorder from "../hooks/useRecorder";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Alert, ListGroup } from "react-bootstrap";
import Layout from "../components/Layout";

type Message = { text: string; date: string };
type AudioRecorderProps = {
  setTranscriptsText: (_: string[]) => void;
  transcriptsText: Message[];
};

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(
    function () {
      console.log("Async: Copying to clipboard was successful!");
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
    }
  );
};

const unixTimeToDate = (uniseconds: number) => {
  console.log(uniseconds);
  let unix_timestamp = uniseconds;
  var date = new Date(unix_timestamp * 1000);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();

  // Will display time in 10:30:23 format
  var formattedTime =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

  return formattedTime;
};

const AudioRecorder = (props: AudioRecorderProps) => {
  let {
    audioURL,
    isRecording,
    startRecording,
    stopRecording,
    blob,
    microphonePermissons,
  } = useRecorder();

  console.log(props.transcriptsText);

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
          props.setTranscriptsText([
            ...props.transcriptsText,
            { text: data.result, date: unixTimeToDate(data.date) },
          ]);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [blob]);

  const audioTranscript = (transcriptsText: Message[]) => {
    // var text = "Example text to appear on clipboard";

    return (
      <ListGroup>
        {transcriptsText.map((msg, i) => (
          <ListGroup.Item
            action
            onClick={() => {
              copyToClipboard(msg.text);
            }}
            key={i}
          >
            {msg.date}: {msg.text}
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  };

  return (
    <div className={styled.recordControls}>
      {microphonePermissons === "denied" && (
        <Alert key="denied" variant="warning">
          <div>Вы отключили разрешение микрофона, запись не ведётся.</div>
          <div>
            <Alert.Link
              target="_blank"
              href="https://support.google.com/chrome/answer/2693767?hl=ru&co=GENIE.Platform%3DDesktop"
            >
              Как включить разрешение описано здесь
            </Alert.Link>
          </div>
        </Alert>
      )}
      <div className={styled.controlButtons}>
        <Button onClick={startRecording} disabled={isRecording}>
          Начать запись
        </Button>
        <Button
          variant="secondary"
          onClick={stopRecording}
          disabled={!isRecording}
        >
          Закончить запись
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            copyToClipboard(
              props.transcriptsText.map((b) => b.text).join(", ")
            );
          }}
          // disabled={}
        >
          Скопировать весь текст
        </Button>
      </div>
      <div>
        {props.transcriptsText && audioTranscript(props.transcriptsText)}
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  const [transcriptsText, setTranscriptsText] = useState<Message[]>([]);

  return (
    <Layout>
      <Row className="justify-content-md-center">
        <div className="bg-light border">
          <AudioRecorder
            setTranscriptsText={setTranscriptsText}
            transcriptsText={transcriptsText}
          />
        </div>
      </Row>
    </Layout>
  );
};

export default Home;
