import type { NextPage } from "next";
import { useState, useEffect } from "react";
import styled from "../styles/Audiorecorder.module.scss";
import useRecorder from "../hooks/useRecorder";
import Layout from "../components/Layout";
import { Button, Row, Alert, List, Avatar, Col, Space } from "antd";
import { observer } from "mobx-react";
import { myTimer } from "../stores/timerStore";

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
  var date = new Date(uniseconds * 1000);
  var year = date.getFullYear();
  var month = ("0" + (date.getMonth() + 1)).substr(-2);
  var day = ("0" + date.getDate()).substr(-2);
  var hour = ("0" + date.getHours()).substr(-2);
  var minutes = ("0" + date.getMinutes()).substr(-2);
  var seconds = ("0" + date.getSeconds()).substr(-2);

  return (
    year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds
  );
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
        bordered
        dataSource={transcriptsText}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={item.date}
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
            {
              <Button
                type="primary"
                onClick={startRecording}
                disabled={isRecording}
              >
                {myTimer.timerStarted
                  ? `${myTimer.secondsPassed}/13`
                  : "Начать запись"}
              </Button>
            }
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
            >
              Скопировать всё
            </Button>
            <Button
              href={`data:text/json;charset=utf-8,${encodeURIComponent(
                JSON.stringify(props.transcriptsText)
              )}`}
              download="messages.json"
            >
              {`Лог сообщений`}
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
