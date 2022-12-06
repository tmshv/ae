import React from 'react'
import slate, { Value } from 'slate'
import { Button, Row, Col } from 'antd'

interface SimpleToolbarAction {
    id: string
    icon?: string
    name?: string
    action: (value: Value, event: React.MouseEvent<HTMLButtonElement>) => void
}

interface CustomToolbarAction {
    id: string
    component: React.ReactNode
}

type ToolbarAction = SimpleToolbarAction | CustomToolbarAction

export interface IToolbarProps {
    value: slate.Value,

    left: ToolbarAction[]
    right: ToolbarAction[]
}

export default class Toolbar extends React.Component<IToolbarProps, any> {
    private createContent(item: ToolbarAction) {
        if ('component' in item) {
            return item.component
        }

        if (item.icon) {
            return (
                <Button
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        item.action(this.props.value, event)
                    }}
                    icon={item.icon}
                    ghost
                />
            )
        }

        if (item.name) {
            return (
                <Button
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        item.action(this.props.value, event)
                    }}
                    ghost
                >{item.name}</Button>
            )
        }

        return (
            <Button
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    item.action(this.props.value, event)
                }}
                ghost
            >action</Button>
        )
    }

    public render() {
        const rightColSpan = 24 / this.props.right.length
        const leftColSpan = 24 / this.props.left.length

        return (
            <div className={'ae-toolbar'}>
                <div className={'left'}>
                    <Button.Group style={{
                        marginRight: 9,
                    }}>
                        <Button
                            icon={'arrow-left'}
                            ghost
                        />
                        <Button
                            icon={'arrow-right'}
                            ghost
                        />
                    </Button.Group>

                    <Row
                        gutter={10}
                    >
                        {this.props.left.map(x => (
                            <Col
                                key={x.id}
                                span={leftColSpan}
                            >
                                {this.createContent(x)}
                            </Col>
                        ))}
                    </Row>
                </div>

                <div className={'right'}>
                    <Row
                        gutter={10}
                    >
                        {this.props.right.map(x => (
                            <Col
                                key={x.id}
                                span={rightColSpan}
                            >
                                {this.createContent(x)}
                            </Col>
                        ))}
                    </Row>
                </div>
            </div >
        )
    }
}
