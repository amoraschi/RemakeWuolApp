import { Loader2 } from 'lucide-react'

export default function Loader () {
  return (
    <span
      className='flex flex-row items-center'
    >
      <Loader2
        className='mr-2 h-4 w-4 animate-spin'
      /> Cargando datos
    </span>
  )
}
