import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createProject } from '../features/projects/projectSlice'
import { FaPlus } from 'react-icons/fa'

function ProjectForm() {
  const [text, setText] = useState('')
  const dispatch = useDispatch()
  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createProject({ text }))
    setText('')
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <button className='btn add' type='submit'>
           <FaPlus /> Add Project
          </button>
        </div>
        <div className='form-group'>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </form>
    </section>
  )
}

export default ProjectForm
