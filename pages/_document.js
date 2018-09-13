import Document, { Head, Main, NextScript } from 'next/document'

import '../src/style/main.less'

export default class MyDocument extends Document {
    render() {
        return (
            <html>
                <Head>
                    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" />
                    <link rel="stylesheet" href="/_next/static/style.css" />
                </Head>
                <body>
                    <main>
                        <Main />
                    </main>
                    <NextScript />
                </body>
            </html>
        )
    }
}