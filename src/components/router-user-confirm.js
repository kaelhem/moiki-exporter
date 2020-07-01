import React from 'react'
import ReactDOM from 'react-dom'
import { Confirm } from 'semantic-ui-react'

export const getUserConfirmation = (message, callback) => {
  
  const modal = document.createElement('div')
  document.body.appendChild(modal)
  
  const withCleanup = (answer) => {
    ReactDOM.unmountComponentAtNode(modal)
    document.body.removeChild(modal)
    callback(answer)
  }
  
  ReactDOM.render(
    <Confirm
      open={true}
      size='tiny'
      header={`Etes-vous sur de vouloir quitter cette page ?`}
      content={`Les modifications apportées ne sont pas enregistrées et seront perdues !`}
      onCancel={() => withCleanup(false)}
      onConfirm={() => withCleanup(true)}
      cancelButton='Annuler'
      confirmButton='Continuer'
    />,
    modal
  )
}