import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const Dropzone = ({ onDataLoaded, content }) => {
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0]
    const ext = (file.name.split('.').reverse()[0] || '').toLowerCase()
    const reader = new FileReader()
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = (e) => console.log('file reading has failed', e)
    reader.onload = ({target}) => {
      onDataLoaded({ext, name: file.name, content: target.result})
    }
    switch (ext) {
      case 'html':
      case 'json': return reader.readAsText(file)
      default: return reader.readAsArrayBuffer(file)
    }
  }, [onDataLoaded])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({ onDrop })

  return (
    <div className='dropzone' style={ isDragActive ? { background: '#99ddbb' } : {}} { ...getRootProps() }>
      <input { ...getInputProps() } />
      { content }
      <p style={{ fontSize: '.7em', marginTop: 0 }}>(or click to browse)</p>
    </div>
  )
}

export default Dropzone