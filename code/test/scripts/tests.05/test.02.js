import CFactory from '../../../src/model/agents/agent.consumers.js'
import PFactory from '../../../src/model/agents/agent.producers.js'
import execute  from '../../../src/helpers/helper.execute.js'
import Ports    from '../../../src/helpers/helper.port.js'

const X = 'X'
const E = 'click'
const L = 'A, B, C'.split (',')
const T = 500

let P  = Ports.Pool ()
let PX = PFactory.Event (P, E)
let CX = CFactory.Simple (X)

PX
  .sequence (T, L)
  .receive  (CX)

execute (function () {
  PX.start ()
})

