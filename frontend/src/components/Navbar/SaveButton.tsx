import useDesignerStore from "../../stores/designer";
import axios from "axios";
import { FaSave } from "react-icons/fa";
import IconButton from "../common/IconButton";
import { Variable } from "../../types/variables.types";
import { Properties } from "../../types/designer.types";
import { ComponentCollection } from "../../types/designer.types";
import { FunctionTypes, LogicEdge, LogicNode } from "../../types/logic.types";
import { toast } from "react-toastify";

const handleButtonClick = async (
    components: ComponentCollection,
    properties: Properties,
    variables: Variable[],
    logicNodes: Record<string, LogicNode<FunctionTypes>[]>,
    logicEdges: Record<string, LogicEdge[]>,
    setIsBuilding: React.Dispatch<React.SetStateAction<boolean>>,
    appId: string,
) => {

    if (appId === 'try-out') {
        toast(<span>An account is needed to use <b>save</b> and <b>build</b> features</span>, {type: 'info', hideProgressBar: true, autoClose: false, position: 'top-center'});
        return null
    }
    setIsBuilding(true); // reset to false after server sends build response

    try {
        console.log(components)
        // @TODO: manage urls in environments
        await axios.post(import.meta.env.VITE_API_URL + '/api/web-service/build', {
            "app-id": appId,
            components,
            properties,
            variables,
            logicNodes,
            logicEdges
        });
    } catch (error) {
        let errMessage: string;
        if (error instanceof Error) {
            // console.error(error.message);
            errMessage = error.message;
        } else {
            errMessage = 'There was an error saving the project';
        }
        toast(errMessage, { type: 'error', autoClose: 2000, position: 'bottom-right' });
        setIsBuilding(false);;
    }
};

type SaveButtonProps = {
    setIsBuilding: React.Dispatch<React.SetStateAction<boolean>>,
}

const SaveButton = ({ setIsBuilding }: SaveButtonProps) => {

    console.log('C - SaveButton')

    const components = useDesignerStore((state) => state.components);
    const properties = useDesignerStore((state) => state.properties);
    const variables = useDesignerStore((state) => state.variables);
    const logicNodes = useDesignerStore((state) => state.logicNodes);
    const logicEdges = useDesignerStore((state) => state.logicEdges);
    const appId = useDesignerStore((state) => state.appId);

    return (
        <>
            <IconButton
                icon={<FaSave />}
                onClick={() => handleButtonClick(components, properties, variables, logicNodes, logicEdges, setIsBuilding, appId)}
                baseStylesOverwrite={{
                    color: 'white',
                    width: '80px',
                    backgroundColor: 'rgba(0,128,0,1)',
                }}
                hoverStylesOverwrite={{
                    backgroundColor: 'rgba(0,85,0,1)',
                }}
                after="Save"
            >
            </IconButton>
        </>
    )
}

export default SaveButton;