import './Home.scss'
import CardStack from '../components/CardStack';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

function Home(props) {
    const navigate = useNavigate();

    useEffect(() => {
        props.setHeading('E-WALLET')
    }, [])

    function handleClick() {
        navigate('/addcard')
    }

    return (
        <section className='home'>
            <h2 className='home__heading'>ACTIVE CARD</h2>
            <CardStack/>
            <button className='home__button' onClick={ handleClick }>ADD A NEW CARD</button>
            
        </section>
    )
}

export default Home