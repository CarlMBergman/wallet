import './Card.scss'
import { setActive, removeCard, localStorageUpdate } from '../redux/action';
import { useDispatch } from 'react-redux';

function Card(props) {
    const dispatch = useDispatch()

    function handleActive() {
        if (props.fullCard.isActive === 'notActive') {
            dispatch(setActive(props.fullCard))
            setTimeout(function(){
                dispatch(localStorageUpdate())
            }, 50)
        }
    }

    function handleRemove() {
        dispatch(removeCard(props.fullCard))
        setTimeout(function(){
            dispatch(localStorageUpdate())
        }, 50)
    }

    return (
        <article className={`card ${props.fullCard.vendor} ${props.fullCard.isActive}`} onClick={ handleActive }>
            <div className='card__vendor'>
                <img src="/src/assets/chip-dark.svg" alt="chip" />
                <img className='card__vendor-vendor' src={`/src/assets/vendor-${props.fullCard.vendor}.svg`} alt="vendor" />
            </div>
            <p className='card__num'>{ props.fullCard.cardNum }</p>
            <div className='card__info'>
                <div>
                    <p className='card__desc'>CARDHOLDER NAME</p>
                    <p>{ props.fullCard.cardHolder }</p>
                </div>
                <div>
                    <p className='card__desc'>VALID THRU</p>
                    <p>{ props.fullCard.valid }</p>
                </div>
            </div>
            <img className='card__removebtn' onClick={ handleRemove } src="/src/assets/transparentX.svg" alt="removebtn" />
        </article>
        
        
    )
}

export default Card