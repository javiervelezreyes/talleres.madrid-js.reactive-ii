import Port    from './helper.port.js'
import THelper from './helper.tasks.js'

const ON    = true
const OFF   = false

const TEXT  = 'textContent'
const NONE  = '·'
const ACK   = 'o'

let {Delay}       = THelper
let {IsEmpty}     = THelper
let {IsPrimitive} = THelper
let working       = OFF

function Helper (key) {

  let [dport, sport] = Port.Console (key)

  let data   = []
  let active = OFF
  let timer

  function write () {
    if (IsEmpty (data)) {
      working && (sport[TEXT] = sport[TEXT] + NONE)
    } 
    else {
      let value   = data.shift ()
          value   = IsPrimitive (value) && value || ACK
      dport[TEXT] = value
      sport[TEXT] = sport[TEXT] + value
      working = ON
    }
    sport.scrollLeft = sport.scrollWidth
  }
  
  function start () {
    if (!active) {
      active = ON
      timer  = setInterval (write, Delay/2)
    }
  }

  function stop () {
    if (active) {
      clearInterval (timer)
      write ()
      active = OFF
    }
  }

  function info (value) {
    data.push (value)
  }

  function set (value) {
    dport[STYLE][BKCOLOR] = value
  }

  start ()

  return {
    start,
    stop,
    info,
    set
  }

}

export default Helper