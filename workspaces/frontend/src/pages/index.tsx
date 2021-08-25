import React from 'react'
import LinkNext from 'next/link'
import { Link } from '@material-ui/core'
import { Container } from './_styles'

const Home: React.FC = () => {
  return (
    <Container>
      <LinkNext href="/CadastrarAluno">
        <Link component="button">CADASTRE O ALUNO</Link>
      </LinkNext>
      <LinkNext href="/CadastrarProfessor">
        <Link component="button">CADASTRE O PROFESSOR</Link>
      </LinkNext>
    </Container>
  )
}

export default Home
