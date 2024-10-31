import CFactory from '../../../src/model/agents/agent.consumers.js'
import PFactory from '../../../src/model/agents/agent.producers.js'
import execute  from '../../../src/helpers/helper.execute.js'

const X = 'X'
const Y = 'Y'

let PX = PFactory.Range (10, 15)
let PY = PFactory.Range (20, 25)

let CX = CFactory.Complex (X)
let CY = CFactory.Complex (Y)

PX.receive (CX)
PY.receive (CY)

execute (function () {
  PX.start ()
  PY.start ()
})