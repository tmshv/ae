import React from 'react'
import PropTypes from 'prop-types'
import Page from '../src/components/Page';
import Division from '../src/components/Division';
import Block from '../src/components/Block';
import Blank from '../src/components/Blank';
import Image from '../src/components/Image';
import Ae from '../src/components/Ae';

const image1 = 'https://static1.squarespace.com/static/547d0922e4b0bc118f239ac6/54b80afde4b089bfadc7afe4/5a14909f0d9297443dba9fd1/1511297233495/Exterior_1608.jpg?format=2500w'
const image2 = 'https://static1.squarespace.com/static/547d0922e4b0bc118f239ac6/54b80afde4b089bfadc7afe4/5a149114e2c4831ecd70cab6/1511297303493/Exterior_1955.jpg?format=2500w'
const image3 = 'https://static1.squarespace.com/static/547d0922e4b0bc118f239ac6/54b80afde4b089bfadc7afe4/5a145d9cec212de0e44e21f7/1511284137906/Exterior_8395.jpg?format=2500w'

const imgs = [
    image1,
    image2,
    image3,
    'https://static1.squarespace.com/static/547d0922e4b0bc118f239ac6/54b80afde4b089bfadc7afe4/57ab8c8ce58c625f353ed229/1470860434068/IMG_5827.JPG?format=2500w',
    'https://static1.squarespace.com/static/547d0922e4b0bc118f239ac6/54b80afde4b089bfadc7afe4/57ab8d73ebbd1abd4fd50d03/1470860663728/IMG_5880.JPG?format=2500w',
    'https://static1.squarespace.com/static/547d0922e4b0bc118f239ac6/54b80afde4b089bfadc7afe4/57ab8dc7d2b8573d320fc18d/1470861001623/IMG_5881.JPG?format=2500w',
    'https://static1.squarespace.com/static/547d0922e4b0bc118f239ac6/54b80afde4b089bfadc7afe4/585481ac414fb59a9520a8c5/1481933231656/IMG_6712.JPG?format=2500w',
    'https://static1.squarespace.com/static/547d0922e4b0bc118f239ac6/54b80afde4b089bfadc7afe4/597e1b397131a5fd5f628f49/1501436751022/IMG_8088.JPG?format=2500w',
    'https://static1.squarespace.com/static/547d0922e4b0bc118f239ac6/54b80afde4b089bfadc7afe4/597e1bf1cd0f6846bf0bd9c0/1501436919384/IMG_8308.JPG?format=2500w',
    'https://static1.squarespace.com/static/547d0922e4b0bc118f239ac6/54b80afde4b089bfadc7afe4/5a1491daec212d1cc912b93a/1511297511636/002_North+Exerior+Detail-cropped.jpg?format=2500w',
    'https://static1.squarespace.com/static/547d0922e4b0bc118f239ac6/54b80afde4b089bfadc7afe4/56be73bf7c65e42554941583/1455322050509/001_West+Exterior-1200.jpg?format=2500w',
]

function Img({ src, ratio = 9 / 16 }) {
    const i = Math.floor(Math.random() * imgs.length)
    const image = src ? src : imgs[
        Math.floor(Math.random() * imgs.length)
    ]

    return (
        <Image
            src={image}
            ratio={ratio}
        />
    )
}

const Attention = ({ color = '#0384e3', ...props }) => (
    <div style={{
        border: `5px solid ${color}`,
        padding: '10px',
        margin: '10px',
        minHeight: '80px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '32px',
    }}>
        {props.children}
    </div>
)

interface Props {
    initialValue: any
}

class MyAe extends React.Component<Props, any> {
    state = {
        value: this.props.initialValue,
    }

    onChange = value => {
        save(value)

        this.setState({
            value,
        })
    }

    render() {
        return (
            <Ae
                value={this.state.value}
                onChange={this.onChange}
            />
        )
    }
}

function save(value) {
    const data = JSON.stringify(value)
    localStorage.setItem('ae', data)
}

function getInitial() {
    // if (global.localStorage) {
    //     const data = localStorage.getItem('ae')

    //     if (data) {
    //         return JSON.parse(data)
    //     }

    // }

    return {
        version: "1",
        frames: [
            {
                direction: "horizontal",
                divide: 2,
                nodes: [
                    {
                        type: "Frame",
                        options: {
                            direction: "vertical",
                            divide: 2,
                            nodes: [
                                {
                                    type: "Block",
                                    options: {
                                        content: "HI"
                                    }
                                },
                                {
                                    type: "Frame",
                                    options: {
                                        direction: "horizontal",
                                        divide: 3,
                                        nodes: [
                                            {
                                                type: "Block",
                                                options: {
                                                    content: "POP"
                                                }
                                            },
                                            {
                                                type: "Block",
                                                options: {
                                                    content: "LOL"
                                                }
                                            },
                                            {
                                                type: "Block",
                                                options: {
                                                    content: "KEK"
                                                }
                                            },
                                        ]
                                    }
                                },
                            ]
                        }
                    },
                    {
                        type: "Block",
                        options: {
                            content: "XX"
                        }
                    },
                ]
            },
            {
                direction: "horizontal",
                divide: [.7, 1],
                nodes: [
                    {
                        type: "Block",
                        options: {
                            content: "MD"
                        }
                    },
                    {
                        type: "Frame",
                        options: {
                            direction: "vertical",
                            divide: 2,
                            nodes: [
                                {
                                    type: "Block",
                                    options: {
                                        content: "DD"
                                    }
                                },
                                {
                                    type: "Block",
                                    options: {
                                        content: "AE"
                                    }
                                },
                            ]
                        }
                    },
                ]
            }
        ],
    }
}

