import cart from '@/store/store'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from "../store/store"
import Header from '@/components/LayoutComponentnts/Header'
import Footer from '@/components/LayoutComponentnts/Footer'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Header/>
      <Component {...pageProps} />
      <Footer/>
    </Provider>
  )

}
