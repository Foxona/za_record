import { useEffect, useState, useRef } from "react";
import { myTimer } from "../stores/timerStore";

const useRecorder = () => {
  const [audioURL, setAudioURL] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [microphonePermissons, setMicrophonePermissons] = useState<string>("");
  const [intervalId, setIntervalId] = useState<number>();
  const [timerIsOut, setTimerIsOut] = useState<boolean>(false);

  useEffect(() => {
    console.log(isRecording);
    // Lazily obtain recorder first time we're recording.
    if (recorder === null) {
      if (isRecording) {
        requestRecorder(setMicrophonePermissons).then(
          setRecorder,
          console.error
        );
      }
      return;
    }

    // Manage recorder state.
    if (isRecording) {
      myTimer.timerStarted = true;
      const interval = window.setInterval(() => {
        myTimer.increase();
      }, 1000);
      setIntervalId(interval);
      recorder.start();
    } else {
      myTimer.timerStarted = false;
      myTimer.reset();
      clearInterval(intervalId);
      recorder.stop();
    }

    // Obtain the audio when ready.
    const handleData = (e: BlobEvent) => {
      setAudioURL(URL.createObjectURL(e.data));
      setBlob(e.data);
    };

    recorder.addEventListener("dataavailable", handleData);
    return () => recorder.removeEventListener("dataavailable", handleData);
  }, [recorder, isRecording]);

  // useEffect(() => {
  if (myTimer.secondsPassed > 13) {
    recorder?.stop();
    recorder?.start();
    myTimer.reset();
  }
  // }, [myTimer]);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  return {
    audioURL,
    isRecording,
    startRecording,
    stopRecording,
    blob,
    microphonePermissons,
    recorder,
  };
};

async function requestRecorder(setMicrophonePermissons: (_: string) => void) {
  const permissionName = "microphone" as PermissionName;
  navigator.permissions
    .query({ name: permissionName })
    .then(function (permissionStatus) {
      setMicrophonePermissons(permissionStatus.state); // granted, denied, prompt

      permissionStatus.onchange = function () {
        console.log("Permission changed to " + this.state);
      };
    });

  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  return new MediaRecorder(stream, {
    mimeType: "audio/webm",
  });
}
export default useRecorder;
