import '../styles/globals.css'
import { CLayoutProvider } from '../context/CLayout'
export default function App({ Component, pageProps }) {
  
  return (        
    <CLayoutProvider>
      <Component {...pageProps} />         
    </CLayoutProvider>
  )
}
