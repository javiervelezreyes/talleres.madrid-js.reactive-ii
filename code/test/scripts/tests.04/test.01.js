import CFactory from '../../../src/model/agents/agent.consumers.js'
import PFactory from '../../../src/model/agents/agent.producers.js'
import execute  from '../../../src/helpers/helper.execute.js'
import Ports    from '../../../src/helpers/helper.port.js'
import Tests    from '../../../src/helpers/helper.tests.js'

const X  = 'X'
const Y  = 'Y'
const E  = 'mousemove'
const LX = ',   Vertical'.split (',') 
const LY = ', Horizontal'.split (',') 
const N  = 20
const K  = 10

let {PosX}   = Tests
let {PosY}   = Tests
let {Bound}  = Tests
let {Labels} = Tests

let P  = Ports.Pool ()
let PX = PFactory.Event (P, E)
let PY = PFactory.Event (P, E)
let CX = CFactory.Simple (X)
let CY = CFactory.Simple (Y)

PX
  .map     (PosX (P))
  .take    (N)
  .map     (Bound  (K))
  .map     (Labels (LX))
  .receive (CX)

PY
  .map     (PosY (P))
  .take    (N)
  .map     (Bound  (K))
  .map     (Labels (LY))
  .receive (CY)

execute (function () {
  PX.start ()
  PY.start ()
})

