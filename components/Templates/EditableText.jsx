export default function EditableText(props) {
  
    return (
      <h1 role={"textbox"} spellCheck="false" onBlur={(e) => props.handlerChange(e.target.textContent)} maxLength={10} autoFocus={props.autoFocus} contentEditable data-placeholder={props.placeholder} className={`editable-text ${props.customCss}`}>{props.value}</h1>
    )
  }
  