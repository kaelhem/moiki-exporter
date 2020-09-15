import { convertToI6Raw } from './i6-raw'
import { convertToI6WithParser } from './i6-with-parser'

export const convertToInform = (story, format) => {
  if (format === 'with-parser') {
    return convertToI6WithParser(story)
  }
  if (format === 'standard') {
    return convertToI6Raw(story)
  }
  throw new Error('This format is unvailable!')
}