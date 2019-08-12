const connector = new WebSocket('wss://s.altnet.rippletest.net:51233')
connector.addEventListener('open', (event) => {
  // This callback runs when the connection is open
  console.log("Connected!")
})
connector.addEventListener('message', (event) => {
  console.log('Got message from server:', event.data)
})
connector.addEventListener('close', (event) => {
  // Use this event to detect when you have become disconnected
  // and respond appropriately.
  console.log('Disconnected...')
})

export default connector