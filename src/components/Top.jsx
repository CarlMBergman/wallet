import './Top.scss'

function Top(props) {
    

    return (
        <header className='top'>
            <h1 className='top__heading'>
                { props.heading }
            </h1>
        </header>
    )
}

export default Top