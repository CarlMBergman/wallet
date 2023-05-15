import './AddCard.scss'
import CardForm from '../components/CardForm';
import Card from '../components/Card';
import { useState, useEffect } from 'react';

function AddCard(props) {
    

    const [cardNum, setCardNum] = useState('XXXX XXXX XXXX XXXX');
    const [cardHolder, setCardHolder] = useState('FIRSTNAME LASTNAME');
    const [valid, setValid] = useState('MM/YY');
    const [ccv, setCcv] = useState('XXX');
    const [vendor, setVendor] = useState('bitcoin');
    const [isActive, setIsActive] = useState('notActive')
    

    let fullCard = {
        cardNum: cardNum,
        cardHolder: cardHolder,
        valid: valid,
        ccv: ccv,
        vendor: vendor,
        isActive: isActive
    }
    useEffect(() => {
        props.setHeading('ADD A NEW BANK CARD')
    }, [])
    

    return (
        <section className='add-card'>
            <h2 className='add-card__heading'>NEW CARD</h2>
            <Card fullCard={ fullCard }/>
            <CardForm
             setCardNum={ setCardNum }
             setCardHolder={ setCardHolder }
             setValid={ setValid }
             setCcv={ setCcv }
             setVendor={ setVendor }
             setIsActive={ setIsActive }
             fullCard={ fullCard }
            />
        </section>
    )
}

export default AddCard