import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteProject, updateProject } from "../features/projects/projectSlice";
import randomColor from "randomcolor";
import { FaPlus, FaMinus } from "react-icons/fa";

function ProjectItem({ project })
{
  const [id, setId] = useState(project._id);
  const [text, setText] = useState(project.text);
  const [layers, setLayers] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [movingLayerIndex, setMovingLayerIndex] = useState(null);
  const timelineRef = React.useRef(null);
  const dispatch = useDispatch();

  // Function to update the current time
  useEffect(() =>
  {
    const interval = setInterval(() =>
    {
      const currentTime = Date.now() / 1000;
      setCurrentTime(currentTime);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAddLayer = () =>
  {
    const newLayer = {
      name: `Layer ${layers.length + 1}`,
      duration: 5,
      color: getRandomColor(),
    };
    setLayers([...layers, newLayer]);
  };

  const handleResizeIconDrag = (event) =>
  {
    const newX = event.clientX;
    const layerIndex = event.target.dataset.layerIndex;
    const newLayers = [...layers];
    newLayers[layerIndex].duration = newX / (20 * zoomLevel);
    setLayers(newLayers);
  };

  const handleZoomIn = () =>
  {
    const newZoomLevel = zoomLevel * 2;
    setZoomLevel(newZoomLevel);

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
    if (zoomLevel > 1)
    {
      const newZoomLevel = zoomLevel / 2;
      setZoomLevel(newZoomLevel);

      const timelineRect = timelineRef.current.getBoundingClientRect();
      const newTimelineWidth = timelineRect.width / 2;
      timelineRef.current.style.width = `${newTimelineWidth}px`;

      const newTimelineLayerWidth = newTimelineWidth / layers.length;
      const timelineLayers = document.getElementsByClassName("timeline-layer");
      for (let i = 0; i < timelineLayers.length; i++)
      {
        timelineLayers[i].style.width = `${newTimelineLayerWidth}px`;
      }
    }
  };
  const handleMoveCurrentTime = (event) =>
  {
    const timelineRect = timelineRef.current.getBoundingClientRect();
    const timelineX = timelineRect.x;
    const mouseX = event.clientX;
    const newCurrentTime = (mouseX - timelineX) / (20 * zoomLevel);
    setCurrentTime(newCurrentTime);
  };
  
  const handleDeleteLayer = (event) =>
  {
    const layerIndex = event.target.dataset.layerIndex;
    const newLayers = [...layers];
    newLayers.splice(layerIndex, 1);
    setLayers(newLayers);
  };

  const handleMoveLayer = (event) =>
  {
    if (movingLayerIndex !== null)
    {
      const layerIndex = movingLayerIndex;
      const newLayers = [...layers];
      const layer = newLayers[layerIndex];
      const timelineRect = timelineRef.current.getBoundingClientRect();
      const timelineX = timelineRect.x;
      const mouseX = event.clientX;
      const newLayerDuration = (mouseX - timelineX) / (20 * zoomLevel);
      layer.duration = newLayerDuration >= 0 ? newLayerDuration : 0;
      setLayers(newLayers);
    }
  };

  const onSubmit = async (e) =>
  {
    e.preventDefault();
    dispatch(updateProject({ id, text }));
    setText("");
    const div = document.getElementById(id);
    div.style.display = "none";
  };

  const getRandomColor = () =>
  {
    return randomColor();
  };

  return (
    <div className="project">
      <div className="date">
        {new Date(project.createdAt).toLocaleString("en-US")}
      </div>
      <div
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        {text}
      </div>
      <button onClick={handleAddLayer} className="add-layer-button">
        Add new layer
      </button>
      <button onClick={handleZoomIn} className="zoom-in-icon">
        <FaPlus />
      </button>
      <button onClick={handleZoomOut} className="zoom-out-icon">
        <FaMinus />
      </button>
      <div
        className="timeline"
        ref={timelineRef}
        onMouseDown={handleMoveCurrentTime}
        onMouseMove={handleMoveLayer}
        onMouseUp={() => setMovingLayerIndex(null)}
        style={{
          width:
            layers.length > 0
              ? layers.reduce((total, layer) => total + layer.duration, 0) *
              20 *
              zoomLevel
              : "100%",
        }}
      >
        {layers.map((layer, index) => (
          <div
            key={index}
            className="timeline-layer"
            style={{
              width: layer.duration * 20 * zoomLevel,
              background: layer.color,
            }}
            data-layer-index={index}
            onMouseDown={(event) =>
            {
              setMovingLayerIndex(index);
              handleMoveLayer(event);
            }}
          >
            {layer.name}
            <FaPlus
              className="resize-icon"
              data-layer-index={index}
              draggable={true}
              onDrag={handleResizeIconDrag}
            />
            <button
              onClick={handleDeleteLayer}
              data-layer-index={index} // Pass the index as a data attribute
            >
              Delete
            </button>
          </div>
        ))}
        <div
          className="current-time-bar"
          style={{
            left: `${currentTime * 100}%`,
          }}
        ></div>
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
        <button className="update-form1" type="submit">
          Update
        </button>
      </form>
    </div>
  );
}

export default ProjectItem;
