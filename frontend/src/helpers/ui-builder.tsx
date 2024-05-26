import ContainerWrapper from "./ContainerWrapper";
import ComponentWrapper from "./ComponentWrapper";
import CContainerColumn from "../components/components/CContainerColumn";
import CButton from "../components/components/CButton";
import CanvasWrapper from "./CanvasWrapper";
import { ComponentCollection } from "../vite-env";
import CCheckbox from "../components/components/CCheckbox";

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

const uiMapper = {
    'canvas': (components: ComponentCollection, id: string) => (
        <CanvasWrapper key={id} id={id} componentType={components[id].type} p={1} border="0px solid grey">
            <CContainerColumn>
                {components[id].children.map((id: string) => renderNode(components, id))}
            </CContainerColumn>
        </CanvasWrapper>
    ),
    'container-column': (components: ComponentCollection, id: string) => (
        <ContainerWrapper key={id} id={id} componentType={components[id].type} parentType={components[components[id].parent as string]?.type} name={components[id].name} w={'100%'} h={'auto'} p={1} border="0px solid grey">
            <CContainerColumn>
                {components[id].children.map((id: string) => renderNode(components, id))}
            </CContainerColumn>
        </ContainerWrapper>
    ),
    'button': (components: ComponentCollection, id: string) => (
        <ComponentWrapper key={id} id={id} componentType={components[id].type} parentType={components[components[id].parent as string].type} name={components[id].name} w={'100%'} h={'50px'} p={0} border="0px solid red">
            <CButton />
        </ComponentWrapper>
    ),
    'checkbox': (components: ComponentCollection, id: string) => (
        <ComponentWrapper key={id} id={id} componentType={components[id].type} parentType={components[components[id].parent as string].type} name={components[id].name} w={'100%'} h={'50px'} p={0} border="0px solid red">
            <CCheckbox />
        </ComponentWrapper>
    ),
}

const renderNode = (components: ComponentCollection, id: string) => {
    return uiMapper[components[id].type as keyof typeof uiMapper](components, id)
}

export {
    renderNode
}