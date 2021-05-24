import { createGlobalStyle } from 'styled-components'
import test from '../assets/rocketseat.svg'

const GlobalStyles = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}
body {
  background: #F0f0f5 url(${test}) no-repeat 70% top;
  -webkit-font-smoothing: antialiased;
}
;`
export default GlobalStyles
