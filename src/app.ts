import './app.css'
import resetCanvas from './view/reset-canvas'

type Point = {
  x: number
  y: number
}

type Atom = {
  place: Point
  mass: number
  vector: Point
}

type AtomMap = Map<string, Atom[]>

const FIELD_PADDING = 10
const ATOM_DISPLAY_SIZE = 4
const DEF_MASS = 1
const FRICTION = 0.2
const MAX_GRAVITY_DISTANCE = 200

const allAtoms: AtomMap = new Map()
const viewSize: Point = {
  x: Math.min(window.innerWidth - 20, 1200),
  y: Math.min(window.innerHeight - 20, 700),
}

export default function app() {
  if (resetCanvas(viewSize.x, viewSize.y)) {
    const ctx = document
      .querySelector<HTMLCanvasElement>('canvas')
      ?.getContext('2d')
    if (ctx) {
      createAtoms('red', 100)
      createAtoms('green', 100)
      createAtoms('blue', 100)
      createAtoms('yellow', 500)

      const draw = () => {
        workAtoms()
        drawAtoms(ctx, viewSize.x, viewSize.y, allAtoms)
        requestAnimationFrame(draw)
      }
      draw()
    }
  } else {
    alert('No root element found')
  }
}

function calcGravity(atomsMaster: Atom[], atomsSlave: Atom[], g: number) {
  //const glueDistance = 2
  const collisionDistance = 3
  // Gravity
  atomsSlave.forEach((atom1) => {
    atomsMaster.forEach((atom2) => {
      const dx = atom1.place.x - atom2.place.x
      const dy = atom1.place.y - atom2.place.y
      const d = Math.sqrt(dx * dx + dy * dy)
      if (d > collisionDistance && d < MAX_GRAVITY_DISTANCE) {
        const F = (g * atom1.mass * atom2.mass) / d // With standart gravity function (d * d)  - model is not interesting
        const ax = (F * dx) / d
        const ay = (F * dy) / d
        atom1.vector.x += ax
        atom1.vector.y += ay
      } else if (d <= collisionDistance) {
        // Collision. Calc common vector (with mass) and set to both atoms
        const newVX =
          (atom1.vector.x * atom1.mass + atom2.vector.x * atom2.mass) /
          (atom1.mass + atom2.mass)
        const newVY =
          (atom1.vector.y * atom1.mass + atom2.vector.y * atom2.mass) /
          (atom1.mass + atom2.mass)
        atom1.vector = {
          x: newVX,
          y: newVY,
        }
      }
    })
  })
}

function setNewPlaces(atoms: Atom[], borders: Point) {
  atoms.forEach((atom) => {
    atom.place.x += atom.vector.x
    atom.place.y += atom.vector.y

    if (atom.place.x < 0) {
      atom.place.x = 1
      atom.vector.x = -atom.vector.x
    } else if (atom.place.x > borders.x) {
      atom.place.x = borders.x - 1
      atom.vector.x = -atom.vector.x
    }

    if (atom.place.y < 0) {
      atom.place.y = 1
      atom.vector.y = -atom.vector.y
    } else if (atom.place.y > borders.y) {
      atom.place.y = borders.y - 1
      atom.vector.y = -atom.vector.y
    }
  })
}

function applyRule(master: string, slave: string, strength: number) {
  calcGravity(allAtoms.get(master)!, allAtoms.get(slave)!, strength)
}

function workAtoms() {
  applyRule('red', 'red', -15)
  applyRule('red', 'green', -5)
  applyRule('red', 'yellow', -5)

  applyRule('green', 'red', -5)
  applyRule('green', 'green', -5)
  applyRule('green', 'yellow', 5)

  applyRule('yellow', 'red', 5)
  applyRule('yellow', 'green', -5)
  applyRule('yellow', 'yellow', 1)

  //calcGravity(allAtoms.get('red')!, allAtoms.get('red')!, 2)
  //calcGravity(allAtoms.get('red')!, allAtoms.get('green')!, -5)
  //calcGravity(allAtoms.get('green')!, allAtoms.get('red')!, 3)
  //calcGravity(allAtoms.get('yellow')!, allAtoms.get('red')!, -1)
  //calcGravity(allAtoms.get('blue')!, allAtoms.get('red')!, 2)

  allAtoms.forEach((atoms) => {
    applyFriction(atoms, FRICTION)
    setNewPlaces(atoms, viewSize)
  })
}

function applyFriction(atoms: Atom[], friction: number) {
  const f = 1 - friction
  atoms.forEach((atom) => {
    atom.vector.x *= f
    atom.vector.y *= f
  })
}

function addAtom(color: string, atom: Atom) {
  if (!allAtoms.has(color)) {
    allAtoms.set(color, [])
  }
  allAtoms.get(color)!.push(atom)
}

function createAtoms(color: string, count: number) {
  for (let i = 0; i < count; i++) {
    const atom = {
      place: randomPlace(FIELD_PADDING),
      mass: DEF_MASS,
      vector: {
        x: 0,
        y: 0,
      },
    }
    addAtom(color, atom)
  }
}

function randomPlace(padding: number): Point {
  return {
    x: Math.random() * (viewSize.x - padding * 2) + padding,
    y: Math.random() * (viewSize.y - padding * 2) + padding,
  }
}

function drawAtoms(
  ctx: CanvasRenderingContext2D,
  sx: number,
  sy: number,
  atoms: AtomMap,
) {
  ctx.clearRect(0, 0, sx, sy)
  atoms.forEach((atoms, color) => {
    ctx.fillStyle = color
    atoms.forEach((atom) => {
      ctx.fillRect(
        atom.place.x,
        atom.place.y,
        ATOM_DISPLAY_SIZE,
        ATOM_DISPLAY_SIZE,
      )
    })
  })
}
