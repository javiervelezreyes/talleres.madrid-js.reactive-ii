const SEP = ' - '

function Agent (key) {

  let logger = console

  function execute (value) {
    logger.info (key, SEP, value) 
  }

  function end () {}

  return { 
    execute,
    end
  }

} 

export default Agent