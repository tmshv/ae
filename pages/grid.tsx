import React from 'react'
import { range } from 'lodash'
import ColorScheme from 'color-scheme'
import Page from '../src/components/Page'
import Aspect from '../src/components/Aspect'
import { Article } from '../src/sample'

import '../src/style/test-grid.less'

function colors() {
    const s = new ColorScheme();
    const colors = s.scheme('triade')
        .distance(0.75)
        .colors()

    return colors

    // while (true) {
    //     if (i < colors.length) {
    //         i++
    //     } else {
    //         i = 0
    //     }

    //     // console.log(colors[i])

    //     // yield colors[i]
    //     yield colors
    // }
}

const c = [
    ...colors(),
    ...colors(),
    ...colors(),
    ...colors(),
    ...colors(),
    ...colors(),
]

const img1 = 'https://meduza.io/image/attachments/images/003/300/255/large/Oq_HOH92BLrELTVsO51mkA.jpg'
const img2 = 'https://meduza.io/image/attachments/images/003/233/680/large/taAVmxacBT3MKtiiG1sNfA.jpg'
const img3 = 'https://meduza.io/image/attachments/images/003/298/312/large/v4z2HtGvq06ZpE22DV9_vw.jpg'
const img4 = 'https://meduza.io/image/attachments/images/003/298/810/large/xrjzotIUd2j8N811JLDDRw.jpg'
const img5 = 'https://meduza.io/image/attachments/images/003/296/119/large/exsstRB8YY3yToddTg4_xw.jpg'
const img6 = 'https://meduza.io/image/attachments/images/003/295/508/large/FSwLm9d_rS3FvHyFepqYsg.jpg'

const Item = (props) => {
    return (
        <div
            className={'test-grid-item'}
        >
            {props.children}
        </div>
    )
}

const A = (props) => {
    const style = {
        // gridArea: props.gridArea,
    }

    return (
        <div
            className={'test-grid-item-image'}
            style={style}
        >
            <img src={props.src} />
        </div>
    )
}

export default function () {
    // const items = range(0, 12)

    // items[4] = (
    //     <A
    //         src={img}
    //     />
    // )

    return (
        <Page>
            <div className={'test-grid'}>
                <Item>
                    <Aspect
                        ratio={1}
                    >
                        <A
                            src={img1}
                            gridArea={'header'}
                        />
                    </Aspect>
                </Item>
                <Item>
                    <Aspect
                        ratio={1}
                    >
                        <A
                            src={img2}
                            gridArea={'header'}
                        />
                    </Aspect>
                </Item>
                <Item>
                    <Aspect
                        ratio={1}
                    >
                        <A
                            src={img3}
                            gridArea={'header'}
                        />
                    </Aspect>
                </Item>
                <Item>
                    <Aspect
                        ratio={1}
                    >
                        <A
                            src={img4}
                            gridArea={'header'}
                        />
                    </Aspect>
                </Item>
                <Article />
                <A
                    src={img1}
                    gridArea={'header'}
                />
                <A
                    src={img2}
                    gridArea={'sidebar'}
                />
                <A
                    src={img3}
                    gridArea={'sidebar'}
                />
                <A
                    src={img4}
                    gridArea={'main'}
                />
                <A
                    src={img5}
                    gridArea={'footer'}
                />
                {/* {items.map(x => (
                    
                    // <Item
                    //     key={x}
                    //     i={x}
                    // />
                ))} */}
            </div>
        </Page>
    )
}
