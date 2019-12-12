import { colors } from './colors'
import { styles } from './styles'

const kuworking = {
  ...styles,
  initialColorMode: `light`, // rename default as light
  colors,
}

export default kuworking

export { modes } from './colors'
