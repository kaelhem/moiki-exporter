import { convertToHarlowe } from './twee-harlowe'

export const convertToTwee = (story, format) => {
  if (format === 'harlowe') {
    return convertToHarlowe(story)
  }
  throw new Error('This format is unvailable!')
}