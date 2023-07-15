import { useState  } from "react";
import { useDispatch } from "react-redux";
import { deleteProject } from "../features/projects/projectSlice";
import { updateProject } from "../features/projects/projectSlice";

function ProjectItem({ project }) {
  const [id, setId] = useState(project._id);
  const [text, setText] = useState(project.text);

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(text, id);
    const div = document.getElementById(project._id);
    div.style.display = "none";
    dispatch(updateProject({ id, text }));
  };

  return (
    <div className="project">
      <div className="title">{text}</div>
      <button onClick={() => dispatch(deleteProject(project._id))} className="close">
        X
      </button>
      <button
        onClick={() => {
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
      {/* update form */}
      <form
        className="update-form"
        style={{'display' :  "none"}}
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
