import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { projectStore } from "../../stores/projectStore/ProjectStore";

const ProjectList: React.FC = observer(() => {

    const { companyId } = useParams<{ companyId: string }>();

    useEffect(() => {
        if(companyId) {
            projectStore.fetchProjectsOfCompany(companyId);
        }
        console.log(projectStore.projects)
    }, [companyId])

    if (projectStore.loading) {
        return <div>Loading projects...</div>
    }

    if (projectStore.error) {
        return <div>Error: {projectStore.error}</div>
    }

    return (
        <div>
            <h1>Projects of Company</h1>
            <ul>
                {projectStore.projects.map((project) => (
                    <li>
                        {project.name}
                    </li>
                ))}
            </ul>
        </div>
    )
})

export default ProjectList;