import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, refs) => {
  const [visible, set_visible] = useState(false)
  const hide_when_visible = { display: visible ? 'none' : '' }
  const show_when_visible = { display: visible ? '' : 'none' }

  const toggle_visibility = () => {
    set_visible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggle_visibility
    }
  })

  return (
    <div>
      <div style={hide_when_visible}>
        <button onClick={toggle_visibility}>{props.button_label}</button>
      </div>
      <div style={show_when_visible}>
        {props.children}
        <button onClick={toggle_visibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable