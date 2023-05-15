import './CardForm.scss'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { addCard, localStorageUpdate } from '../redux/action';
import { useEffect } from 'react';

function CardForm(props) {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cards    = useSelector((state) => { return state.cards })
    const findCard = cards.find(({ cardNum }) => cardNum === props.fullCard.cardNum)


    function handleActive() {
        if (cards.length === 0) {
            props.setIsActive('active')
        }
    }

    useEffect(() => {
        handleActive()
    }, [])


    function handleAddClick(event) {
        event.preventDefault();
        if (props.fullCard.cardNum.length != 19 || props.fullCard.cardNum === 'XXXX XXXX XXXX XXXX' || props.fullCard.cardNum === '                   ' ) {
            alert('Please write a valid card number!')
        }
        else if (findCard) {
            alert('A card with this card number already exist!')
        }
        else if (props.fullCard.valid === 'MM/YY') {
            alert('Please enter the expiry date')
        }
        else if (props.fullCard.cardHolder === 'FIRSTNAME LASTNAME' || props.fullCard.cardHolder === "") {
            alert('Please enter a valid cardholder name')
        }
        else if (props.fullCard.ccv.length != 3 || props.fullCard.ccv === 'XXX' || props.fullCard.ccv === "") {
            alert('Please enter a valid CCV')
        }
        else if (props.fullCard.vendor === 'evil' && props.fullCard.ccv != '666') {
            alert('All cards from Evil Corp must have 666 as CCV number')
        }
        else {
            dispatch(addCard(props.fullCard))
            setTimeout(function(){
                dispatch(localStorageUpdate())
            }, 100)
            navigate('/')
        }
        
    }

    
    function handleCancelClick(event) {
        event.preventDefault();
        navigate('/')
    }

    function cardNum_format(value) {
        const v = value
          .replace(/\s+/g, "")
          .replace(/[^0-9]/gi, "")
          .substr(0, 16);
        const parts = [];
      
        for (let i = 0; i < v.length; i += 4) {
          parts.push(v.substr(i, 4));
        }
        return parts.length > 1 ? parts.join(" ") : value;
    }

    function onChangeCardNum(e) {
        const re = /^[0-9\b]+$/;
       
        for (let i = -1; i < e.target.value.length; i++) {
            const element = e.target.value[i];
            if (e.target.value === '' || re.test(e.target.value)) {
                props.setCardNum(e.target.value);
            }
            else if (element === " ") {
                props.setCardNum(e.target.value);
            }
        }
    };

    function onChangeCardHolder(e) {
        props.setCardHolder(e.target.value)
    }

    function valid_format(value) {
        const v = value
        .replace(/^./, "")
        .replace(/^./, "")
        .replace("-", "/")
        props.setValid(v)
    }

    function onChangeCcv(e) {
        const re = /^[0-9\b]+$/;
        for (let i = -1; i < e.target.value.length; i++) {
            const element = e.target.value[i];
            if (e.target.value === '' || re.test(e.target.value)) {
                props.setCcv(e.target.value);
            }
            else if (element === " ") {
                props.setCcv(e.target.value);
            }
        }

    }

    return (
        <form className='card-form'>
            <div className='card-form__input'>
                <label className='card-form__label' htmlFor="cardNum">CARD NUMBER</label>
                <input 
                 className='card-form__input-big'
                 name="cardNum" 
                 id="cardNum" 
                 type="text"
                 maxLength='19' 
                 onFocus={ () => props.setCardNum("")}
                 value={ cardNum_format(props.fullCard.cardNum) }
                 onChange={ onChangeCardNum }
                />
            </div>
            <div className='card-form__input'>
                <label className='card-form__label' htmlFor="holderName">CARDHOLDER NAME</label>
                <input 
                 className='card-form__input-big' 
                 type="text" 
                 maxLength="26"
                 name='holderName' 
                 id='holderName' 
                 value={ props.fullCard.cardHolder }
                 onFocus={ () => props.setCardHolder("")}
                 onChange={ onChangeCardHolder }
                />
            </div>
                <div className='card-form__smallinputs'>
                    <div className='card-form__small'>
                        <label className='card-form__label' htmlFor="valid">VALID THRU</label>
                        <input
                         className='card-form__small-input' 
                         type="month" 
                         name='valid' 
                         id='valid' 
                         onChange={(event) => valid_format(event.target.value)}
                        />
                    </div>
                    <div className='card-form__small'>
                        <label className='card-form__label' htmlFor="ccv">CCV</label>
                        <input
                         className='card-form__small-input' 
                         type="text" 
                         name="ccv" 
                         id="ccv"
                         maxLength="3"
                         value={ props.fullCard.ccv }
                         onFocus={ () => props.setCcv("")}
                         onChange={ onChangeCcv }
                        />
                    </div>
                </div>
                <div className='card-form__input'>
                    <label className='card-form__label' htmlFor="vendor">VENDOR</label>
                    <select className='card-form__input-big' name="vendor" id="vendor" onChange={(event) => props.setVendor(event.target.value)}>
                        <option value="bitcoin">BITCOIN INC</option>
                        <option value="ninja">NINJA BANK</option>
                        <option value="blockchain">BLOCK CHAIN INC</option>
                        <option value="evil">EVIL CORP</option>
                    </select>
                </div>
                <button className='card-form__button' onClick={ handleAddClick }>ADD CARD</button>
                <button className='card-form__button' onClick={ handleCancelClick }>CANCEL</button>
            </form>
    )
}

export default CardForm