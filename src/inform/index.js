import { convertToInform6 } from './inform6'

export * as inform6Utils from './inform6-utils'

export const convertToInform = (story, format, options) => {
  if (format === 'inform6') {
    return convertToInform6(story, options)
  }
  throw new Error('This format is unvailable!')
}