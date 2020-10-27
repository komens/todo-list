const initState = {
    list: []
}

const ADD_EVENT = 'ADD_EVENT'

interface IAddEventPayload {
    type: string,
    name?:string
}

export const addEvent = (item: object) => {
    return {
        type: ADD_EVENT,
        item
    }
}

type TPayload = IAddEventPayload

export default (state = initState, {type, ...rest}:TPayload) => {
    switch(type) {
        case ADD_EVENT: {
            return state
        }
        default: {
            return state;
        }
    }
}