import React, { useState, useEffect, useRef } from 'react';
import Sequencer from 'image-sequencer'

const Sequence = (props)=>{
  const [sequence, setSequence] = useState(null);
  const refCanvas = useRef(null);

  const createSequence = async (sequenceName, sequenceFrames) => {
    const sequence = Sequencer.make({
    direction: 'x',
    scaleMode: 'cover',
    showLoadedImages: false,
    playMode: 'hover',
    from : `/images/${sequenceName}/${sequenceFrames[0]}`,
    to   : `/images/${sequenceName}/${sequenceFrames[sequenceFrames.length-1]}`,
    originalHeight: 1200,
    originalWidth: 1599,
    sequenceName: sequenceName,
    imageLoad: (e)=>{console.log(props.name, "-", e.count, "/", e.total)},
    // canvas: refCanvas
    });
    setSequence(sequence);
  }

  useEffect(() => { createSequence(props.name, props.frames);}, )



  return (
    
    <div className="sequence fixed top-0 left-0 right-0 bottom-0 object-cover	">
        <h2  className="fixed top-0 left-0 font-sans p-4">{props.name}</h2>

        {/* <img  className="fixed top-0 left-0 object-cover h-screen w-screen" src={`/images/${props.name}/${props.thumbnail}`} alt={props.name}/> */}
        <canvas ref={refCanvas} className="fixed top-0 left-0 object-cover h-screen w-screen"  id={props.name} />
    </div>
    );
}

export default Sequence;