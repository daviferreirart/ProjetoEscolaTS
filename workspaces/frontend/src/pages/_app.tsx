import React from 'react'
import { AppProps } from 'next/app'
import GlobalStyles from '../styles/global'
import { SnackbarProvider } from 'notistack'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <SnackbarProvider>
      <Component {...pageProps} />
      <GlobalStyles />
    </SnackbarProvider>
  )
}

export default MyApp
