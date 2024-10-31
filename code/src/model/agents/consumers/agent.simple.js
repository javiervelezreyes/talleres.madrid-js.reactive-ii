import Logger from '../../../helpers/helper.logger.simple.js'

function Agent (key) {

  let logger = Logger (key)

  function execute (value) {
    logger.info (value) 
  }

  function end () {
    logger.stop ()
  }

  return { 
    execute,
    end
  }

} 

export default Agent