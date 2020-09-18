import { types as storyTypes } from 'core/reducers/story'

export const types = {
  INIT_PDF: 'moiki-exp/pdf/INIT_PDF',
  UPDATE_STORY: 'moiki-exp/pdf/UPDATE_STORY',
  SHUFFLE_SEQUENCES: 'moiki-exp/pdf/SHUFFLE_SEQUENCES',
  UPDATE_SETTINGS: 'moiki-exp/pdf/UPDATE_SETTINGS',
  RESET_SETTINGS: 'moiki-exp/pdf/RESET_SETTINGS',
}

const initialState = {
  simplifiedStory: null,
  settings: {
    format: 'A4',
    font: 'courier',
    fontSize: 12,
    margins : {
      top: 72,
      bottom: 72,
      left: 72,
      right: 72
    },
    avoidSequencesSplitting: false
  }
}

export default function pdfReducer(state = initialState, action = {}) {
  switch (action.type) {
    case storyTypes.CLEAR: {
      return {
        ...state,
        showView: false,
        simplifiedStory: null
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
    case types.UPDATE_STORY: {
      return {
        ...state,
        simplifiedStory: action.payload
      }
    }
    default:
      return state
  }
}

export const actions = {
  initPdf: () => ({type: types.INIT_PDF}),
  updateStory: (story) => ({type: types.UPDATE_STORY, payload: story}),
  shuffleSequences: () => ({type: types.SHUFFLE_SEQUENCES}),
  updateSettings: (settings) => ({type: types.UPDATE_SETTINGS, payload: settings}),
  resetDefault: () => ({type: types.RESET_SETTINGS}),
  showView: (status) => ({type: types.SHOW_PDF_VIEW, payload: status})
}

export const selectors = {
  isPdfView: (state) => state.pdf.showView, 
  settings: (state) => state.pdf.settings,
  story: (state) => state.pdf.simplifiedStory
}