export default function Page(props) {
    return (
        <div className={'page'}>
            <div className={'content'}>
                {props.children}
            </div>
        </div>
    )
}
