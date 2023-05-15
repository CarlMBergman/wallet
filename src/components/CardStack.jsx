import './CardStack.scss'
import Card from './Card'
import { useSelector } from 'react-redux'

function CardStack() {
    const cards = useSelector((state) => { return state.cards })

    const cardComponents = cards.map((card) => {
        return <Card fullCard={ card } key={ card.cardNum }/>
    })
    
    return (
        <article className='cardstack'>
            { cardComponents }
        </article>
    )
}

export default CardStack