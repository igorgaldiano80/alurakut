

import Box from '../src/components/Box'
import MainGrid from '../src/components/MainGrid'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
import {AlurakutMenu, OrkutNostalgicIconSet} from '../src/lib/AlurakutCommons'


function ProfileSideBar(props){ //props passa como propriedade
 // console.log(props)
  return (
      <Box>
        <img src={`https://github.com/${props.githubUser}.png`} style={{borderRadius:'8px'}} />
      </Box>

  )
}

export default function Home() {
  const usuarioAleatorio= 'igorgaldiano80' //variavel do github
  const pessoasFavoritas = [
    'juunegreiros', 
  'omariosouto', 
  'peas', 
  'rafaballerini',
   'marcobrunodev']
  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        {/* <Box style="grid-area: profileArea;"> */}
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar githubUser={usuarioAleatorio} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a) 
            </h1>

            <OrkutNostalgicIconSet />
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li>
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
