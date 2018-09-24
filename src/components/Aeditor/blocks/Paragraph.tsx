import className from 'classnames'

export function Paragraph(props) {
    // const { connectDropTarget, isOver, attributes, canDrop } = props;

    return (
        <p {...props.attributes}
            className={className('ae-paragraph', {
                focused: props.isFocused,
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