import CFactory from '../../../src/model/agents/agent.consumers.js'
import PFactory from '../../../src/model/agents/agent.producers.js'
import execute  from '../../../src/helpers/helper.execute.js'
import Ports    from '../../../src/helpers/helper.port.js'

const X = 'X'
const E = 'click'
const L = 'A, B, C'.split (',')
const R = {
  'AB' : 'D',
  'CA' : 'E',
  'BA' : 'F',
}
const TX = 500
const TY = 5000

let P  = Ports.Pool ()
let PX = PFactory.Event (P, E)
let CX = CFactory.Simple (X)

PX
  .sequence (TX, L)
  .serie    (TY, R)
  .receive  (CX)

execute (function () {
  PX.start ()
})

