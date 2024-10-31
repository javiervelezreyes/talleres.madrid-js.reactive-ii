import CFactory from '../../../src/model/agents/agent.consumers.js'
import PFactory from '../../../src/model/agents/agent.producers.js'
import execute  from '../../../src/helpers/helper.execute.js'
import Ports    from '../../../src/helpers/helper.port.js'

const X = 'X'
const Y = 'Y'
const E = 'click'

let P  = Ports.Pool ()
let PX = PFactory.Event (P, E)
let PY = PFactory.Event (P, E)

let CX = CFactory.Complex (X)
let CY = CFactory.Complex (Y)

PX.receive (CX)
PY.receive (CY)

execute (function () {
  PX.start ()
  PY.start ()
})

