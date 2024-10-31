const FROM    = [ '#console' , '#pool'  ]
const TO      = [ '#consoles', '#pools' ]
const CONTENT = 'content'
const NAME    = '.name'
const DATA    = '.data'
const STREAM  = '.stream'
const TEXT    = 'textContent'
const SHOW    = 'block'
const EMPTY   = ''

function Helper () {

  function Console (key) {
    let from   = document.querySelector (FROM[0])
    let to     = document.querySelector (TO[0])
    let node   = from[CONTENT].cloneNode (true)
    let name   = node.querySelector (NAME)
    let data   = node.querySelector (DATA)
    let stream = node.querySelector (STREAM)
    name[TEXT] = key
    to.appendChild (node)
    return [data, stream]
  }

  function Pool (key) {
    let from   = document.querySelector (FROM[1])
    let to     = document.querySelector (TO[1])
    let node   = from[CONTENT].cloneNode (true)
    let name   = node.querySelector (NAME)
    let data   = node.querySelector (DATA)
    name[TEXT] = key || EMPTY
    to.appendChild (node)
    loggers.style.display = SHOW
    return data
   }


  return {
    Console,
    Pool
  }
  
}

export default Helper ()
