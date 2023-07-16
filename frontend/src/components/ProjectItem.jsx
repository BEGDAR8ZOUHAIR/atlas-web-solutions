import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteProject, updateProject } from "../features/projects/projectSlice";

function ProjectItem({ project })
{
  const [id, setId] = useState(project._id);
  const [text, setText] = useState(project.text);
  const [layers, setLayers] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const timelineRef = React.useRef(null);
  const dispatch = useDispatch();

  const handleAddLayer = () =>
  {
    const newLayer = {
      name: `Layer ${layers.length + 1}`,
      duration: 5,
    };
    setLayers([...layers, newLayer]);
  };

  const handleResizeIconDrag = (event) =>
  {
    const newX = event.clientX;
    const layerIndex = event.target.dataset.layerIndex;
    const newLayers = [...layers];
    newLayers[layerIndex].duration = newX / 20;
    setLayers(newLayers);
  };

  const handleZoomIn = () =>
  {
    const newLayers = [...layers];
    newLayers.forEach((layer) => (layer.duration *= 2));
    setLayers(newLayers);

    setCurrentTime(currentTime * 2);

    const timelineRect = timelineRef.current.getBoundingClientRect();
    const newTimelineWidth = timelineRect.width * 2;
    timelineRef.current.style.width = `${newTimelineWidth}px`;

    const newTimelineLayerWidth = newTimelineWidth / layers.length;
    const timelineLayers = document.getElementsByClassName("timeline-layer");
    for (let i = 0; i < timelineLayers.length; i++)
    {
      timelineLayers[i].style.width = `${newTimelineLayerWidth}px`;
    }

    
  };

  const handleZoomOut = () =>
  {
    const newLayers = [...layers];
    newLayers.forEach((layer) => (layer.duration /= 2));
    setLayers(newLayers);

    setCurrentTime(currentTime / 2);

    const timelineRect = timelineRef.current.getBoundingClientRect();
    const newTimelineWidth = timelineRect.width / 2;
    timelineRef.current.style.width = `${newTimelineWidth}px`;

    const newTimelineLayerWidth = newTimelineWidth / layers.length;
    const timelineLayers = document.getElementsByClassName("timeline-layer");
    for (let i = 0; i < timelineLayers.length; i++)
    {
      timelineLayers[i].style.width = `${newTimelineLayerWidth}px`;
    }
    
  };

  const handleMoveCurrentTime = (event) =>
  {
    const timelineRect = timelineRef.current.getBoundingClientRect();
    const currentTimePosition = event.clientX - timelineRect.left;
    setCurrentTime(currentTimePosition / 20);
  };

  const handleDeleteLayer = (layerIndex) =>
  {
    const newLayers = [...layers];
    newLayers.splice(layerIndex, 1);
    setLayers(newLayers);
  };

  const onSubmit = async (e) =>
  {
    e.preventDefault();
    dispatch(updateProject({ id, text }));
    setText("");
    const div = document.getElementById(id);
    div.style.display = "none";
  };

  return (
    <div className="project">
      <div className="title">{text}</div>
      <button onClick={handleAddLayer} className="add-layer-button">
        Add new layer
      </button>
      <div className="layer-stack">
        {layers.map((layer, index) => (
          <div key={index} className="layer">
            <span>{layer.name} - {layer.duration} sec</span>
            <div
              className="resize-icon"
              onMouseDown={handleResizeIconDrag}
              data-layerIndex={index}
              style={{ cursor: "col-resize" }}
            ></div>
            <button onClick={() => handleDeleteLayer(index)}>Delete</button>
          </div>
        ))}
      </div>
      <div className="layer-stack-scrollbar">
        <div className="layer-stack-scrollbar-thumb"></div>
      </div>
      <button onClick={handleZoomIn} className="zoom-in-button">
        Zoom In
      </button>
      <button onClick={handleZoomOut} className="zoom-out-button">
        Zoom Out
      </button>
      <div
        className="timeline"
        ref={timelineRef}
        onMouseDown={handleMoveCurrentTime}
        style={{ width: layers.length > 0 ? layers.reduce((total, layer) => total + layer.duration, 0) * 20 : "100%" }}
      >
        {layers.map((layer, index) => (
          <div key={index} className="timeline-layer" style={{ width: layer.duration * 20 }}>
            {layer.name}
          </div>
        ))}
        <div className="current-time" style={{ left: currentTime * 20 }}></div>
      </div>
      
      <button onClick={() => dispatch(deleteProject(project._id))} className="close">
        X
      </button>
      <button
        onClick={() =>
        {
          setText(project.text);
          setId(project._id);
          const div = document.getElementById(project._id);
          div.style.display = "block";
        }}
        className="update"
      >
        Update
      </button>

      <div className="date">
        {new Date(project.createdAt).toLocaleString("en-US")}
      </div>
      <form
        className="update-form"
        style={{ display: "none" }}
        id={project._id}
        name={project._id}
        onSubmit={onSubmit}
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="form-control"
          placeholder="Update your project"
        />
        <button className="update-form1" type="submit-form">
          Update
        </button>
      </form>
    </div>
  );
}

export default ProjectItem;
