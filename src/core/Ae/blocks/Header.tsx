import className from 'classnames'
import { BlockProps } from '.'

export function Header(props: BlockProps) {
    // const { connectDropTarget, isOver, attributes, canDrop } = props;

    return (
        <h1 {...props.attributes}
            className={className('ae-block-header', 'text')}
        >
            {props.children}
        </h1>
    )

    // return connectDropTarget((
    //     <p style={{ borderBottom: isOver && canDrop ? '3px solid #17a2b8' : 'none' }} {...attributes}>
    //         {children}
    //     </p>
    // ));
}