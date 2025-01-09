import './App.css'
import { Button } from './components/Button/Button'
import FormCrud from './components/FormCrud/FormCrud'
import { TabsExample } from './components/Tabs/TabsExample'

function App() {

  return (
    <div>
      <FormCrud />
      <TabsExample />
      <Button/>
      <button className='btn btn-primary'>Click me</button>
    </div>    
  )
}

export default App
