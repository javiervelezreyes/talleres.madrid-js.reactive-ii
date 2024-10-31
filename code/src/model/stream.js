import TCore  from './tasks/tasks.core.js'
import TGroup from './tasks/tasks.group.js'
import TRoute from './tasks/tasks.route.js'
import TTime  from './tasks/tasks.time.js'

function Stream () {

  let agents = []
  
  function bind (task) {
    let key   = task.name
    let fn    = task 
    this[key] = fn
    return this
  }

  function send (value) {
    for (let {execute} of agents) {
      execute && execute (value)
    }
    return this
  }

  function receive (agent) {
    agents = [...agents, agent]
    return this
  }

  function close () {
    for (let {end} of agents) {
       end && end ()
    }
  }

  let stream = { 
    bind, 
    send, 
    receive, 
    close 
  }

  TCore  (stream)
  TGroup (stream)
  TRoute (stream)
  TTime  (stream)
  
  return stream

}

export default Stream