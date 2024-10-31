import THelper from './helper.tasks.js'

const HASH  = '#'
const CEROS = '00'
const NONE  = ''
const BREAK = '\n'

let {Size} = THelper

function Helper () {

  function One () {
    return 1
  }

  function Less (k) {
    return function (x) {
      return x <= k
    }
  }

  function Greater (k) {
    return function (x) {
      return x > k
    }
  }

  function Add (x, y) {
    return x + y
  }

  function Pos (node) {
    return function (e) {
      let px = PosX (node)(e)
      let py = PosY (node)(e)
      return [px, py]
    }
  }

  function PosX (node) {
    return function (e) {
      let base = node.getBoundingClientRect ()
      let pos  = e.clientX - base.left | 0
      return pos
    }
  }

  function PosY (node) {
    return function (e) {
      let base = node.getBoundingClientRect ()
      let pos  = e.clientY - base.top | 0
      return pos
    }
  }

  function Scale (max, scale) {
    return function (x) {
      return scale * x / max | 0
    } 
  }

  function ScaleX (node, scale) {
    let max   = node.clientWidth
    let delta = scale || 1
    return function (x) {
      return delta * x / max | 0
    } 
  }

  function ScaleY (node, scale) {
    let max   = node.clientHeight
    let delta = scale || 1
    return function (x) {
      return delta * x / max | 0
    }
  }

  function Labels (labels) {
    let max = Size (labels)
    return function (x) {
      let idx   = +x % max
      let label = labels[idx]
      return label
    }
  }

  function Borders (k) {
    return function (x) {
      let min = 0
      let max = k-1
      return x > min && x < max
    }
  }

  function Color (base) {
    return function (x) {
      let hex = base 
      let rgb = HASH
      for (let i = 0; i < 3; i++) {
          let c = parseInt (hex.substr(i * 2, 2), 16)
          let r = Math.round (c * x).toString (16)
          rgb  += (CEROS + r).substring (Size (r))
      }
      return rgb
    }
  }

  function Colors (colors) {
    let max = Size (colors)
    return function (x) {
      let idx   = +x % max
      let color = colors[idx]
      return color
    }
  } 

  function Bound (k) {
    return function (xs) {
      let min = Math.min (...xs)
      let max = Math.max (...xs)
      let ok  = Math.abs (max-min) < k
      return ok
    }
  }

  function Grow (xs) {
    let [y, ...ys] = xs
    let [z, ...zs] = ys
    return (
      (Size (xs) < 2) ||
      (y < z) && Grow (ys)
    )
  }

  function Speed (xs) {
    let min = Math.min (...xs)
    let max = Math.max (...xs)
    let k   = Size (xs)
    return 10 * (max-min) / k | 0
  }

  function SpeedXY (pos) {
    let xs = pos.map (p => p[0])
    let ys = pos.map (p => p[1]) 
    let vx = Speed (xs) 
    let vy = Speed (ys)
    return Math.sqrt(vx * vx + vy * vy) | 0
  }

  function Matrix (text) {
    let rows   = text.split (BREAK)
    let matrix = rows.map (row => row.trim ().split (NONE)).filter (row => Size (row))
    return matrix
  }

  function Found (matrix, value) {
    let sx = Size (matrix)
    let sy = Size (matrix[0])
    return function (pos) {
      let [x, y] = pos
      return (
        (x < sx) &&
        (y < sy) &&
        (matrix[x][y] == value)
      )
    }
  }

  return {
    One,
    Less,
    Greater,
    Add,
    Pos,
    PosX,
    PosY,
    Scale,
    ScaleX,
    ScaleY,
    Labels,
    Borders,
    Color,
    Colors,
    Bound,
    Grow,
    Speed,
    SpeedXY,
    Matrix,
    Found,
    Size
  }

}

export default Helper ()


