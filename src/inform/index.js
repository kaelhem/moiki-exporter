import { convertToInform6 } from './inform6'
import * as inform6Utils from './inform6-utils'

const convertToInform = (story, format, options) => {
  if (format === 'inform6') {
    return convertToInform6(story, options)
  }
  throw new Error('This format is unvailable!')
}

export {
  inform6Utils,
  convertToInform
}