const initialState = {
    cards: [
        {
            cardNum: "9572 9999 2034 6626",
            cardHolder: "MORGOTH BAUGLIR",
            valid: "15/24",
            ccv: "666",
            vendor: "evil",
            isActive: 'active'

        },
        {
            cardNum: "1573 9999 2034 6626",
            cardHolder: "BARBA DADDY",
            valid: "15/24",
            ccv: "336",
            vendor: "bitcoin",
            isActive: 'notActive'
        },
        {
            cardNum: "1472 9999 2034 6626",
            cardHolder: "CARL BERGMAN",
            valid: "15/24",
            ccv: "157",
            vendor: "blockchain",
            isActive: 'notActive'
        }
    ]
}

const reducer = (state = initialState, action) => {
    

    switch (action.type) {
        case 'NEW-CARD':
            const newCards = [...state.cards, action.payload]
            return {
                ...state,
                cards: newCards
            }
        case 'SET-ACTIVE':
            const indexActiveCard = state.cards.findIndex(el => el == action.payload)
            state.cards.splice(indexActiveCard, 1);
            state.cards.unshift(action.payload)
            return {
                ...state,
                cards: state.cards.map((card) => {
                    if (card.cardNum === action.payload.cardNum) {
                        card.isActive = 'active'
                        return card
                    }
                    else {
                        card.isActive = 'notActive'
                        return card
                    }
                })
            }
            
        case 'REMOVE-CARD':
            return {
                ...state,
                cards: state.cards.filter((card) => {
                    if (card.cardNum === action.payload.cardNum) {
                        if (state.cards[state.cards.length - 1].isActive === 'notActive') {
                            state.cards[state.cards.length - 1].isActive = 'active'
                        }
                        else if (state.cards.length === 1) {
                            
                        }
                        else if (state.cards[state.cards.length - 2].isActive === 'notActive') {
                            state.cards[state.cards.length - 2].isActive = 'active'
                        }
                        
                    }
                    else {
                        return card
                    }
                })
            }
        case 'UPDATE-LOCALSTORAGE':
            localStorage.setItem('MY-WALLET-CARDS', JSON.stringify(state.cards))
    
        default:
            const cardsFromStorage = JSON.parse(localStorage.getItem('MY-WALLET-CARDS'));
            if (cardsFromStorage) {
                return {
                    ...state,
                    cards: cardsFromStorage
                }
            }
            else {
                localStorage.setItem('MY-WALLET-CARDS', JSON.stringify(state.cards))
                return state
            }   
    }
}

export default reducer