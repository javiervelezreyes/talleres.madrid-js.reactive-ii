import Stream from '../stream.js'
import Helper from '../../helpers/helper.tasks.js'

function Tasks (istream) {

  let {IsFull} = Helper

  function take (n) {
    let ostream = Stream ()
    let full    = IsFull (n)   
    let xs      = []
    istream.receive ({
      execute (x) {
        xs = [...xs, x]
        full (xs) && ostream.send (xs)
        full (xs) && (xs = [])
      }, 
      end () { ostream.close () }
    })
    return ostream
  }

  function skip (n) {
    let ostream = Stream ()
    let full    = IsFull (n)   
    let xs      = []
    istream.receive ({
      execute (x) {
         full (xs) && ostream.send (x)
        !full (xs) && (xs = [...xs, x])
      },
      end () { ostream.close () }
    })
    return ostream
  }

  function first (n) {
    let ostream = Stream ()
    let full    = IsFull (n)   
    let xs      = []
    istream.receive ({
      execute (x) {
        !full (xs) && (xs = [...xs, x]) && ostream.send (xs)
      },
      end () { ostream.close () }
    })
    return ostream
  }

  function last (n) {
    let ostream = Stream ()
    let full    = IsFull (n) 
    let xs      = []
    istream.receive ({
      execute (x) {
        full (xs) && ostream.send (xs)
        full (xs) && xs.shift ()
        xs = [...xs, x]
      },
      end () { ostream.close () } 
    })
    return ostream
  }

  istream
    .bind (take)
    .bind (skip)
    .bind (first)
    .bind (last)
    
  return istream

}

export default Tasks