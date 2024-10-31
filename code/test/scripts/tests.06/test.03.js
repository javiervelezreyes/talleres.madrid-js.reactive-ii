import Stream   from '../../../src/model/stream.js'
import CFactory from '../../../src/model/agents/agent.consumers.js'
import PFactory from '../../../src/model/agents/agent.producers.js'
import execute  from '../../../src/helpers/helper.execute.js'
import Ports    from '../../../src/helpers/helper.port.js'
import Tests    from '../../../src/helpers/helper.tests.js'

const E = 'mousemove'
const L =   'Low, Medium, High'.split (',')
const R = 'yellow, orange, red'.split (',')
const T = 250

let {Pos}     = Tests
let {SpeedXY} = Tests
let {Labels}  = Tests
let {Colors}  = Tests

let SX = Stream ()
let SY = Stream ()
let P  = Ports.Pool ()
let S  = PFactory.Event (P, E)
let C  = CFactory.Simple ()
let CX = CFactory.Signal ()
let CY = CFactory.Simple ()

S
  .map      (Pos (P))
  .sequence (T)
  .map      (SpeedXY)
  .flood    (SX, SY)
  .receive  (C)

SX
  .map (Colors (R))
  .receive (CX)

SY
  .map     (Labels (L))
  .receive (CY)

execute (function () {
  S.start ()
})

