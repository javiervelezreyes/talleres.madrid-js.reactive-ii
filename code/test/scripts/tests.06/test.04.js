import Stream   from '../../../src/model/stream.js'
import CFactory from '../../../src/model/agents/agent.consumers.js'
import PFactory from '../../../src/model/agents/agent.producers.js'
import execute  from '../../../src/helpers/helper.execute.js'
import Ports    from '../../../src/helpers/helper.port.js'
import Tests    from '../../../src/helpers/helper.tests.js'

const E = 'mousemove'
const T = 250
const M = 200
const L = 3

let {Pos}     = Tests
let {SpeedXY} = Tests
let {Scale}   = Tests

let SX = Stream ()
let SY = Stream ()
let SZ = Stream ()
let P  = Ports.Pool ()
let S  = PFactory.Event (P, E)
let CX = CFactory.Simple ()
let CY = CFactory.Simple ()
let CZ = CFactory.Simple ()

S
  .map      (Pos (P))
  .sequence (T)
  .map      (SpeedXY)
  .route    (Scale (M, L), [SX, SY, SZ])

SX.receive (CX)
SY.receive (CY)
SZ.receive (CZ)

execute (function () {
  S.start ()
})

