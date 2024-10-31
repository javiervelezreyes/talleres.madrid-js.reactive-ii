import Stream   from '../../../src/model/stream.js'
import CFactory from '../../../src/model/agents/agent.consumers.js'
import PFactory from '../../../src/model/agents/agent.producers.js'
import execute  from '../../../src/helpers/helper.execute.js'
import Ports    from '../../../src/helpers/helper.port.js'
import Tests    from '../../../src/helpers/helper.tests.js'

const E = 'click'

let {One} = Tests
let {Add} = Tests

let SX = Stream ()
let SY = Stream ()
let P  = Ports.Pool ()
let S  = PFactory.Event (P, E)
let CX = CFactory.Simple ()
let CY = CFactory.Simple ()

S
  .map    (One)
  .reduce (Add, 0)
  .round  (SX, SY)

SX.receive (CX)
SY.receive (CY)

execute (function () {
  S.start ()
})

