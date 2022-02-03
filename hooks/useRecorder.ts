import { useEffect, useState, useRef } from "react";
import useInterval from "./useInterval";

const useRecorder = () => {
  const [audioURL, setAudioURL] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [microphonePermissons, setMicrophonePermissons] = useState<string>("");

  useEffect(() => {
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
      recorder.start();
    } else {
      recorder.stop();
    }

    // console.log(isRecording);
    // useInterval(() => {}, 3000)

    // const interval = setInterval(() => {
    //   recorder.state !== "inactive" && recorder.stop();
    //   recorder.start();
    // }, 3000); // max 15s media file

    // !isRecording && clearInterval(interval);

    // Obtain the audio when ready.
    const handleData = (e: BlobEvent) => {
      setAudioURL(URL.createObjectURL(e.data));
      setBlob(e.data);
    };

    recorder.addEventListener("dataavailable", handleData);
    return () => recorder.removeEventListener("dataavailable", handleData);
  }, [recorder, isRecording]);

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
