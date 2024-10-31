import CFactory from '../../../src/model/agents/agent.consumers.js'
import PFactory from '../../../src/model/agents/agent.producers.js'
import execute  from '../../../src/helpers/helper.execute.js'
import Ports    from '../../../src/helpers/helper.port.js'
import Tests    from '../../../src/helpers/helper.tests.js'

const X  = 'X'
const Y  = 'Y'
const E  = 'mousemove'
const N  = 50
const C  = 'ff0000'

let {PosX}    = Tests
let {PosY}    = Tests
let {Speed}   = Tests
let {Color}   = Tests

let P  = Ports.Pool ()
let PX = PFactory.Event (P, E)
let PY = PFactory.Event (P, E)
let CX = CFactory.Signal (X)
let CY = CFactory.Signal (Y)

PX
  .map     (PosX (P))
  .last    (N)
  .map     (Speed)
  .map     (Color (C))
  .receive (CX)

PY
  .map     (PosY (P))
  .last    (N)
  .map     (Speed)
  .map     (Color (C))
  .receive (CY)

execute (function () {
  PX.start ()
  PY.start ()
})

