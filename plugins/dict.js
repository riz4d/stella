 /* Copyright (C) 2021 riz4d
*/
const Rizad = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
/*const got = require('got');
const fs = require('fs');*/
const axios = require('axios');

const Language = require('../language');
const Lang = Language.getString('weather');
const { errorMessage, infoMessage } = require('../helpers');


Rizad.tostella({pattern: 'lngcode', fromMe: false, dontAddCommandList: true}, (async (message, match) => {    

    await message.sendMessage('*Code:* en_US \n *Language:* English (US) \n\n *Code:* hi \n *Language:* Hindi \n\n *Code:* es \n *Language:* Spanish \n\n *Code:* fr \n *Language:* French \n\n *Code:* ja \n *Language:* Japanese \n\n *Code:* ru \n *Language:* Russian \n\n *Code:* en_GB \n *Language:* English (UK) \n\n *Code:* de \n *Language:* German \n\n *Code:* it \n *Language:* Italian \n\n *Code:* ko \n *Language:* Korean \n\n *Code:* pt-BR \n *Language:* Brazilian Portuguese \n\n *Code:* ar \n *Language:* Arabic \n\n *Code:* tr \n *Language:* Turkish \n\n');

}));



/*Rizad.tostella({pattern: 'dict ?(.*)', fromMe: false,  dontAddCommandList: true }, async (message, match) => {
	if (match[1] === '') return await message.reply("Need word to translate");
       if (match[1].includes(';')) {
        var split = match[1].split(';');
        word = split[1];
        langcode = split[0];
         }
	else {
        word = match[1];
        langcode = 'en_US';
        }
       const url = `https://api.dictionaryapi.dev/api/v2/entries/${langcode}/${word}`;
	try {
		const response = await got(url);
		const json = JSON.parse(response.body);
	       if (response.statusCode === 200) return await message.client.sendMessage(message.jid, 
		'* ' + "Word:" +'* ```' + json[0].word + '```\n' + 
		'* ' + "Phonetics:" +'* ```' + json[0].phonetics[0].text + '```\n\n' + 
                '* ' + "Part of Speech:" +'* ```' + json.result[0][0].partOfSpeech + '```\n' + 
		'* ' + "Definition 1:" +'* ```' + json[0].meanings[0].definitions[0].definition + '```\n' +                                                                          
                '* ' + "Synonyms:" +'* ```' + json[0].meanings[0].definitions[0].synonyms[0] + '```\n' + 
                '* ' + "-" +'* ```' + json[0].meanings[0].definitions[0].synonyms[1] + '```\n' + 
                '* ' + "-" +'* ```' + json[0].meanings[0].definitions[0].synonyms[2] + '```\n' +  
                '* ' + "Usage:" +'* ```' + json[0].meanings[0].definitions[0].example + '```\n\n' +                                                                            
	 	'* ' + "Definition 2:" +'* ```' + json[0].meanings[0].definitions[1].definition + '```\n' +                                                                          
 	        '* ' + "Usage:" +'* ```' + json[0].meanings[0].definitions[1].example + '```\n\n\n' + 
                '* ' + "Part of Speech:" +'* ```' + json[0].meanings[1].partOfSpeech + '```\n\n' + 
		'* ' + "Definition :" +'* ```' + json[0].meanings[0].definitions[0].definition + '```\n' +                                                                          
                '* ' + "Synonyms:" +'* ```' + json[0].meanings[0].definitions[0].synonyms[0] + '```\n' + 
                '* ' + "-" +'* ```' + json[0].meanings[0].definitions[0].synonyms[1] + '```\n' +  
                '* ' + "Usage:" +'* ```' + json[0].meanings[0].definitions[0].example + '```\n\n', MessageType.text);
	} catch {
		return await message.client.sendMessage(message.jid, "error", MessageType.text);
	}
});
*/



/*Rizad.tostella({ pattern: 'dict ?(.*)', fromMe: false, desc: "Use it as a dictionary.\nEg: .dict en_US;lead\n For supporting languages send *.lngcode*" }, async (message, match) => {
    if (!match[1]) return await message.sendMessage(errorMessage("Need word"))
 if (match[1].includes(';')) {
        var split = match[1].split(';');
        word = split[1];
        langcode = split[0];
         }
	else {
        word = match[1];
        langcode = 'en_US';
        }
    await message.sendMessage(infoMessage("Loading"))
	
   for (var i = 0; i < 5 ; i++) {
	  
    await axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/${langcode}/${word}`)
      .then(async (response) => {
        const {
         definition,
	example,	
        } = response.data[i].meanings[i].definitions[i]
   
	
	const msg = `
        *${"Definition"}*: ${definition}    
        *${"Example"}*: ${example}`
	
	 await message.client.sendMessage(message.jid, msg , MessageType.text, {
          quoted: message.data,
        })
     })
      .catch(
        async (err) => await message.sendMessage(""),
      )}
  },
)
*/

Rizad.tostella({ pattern: 'dict ?(.*)', fromMe: false, desc: "Use it as a dictionary.\nEg: .dict en_US;lead\n For supporting languages send *.lngcode*" }, async (message, match) => {

    if (!match[1]) return await message.sendMessage(errorMessage("Need word"))

 if (match[1].includes(';')) {
        var split = match[1].split(';');
        word = split[1];
        langcode = split[0];
         }
	else {
        word = match[1];
        langcode = 'en_US';
        }

    await message.sendMessage(infoMessage("Loading"))

	  
    await axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/${langcode}/${word}`)
      .then(async (response) => {
        const {
         definition,
	example,	
        } = response.data[0].meanings[0].definitions[0]

   
	
	const msg = `
        *${"Definition"}*: ${definition}    
        *${"Example"}*: ${example}`
	
	 await message.client.sendMessage(message.jid, msg , MessageType.text, {
          quoted: message.data,
        })
	})    
	    
	    
    await axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/${langcode}/${word}`)
      .then(async (response) => {
        const {
         definition,
	example,	
        } = response.data[0].meanings[0].definitions[1]

   
	
	const msg = `
        *${"Definition"}*: ${definition}    
        *${"Example"}*: ${example}`
	
	 await message.client.sendMessage(message.jid, msg , MessageType.text, {
          quoted: message.data,
        })
	 })
	
	     await axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/${langcode}/${word}`)
      .then(async (response) => {
        const {
         definition,
	example,	
        } = response.data[0].meanings[1].definitions[0]

   
	
	const msg = `
        *${"Definition"}*: ${definition}    
        *${"Example"}*: ${example}`
	
	 await message.client.sendMessage(message.jid, msg , MessageType.text, {
          quoted: message.data,
        })
	})    
		     
	 await axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/${langcode}/${word}`)
      .then(async (response) => {
        const {
         definition,
	example,	
        } = response.data[0].meanings[1].definitions[1]

   
	
	const msg = `
        *${"Definition"}*: ${definition}    
        *${"Example"}*: ${example}`
	
	 await message.client.sendMessage(message.jid, msg , MessageType.text, {
          quoted: message.data,
        })    
	})    
		 
		  await axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/${langcode}/${word}`)
      .then(async (response) => {
        const {
         definition,
	example,	
        } = response.data[1].meanings[0].definitions[0]

   
	
	const msg = `
        *${"Definition"}*: ${definition}    
        *${"Example"}*: ${example}`
	
	 await message.client.sendMessage(message.jid, msg , MessageType.text, {
          quoted: message.data,
        })
	    

      })
      
  },
)

