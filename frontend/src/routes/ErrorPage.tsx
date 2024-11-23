import { useRouteError } from "react-router-dom";
import styles from './ErrorPage.module.css';

const ErrorPage = () => {

    const error = useRouteError() as { statusText: string, message: string };
    // console.error(error);

    return <div id={styles["my-error-page"]}>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
            <i>{error?.statusText || error?.message}</i>
        </p>
        <p>
            {/* @TODO: URL from env variables */}
            <a href="http://localhost:5173/">Back to Craftify</a>
        </p>
    </div>
}

export default ErrorPage;