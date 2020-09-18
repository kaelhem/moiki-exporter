export const types = {
  IMPORT: 'moiki-exp/story/IMPORT',
  IMPORT_SUCCESS: 'moiki-exp/story/IMPORT_SUCCESS',
  IMPORT_ERROR: 'moiki-exp/story/IMPORT_ERROR',
  EXPORT: 'moiki-exp/story/EXPORT',
  EXPORT_ERROR: 'moiki-exp/story/EXPORT_ERROR',
  CLEAR: 'moiki-exp/story/CLEAR'
}

const initialState = {
  pending: false,
  error: null,
  story: null,
  exportPending: false,
  exportError: null
}

export default function storyReducer(state = {}, action = {}) {
  switch (action.type) {
    case types.IMPORT: {
      return {
        ...initialState,
        pending: true
      }
    }
    case types.IMPORT_ERROR: {
      return {
        ...initialState,
        error: action.payload
      }
    }
    case types.IMPORT_SUCCESS: {
      return {
        ...initialState,
        story: action.payload
      }
    }
    case types.EXPORT: {
      return {
        ...state,
        exportPending: true
      }
    }
    case types.EXPORT_ERROR: {
      return {
        ...state,
        exportPending: false,
        exportError: action.payload
      }
    }
    case types.CLEAR: {
      return initialState
    }
    default:
      return state
  }
}

export const actions = {
  import: (file) => ({type: types.IMPORT, payload: file}),
  export: (format, options={}) => ({type: types.EXPORT, payload: {format, options}}),
  clear: () => ({type: types.CLEAR})
}

export const messages = {
  importError: (error) => ({type: types.IMPORT_ERROR, payload: error}),
  importSuccess: (data) => ({type: types.IMPORT_SUCCESS, payload: data}),
  exportError: (error) => ({type: types.EXPORT_ERROR, payload: error})
}

export const selectors = {
  pending: (state) => state.story.pending,
  error: (state) => state.story.error,
  story: (state) => state.story.story,
  exportPending: (state) => state.story.exportPending,
  exportError: (state) => state.story.exportError
}