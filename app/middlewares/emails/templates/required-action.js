const dataRequiredEmail = {}


// const list = [{
//   project: "CC Startup",
//   title: "Nuevo branding",
//   text: "Agregar nuevos diseños de tarjetas a la biblioteca del sistema de diseño.",
//   tag: "Abrir",
//   priority: "🔥 Alta",
//   date: "16 de junio de 2025",
// },{
//   project: "CC Startup",
//   title: "Nuevo branding",
//   text: "Agregar nuevos diseños de tarjetas a la biblioteca del sistema de diseño.",
//   tag: "Abrir",
//   priority: "🔥 Alta",
//   date: "16 de junio de 2025",
// },{
//   project: "CC Startup",
//   title: "Nuevo branding",
//   text: "Agregar nuevos diseños de tarjetas a la biblioteca del sistema de diseño.",
//   tag: "Abrir",
//   priority: "🔥 Alta",
//   date: "16 de junio de 2025",
// }]

// const html = list.map((item) => {
//   return(`<div class="CardTask"
//   style="margin-top: 12px;align-self: stretch;  padding: 16px; background: white; border-radius: 3px; border: 1px #E8EDF3 solid; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 16px; ">
//   <div class="Breadcrumb"
//     style="align-self: stretch; height: 18px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 8px; display: flex">
//     <div class="ProjectAndStatus"
//       style="justify-content: flex-start; align-items: flex-start; gap: 4px; display: inline-flex">
//       <div class="CcStartup"
//         style="color: #53AB97; font-size: 12px; font-family: system-ui; font-weight: 400; line-height: 18px; word-wrap: break-word">
//         ${item.project}</div>
//       <div
//         style="color: #222D38; font-size: 12px; font-family: system-ui; font-weight: 400; line-height: 18px; word-wrap: break-word">
//         /</div>
//       <div class="NewBranding"
//         style="color: #53AB97; font-size: 12px; font-family: system-ui; font-weight: 400; line-height: 18px; word-wrap: break-word">
//         ${item.title}</div>
//     </div>
//   </div>
//   <div class="AddNewCardDesigns"
//     style="margin-bottom: 8px;align-self: stretch; color: #222D38; font-size: 16px; font-family: system-ui; font-weight: 400; line-height: 24px; word-wrap: break-word">
//     ${item.text}</div>
//   <div class="Status"
//     style="align-self: stretch; justify-content: flex-start; align-items: flex-start; gap: 8px; display: inline-flex">
//     <div class="Status"
//       style="padding-left: 8px; padding-right: 8px; background: #6C90FC; border-radius: 3px; overflow: hidden; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 8px; display: inline-flex">
//       <div class="Medium"
//         style="color: white; font-size: 12px; font-family: system-ui; font-weight: 400; line-height: 18px; word-wrap: break-word">
//         ${item.tag}</div>
//     </div>
//     <div class="Prioirty"
//       style="margin-left: 8px;padding-left: 8px; padding-right: 8px; background: #FFEEED; border-radius: 3px; overflow: hidden; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 8px; display: inline-flex">
//       <div class="Medium"
//         style="color: #FF5D58; font-size: 12px; font-family: system-ui; font-weight: 400; line-height: 18px; word-wrap: break-word">
//         ${item.priority}</div>
//     </div>
//   </div>
//   <div class="DateGroup"
//     style="align-self: stretch; justify-content: flex-start; align-items: flex-start; gap: 4px; display: inline-flex">
//     <div class="June2021"
//       style="flex: 1 1 0; color: #222D38; font-size: 12px; font-family: system-ui; font-weight: 400; line-height: 18px; word-wrap: break-word">
//       ${item.date}</div>
//   </div>
// </div>`)
// })

let html = ''

dataRequiredEmail['es'] = {
  text0: "Hemos detectado algo importante",
  text1: "Este es un mensaje automatico no lo reenvies acuerdate de poner info@aythen.com fuera de spam para leer tus alertas más importantes",
  text2: `💤 Hemos detectado una automatización
<br/><br/>
  🙏 Si no te soy necesario desactiva la alerta para ahorrar costes.
  `,
  text3: "Alertas activadas",
  text11: "Ver todas",
  cardTasks: 'html'
};



dataRequiredEmail['de'] = {
  text0: "Erinnerung, Ihre Daten arbeiten für Sie",
  text1: "Hallo [Kundenname]",
  text2: `💤 Wir möchten Sie daran erinnern, dass Sie ungenutzte Daten haben. Interagieren Sie mit ihnen, damit sie nützlich sind.
<br/><br/>
  🙏 Vielen Dank für Ihre Hingabe, wir freuen uns, wenn wir Ihnen helfen können, Ihr Geschäft auf einfache und effiziente Weise zu verstehen.
  `,
  text3: "Aufgaben",
  text10: "Aktualisieren Sie eine neue Quelle auf der Website.",
  text11: "Alle anzeigen",
  cardTasks: html
}

dataRequiredEmail['en'] = {
  text0: "Remember, your data works for you",
  text1: "Hi [Customer Name]",
  text2: `💤 We want to remind you that you have unused data. Interact with them to make them useful.
<br/><br/>
  🙏 Thanks for your dedication, we're happy to help you understand your business in a simpler and more efficient way.
  `,
  text3: "Tasks",
  text10: "Update new source on the website.",
  text11: "View all",
  cardTasks: html
}

dataRequiredEmail['fr'] = {
  text0: "Rappel, vos données travaillent pour vous",
  text1: "Bonjour [Nom du client]",
  text2: `💤 Nous voulons vous rappeler que vous avez des données inutilisées. Interagissez avec elles pour les rendre utiles.
<br/><br/>
  🙏 Merci pour votre dévouement, nous sommes ravis de vous aider à comprendre votre entreprise de manière plus simple et efficace.
  `,
  text3: "Tâches",
  text10: "Mettre à jour une nouvelle source sur le site web.",
  text11: "Voir tout",
  cardTasks: html
}

dataRequiredEmail['it'] = {
  text0: "Ricorda, i tuoi dati lavorano per te",
  text1: "Ciao [Nome del cliente]",
  text2: `💤 Vogliamo ricordarti che hai dati inutilizzati. Interagisci con loro per renderli utili.
<br/><br/>
  🙏 Grazie per la tua dedizione, ci fa piacere aiutarti a capire la tua attività in modo più semplice e efficiente.
  `,
  text3: "Compiti",
  text10: "Aggiornare una nuova fonte sul sito web.",
  text11: "Vedi tutto",
  cardTasks: html
}

dataRequiredEmail['nl'] = {
  text0: "Herinnering, uw gegevens werken voor u",
  text1: "Hallo [Klantennaam]",
  text2: `💤 Wij willen u eraan herinneren dat u ongebruikte gegevens heeft. Interactieer met hen om ze nuttig te maken.
<br/><br/>
  🙏 Dank voor uw toewijding, wij zijn blij om u te helpen uw bedrijf op een eenvoudigere en efficiëntere manier te begrijpen.
  `,
  text3: "Taken",
  text10: "Bijwerken van een nieuwe bron op de website.",
  text11: "Alle weergeven",
  cardTasks: html
}

dataRequiredEmail['pt'] = {
  text0: "Lembre-se, seus dados trabalham para você",
  text1: "Olá [Nome do cliente]",
  text2: `💤 Queremos lembrá-lo de que você tem dados não utilizados. Interaja com eles para torná-los úteis.
<br/><br/>
  🙏 Obrigado pela sua dedicação, estamos felizes em ajudá-lo a entender seu negócio de uma forma mais simples e eficiente.
  `,
  text3: "Tarefas",
  text10: "Atualizar uma nova fonte no site.",
  text11: "Ver tudo",
  cardTasks: html
}

dataRequiredEmail['ru'] = {
  text0: "Напоминание, ваши данные работают для вас",
  text1: "Здравствуйте [Имя клиента]",
  text2: `💤 Мы хотим напомнить вам, что у вас есть неиспользуемые данные. Взаимодействуйте с ними, чтобы они были полезными.
<br/><br/>
  🙏 Спасибо за вашу преданность, мы рады помочь вам понять ваш бизнес более простым и эффективным образом.
  `,
  text3: "Задачи",
  text10: "Обновить новый источник на сайте.",
  text11: "Просмотреть все",
  cardTasks: html
}

dataRequiredEmail['sv'] = {
  text0: "Kom ihåg, dina data arbetar för dig",
  text1: "Hej [Kundnamn]",
  text2: `💤 Vi vill påminna dig om att du har outnyttjade data. Interagera med dem för att göra dem användbara.
<br/><br/>
  🙏 Tack för din dedikation, vi är glada att hjälpa dig förstå din verksamhet på ett enklare och mer effektivt sätt.
  `,
  text3: "Uppgifter",
  text10: "Uppdatera en ny källa på webbplatsen.",
  text11: "Visa alla",
  cardTasks: html
}


  module.exports = dataRequiredEmail;
  
  
  