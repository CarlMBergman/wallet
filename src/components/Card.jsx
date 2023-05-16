import './Card.scss'
import { setActive, removeCard, localStorageUpdate } from '../redux/action';
import { useDispatch } from 'react-redux';
import chip        from '../assets/chip-dark.svg';
import bitcoinV    from '../assets/vendor-bitcoin.svg';
import blockchainV from '../assets/vendor-blockchain.svg';
import evilV       from '../assets/vendor-evil.svg';
import ninjaV      from '../assets/vendor-ninja.svg';
import XV          from '../assets/transparentX.svg';
import { useEffect, useState } from 'react';

function Card(props) {
    const dispatch = useDispatch()
    const [vendor, setVendor] = useState()

    function testVendor() {
        if (props.fullCard.vendor === 'bitcoin') {
            setVendor(bitcoinV)
        }
        else if (props.fullCard.vendor === 'ninja') {
            setVendor(ninjaV)
        }
        else if (props.fullCard.vendor === 'blockchain') {
            setVendor(blockchainV)
        }
        else if (props.fullCard.vendor === 'evil') {
            setVendor(evilV)
        }
    }

    useEffect(() => {
        testVendor()
    }, [])

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
                <img src={ chip } alt="chip" />
                <img className='card__vendor-vendor' src={ vendor } alt="vendor" />
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
            <img className='card__removebtn' onClick={ handleRemove } src={ XV } alt="removebtn" />
        </article>
        
        
    )
}

export default Card