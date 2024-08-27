import { useState, useEffect } from 'react'

import './styles.css'

import { Card, CardProps } from '../../components/Card'

interface UserResponse {
  avatar_url: string,
  name: string
}

interface User {
  avatarUrl: string,
  name: string
}

export default function Home() {
  const [user, setUser] = useState<User>()
  const [studentName, setStudentName] = useState<string>('')
  const [students, setStudents] = useState<CardProps[]>([])

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://api.github.com/users/HeitordeLimma")
      const data = await response.json() as UserResponse

      setUser({
        avatarUrl: data.avatar_url,
        name: data.name
      })
    }

    fetchData()
  }, [])

  function handleAddStudents() {
    if (studentName === "") return alert('O nome não pode estar vazio')

    const newStudent = {
      name: studentName,
      time: new Date().toLocaleString('pt-br', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }

    setStudents((prevState) => [...prevState, newStudent])
  }

  return (
    <div className='container'>
      <header>
        <h1>Lista de Presença</h1>

        <div>
          <strong>{user?.name}</strong>
          <img src={user?.avatarUrl} alt="" />
        </div>
      </header>

      <input
        type="text"
        placeholder='Digite o nome ...'
        onChange={(e) => setStudentName(e.target.value)} />

      <button onClick={handleAddStudents}>Adicionar</button>

      {
        students.map((student) => {
          return (
            <Card key={student.time} name={student.name} time={student.time} />
          )
        })
      }

    </div>
  )
}