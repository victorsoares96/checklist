import React from 'react';
import { Box, Button, Card, CardContent, CardHeader, CardMedia, Divider, Icon, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';

import errorPendingAnswer from '../../../assets/images/faq/error_pending_answer.png';
import viewAnswer from '../../../assets/images/faq/view_answer.png';
import pendingChecklist from '../../../assets/images/faq/pending_checklist.png';
import logoutButton from '../../../assets/images/faq/logout_button.png';

const FAQList = [
  { 
    id: 'responder_todas_perguntas',
    title: 'Tenho que responder todas as perguntas?', 
    subtitle: 'Sim, deve!',
    body: `Sim, todas as perguntas devem ser respondidas, caso você esqueça de responder 
    alguma pergunta o seu checklist não será enviado e aparecerá uma mensagem 
    parecida com essa abaixo:`,
    image: errorPendingAnswer
  },
  { 
    id: 'posso_anexar_pdf',
    title: 'Posso anexar pdf, documentos ou videos?', 
    subtitle: 'Não pode!',
    body: `Não, você só pode anexar fotos, estas fotos devem ser menores que 30 mb,
    e as fotos anexadas não podem ser mais antigas do que 4 horas atrás.`,
    image: ''
  },
  { 
    id: 'nao_posso_enviar_foto_ontem',
    title: 'Não posso enviar uma foto que eu tirei ontem?', 
    subtitle: 'Não pode, somente fotos recentes.',
    body: `Não, você só pode enviar fotos como anexo se essa foto for tirada dentro 
    das ultimas 4 horas. É recomendável que você envie fotos que você tirou agora!`,
    image: ''
  },
  { 
    id: 'visualizar_checklists',
    title: 'Consigo visualizar os checklists que eu já respondi?', 
    subtitle: 'Somente gerentes podem!',
    body: `Usuários comuns como monitores e encarregados não podem visualizar suas respostas, 
    mas caso você seja um gerente, você pode visualizar os checklists respondidos por todos 
    os usuários da sua unidade, através deste botão disponível no menu lateral:`,
    image: viewAnswer
  },
  { 
    id: 'posso_responder_depois',
    title: 'Posso responder metade do meu checklist agora e metade depois?', 
    subtitle: 'Sim, pode! Mas não salvamos os seus anexos :(',
    body: `Sim, você pode começar a responder seu checklist agora e continuar
    de onde parou a qualquer momento. Tá, mas como eu faço isso? É simples,
    basta parar de responder quando você quiser e quando for necessário você
    pode voltar ao checklist e uma tela de alerta será exibida a você perguntando
    se você quer continuar de onde parou ou iniciar do zero novamente. Lembrando 
    que caso você deseje fazer isso, seus anexos serão perdidos e você terá que
    inseri-los novamente!`,
    image: pendingChecklist
  },
  { 
    id: 'questao_obrigatoria',
    title: 'Sou obrigado a comentar e anexar nas questões?', 
    subtitle: 'Não, é opcional!',
    body: `Não, o ato de fazer comentários ou anexar imagens em uma questão é 
    opcional, você não precisa fazer isso se não quiser.`,
    image: ''
  },
  { 
    id: 'sair_entrar',
    title: 'Como eu faço pra sair e entrar com outro usuário?', 
    subtitle: 'Existe um botão de sair no lado superior direito!',
    body: `Existe um botão de sair da sua conta no lado superior direito da sua tela,
    como ilustrado neste exemplo abaixo:`,
    image: logoutButton
  },
  { 
    id: 'nao_consigo_enviar_checklist',
    title: 'Não consigo enviar meu checklist!', 
    subtitle: 'Verifique suas respostas!',
    body: `Isso pode estar acontecendo, pois você pode ter esquecido de responder 
    alguma pergunta ou enviou um anexo inválido. Quando alguma pergunta está respondida (ou não)
    incorretamente um aviso semelhante a esse aparecerá:`,
    image: errorPendingAnswer
  },
  { 
    id: 'checklist_demorando_enviar',
    title: 'Meu checklist está demorando pra enviar!', 
    subtitle: 'Verifique sua conexão com a internet.',
    body: `Isso pode estar acontecendo, por 2 motivos: sua conexão com a internet pode 
    estar lenta ou você pode ter inserido muitos anexos, caso tenha colocado anexos como fotos,
    o envio do checklist pode demorar um pouco pois o sistema está processando estes arquivos pesados.`,
    image: ''
  },
]
const FAQItem = ({ id, title, subtitle, body, image }) => {
  return (
    <Card id={id} elevation={0} style={{ marginTop: '1.2rem' }}>
      <CardHeader title={title} subheader={subtitle} />
      <CardContent>
        <Typography variant='body1'>
          {body}
        </Typography>
        {image && <CardMedia style={{ marginTop: '1.2rem', borderRadius: '0.4rem' }} component='img' image={image} />}
      </CardContent>
    </Card>
  )
}
const FAQPage = () => {
  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }
  return (
    <Box>
      <Typography variant='h4'>
        Perguntas Frequentes
      </Typography>
      <Typography component='p' color='textSecondary' style={{ textAlign: 'left', fontSize: 18, marginTop: '1.2rem' }}>
        Está com dúvida ou preso em algum problema? Confira algumas dicas nas <b>Perguntas Frequentes</b>.
      </Typography>

      <Box marginTop='1.2rem'>
        <Typography variant='h6' color='textSecondary'>
          Indice
        </Typography>
        {<List component="nav" aria-label="secondary mailbox folders">
          {FAQList.map(item => {
            return (
              <>
                <ListItemLink href={`#${item.id}`}>
                  <ListItemIcon>
                    <Icon className='fas fa-arrow-right' style={{ fontSize: 10 }} />
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemLink>
                <Divider />
              </>
            )
          })}
        </List>}
      </Box>

      {FAQList.map(item => <FAQItem id={item.id} title={item.title} subtitle={item.subtitle} body={item.body} image={item.image} />)}

      <Card elevation={0} style={{ marginTop: '1.2rem' }}>
        <CardHeader title='Não achei o que eu queria!' />
        <CardContent>
          <Typography variant='body1'>
            Entre em contato conosco através do nosso whatsapp, clicando logo abaixo:
          </Typography>
          <Button 
          color='primary' 
          variant='contained' 
          size='large' 
          fullWidth 
          disableElevation
          href='https://api.whatsapp.com/send?phone=5585994302136&text=Oi%2C%20queria%20tirar%20uma%20dúvida'
          style={{ fontWeight: 600, marginTop: '1.2rem' }}
          startIcon={<Icon className='fab fa-whatsapp' />}>
            Entrar em contato
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default FAQPage;