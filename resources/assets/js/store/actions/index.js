import * as ActionTypes from '../action-types'

export function authLogin(payload) {
    return {
        type: ActionTypes.AUTH_LOGIN,
        payload
    }
}

export function authLogout() {
    return {
        type: ActionTypes.AUTH_LOGOUT
    }
}

export function authCheck() {
    return {
        type: ActionTypes.AUTH_CHECK,
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

export const updateLayout = data => ({
    type: UPDATE_LAYOUT,
    payload: data
});

export const toggleSidenav = () => ({
    type: TOGGLE_SIDENAV
});

export const setSidenavOpen = data => ({
    type: SET_SIDENAV_OPEN,
    payload: data
});

export const toggleSidenavVariant = data => ({
    type: TOGGLE_SIDENAV_VARIANT,
    payload: data
});

export const toggleNotifications = () => ({
    type: TOGGLE_NOTIFICATIONS
});