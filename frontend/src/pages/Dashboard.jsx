import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProjectForm from "../components/ProjectForm";
import ProjectItem from "../components/ProjectItem";
import Spinner from "../components/Spinner";
import { getProjects, reset } from "../features/projects/projectSlice";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { projects, isLoading, isError, message } = useSelector(
    (state) => state.projects
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getProjects());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <div className="head">Welcome {user && user.name}</div>
        <p>projects Dashboard</p>
      </section>

      <ProjectForm />

      <section className="content">
        {projects.length > 0 ? (
          <div className="projects">
            {projects.map((project) => (
              <ProjectItem key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <h4>You have not set any projects</h4>
        )}
      </section>
    </>
  );
}

export default Dashboard;
