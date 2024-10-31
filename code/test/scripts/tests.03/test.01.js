import CFactory from '../../../src/model/agents/agent.consumers.js'
import PFactory from '../../../src/model/agents/agent.producers.js'
import execute  from '../../../src/helpers/helper.execute.js'
import Ports    from '../../../src/helpers/helper.port.js'
import Tests    from '../../../src/helpers/helper.tests.js'

const X = 'X'
const Y = 'Y'
const E = 'mousemove'

let {PosX} = Tests
let {PosY} = Tests

let P  = Ports.Pool ()
let PX = PFactory.Event (P, E)
let PY = PFactory.Event (P, E)
let CX = CFactory.Simple (X)
let CY = CFactory.Simple (Y)

PX
  .map     (PosX (P))
  .receive (CX)

PY
  .map     (PosY (P))
  .receive (CY)

execute (function () {
  PX.start ()
  PY.start ()
})

