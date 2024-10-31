import Stream from '../../stream.js'
import Helper from '../../../helpers/helper.tasks.js'

const WAIT = '-'

let {Wait} = Helper

function Agent (data) {

  let stream = Stream ()

  async function start () {
    for (let value of data) {
      if (value == WAIT) await Wait (200)
      else stream.send (value)
    }
    stream.close ()
  }
  
  stream.start = start
  return stream

}

export default Agent