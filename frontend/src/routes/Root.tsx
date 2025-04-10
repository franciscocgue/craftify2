import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import styles from './Root.module.css';
import axios from "axios";
import Overlay from "../components/common/Overlay";
import MyTextInput from "../components/common/MyTextInput";
import IconButton from "../components/common/IconButton";
import { RiCloseLargeLine, RiDeleteBin2Fill } from "react-icons/ri";
import useDesignerStore from "../stores/designer";
import { MdDarkMode, MdSunny } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import logoDark from '../assets/logo-dark.svg';
import logoLight from '../assets/logo-light.svg';
import { FaGithub } from "react-icons/fa6";
import useAuthStore from "../stores/auth";
import { FiLogOut } from "react-icons/fi";

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

type Project = {
    appId: string,
    name: string,
    editedOn: Date,
    createdOn: Date,
};

const ToggleColorMode = () => {
    const toggleColorMode = useDesignerStore((state) => state.toggleColorMode);
    const colorMode = useDesignerStore((state) => state.colorMode);

    return (
        <IconButton
            icon={colorMode === 'light' ? <MdDarkMode /> : <MdSunny />}
            onClick={toggleColorMode}
            baseStylesOverwrite={{
                // backgroundColor: colorMode === 'light' ? 'darkgrey' : 'darkgrey',
                color: 'white'
            }}
        >
        </IconButton>
    );
};

const Spinner = ({ isLoading }: { isLoading: boolean }) => (<BeatLoader
    color={'#007BFF'}
    loading={isLoading}
    size={20}
    aria-label="Loading Spinner"
    data-testid="loader"
/>);

const dateFormatOptions = {
    // weekday: "long",
    year: "numeric" as const,
    month: "short" as const,
    day: "numeric" as const,
    hour: 'numeric' as const,
    minute: 'numeric' as const,
};

const createProject = async (projectName: string) => {
    try {
        await axios.post(import.meta.env.VITE_API_URL + '/api/web-service/create-project', { projectName });
    } catch {
        toast('Project could not be created', { type: 'error', autoClose: 2000, position: 'bottom-right' });
    }

    return;
}

const deleteProject = async (appId: string) => {
    try {
        await axios.post(import.meta.env.VITE_API_URL + '/api/web-service/delete-project', { appId });
    } catch {
        toast('Project could not be deleted', { type: 'error', autoClose: 2000, position: 'bottom-right' });
    }
    return;
}

