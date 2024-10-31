const DELAY  = 500
const OBJECT = 'object'

function Helper () {
  
  function IsFull (n) {
    return function (xs) {
      return Size (xs) == n
    }
  }

  function IsEmpty (xs) {
    return Size (xs) == 0
  }

  function IsEqual (x) {
    return function (y) {
      return x != y
    }
  }

  function IsPrimitive (x) {
    return typeof (x) != OBJECT
  }

  function Size (xs) {
    return xs.length
  }

  function Time (x) {
    return x || Date.now ()
  }

  function Reset () {}

  function Wait () {
    return new Promise (function (ok) {
      setTimeout (ok, DELAY)
    })
  }

  return {
    IsFull,
    IsEmpty,
    IsEqual,
    IsPrimitive,
    Size,
    Time,
    Reset,
    Wait,
    Delay : DELAY
  }

}

export default Helper ()


