import CFactory from '../../../src/model/agents/agent.consumers.js'
import PFactory from '../../../src/model/agents/agent.producers.js'
import execute  from '../../../src/helpers/helper.execute.js'
import Ports    from '../../../src/helpers/helper.port.js'

const X  = 'X'
const E  = 'click'
const LX = 'A, B, C'.split (',')
const LY = 'C, B'   .split (',')
const K  = 'E'
const TX = 500
const TY = 2000

let P  = Ports.Pool ()
let PX = PFactory.Event (P, E)
let CX = CFactory.Simple (X)

PX
  .sequence (TX, LX)
  .group    (TY, LY, K)
  .receive  (CX)

execute (function () {
  PX.start ()
})

