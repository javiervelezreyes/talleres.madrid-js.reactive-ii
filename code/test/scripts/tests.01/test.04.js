import CFactory from '../../../src/model/agents/agent.consumers.js'
import PFactory from '../../../src/model/agents/agent.producers.js'
import execute  from '../../../src/helpers/helper.execute.js'

const X = 'X'
const Y = 'Y'

let PX = PFactory.Stream ('---a--a--a---')
let PY = PFactory.Stream ('b-----------b')

let CX = CFactory.Complex (X)
let CY = CFactory.Complex (Y)

PX.receive (CX)
PY.receive (CY)

execute (function () {
  PX.start ()
  PY.start ()
})