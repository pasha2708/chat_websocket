import React from 'react';
import axios from 'axios';

const LongPulling = () => {
  const [messages, setMessages] = React.useState([])
  const [value, setValue] = React.useState("")

  React.useEffect(() => {
    subscribe();
  }, [])

  const subscribe = async () => {
    try {
      const {data} = await axios.get('http://localhost:5000/get-messages')
      setMessages(prev => [data, ...prev])
      console.log('data', data);
      console.log(messages);
      await subscribe();
    } catch (e) {
      setTimeout(() => {
        subscribe();
      }, 1000)
    }
  } 

  const sendMessage = async () => {
    await axios.post('http://localhost:5000/new-messages', {
      message: value,
      id: Date.now()
    })
  }

  return (
    <div className="center">
      <div>
        <div className="form">
          <input value={value} onChange={e => setValue(e.target.value)} type="text" />
          <button onClick={sendMessage}>Отправить</button>
        </div>
        <div className="messages">
          {messages.map((mess) => (
            <div className="message" key={mess.id}>
              {mess.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LongPulling;