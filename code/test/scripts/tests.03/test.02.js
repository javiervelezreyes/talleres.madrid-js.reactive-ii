import CFactory from '../../../src/model/agents/agent.consumers.js'
import PFactory from '../../../src/model/agents/agent.producers.js'
import execute  from '../../../src/helpers/helper.execute.js'
import Ports    from '../../../src/helpers/helper.port.js'
import Tests    from '../../../src/helpers/helper.tests.js'

const X = 'X'
const Y = 'Y'
const E = 'mousemove'
const K = 5

let {PosX}   = Tests
let {PosY}   = Tests
let {ScaleX} = Tests
let {ScaleY} = Tests

let P  = Ports.Pool ()
let PX = PFactory.Event (P, E)
let PY = PFactory.Event (P, E)
let CX = CFactory.Simple (X)
let CY = CFactory.Simple (Y)

PX
  .map     (PosX   (P))
  .map     (ScaleX (P, K))
  .receive (CX)

PY
  .map     (PosY   (P))
  .map     (ScaleY (P, K))
  .receive (CY)

execute (function () {
  PX.start ()
  PY.start ()
})

