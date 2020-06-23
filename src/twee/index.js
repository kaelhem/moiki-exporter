import { convertToHarlowe } from './twee-harlowe'
import { convertToSugarcube } from './twee-sugarcube'

export const convertToTwee = (story, format) => {
  if (format === 'harlowe') {
    return convertToHarlowe(story)
  }
  if (format === 'sugarcube') {
    return convertToSugarcube(story)
  }
  throw new Error('This format is unvailable!')
}