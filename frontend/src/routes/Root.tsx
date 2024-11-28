import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import styles from './Root.module.css';
import axios from "axios";

// const projects = [
//     {
//         name: 'My awesome project',
//         appId: '1aaa9406-6687-485d-8276-203bd82bcfe1',
//         createdOn: '01/01/2025',
//         createdBy: 'me',
//         editedOn: '01/01/2025',
//         editedBy: 'me',

//     },
//     {
//         name: 'Not so awesome project',
//         appId: '1bbb9406-6687-485d-8276-203bd82bcfe1',
//         createdOn: '02/01/2025',
//         createdBy: 'nobody',
//         editedOn: '01/01/2025',
//         editedBy: 'nobody',
//     },
//     {
//         name: 'Test, test',
//         appId: '1ccc9406-6687-485d-8276-203bd82bcfe1',
//         createdOn: '03/01/2025',
//         createdBy: 'you',
//         editedOn: '01/01/2025',
//         editedBy: 'you',
//     },
// ]

const Spinner = ({ isLoading }: { isLoading: boolean }) => (<BeatLoader
    color={'blue'}
    loading={isLoading}
    size={20}
    aria-label="Loading Spinner"
    data-testid="loader"
/>)

const Root = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const { data } = await axios.get('http://localhost:3000/api/web-service/projects');
            setProjects(data.data);
            console.log(data.data)
            return;
        };
        getData();
    }, [setProjects]);

    return (
        <div className={styles['wrapper']}>
            {isLoading && <div className={styles['overlay']}>
                <div>
                    <Spinner isLoading={true} />
                </div>
            </div>}
            {isCreating && <div className={styles['overlay']}>
                <div>
                    <button onClick={() => setIsCreating(false)}>Close</button>
                    <input type="text"/>
                    <button>Create</button>
                </div>
            </div>}
            <div className={styles['left']}>
                {/* <Outlet /> */}
                {projects.map(project => <div key={project.appId} className={styles['project']}>
                    {/* <div className={styles['loader']}>
                        <Spinner isLoading={appIdLoading === project.appId} />
                    </div> */}
                    <div className={styles['project-name']}>
                        <Link className={styles['project-link']} to={`${project.appId}/designer`} onClick={() => setIsLoading(true)}>{project.name}</Link>
                    </div>
                    <div className={styles['project-edited-on']}>
                        <p>{project.editedOn}</p>
                    </div>
                    <div className={styles['project-edited-by']}>
                        <p>{project.editedBy}</p>
                    </div>
                </div>)}


            </div>
            <div className={styles['right']}>
                <button onClick={() => setIsCreating(true)} className={styles['btn-create']}>Create project</button>
            </div>
        </div>
    );
}

export default Root;