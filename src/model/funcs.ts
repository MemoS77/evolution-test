export function generateRandomColor(): string {
  // Генерируем шестнадцатеричное число от 0 до 0xFFFFFF (включительно)
  const randomColor = Math.floor(Math.random() * 0xffffff)
  // Преобразуем число в строку шестнадцатеричного формата и дополняем нулями до 6 символов
  const colorHex = randomColor.toString(16).padStart(6, '0')
  // Возвращаем результат
  return colorHex //`#${colorHex}`
}
