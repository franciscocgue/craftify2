import ContainerWrapper from "./ContainerWrapper";
import ComponentWrapper from "./ComponentWrapper";
import CContainerColumn from "../components/components/CContainerColumn";
import CButton from "../components/components/CButton";
import CanvasWrapper from "./CanvasWrapper";
import { ComponentCollection } from "../vite-env";
import CCheckbox from "../components/components/CCheckbox";
import ResizableContainer from "./ResizableContainer";
import ResizableComponent from "./ResizableComponent";
import { Flex } from "@chakra-ui/react";
import DroppableCanvas from "./DroppableCanvas";

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
const uiMapper = {
    'canvas': (components: ComponentCollection, id: string, properties) => (
        <CanvasWrapper key={id} id={id} componentType={components[id].type} {...properties[id]}>
            <CContainerColumn  {...properties[id]}>
                {components[id].children.map((id: string) => renderNode(components, id, properties))}
            </CContainerColumn>
        </CanvasWrapper>
    ),
    'column': (components: ComponentCollection, id: string, properties) => (
        <ContainerWrapper key={id} id={id} componentType={components[id].type} parentType={components[components[id].parent as string]?.type} name={components[id].name} {...properties[id]}>
            <CContainerColumn {...properties[id]}>
                {components[id].children.map((id: string) => renderNode(components, id, properties))}
            </CContainerColumn>
        </ContainerWrapper>
    ),
    'button': (components: ComponentCollection, id: string, properties) => (
        <ComponentWrapper key={id} id={id} componentType={components[id].type} parentType={components[components[id].parent as string].type} name={components[id].name} {...properties[id]}>
            <CButton {...properties[id]} />
        </ComponentWrapper>
    ),
    'checkbox': (components: ComponentCollection, id: string, properties) => (
        <ComponentWrapper key={id} id={id} componentType={components[id].type} parentType={components[components[id].parent as string].type} name={components[id].name} w={'100%'} h={'50px'} p={0} border="0px solid red">
            <CCheckbox />
        </ComponentWrapper>
    ),
}

const uiMapper2 = {
    'canvas': (components: ComponentCollection, id: string, properties) => (
        <Flex
            position={'relative'}
            border={'1px solid grey'}
            flexDirection={'column'}
            overflowY={'auto'}
            overflowX={'hidden'}
            minW={'360px'}
            m={'0 auto'}
            minH={'min(calc(100%), 760px)'}
            maxW={'360px'}
            maxH={'760px'}
            gap={properties[id].gap || undefined}
            paddingTop={properties[id].paddingTop || undefined}
            paddingBottom={properties[id].paddingBottom || undefined}
            paddingLeft={properties[id].paddingLeft || undefined}
            paddingRight={properties[id].paddingRight || undefined}
        // avoid overlapping with scrollbar
        // @TODO: maybe better solution (inner div); alternatively, add pr to total width to keep effective width 
        // p={'1px'}
        >
            <DroppableCanvas componentId={id} />
            {components[id].children.map((id: string) => renderNode(components, id, properties))}
        </Flex>
    ),
    'column': (components: ComponentCollection, id: string, properties) => (
        <ResizableContainer
            key={id}
            componentId={id}
            componentName={components[id].name}
            componentType={components[id].type}
            parentType={components[components[id].parent as string]?.type}
            otherProperties={properties[id]}
        >
            <CContainerColumn {...properties[id]}>
                {components[id].children.map((id: string) => renderNode(components, id, properties))}
            </CContainerColumn>
        </ResizableContainer>
    ),
    'button': (components: ComponentCollection, id: string, properties) => (
        <ResizableComponent
            key={id}
            componentId={id}
            componentName={components[id].name}
            componentType={components[id].type}
            parentType={components[components[id].parent as string]?.type}
            otherProperties={properties[id]}
        >
            <CButton {...properties[id]} />
        </ResizableComponent>
    ),
    'checkbox': (components: ComponentCollection, id: string, properties) => (
        <ComponentWrapper key={id} id={id} componentType={components[id].type} parentType={components[components[id].parent as string].type} name={components[id].name} w={'100%'} h={'50px'} p={0} border="0px solid red">
            <CCheckbox />
        </ComponentWrapper>
    ),
}

const renderNode = (components: ComponentCollection, id: string, properties) => {
    return uiMapper2[components[id].type as keyof typeof uiMapper2](components, id, properties)
}

export {
    renderNode
}