const Root = () => {

    const navigate = useNavigate();

    const colorMode = useDesignerStore((state) => state.colorMode);
    const userEmail = useAuthStore((state) => state.email);

    const [isLoading, setIsLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [projects, setProjects] = useState<{ error: string | null, data: Project[] }>({ error: null, data: [] });
    const [newProjectName, setNewProjectName] = useState<string | undefined>();
    const [projectNameDelete, setProjectNameDelete] = useState<string>('');
    const [projectAppIdToDelete, setProjectAppIdToDelete] = useState<string>('');
    const [confirmProjectNameDelete, setConfirmProjectNameDelete] = useState<string>('');
    const [searchString, setSearchString] = useState<string>('');

    useEffect(() => {
        // if (!isCreating) {
        const getData = async () => {
            try {
                const { data } = await axios.get(import.meta.env.VITE_API_URL + '/api/web-service/projects');
                const parsedProjects = data.data.map((proj: Project) => {
                    const dateEdited = new Date(proj.editedOn);
                    const dateCreated = new Date(proj.createdOn);
                    return { ...proj, editedOn: dateEdited, createdOn: dateCreated };
                })
                setProjects({ error: null, data: parsedProjects });
                // console.log(parsedProjects)
            } catch {
                setProjects({ error: `Oops couldn't load the projects. Try again soon`, data: [] });
                toast("Unexpected error, try again soon", { type: 'error', autoClose: 4000, position: 'bottom-right', toastId: 'err_projects' });
            }

            setIsLoading(false);
            return;
        };
        getData();
        // };
    }, [setProjects, isCreating, isDeleting]);

    const handleTryoutClick = () => {
        navigate('/try-out/designer');
    }

    return (
        <div className={`${styles['wrapper']} ${styles[colorMode === 'dark' ? 'theme-dark' : 'theme-light']}`}>

            <ToastContainer />

            {/* loader */}
            {isLoading && <Overlay><Spinner isLoading={true} /></Overlay>}

            {/* create new project */}
            {isCreating && <Overlay>
                <div style={{
                    backgroundColor: colorMode === 'dark' ? '#404040' : 'white',
                    padding: '2rem',
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    position: 'relative',
                    width: '375px',
                    border: colorMode === 'dark' ? '1px solid lightgrey' : 'none'
                }}>
                    <h3>Create New Project</h3>
                    <MyTextInput
                        onChange={(name: string | undefined) => { setNewProjectName(name) }}
                        onKeydown={async e => {
                            if (e.key === 'Enter') {
                                if (newProjectName && newProjectName.trim().length) {
                                    setIsLoading(true);
                                    await createProject(newProjectName);
                                    setIsCreating(false);
                                    setNewProjectName(undefined);
                                    setIsLoading(false);
                                };
                            }
                        }}
                        value={newProjectName}
                        placeholder="Your project name..."
                        autoFocus={true}
                    />
                    <IconButton
                        icon={<RiCloseLargeLine />}
                        onClick={() => {
                            setIsCreating(false);
                            setNewProjectName(undefined);
                        }}
                        baseStylesOverwrite={{
                            color: colorMode === 'dark' ? 'lightgrey' : 'blue',
                            border: colorMode === 'dark' ? '1px solid lightgrey' : '1px solid blue',
                            backgroundColor: colorMode === 'dark' ? 'transparent' : 'transparent',
                            position: 'absolute',
                            right: '5px',
                            top: '5px',
                        }}
                        hoverStylesOverwrite={{
                            backgroundColor: colorMode === 'dark' ? 'rgb(50, 50, 50)' : 'rgb(218, 236, 249)'
                        }}
                    >
                    </IconButton>
                    <IconButton
                        onClick={async () => {
                            if (newProjectName && newProjectName.trim().length) {
                                setIsLoading(true);
                                await createProject(newProjectName);
                                setIsCreating(false);
                                setNewProjectName(undefined);
                                setIsLoading(false);
                            };
                        }}
                        baseStylesOverwrite={{
                            color: 'white',
                            width: 'auto',
                            borderRadius: '10px'
                        }}
                        after="Create"
                    >
                    </IconButton>
                </div>
            </Overlay>}

            {/* delete project */}
            {isDeleting && <Overlay>
                <div style={{
                    backgroundColor: colorMode === 'dark' ? '#404040' : 'white',
                    padding: '2rem',
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    position: 'relative',
                    width: '375px',
                    border: colorMode === 'dark' ? '1px solid lightgrey' : 'none'
                }}>
                    <h3>Delete Project</h3>
                    <p>To confirm deletion, type <i>{projectNameDelete}</i> in the text field.</p>
                    <MyTextInput
                        onChange={(name: string | undefined) => { setConfirmProjectNameDelete(name || '') }}
                        onKeydown={async e => {
                            if (e.key === 'Enter') {
                                if (projectNameDelete === confirmProjectNameDelete) {
                                    setIsLoading(true);
                                    await deleteProject(projectAppIdToDelete);
                                    // @TODO: delete in AWS S3 too
                                    setIsDeleting(false);
                                    setProjectNameDelete('');
                                    setProjectAppIdToDelete('');
                                    setConfirmProjectNameDelete('');
                                    setIsLoading(false);
                                } else {
                                    toast('Project name not matching', { type: 'error', autoClose: 2000, position: 'bottom-right' });
                                };
                            }
                        }}
                        value={confirmProjectNameDelete}
                        placeholder="Project name to be deleted..."
                        autoFocus={true}
                    />
                    <IconButton
                        icon={<RiCloseLargeLine />}
                        onClick={() => {
                            setIsDeleting(false);
                            setProjectNameDelete('');
                            setProjectAppIdToDelete('');
                            setConfirmProjectNameDelete('');
                        }}
                        baseStylesOverwrite={{
                            color: colorMode === 'dark' ? 'lightgrey' : 'blue',
                            border: colorMode === 'dark' ? '1px solid lightgrey' : '1px solid blue',
                            backgroundColor: colorMode === 'dark' ? 'transparent' : 'transparent',
                            position: 'absolute',
                            right: '5px',
                            top: '5px',
                        }}
                        hoverStylesOverwrite={{
                            backgroundColor: colorMode === 'dark' ? 'rgb(50, 50, 50)' : 'rgb(218, 236, 249)'
                        }}
                    >
                    </IconButton>
                    <IconButton
                        onClick={async () => {
                            if (projectNameDelete === confirmProjectNameDelete) {
                                setIsLoading(true);
                                await deleteProject(projectAppIdToDelete);
                                // @TODO: delete in AWS S3 too
                                setIsDeleting(false);
                                setProjectNameDelete('');
                                setProjectAppIdToDelete('');
                                setConfirmProjectNameDelete('');
                                setIsLoading(false);
                            } else {
                                toast('Project name not matching', { type: 'error', autoClose: 2000, position: 'bottom-right' });
                            };
                        }}
                        baseStylesOverwrite={{
                            color: 'white',
                            backgroundColor: 'rgb(200,0,0)',
                            width: 'auto',
                            borderRadius: '10px'
                        }}
                        hoverStylesOverwrite={{
                            backgroundColor: 'rgb(145,0,0)',
                        }}
                        after="Delete"
                    >
                    </IconButton>
                </div>
            </Overlay>}

            {/* main */}

            {/* navbar */}
            <div className={styles['main-navbar']}>
                <div className={styles.logo}>
                    <div><img height={20} src={colorMode === 'light' ? logoLight : logoDark} alt="Logo" /><div style={{ marginLeft: '5px' }}>Craftify</div></div>
                </div>
                <div style={{
                    display: 'flex',
                    alignContent: 'center',
                    alignItems: 'center',
                    gap: '15px',
                }}>
                    <ToggleColorMode />
                    <div style={{
                        // flex: 1,
                        // width: '100px',
                        display: 'flex',
                        fontSize: 'small'
                    }}>
                        {userEmail}
                    </div>
                    <div style={{
                        // width: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                    }}>
                        {/* <div>Share</div> */}
                        <div style={{
                            // width: '100px',
                            display: 'flex',
                            alignItems: 'center',
                            alignContent: 'center',
                            gap: '15px',
                        }}>
                            <div
                                style={{
                                    color: 'inherit',
                                    display: 'flex',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                }}
                                onClick={async () => {
                                    try {
                                        const response = await axios.get(`${import.meta.env.VITE_API_URL}/logout`, { withCredentials: true });
                                        const data = response.data;
                                        if (data.success) {
                                            window.location.href = "/login";
                                        } else {
                                            throw new Error('Logout failed')
                                        }
                                    } catch (err) {
                                        toast('Error when logging out', { type: 'error', autoClose: 2000, position: 'bottom-right' });
                                        console.log('Error when logging out');
                                    }
                                }}
                            >
                                {<FiLogOut size={20} title="Logout" />}
                            </div>
                            <a
                                style={{
                                    color: 'inherit',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                href="https://github.com/franciscocgue/craftify2"
                                target="_blank">
                                {<FaGithub size={25} title="GitHub repo" />}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* projects list */}
            <div className={styles.main}>
                {projects.error === null && <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    alignContent: 'center',
                    marginBottom: '20px',
                    gap: '10px',
                }}>
                    <MyTextInput onChange={(searchString: string | undefined) => { setSearchString(searchString || '') }} value={searchString} placeholder="Search project" />
                    <IconButton
                        onClick={() => setIsCreating(true)}
                        baseStylesOverwrite={{
                            color: 'white',
                            width: 'fit-content',
                            borderRadius: '10px',
                            fontSize: '0.95rem',
                            height: '32px',
                            padding: '5px 10px',
                            // marginTop: '20px',
                            // marginBottom: '25px',
                        }}
                        after="Create project"
                    >
                    </IconButton>
                    <IconButton
                        onClick={handleTryoutClick}
                        baseStylesOverwrite={{
                            color: 'white',
                            width: 'fit-content',
                            borderRadius: '10px',
                            fontSize: '0.95rem',
                            height: '32px',
                            padding: '5px 10px',
                            // marginTop: '20px',
                            // marginBottom: '25px',
                        }}
                        after="Skip the signup, have some fun!"
                    >
                    </IconButton>
                </div>}
                <h2 className={styles.title}>My Projects</h2>
                <div className={styles['project']}>
                    <div className={styles['action']}>
                    </div>
                    <div className={`${styles['project-name']} ${styles['header']}`}>
                        <p>Project name</p>
                    </div>
                    <div className={`${styles['project-edited-on']} ${styles['header']}`}>
                        <p>Created on</p>
                    </div>
                    <div className={`${styles['project-edited-on']} ${styles['header']}`}>
                        <p>Last changed on</p>
                    </div>
                </div>
                <div className={styles.projects}>
                    {projects.error !== null && <p className={styles['no-projects']}>{projects.error}</p>}
                    {projects.error === null && projects.data.length === 0 && <p className={styles['no-projects']}>There are no projects.</p>}
                    {projects.error === null && projects.data.length !== 0 && projects.data
                        .filter(project => searchString === '' ? true : project.name.toLowerCase().includes(searchString.toLowerCase()))
                        .map(project => <div key={project.appId} className={styles['project']}>
                            {/* <div className={styles['loader']}>
                        <Spinner isLoading={appIdLoading === project.appId} />
                    </div> */}
                            <div className={styles['action']}>
                                {/* delete button */}
                                <IconButton
                                    icon={<RiDeleteBin2Fill title="Delete" />}
                                    onClick={() => {
                                        setProjectAppIdToDelete(project.appId);
                                        setProjectNameDelete(project.name);
                                        setIsDeleting(true);
                                    }}
                                    baseStylesOverwrite={{
                                        color: colorMode === 'light' ? 'rgb(200,20,20)' : 'rgb(255,150,150)',
                                        backgroundColor: 'transparent',
                                        width: 'fit-content',
                                        borderRadius: '10px',
                                        fontSize: '0.95rem',
                                        height: '28px',
                                    }}
                                    hoverStylesOverwrite={{
                                        backgroundColor: 'transparent',
                                    }}
                                // after="Create project"
                                >
                                </IconButton>
                            </div>
                            <div className={styles['project-name']}>
                                <Link className={styles['project-link']} to={`${project.appId}/designer`} onClick={() => setIsLoading(true)}>{project.name}</Link>
                            </div>
                            <div className={styles['project-edited-on']}>
                                <span className={styles.date}>{project.createdOn.toLocaleDateString("en-US", dateFormatOptions)}</span>
                            </div>
                            <div className={styles['project-edited-on']}>
                                <span className={styles.date}>{project.editedOn.toLocaleDateString("en-US", dateFormatOptions)}</span>
                                {/* <span className={styles.time}>, {project.editedOn.toLocaleTimeString("en-US")}</span> */}
                            </div>
                            {/* <div className={styles['project-edited-by']}>
                        <p>{project.editedBy}</p>
                    </div> */}
                        </div>)}
                </div>
            </div>
        </div>
    );
}

export default Root;