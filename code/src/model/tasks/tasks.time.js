import Stream from '../stream.js'
import Helper from '../../helpers/helper.tasks.js'

const NONE = ''

function Tasks (istream) {

  let {Time}    = Helper
  let {Reset}   = Helper
  let {Size}    = Helper

  function delay (ms) {
    let ostream = Stream ()
    istream.receive ({
      execute (x) {
        setTimeout (function () {
          ostream.send (x)
        }, ms)
      },
      end () { ostream.close () }
    })
    return ostream
  }

  function debounce (ms) {
    let ostream = Stream ()
    let timer
    istream.receive ({
      execute (x) {
        timer && clearTimeout (timer)
        timer = setTimeout (function () {
          ostream.send (x)
        }, ms)
      },
      end () { ostream.close () }
    })
    return ostream
  }

  function throttle (ms) {
    let ostream = Stream ()
    let last    = Time ()
    istream.receive ({
      execute (x) {
        let time = Time ()
        if (time - last > ms) {
          ostream.send (x)
          last = Time ()
        }        
      },
      end () { ostream.close () }
    })
    return ostream
  }

  function sequence (ms, tags) {
    let ostream = Stream ()
    let xs      = []
    let timer
    istream.receive ({
      execute (x) {
        xs = [...xs, x]
        !timer && (timer = setTimeout (function () {
          let idx = Size (xs) - 1
          if (tags) {
            let tag = tags[idx].trim ()
            ostream.send (tag)
          }
          else ostream.send (xs)
          timer = Reset ()
          xs    = []
        }, ms))
      },
      end () { ostream.close () }
    })
    return ostream
  }

  function serie (ms, rules) {
    let ostream = Stream ()
    let xs      = []
    let timer
    istream.receive ({
      execute (x) {
        xs = [...xs, x]
        !timer && (timer = setTimeout (function () {
          let key = xs.join (NONE)
          let tag = rules[key]
          ostream.send (tag)
          timer = Reset ()
          xs    = []
        }, ms))
      },
      end () { ostream.close () }
    })
    return ostream
  }

  function group (ms, tags, tag) {
    let ostream = Stream  ()
    let xs      = new Set ()
    let ys      = new Set (tags.map(x => x.trim ()))
    let timer
    istream.receive ({
      execute (x) {
        xs.add (x)
        !timer && (timer = setTimeout (function () {
          let ok = ys.isSubsetOf (xs)
          ok && ostream.send (tag)
          timer = Reset ()
          xs.clear ()
        }, ms))
      },
      end () { ostream.close () }
    })
    return ostream
  }

  istream
    .bind (delay)
    .bind (debounce)
    .bind (throttle)
    .bind (sequence)
    .bind (serie)
    .bind (group)

  return istream

}

export default Tasks