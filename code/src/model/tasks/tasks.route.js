import Stream from '../stream.js'
import Helper from '../../helpers/helper.tasks.js'

function Tasks (istream) {

  let {Size} = Helper

  function merge (...estreams) {
    let ostream = Stream ()
    let streams = [...estreams, istream]
    let xs      = []
    let idx     = 0
    while (idx < Size (streams)) {
      (function (idx) {
        streams[idx].receive ({
          execute (x) {
            xs[idx] = x
            ostream.send (xs)
          },
          end () { ostream.close () }
        })
      })(idx)
      idx++
    }
    return ostream
  }

  function mix (...estreams) {
    let ostream = Stream ()
    let streams = [...estreams, istream]
    streams.forEach (function (stream) {
      stream.receive ({
        execute (x) {
          ostream.send (x)
        },
        end () { ostream.close () }
      })
    })
    return ostream
  }

  function flood (...estreams) {
    let ostream = Stream ()
    let streams = [ostream, ...estreams]
    istream.receive ({
      execute (x) {
        streams.forEach (function (stream) {
          stream.send (x)
        })
      },
      end () { ostream.close () }
    })
    return ostream
  }

  function route (fn, estreams) {
    let ostream = Stream ()
    istream.receive ({
      execute (x) {
        let idx    = fn (x)
        let stream = estreams[idx] || ostream
        stream.send (x)
      },
      end () { ostream.close () }
    })
    return ostream
  }

  function round (...estreams) {
    let ostream = Stream ()
    let idx     = 0
    istream.receive ({
      execute (x) {
        let stream = estreams[idx]
         stream.send (x)
        ostream.send (x)
        idx = (idx + 1) % Size (estreams) 
      },
      end () { ostream.close () }
    })
    return ostream
  }

  istream
    .bind (merge)
    .bind (mix)
    .bind (flood)
    .bind (route)
    .bind (round)

  return istream

}

export default Tasks