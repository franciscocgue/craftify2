import { Box, Icon, Text } from '@chakra-ui/react';
import { useDraggable } from '@dnd-kit/core';
import { ReactNode, useState } from 'react';
import { MdDragIndicator } from "react-icons/md";

type propsT = {
    id: string,
    children: ReactNode,
    w: string | number,
    h: string | number,
    p?: string | number,
    m?: string | number,
    border?: string
}

const ComponentWrapper = ({ id, children, w, h, p, m, border }: propsT) => {
    const { attributes, listeners, setNodeRef } = useDraggable({ // transform
        id: 'TEST',
    });

    const [isHovered, setIsHovered] = useState(false);


    return (
        <Box
            ref={setNodeRef}
            _hover={{ outline: '1px solid blue' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ position: 'relative' }}
            w={w}
            h={h}
            p={p || undefined}
            m={m || undefined}
            border={border || undefined}
        // {...listeners}
        // {...attributes}
        >
            {children}
            {isHovered && <>
                <Icon
                    {...listeners}
                    {...attributes}
                    style={{ position: 'absolute', top: '-20px', left: '0', height: '20px', width: '20px', borderRadius: '3px 0 0 3px' }}
                    bg={'gray.400'}
                    as={MdDragIndicator}
                />
                <Text
                    userSelect={'none'}
                    style={{ position: 'absolute', top: '-20px', left: '20px', height: '20px', padding: '0 10px', borderRadius: '0 3px 3px 0' }}
                    bg={'gray.400'}
                    fontSize={'xs'}
                >Container</Text>
            </>
            }

        </Box>
    );
};

export default ComponentWrapper;