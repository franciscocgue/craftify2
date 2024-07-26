import CButton from "../components/components/CButton";
import { ComponentCollection } from "../vite-env";
import WrapperContainer from "./WrapperContainer";
import DroppableCanvas from "./DroppableCanvas";
import CHeader from "../components/components/CHeader";
import CText from "../components/components/CText";
import CCheckbox from "../components/components/CCheckbox";
import CImage from "../components/components/CImage";
import CLink from "../components/components/CLink";
import CIconButton from "../components/components/CIconButton";

{/* <ContainerWrapper id="subcontainer" componentType="container-row" parentType='container-column' w={'100%'} h={'max-content'} p={1} border="none">
<Flex direction={'row'} wrap={'wrap'} alignItems={'center'} gap={2} h={'100%'} w={'100%'}>

    <ComponentWrapper id="box-12" componentType="button" parentType='container-row' w={'40%'} p={1} border="0px solid red">
        <Center>Box sub A Box sub A Box sub A</Center>
    </ComponentWrapper>

    <ComponentWrapper id="box-13" componentType="some component" parentType='container-row' w={'40%'} p={1} border="0px solid red">
        <Center>Box sub B</Center>
    </ComponentWrapper>

    <ComponentWrapper id="box-14" componentType="test" parentType='container-row' w={'40%'} p={1} border="0px solid red">
        <Center>Box sub C</Center>
    </ComponentWrapper>
</Flex>
</ContainerWrapper> */}

// const components = {
//     'canvas': {
//         type: 'container-column',
//         parent: null,
//         children: ['994a18fa-b8d0-42e1-bc31-a510367b014b', '16586569-f34a-4066-9e17-192a9bbb6579'],
//         name: 'Canvas'
//     },
//     '994a18fa-b8d0-42e1-bc31-a510367b014b': {
//         type: 'button',
//         parent: 'Canvas',
//         children: [],
//         name: 'Button 1'
//     },

// default properties directly inside wrapper
// eg: p={p || '1px'}
// const uiMapper = {
//     'canvas': (components: ComponentCollection, id: string, properties) => (
//         <CanvasWrapper key={id} id={id} componentType={components[id].type} {...properties[id]}>
//             <CContainerColumn  {...properties[id]}>
//                 {components[id].children.map((id: string) => renderNode(components, id, properties))}
//             </CContainerColumn>
//         </CanvasWrapper>
//     ),
//     'column': (components: ComponentCollection, id: string, properties) => (
//         <ContainerWrapper key={id} id={id} componentType={components[id].type} parentType={components[components[id].parent as string]?.type} name={components[id].name} {...properties[id]}>
//             <CContainerColumn {...properties[id]}>
//                 {components[id].children.map((id: string) => renderNode(components, id, properties))}
//             </CContainerColumn>
//         </ContainerWrapper>
//     ),
//     'button': (components: ComponentCollection, id: string, properties) => (
//         <ComponentWrapper key={id} id={id} componentType={components[id].type} parentType={components[components[id].parent as string].type} name={components[id].name} {...properties[id]}>
//             <CButton {...properties[id]} />
//         </ComponentWrapper>
//     ),
//     'checkbox': (components: ComponentCollection, id: string, properties) => (
//         <ComponentWrapper key={id} id={id} componentType={components[id].type} parentType={components[components[id].parent as string].type} name={components[id].name} w={'100%'} h={'50px'} p={0} border="0px solid red">
//             <CCheckbox />
//         </ComponentWrapper>
//     ),
// }

const uiMapper2 = {
    'canvas': (components: ComponentCollection, id: string) => (
        <>
            <DroppableCanvas componentId={id} />
            {components[id].children.map((id: string) => renderNode(components, id))}
        </>
    ),
    'column': (components: ComponentCollection, id: string) => (
        <WrapperContainer
            key={id}
            componentId={id}
            componentName={components[id].name}
            componentType={components[id].type}
            parentType={components[components[id].parent as string]?.type}
        // otherProperties={properties[id]}
        >
            {/* <CContainerColumn componentId={id}> */}
            {components[id].children.map((id: string) => renderNode(components, id))}
            {/* </CContainerColumn> */}
        </WrapperContainer>
    ),
    'button': (components: ComponentCollection, id: string) => (
        <CButton
            key={id}
            componentId={id}
            componentName={components[id].name}
            componentType={components[id].type}
            parentType={components[components[id].parent as string]?.type}
        />
    ),
    'text': (components: ComponentCollection, id: string) => (
        <CText
            key={id}
            componentId={id}
            componentName={components[id].name}
            componentType={components[id].type}
            parentType={components[components[id].parent as string]?.type}
        />
    ),
    'header': (components: ComponentCollection, id: string) => (
        <CHeader
            key={id}
            componentId={id}
            componentName={components[id].name}
            componentType={components[id].type}
            parentType={components[components[id].parent as string]?.type}
        />
    ),
    'checkbox': (components: ComponentCollection, id: string) => (
        <CCheckbox
            key={id}
            componentId={id}
            componentName={components[id].name}
            componentType={components[id].type}
            parentType={components[components[id].parent as string]?.type}
        />
    ),
    'image': (components: ComponentCollection, id: string) => (
        <CImage
            key={id}
            componentId={id}
            componentName={components[id].name}
            componentType={components[id].type}
            parentType={components[components[id].parent as string]?.type}
        />
    ),
    'link': (components: ComponentCollection, id: string) => (
        <CLink
            key={id}
            componentId={id}
            componentName={components[id].name}
            componentType={components[id].type}
            parentType={components[components[id].parent as string]?.type}
        />
    ),
    'icon-button': (components: ComponentCollection, id: string) => (
        <CIconButton
            key={id}
            componentId={id}
            componentName={components[id].name}
            componentType={components[id].type}
            parentType={components[components[id].parent as string]?.type}
        />
    ),
}

const renderNode = (components: ComponentCollection, id: string) => {
    return uiMapper2[components[id].type as keyof typeof uiMapper2](components, id)
}

export {
    renderNode
}