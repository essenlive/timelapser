import React, { useState, useEffect } from 'react';
import Sequence from './components/Sequencer.js'
import './App.css';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
const ffmpeg = createFFmpeg({ log: false });

function App() {
  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState();
  const [timelapses, setTimelapses] = useState([]);
  const [files, setFiles] = useState();

  const load = async () => {
    await ffmpeg.load();
    setReady(true);
  }
  const getFiles = async() => {
      const response = await fetch('http://localhost:3001/getFiles', { method: 'GET' })
      const files = await response.json();
      setFiles(files);
      let timelapses = Object.keys(files);
      timelapses = timelapses.map((el, i)=>({ name : el, thumbnail : files[el][0], frames : files[el]}))
      setTimelapses(timelapses.splice(0, timelapses.length - 1));
  }
  useEffect(() => {
    load();
    getFiles();
    ffmpeg.setProgress(({ ratio }) => {
        console.log('completed now is', parseFloat(ratio) * 100);
    });
  }, [])

  const createTimelapse = async (timelapseName) => {
    let frames = files[timelapseName];
    let i = 0;
    for await (let frame of frames) { i++;
        let index = String(i).padStart(3, "0");
        ffmpeg.FS('writeFile', `${index}.jpg`, await fetchFile(`/images/${timelapseName}/${frame}`));      
    }
    await ffmpeg.run( "-framerate", '1', '-i', '%03d.jpg',  '-f', 'mp4', 'output.mp4',);
    const data = ffmpeg.FS('readFile', 'output.mp4');
    const url = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
    setVideo(url)
  }


  // const listItems = timelapses.map((el, i) =>(
  //   <Sequence
  //     key={i.toString()}
  //     id={el.name}
  //     frames={el.frames}
  //     name={el.name}
  //     thumbnail={el.thumbnail}
  //   >
  //     { ready && <button onClick={()=>{createTimelapse(el.name)}}>Convert</button>}
  //   </Sequence>
  // ));

  return (
    <div className="App bg-indigo-100">

      <div className= 'timelapses container mx-auto px-4'>
        {/* {listItems} */}
        test
      </div>
      { video && <video
            controls
            loop 
            autoPlay
            width="250"
            src={video}>

        </video>}

     </div>
    );
}

export default App;