export default function () {
    return (
        <Page>
            {/* {test()} */}
            <MyAe
                initialValue={getInitial()}
            />
        </Page>
    )
}

function test() {
    return (
        <div>
            <Division
                division={[.3]}
            >
                <Division
                    divide={2}
                    vertical={true}
                >
                    <Img
                        src={image1}
                    />
                    <article>
                        Курс евро на Московской бирже превысил отметку в 80 рублей впервые с 11 апреля.
                        По состоянию на 16:16 мск, европейская валюта торговалась по 80,39 рубля,
                        подорожав по сравнению с закрытием предыдущей сессии более чем на 1 рубль.
                    </article>
                </Division>

                <Img
                    src={image1}
                    ratio={8 / 16}
                />
            </Division>

            <Division>
                <Img
                    src={image1}
                    ratio={8 / 16}
                />
            </Division>

            <Division>
                <Attention
                    color={'rgb(227, 21, 21)'}
                >
                    <article>
                        <h2>
                            Биржевой курс евро превысил 80 рублей
                    </h2>

                        <p>
                            Курс евро на Московской бирже превысил отметку в 80 рублей впервые с 11 апреля.
                            По состоянию на 16:16 мск, европейская валюта торговалась по 80,39 рубля,
                            подорожав по сравнению с закрытием предыдущей сессии более чем на 1 рубль.
                    </p>

                        <p>
                            Биржевой курс доллара к рублю также вырос, преодолев отметку в 69 рублей.
                            На 16:16 мск за доллар давали 69,11 рубля — максимум с апреля 2016 года.
                    </p>
                    </article>
                </Attention>
            </Division>

            <Division
                division={[.5]}
            >
                <Attention>
                    Trololo
                </Attention>
                <Attention>
                    Trololo
                </Attention>
            </Division>

            <Division
                divide={2}
                reverse={true}
            >
                <article>
                    <h2>
                        Молодой Ник Фьюри (без повязки!),
                        скруллы-шпионы и футболка Nine Inch Nails.
                        Что показали на первых кадрах «Капитана Марвел»
                    </h2>

                    <p>
                        Издание Entertainment Weekly опубликовало официальные кадры со съемок «Капитана Марвел».
                        Это первый фильм Marvel про женщину-супергероя:
                        он расскажет о пилоте Кэрол Денверс — наполовину человеке, наполовину кри.
                        Денверс — самый могущественный положительный персонаж в киновселенной Marvel.
                        Ее роль исполнила актриса Бри Ларсон («Комната»).
                    </p>

                    <p>
                        Скрулла по имени Талос играет актер Бен Мендельсон («Звездные войны. Изгой-один»).
                        Его персонаж внедрился в правительственную организацию «Щ.И.Т.», в которой состоит Ник Фьюри
                    </p>

                    <p>
                        Сам Фьюри в фильме тоже появится — впервые без фирменной глазной повязки.
                        Героя Сэмюэла Л. Джексона омолодили при помощи спецэффектов
                    </p>

                    <p>
                        В России «Капитан Марвел» выйдет 7 марта 2019-го — до премьеры четвертых «Мстителей».
                    </p>
                </article>

                <article>
                    <h2>
                        Молодой Ник Фьюри (без повязки!),
                        скруллы-шпионы и футболка Nine Inch Nails.
                        Что показали на первых кадрах «Капитана Марвел»
                    </h2>
                    <p>
                        Издание Entertainment Weekly опубликовало официальные кадры со съемок «Капитана Марвел».
                        Это первый фильм Marvel про женщину-супергероя:
                        он расскажет о пилоте Кэрол Денверс — наполовину человеке, наполовину кри.
                        Денверс — самый могущественный положительный персонаж в киновселенной Marvel.
                        Ее роль исполнила актриса Бри Ларсон («Комната»).
                    </p>
                </article>
            </Division>

            <Division
                divide={4}
                reverse={true}
            >
                <Img
                    src={image1}
                    ratio={3 / 4}
                />
                <Blank />
                <Img
                    src={image2}
                    ratio={3 / 4}
                />
                <Img
                    src={image3}
                    ratio={3 / 4}
                />
            </Division>
        </div>
    )
}