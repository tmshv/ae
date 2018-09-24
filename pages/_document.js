import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
    render() {
        return (
            <html>
                <Head>
                    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" />
                    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"></link>
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