import { useState } from 'react'
import{generateMnemonic} from 'bip39'
import Mnemonic from './component/MnemonicText'
import SolanaWallet from './component/SolanaWallet'

function App() {
  const [mnemonic,setMnemonic] = useState("")

  return (
  <div className='flex flex-row'>
    <div className='flex basis-1/3 bg-slate-200'>
    <SolanaWallet mnemonic={mnemonic}/>
    </div>
    <div className="flex basis-2/3 flex-col items-center p-4">
      <div className="flex flex-col justify-center items-center p-4 bg-gray-100 border border-gray-300 rounded-lg">
        <div className='p-3 m-3'><h1 className='text-4xl font-semibold'>Create a new wallet</h1></div>
        <div className='m-5 p-5 item'>
        <button onClick={async function(){
        const mn= await generateMnemonic();
        setMnemonic(mn);
        }}
        className="px-4 py-2 mb-4 text-white bg-blue-500 rounded hover:bg-blue-700 transition">GENERATE SEED PHRASE</button>
        </div>
        <Mnemonic element={mnemonic}/>
      </div>
    </div>
  </div>
  )
}

export default App
