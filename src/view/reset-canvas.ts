export default function resetCanvas(sx: number, sy: number): boolean {
  const appRoot = document.querySelector<HTMLDivElement>('#app')
  if (appRoot) {
    const canvas = document.createElement('canvas')
    canvas.width = sx
    canvas.height = sy
    appRoot.appendChild(canvas)
    return true
  } else {
    return false
  }
}
