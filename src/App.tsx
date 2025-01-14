import './App.css'
import OperationTrayConfiguration from './components/OperationTrayConfiguration/OperationTrayConfiguration'
/*
import { Button } from './components/Button/Button'
import ConnectionWidget from './components/ConnectionWidget/ConnectionWidget'
import FormCrud from './components/FormCrud/FormCrud'
import MicrophoneAccess from './components/MicrophoneAccess/MicrophoneAccess'
import Navbar from './components/Navbar/Navbar'
import { TabsExample } from './components/Tabs/TabsExample' 
*/

function App() {

  return (<>
    
    <div>
      {/* 
      <Navbar />
      <FormCrud />
      <TabsExample />
      <Button/>
      <button className='btn btn-primary'>Click me</button>
      
      <ConnectionWidget/> 
      <MicrophoneAccess/> */}
      <OperationTrayConfiguration/>
    </div>    
    </>)
}

export default App
