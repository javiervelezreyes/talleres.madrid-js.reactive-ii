import Array  from './producers/agent.array.js'
import Range  from './producers/agent.range.js'
import String from './producers/agent.string.js'
import Stream from './producers/agent.stream.js'
import Event  from './producers/agent.event.js'

function Factory () {

  return {
    Array,
    Range,
    String,
    Stream,
    Event,
  }

}

export default Factory ()