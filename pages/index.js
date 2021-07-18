
import React from 'react'
import Box from '../src/components/Box'
import MainGrid from '../src/components/MainGrid'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
import {AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet} from '../src/lib/AlurakutCommons'


function ProfileSideBar(props){ //props passa como propriedade
 // console.log(props)
  return (
      <Box as="aside">
        <img src={`https://github.com/${props.githubUser}.png`} style={{borderRadius:'8px'}} />
        <hr />
        <p>
            <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
              @{props.githubUser}
        </a>
        </p>
       
        <hr />
        <AlurakutProfileSidebarMenuDefault/>
      </Box>

  )
}

function ProfileRelationsBox(props){
  return (
    <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
             { props.title} ({props.items.length})
          </h2>
          <ul>
              {/*seguidores.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual.title}`} key={itemAtual.title}>
                      <img src={itemAtual.image} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })} */}
            </ul>
          </ProfileRelationsBoxWrapper>
          
  )
}

export default function Home() {
 
  const usuario= 'igorgaldiano80' //variavel do github
  const [comunidades, setComunidades] = React.useState([{
    id: '21312312312313143423',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);
  //const comunidades = comunidades[0]
  //const alteradorDeComunidades = comunidades[1];
  //const comunidades = ['Alurakut'];
  const pessoasFavoritas = [
    'juunegreiros', 
  'omariosouto', 
  'peas', 
  'rafaballerini',
   'marcobrunodev',
    'felipefialho']
    const [seguidores,setSeguidores] = React.useState([])
    // 0 - Pegar o array dos dados do Github
    React.useEffect(function() { 
          fetch('https://api.github.com/users/juunegreiros/followers').then(function (respostaDoServidor) {
            return respostaDoServidor.json();
          })
          .then(function(respostaCompleta) {
            setSeguidores(respostaCompleta)
          })
       },[]) //vazio rodar só uma vez
       console.log('seguidores antes do return',seguidores)
   
   

    // 1- Criar um box que vai ter um map, baseado nos itens do array 
    // que pegamos do Github

  return (
    <>
      <AlurakutMenu githubUser={usuario}/>
      <MainGrid>
        {/* <Box style="grid-area: profileArea;"> */}
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar githubUser={usuario} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a) 
            </h1>

            <OrkutNostalgicIconSet />
          </Box>
            <Box>
              <h2 className="subtitle"> O que você deseja fazer?</h2>
              <form onSubmit={function handleCriaComunidade(event) {
                event.preventDefault();//evita que o link vai para outra página 
                  //comunidades.push('Alura Stars')
                  const dadosDoForm = new FormData(event.target) //transformar os dados do form
                  console.log(dadosDoForm)
                    // pega os campos do formulario (objeto)
                  console.log('Campo',dadosDoForm.get('title')); 
                  console.log('Campo',dadosDoForm.get('image'));
                  // criando objeto
                   const comunidade = {
                     id: new Date().toDateString(),
                     title: dadosDoForm.get('title '),
                     image: dadosDoForm.get('image')
                   }

                  const comunidadesAtualizadas = [...comunidades, comunidade] // atualiza o estado de comunidades
                  setComunidades(comunidadesAtualizadas)
                
                  console.log(comunidades)
              }}>
                <div>
                  <input 
                  placeholder="Qual vai ser o nome de sua comunidade?" name="title" 
                  arial-label="Qual vai ser o nome de sua comunidade?" 
                  type="text"
                  />
                </div>
                <div>
                  <input 
                  placeholder="Coloque uma URL para usarmos de capa" name="image" 
                  arial-label="Coloque uma URL para usarmos de capa " 
                  type="text"
                  />
                </div>
                <button>
                    Criar comunidade
                </button>
              </form>
              
            </Box>
        </div>
  
  
    <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>

     {/*Mostra o numero de seguidores*/}
           <ProfileRelationsBox  title= "Seguidores" items={seguidores}/>

                {/* Mostra as comunidades */}
                    <ProfileRelationsBoxWrapper>
                      <h2 className="smallTitle">
                          Comunidades({comunidades.length})
                        </h2>
                      <ul>
                          {comunidades.map((itemAtual) => {
                            return (
                              <li key={itemAtual.id}>
                                <a href={`/users/${itemAtual.title}`} key={itemAtual.title}>
                                  <img src={itemAtual.image} />
                                  <span>{itemAtual.title}</span>
                                </a>
                              </li>
                            )
                          })}
                        </ul>
           </ProfileRelationsBoxWrapper>
           
           {/* Mostra as pessoas da comunidade */ }
                <ProfileRelationsBoxWrapper>
                    <h2 className="smallTitle">
                      Pessoas da comunidade ({pessoasFavoritas.length})
                    </h2>

                    <ul>
                      {pessoasFavoritas.map((itemAtual) => {
                        return (
                          <li key={itemAtual  }>
                            <a href={`/users/${itemAtual}`} key={itemAtual}>
                              <img src={`https://github.com/${itemAtual}.png`} />
                              <span>{itemAtual}</span>
                            </a>
                          </li>
                        )
                      })}
                    </ul>
              </ProfileRelationsBoxWrapper>
          </div>
      </MainGrid>
    </>
  )
}
