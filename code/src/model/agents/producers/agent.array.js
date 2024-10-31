import Stream from '../../stream.js'
import Helper from '../../../helpers/helper.tasks.js'

let {Wait} = Helper

function Agent (data) {

  let stream = Stream ()

  async function start () {
    for (let value of data) {
      await Wait ()
      stream.send (value)
    }
    stream.close ()
  }
  
  stream.start = start
  return stream

}

export default Agent