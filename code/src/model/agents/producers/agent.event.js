import Stream from '../../stream.js'

function Agent (port, type) {

  let stream = Stream ()

  async function start () {
    port.addEventListener (type, function (event) {
      stream.send (event)
    })
  }
  
  stream.start = start
  return stream

}

export default Agent