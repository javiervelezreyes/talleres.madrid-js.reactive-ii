import Port from './helper.port.js'

const TEXT    = 'textContent'
const STYLE   = 'style'
const BKCOLOR = 'background'

function Helper (key) {

  let [dport] = Port.Console (key)

  function info (value) {
    dport[TEXT] = value
  }

  function set (value) {
    dport[STYLE][BKCOLOR] = value
  }

  return { info, set }

}

export default Helper