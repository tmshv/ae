import "../src/core/Ae/ae.css"
import "../src/core/Ae/ae-focused.css"

import "../src/style.css"
import "../src/page.css"
import "../src/selection-info.css"
import "../src/component-style.css"

import 'antd/dist/antd.css'

import Head from "next/head"
import { AppProps } from "next/app"
import { NextPage } from "next"

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: React.ReactElement) => React.ReactNode

}

type Props = {
}

export default function MyApp({ Component, pageProps }: AppProps<Props>) {
    return (
        <>
            <Head>
                <title>Ae</title>
                <meta name="theme-color" content="#00ff00" />
            </Head>

            <Component {...pageProps} />
        </>
    )
}