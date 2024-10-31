import Logger from '../../../helpers/helper.logger.simple.js'

function Agent (key) {

  let logger = Logger (key)

  function execute (value) {
    logger.set (value) 
  }

  function end () {}

  return { 
    execute,
    end
  }

} 

export default Agent