const FROM    = '#action'
const TO      = '#actions'
const BUTTON  = 'button'
const CONTENT = 'content'
const EVENT   = 'click'
const SPC     = ' '
 
function Helper (key, fn) {
  !fn && (fn = key) && (key = fn.name) 
  let from   = document.querySelector (FROM)
  let to     = document.querySelector (TO)
  let node   = from[CONTENT].cloneNode (true)
  let button = node.querySelector (BUTTON)
  key && (button.textContent +=  SPC + key)
  button.addEventListener (EVENT, fn)
  to.appendChild (node)
}

export default Helper
