import React, { FormEvent, useState } from 'react'
import api from '../../utils/api'
import { useSnackbar } from 'notistack'
import {
  Container,
  Button,
  TextField,
  Select,
  MenuItem
} from '@material-ui/core'

const CadastrarProfessor: React.FC = () => {
  const [nome, setNome] = useState('')
  const [cpf, setCPF] = useState('')
  const [sexo, setSexo] = useState('M')

  const handleChange = event => {
    setSexo(event.target.value)
  }
  const { enqueueSnackbar } = useSnackbar()
  async function handleSubmmit(e: FormEvent) {
    e.preventDefault()
    try {
      const resultado = await api.post('/professor', { nome, sexo, cpf })
      if (resultado.status === 201) {
        enqueueSnackbar('Cadastrado com sucesso!', { variant: 'success' })
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: 'error' })
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

export default CadastrarProfessor
