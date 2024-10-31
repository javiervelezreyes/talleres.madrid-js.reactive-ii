import Stream   from '../../../src/model/stream.js'
import CFactory from '../../../src/model/agents/agent.consumers.js'
import PFactory from '../../../src/model/agents/agent.producers.js'
import execute  from '../../../src/helpers/helper.execute.js'
import Ports    from '../../../src/helpers/helper.port.js'
import Tests    from '../../../src/helpers/helper.tests.js'

const E = 'mousemove'
const K = 5
const D = '·'
const L = 'Wall, Space'.split (',')
const M = `
  ····X
  XXX·X
  X···X
  X·XXX
  X····
`

let {PosX}    = Tests
let {PosY}    = Tests
let {ScaleX}  = Tests
let {ScaleY}  = Tests
let {Matrix}  = Tests
let {Found}   = Tests
let {Labels}  = Tests

let S  = Stream ()
let P  = Ports.Pool ()
let PX = PFactory.Event (P, E)
let PY = PFactory.Event (P, E)
let C  = CFactory.Simple ()

S.mix (
  PX
    .map (PosX   (P))
    .map (ScaleX (P, K)),
  PY
    .map (PosY   (P))
    .map (ScaleY (P, K))
)
  .take (2)
  .map  (Found (Matrix (M), D))
  .map  (Labels (L))
  .receive (C)

execute (function () {
  PX.start ()
  PY.start ()
})

