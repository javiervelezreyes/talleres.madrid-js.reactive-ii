import Stream from '../../stream.js'
import Helper from '../../../helpers/helper.tasks.js'

let {Wait} = Helper

function Agent (min, max) {

  let stream = Stream ()

  async function start () {
    let idx = min
    while (idx <= max) {
      await Wait ()
      stream.send (idx)
      idx++
    }
    stream.close ()
  }
  
  stream.start = start
  return stream

}

export default Agent