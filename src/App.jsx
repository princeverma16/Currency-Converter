import { useState } from 'react'
import InputBox from './components/InputBox'
import useCurrencyInfo from './hooks/useCurrencyInfo'


function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from)

  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to)
    setTo(from)
  }

  const convert = () => {
    if(currencyInfo[to]){
    setConvertedAmount(amount * currencyInfo[to])
    }
  }

  return (
    <>
    
      <div className='w-full h-screen flex flex-col
       justify-center items-center bg-cover bg-no-repeat'
        style={{
          backgroundImage: `url(https://images.pexels.com/photos/355747/pexels-photo-355747.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
        }}>        
        <h2 className='text-6xl text-white font-bold mb-14 mt-0 p-2.5 bg-red-600 bg-opacity-55 rounded-lg shadow-lg' style={{ marginTop: '-150px' }}>
        Currency Convertor</h2>

        <div className='w-full'>
          
          <div className='w-full max-w-md mx-auto border border-gray-60
         rounded-lg p-5 background-blur-sm bg-white/30'>
                  
            <form onSubmit={(e) =>{e.preventDefault();
              convert();
            }}>
                <div className='w-full mb-1'>
                  <InputBox 
                    label ="from"
                    amount = {amount}
                    currencyOptions = {options}
                    onCurrencyChange = {(currency) => setFrom(currency)}
                    selectCurrency ={from}
                    onAmountChange={(amount) => setAmount(amount)} />
                </div>
                <div className='w-full relative h-0.5'>
                    <button
                    type='button'
                    className='absolute left-1/2 -translate-x-1/2  -translate-y-1/2  bg-blue-500 border-2 border-white rounded-md text-white px-2 py-0.5'
                    onClick={swap}
                    > Swap
                    </button>
                </div>
                <div className='w-full mt-1 mb-4'>
                <InputBox 
                    label ="To"
                    amount = {amount && convertedAmount}
                    currencyOptions = {options}
                    onCurrencyChange = {(currency) => setTo(currency)}
                    selectCurrency ={to}
                    onAmountChange={(amount) => setAmount(amount)}
                     />
                </div>
                <button 
                    type='submit'
                    className='w-full bg-blue-700 text-white 
                           px-4 py-3 rounded-lg'>
                       Convert {from.toUpperCase()} to  {to.toUpperCase()}     
                </button>

            </form>

          </div>
        </div>
      </div>

    </>
  )
}

export default App;

