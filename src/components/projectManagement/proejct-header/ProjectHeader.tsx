import './projectheader.css';

const ProjectHeader = () => {
  return (
    <div className="project-header">
      <div className="search-bar">
        <p>search</p>
      </div>
      <div className="profile-icons">
        <p>settings</p>
        <button>profile</button>
      </div>
    </div>
  );
};

export default ProjectHeader;
