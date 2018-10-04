import className from 'classnames'
import { BlockProps } from '.';

export function Paragraph(props: BlockProps) {
    // const { connectDropTarget, isOver, attributes, canDrop } = props;

    return (
        <p {...props.attributes}
            className={className('ae-block-paragraph', 'text', {
                focused: false, // props.isSelected,
            })}
        >
            {props.children}
        </p>
    )

    // return connectDropTarget((
    //     <p style={{ borderBottom: isOver && canDrop ? '3px solid #17a2b8' : 'none' }} {...attributes}>
    //         {children}
    //     </p>
    // ));
}