import CFactory from '../../../src/model/agents/agent.consumers.js'
import PFactory from '../../../src/model/agents/agent.producers.js'
import execute  from '../../../src/helpers/helper.execute.js'
import Ports    from '../../../src/helpers/helper.port.js'
import Tests    from '../../../src/helpers/helper.tests.js'

const X = 'X'
const Y = 'Y'
const E = 'click'

let {One}     = Tests
let {Add}     = Tests
let {Less}    = Tests
let {Greater} = Tests

let P  = Ports.Pool ()
let PX = PFactory.Event (P, E)
let CX = CFactory.Complex (X)
let CY = CFactory.Complex (Y)

PX
  .map     (One)
  .reduce  (Add, 0)
  .filter  (Greater (5))
  .filter  (Less   (10))
  .receive (CX)
  .receive (CY)

execute (function () {
  PX.start ()
})

