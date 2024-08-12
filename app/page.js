'use client'
import {Box, Typography, Stack, TextField, Button} from '@mui/material'
import Image from "next/image";
import { useState } from 'react'

export default function Home() {
  const [messages, setMessages] = useState([
    {role: 'assistant', 
    content: 'Hi, how can I assist you today?'
    },
  ])
  const [message, setMessage] = useState('')

  const sendMessage = async() => {
    setMessage('')
    setMessages((messages) => [
      ...messages,
      {role: "user", content: message},
      {role: "assistant", content: ''},
    ])
    const response = fetch('/api/chat', {
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify([...messages, {role: 'user', content: message}])
    }).then(async (res) => {
      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      let result = ''
      return reader.read().then(function processText({done, value}){
        if(done) {
          return result
        } 
        const text = decoder.decode(value || new Int8Array(), {stream:true})
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1]
          let otherMessages = messages.slice(0, messages.length - 1) 
          return([
            ...otherMessages,
            {
              ...lastMessage,
              content: lastMessage.content + text,
            }
          ])
        })
        return reader.read().then(processText)
      })
    })
    const reponse = "test"
  }
  const spotifyGreen = '#1DB954';
  const spotifyDark = '#191414';
  const spotifyLight = '#7d7f7c';
  const borderColor = '#1DB954';
  const focusedTextColor = "#1DB954";

  return (
    <Box
      bgcolor={spotifyDark}
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        direction="column"
        width="600px"
        height="700px"
        p={2}
        spacing={3}
      >
        <Stack
          direction="column"
          spacing={2}
          flexGrow={1}
          overflow="auto"
        >
          {messages.map((msg, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={msg.role === 'assistant' ? 'flex-start' : 'flex-end'}
            >
              <Box
                bgcolor={msg.role === 'assistant' ? spotifyGreen : spotifyLight}
                color="black"
                borderRadius={16}
                p={3}
                // maxWidth="75%"
                
              >
                {msg.content}
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Type a message..."
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '50px',
                '& fieldset': {
                  borderColor: borderColor,
                },
                '&:hover fieldset': {
                  borderColor: borderColor,
                },
                '&.Mui-focused fieldset': {
                  borderColor: borderColor,
                },
                '&.Mui-focused input': {
                  color: 'white',
                },
                
              },
              '& .MuiInputLabel-root': {
                color: spotifyLight,
                '&.Mui-focused': {
                  color: spotifyLight, 
                },
              },
              '& .MuiInputBase-input': {
                color: 'white',
              },
            }}
          />
          <Button
            variant="contained"
            onClick={sendMessage}
            style={{ 
              backgroundColor: spotifyGreen, 
              color: 'black', 
              borderRadius: '50px', 
              height: '56px', 
              padding: '0 20px', 
              paddingrRight: '25px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
            }}          >
            Send
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}
