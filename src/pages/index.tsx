import Image from 'next/image'
import { Inter } from 'next/font/google'
import Searchbar from '../components/SearchBar'
import ToggleHead from '../components/ToggleHead'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <ToggleHead />
    <Searchbar />
   </>
   
  )
}
