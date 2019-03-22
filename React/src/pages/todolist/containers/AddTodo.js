import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

const AddTodo = ({ _addTodo }) => {
  let input

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        _addTodo(input.value);
        input.value = ''
      }}>
        <input ref={node => input = node} />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
}

// const mapStateToProps = state => state

const mapDispatchToProps = (dispatch) => ({
  _addTodo: (value) => dispatch(addTodo(value))
})

export default connect(null, mapDispatchToProps)(AddTodo)
