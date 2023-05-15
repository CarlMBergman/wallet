function addCard(value) {
    return {
        type: 'NEW-CARD',
        payload: value
    }
}

function setActive(value) {
    return {
        type: 'SET-ACTIVE', 
        payload: value
    }
}

function removeCard(value) {
    return {
        type: 'REMOVE-CARD',
        payload: value
    }
}

function localStorageUpdate() {
    return {
        type: 'UPDATE-LOCALSTORAGE'
    }
}


export { addCard, setActive, removeCard, localStorageUpdate }