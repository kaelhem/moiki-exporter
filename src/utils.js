const getDate = () => {
  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }
  return new Date().toLocaleDateString('en-US', dateOptions)
}

export const getHeader = (storyId) => (
`This story was created with Moiki, and converted with Moiki-Exporter
More info: https://github.com/kaelhem/moiki-exporter
Launch it with the Moiki player: https://moiki.fr/story/${storyId}
Exported on ${getDate()}`
)

export const getAuthor = (story) => {
  if (story && story.author) {
    const { firstname, lastname, pseudo } = story.author
    return pseudo ? pseudo : firstname + ' ' + lastname
  }
  return 'Inconnu'
}