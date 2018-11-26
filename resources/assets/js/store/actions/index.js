import * as ActionTypes from '../action-types'

export function authLogin(payload){
    return {
        type: ActionTypes.AUTH_LOGIN,
        payload
    }
}

export function authLogout(){
    return {
        type: ActionTypes.AUTH_LOGOUT
    }
}

export function authCheck(){
    return {
        type:ActionTypes.AUTH_CHECK
    }
}

export function openModal(modalProps) {
    return {
        type: MODAL_OPEN,
        payload: modalProps
    };
}

export function closeModal() {
    return {
        type: MODAL_CLOSE
    }
}
