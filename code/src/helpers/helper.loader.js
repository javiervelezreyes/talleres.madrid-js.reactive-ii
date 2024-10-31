const SCRIPT  = 'script'
const TYPE    = 'module'
const DEFAULT = '01'
const EXP     = 'tests\\.(\\d{2})\\.html(?:\\?key=(\\d{2}))?'

function Helper () {

  function Path() {
    let href    = window.location.href
    let rExp    = RegExp (EXP)
    let matches = href.match (rExp)
    let x = matches[1] 
    let y = matches[2] || DEFAULT
    return `/test/scripts/tests.${x}/test.${y}.js`
  }
  
  function load () {
    let path    = Path ()
    let script  = document.createElement (SCRIPT)
    script.src  = path
    script.type = TYPE
    document.head.appendChild (script)
  }

  load ()

}

export default Helper ()
