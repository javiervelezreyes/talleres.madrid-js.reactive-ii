import CFactory from '../../../src/model/agents/agent.consumers.js'
import PFactory from '../../../src/model/agents/agent.producers.js'
import execute  from '../../../src/helpers/helper.execute.js'
import Ports    from '../../../src/helpers/helper.port.js'
import Tests    from '../../../src/helpers/helper.tests.js'

const X  = 'Delay'
const Y  = 'Debounce'
const Z  = 'Throttle'
const E  = 'click'
const T  = 3000

let {One} = Tests
let {Add} = Tests

let P  = Ports.Pool ()
let PX = PFactory.Event (P, E)
let CX = CFactory.Complex (X)
let CY = CFactory.Complex (Y)
let CZ = CFactory.Complex (Z)
let C  = CFactory.Complex (X)

let SX = PX
  .map    (One)
  .reduce (Add, 0)

SX             .receive (C)
SX.delay    (T).receive (CX)
SX.debounce (T).receive (CY)
SX.throttle (T).receive (CZ)

execute (function () {
  PX.start ()
})

