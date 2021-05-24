import React, { FormEvent, useState } from 'react'
import api from '../../utils/api'
import {
  Container,
  Button,
  TextField,
  Select,
  MenuItem
} from '@material-ui/core'

const CadastrarAluno: React.FC = () => {
  const [nome, setNome] = useState('')
  const [cpf, setCPF] = useState('')
  const [sexo, setSexo] = useState('M')

  const handleChange = event => {
    setSexo(event.target.value)
  }

  async function handleSubmmit(e: FormEvent) {
    e.preventDefault()
    try {
      const response = await api.post('/aluno', { nome, sexo, cpf })
      if (response.status === 201) {
        alert('Cadastrado com sucesso')
      }
    } catch (error) {
      alert(error.response.data.message)
      console.log(error.response)
    }
  }

  return (
    <Container className="App">
      <form onSubmit={handleSubmmit}>
        <TextField
          variant="outlined"
          type="text"
          placeholder="Digite seu Nome:"
          onChange={event => {
            setNome(event.target.value)
          }}
        />
        <TextField
          variant="outlined"
          type="text"
          placeholder="Digite seu CPF"
          onChange={event => {
            setCPF(event.target.value)
          }}
        />
        <Select variant="outlined" value={sexo} onChange={handleChange}>
          <MenuItem value="M">MASCULINO</MenuItem>
          <MenuItem value="F">FEMININO</MenuItem>
        </Select>
        <Button variant="contained" color="inherit" type="submit">
          Cadastrar
        </Button>
      </form>
    </Container>
  )
}

export default CadastrarAluno
