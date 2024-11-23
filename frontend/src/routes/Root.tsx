import { useState } from "react";
import { Link } from "react-router-dom";

const projects = [
    {
        name: 'My awesome project',
        id: '1aaa9406-6687-485d-8276-203bd82bcfe1',
        // createdOn: '01/01/2025',
        // createdBy: 'me',
    },
    {
        name: 'Not so awesome project',
        id: '1bbb9406-6687-485d-8276-203bd82bcfe1',
        // createdOn: '02/01/2025',
        // createdBy: 'nobody',
    },
    {
        name: 'Test, test',
        id: '1ccc9406-6687-485d-8276-203bd82bcfe1',
        // createdOn: '03/01/2025',
        // createdBy: 'you',
    },
]

const Root = () => {

    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <div>
                {/* <Outlet /> */}
                {projects.map(project => <div key={project.id}>
                    <p>{project.name}</p>
                    <Link to={`${project.id}/designer`} onClick={() => setIsLoading(true)}>Open in designer</Link>
                    {isLoading && <p>Loading data...</p>}
                </div>)}
                <button>Create project</button>
            </div>
        </>
    );
}

export default Root;