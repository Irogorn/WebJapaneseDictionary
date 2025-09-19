import './globals.css'
import NavBar from '../components/NavBar'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export const metadata = {
  title: 'Jap Dico',
  description: 'Japanese Dictionary',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  )
}
