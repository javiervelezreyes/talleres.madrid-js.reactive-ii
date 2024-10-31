import Stream from '../stream.js'

function Tasks (istream) {

  function map (fn) {
    let ostream = Stream ()
    istream.receive ({
      execute (x) {
        ostream.send (fn (x))
      },
      end () { ostream.close () }
    })
    return ostream
  }

  function reduce (fn, y) {
    let ostream = Stream ()
    istream.receive ({
      execute (x) {
        ostream.send (y = fn (y, x))
      }, 
      end () { ostream.close () }
    })
    return ostream
  }

  function filter (pn) {
    let ostream = Stream ()
    istream.receive ({
      execute (x) {
        pn (x) && ostream.send (x)
      },
      end () { ostream.close () }
    })
    return ostream
  }

  function find (pn) {
    let ostream = Stream ()
    let end
    istream.receive ({
      execute (x) {
        !end && pn (x) && ostream.send (x)
         end = end || pn (x)
      },
      end () { ostream.close () }
    })
    return ostream
  }

  istream
    .bind (map)
    .bind (reduce)
    .bind (filter)
    .bind (find)

  return istream

}

export default Tasks