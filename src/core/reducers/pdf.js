import { types as storyTypes } from 'core/reducers/story'

export const types = {
  SHOW_PDF_VIEW: 'moiki-exp/pdf/SHOW_PDF_VIEW',
  UPDATE_SETTINGS: 'moiki-exp/pdf/UPDATE_SETTINGS',
  RESET_SETTINGS: 'moiki-exp/pdf/RESET_SETTINGS',
}

const initialState = {
  showView: false,
  settings: {
    format: 'A4',
    font: 'courier',
    fontSize: 12,
    margins : {
      top: 72,
      bottom: 72,
      left: 72,
      right: 72
    }
  }
}

export default function pdfReducer(state = initialState, action = {}) {
  switch (action.type) {
    case storyTypes.CLEAR: {
      return {
        ...state,
        showView: false
      }
    }
    case types.SHOW_PDF_VIEW: {
      return {
        ...state,
        showView: action.payload
      }
    }
    case types.UPDATE_SETTINGS: {
      return {
        ...state,
        settings: action.payload
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
  showView: (status) => ({type: types.SHOW_PDF_VIEW, payload: status}),
  updateSettings: (settings) => ({type: types.UPDATE_SETTINGS, payload: settings}),
  resetDefault: () => ({type: types.RESET_SETTINGS})
}

export const selectors = {
  isPdfView: (state) => state.pdf.showView, 
  settings: (state) => state.pdf.settings
}