import { FormEvent, useState } from 'react';
import api from '../../utils/api';

function CadastrarAluno() {
   const [nome, setNome] = useState('');
   const [cpf, setCPF] = useState('');
   const [sexo, setSexo] = useState('M');

   async function handleSubmmit(e: FormEvent) {
      e.preventDefault();
      try {
         const resultado = await api.post('/aluno', { nome, sexo, cpf });
         if (resultado.status === 201) {
            alert('Cadastrado com sucesso!');
         }
      } catch (error) {
         alert('CPF já encontrado cadastrado ou incorreto!');
      }
   }
   return (
      <div className="App">
         <form onSubmit={handleSubmmit}>
            <input
               type="text"
               placeholder="Digite seu Nome:"
               onChange={event => {
                  setNome(event.target.value);
               }}
            />
            <input
               type="text"
               placeholder="Digite seu CPF"
               onChange={event => {
                  setCPF(event.target.value);
               }}
            />
            <select
               onChange={event => {
                  setSexo(event.target.value);
               }}
            >
               <option value="M">MASCULINO</option>
               <option value="F">FEMININO</option>
            </select>
            <button type="submit">Cadastrar</button>
         </form>
      </div>
   );
}

export default CadastrarAluno;
