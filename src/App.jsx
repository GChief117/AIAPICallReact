// src/App.jsx

import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import './App.css'

export default function App() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I am Medic AI, your personal healthcare document assistant.' }
  ])
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState('')
  const bottomRef = useRef()

  // auto‑scroll when new message arrives
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

const handleSend = async e => {
  e.preventDefault();
  if (!input.trim()) return;

  const userMsg = { role: 'user', content: input };
  setInput('');

  /* 1️⃣  show user bubble + “typing…” bubble right away */
  setMessages(prev => [...prev, userMsg, { role: 'assistant', typing: true }]);
  setIsTyping(true);

  try {
    const res = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      { model: 'gpt-3.5-turbo', messages: [...messages, userMsg] },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        }
      }
    );

    const assistantMsg = res.data.choices[0].message;

    /* 2️⃣  swap the last “typing” bubble with the real reply */
    setMessages(prev => {
      const updated = [...prev];
      updated[updated.length - 1] = assistantMsg; // replace placeholder
      return updated;
    });
  } catch (err) {
    console.error(err);
    /* replace typing bubble with error text */
    setMessages(prev => {
      const updated = [...prev];
      updated[updated.length - 1] = {
        role: 'assistant',
        content: '⚠️ Oops, something went wrong.'
      };
      return updated;
    });
  } finally {
    setIsTyping(false);
  }
};


return (
  <div
    className="app"
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      margin: 0
    }}
  >
    <div
      className="chat-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '700px',
        height: '95vh',
        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
        background: 'ghostwhite',
        borderRadius: '8px',
        overflow: 'hidden'
      }}
    >
      {/* ─── scrollable messages ───────────────────────────── */}
      <div
        className="chat-window"
        style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`message ${m.role}${m.typing ? ' typing' : ''}`}
          >
            {m.typing ? (
              <span className="dots">
                <span></span><span></span><span></span>
              </span>
            ) : (
              m.content
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* ─── input row ────────────────────────────────────── */}
      <form
        onSubmit={handleSend}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem',
          borderTop: '1px solid #444'
        }}
      >
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message…"
          style={{
            background: 'ghostwhite',
            color: '#000',
            caretColor: '#000',
            flex: '0 1 70%',
            maxWidth: '520px',
            padding: '0.6rem',
            border: '1px solid #444',
            borderRadius: '4px'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '0.6rem 1rem',
            border: 'none',
            background: 'green',
            color: '#fff',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Send
        </button>
      </form>
    </div>
  </div>
);           // closes   return ( … )
}            // <–– this closes   function App() { … }

