import type { NextPage } from "next";
import { useState, useEffect } from "react";
import styled from "../styles/Audiorecorder.module.scss";
import useRecorder from "../hooks/useRecorder";
import Layout from "../components/Layout";
import { Button, Row, Alert, List, Avatar, Col, Space } from "antd";
import { observer } from "mobx-react";

type Message = { text: string; date: string };
type AudioRecorderProps = {
  setTranscriptsText: (_: Message[]) => void;
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

const AudioRecorder = observer((props: AudioRecorderProps) => {
  let {
    isRecording,
    startRecording,
    stopRecording,
    blob,
    microphonePermissons,
  } = useRecorder();

  useEffect(() => {
    if (blob) {
      var formData = new FormData();
      // downloadBlob(audioURL);
      formData.append("booze", blob, "booze.ogg");
      fetch("/speech", {
        body: formData,
        method: "POST",
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.result) {
            return;
          }
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
      <List
        // header={<div>Header</div>}
        // footer={<div>Footer</div>}
        // itemLayout="horizontal"
        bordered
        dataSource={transcriptsText}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={<a href="https://ant.design">{item.date}</a>}
              description={item.text}
            />
          </List.Item>
        )}
      />
    );
  };

  return (
    <div className={styled.recordControls}>
      {microphonePermissons === "denied" && (
        <Alert
          key="denied"
          type="warning"
          message={`Вы отключили разрешение микрофона, запись не ведётся. ${(
            <a href="https://support.google.com/chrome/answer/2693767?hl=ru&co=GENIE.Platform%3DDesktop">
              Здесь интсрукция
            </a>
          )}`}
        />
      )}
      <Col>
        <Space direction="vertical">
          <div className={styled.controlButtons}>
            <Button
              type="primary"
              onClick={startRecording}
              disabled={isRecording}
            >
              Начать запись
            </Button>
            <Button
              type="danger"
              onClick={stopRecording}
              disabled={!isRecording}
            >
              Закончить запись
            </Button>
            {/* <TimerEl /> */}
            <Button
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
        </Space>
      </Col>
    </div>
  );
});

const Home: NextPage = () => {
  const [transcriptsText, setTranscriptsText] = useState<Message[]>([]);

  return (
    <>
      <Layout>
        <Row justify="center">
          <AudioRecorder
            setTranscriptsText={setTranscriptsText}
            transcriptsText={transcriptsText}
          />
        </Row>
      </Layout>
    </>
  );
};

export default Home;
