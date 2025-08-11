import { type User } from '@repo/types'

const App = () => {
  const user: User = {
    id: '1',
    name: 'John Doe'
  }
  return (
    <div>
      {user.name} is logged in with ID: {user.id  }
    </div>
  )
}

export default App
