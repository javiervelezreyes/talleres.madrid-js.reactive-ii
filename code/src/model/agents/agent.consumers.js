import Base    from './consumers/agent.base.js'
import Simple  from './consumers/agent.simple.js'
import Signal  from './consumers/agent.signal.js'
import Complex from './consumers/agent.complex.js'

function Factory () {

  return {
    Base,
    Simple,
    Complex,
    Signal,
  }

}

export default Factory ()