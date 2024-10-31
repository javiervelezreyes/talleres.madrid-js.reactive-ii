import Stream   from '../../../src/model/stream.js'
import CFactory from '../../../src/model/agents/agent.consumers.js'
import execute  from '../../../src/helpers/helper.execute.js'

const X = 'X'
const Y = 'Y'

let SX = Stream ()
let SY = Stream ()

let CX = CFactory.Complex (X)
let CY = CFactory.Complex (Y)

SX.receive (CX)
SY.receive (CY)

execute (function () {
  SX
    .send (1)
    .send (2)
    .send (3)
})

execute (function () {
  SY
    .send (1)
    .send (2)
    .send (3)
})