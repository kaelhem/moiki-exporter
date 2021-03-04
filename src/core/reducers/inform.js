import { inform6Utils } from 'moiki-exporter'

export const types = {
  UPDATE_SETTINGS: 'moiki-exp/inform/UPDATE_SETTINGS',
  RESET_SETTINGS: 'moiki-exp/inform/RESET_SETTINGS',
}

const initialState = {
  settings: {
    ...inform6Utils.informDefaultSettings
  }
}

export default function informReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.UPDATE_SETTINGS: {
      return {
        ...state,
        settings: {...state.settings, ...action.payload}
      }
    }
    case types.RESET_SETTINGS: {
      return {
        ...state,
        settings: initialState.settings
      }
    }
    default:
      return state
  }
}

export const actions = {
  updateSettings: (settings) => ({type: types.UPDATE_SETTINGS, payload: settings}),
  resetDefault: () => ({type: types.RESET_SETTINGS})
}

export const selectors = {
  settings: (state) => state.inform.settings
}