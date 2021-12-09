const Rizad = require('../events');
const {MessageType} = require('@adiwajshing/baileys');

Rizad.tostella({pattern: 'stella', fromMe: true}, (async (message, match) => {
    
    var r_text = new Array ();
r_text [0] = "*You are not what I searched for. You fell in love while I was out of my mind.*";
r_text [1] = "*Your smile is mine, my only breath in my world, my fragrant sweetie, I will go to death for you.*";
r_text [2] = "*They were telling me to see afterward. If Allah brought you against me at this age; is it my fault?*";
r_text [3] = "*May a hope sprinkle in your heart, a thousand happiness will be born in your days, everything be like yourself and be as beautiful as your eyes.*";
r_text [4] = "*The light of life in your eyes illuminates my world, the life I live is jealous of you baby.*";
r_text [5] = "*I bring all my beauties, happiness and excitement to you, because I live with you.*";
r_text [6] = "*I will dream of you when I fall asleep.*";
r_text [7] = "*Even 7 wonders of the world are worthless beside you my love, you are the only wonder of my inner world. *";
r_text [8] = "*Enjoy life with you I learned to take it, I felt my heart beat when I held your hand, I learned to laugh with your words my love.*";
r_text [9] = "*Even if you are far away now, your dream is enough ba na, one day you will come next to me then I will start living.*";
r_text [10] = "*I love to say I love you, I love your warm smile when I look in your eyes.*";
r_text [11] = "*You are the creature that a man wants but cannot get. You are my only truth sent to the false world, my love.*";
r_text [12] = "*Your inner beauty is enough, this lie is enough for the polyannish loves in the world my love, the beauty of your inner is my moon-faced.*";
r_text [13] = "*You are a spring*";
r_text [14] = "*You are so beautiful that the scenery will watch you.*";
r_text [15] = "*First, your voice comes to my mind..*";
r_text [16] = "*I thought you was an angel when I first saw you, now you became my fairy, you brought life to my life.*";
r_text [17] = "*Darling, you are super beautiful today, look at the hair messy but separate*";
r_text [18] = "*Come on, say yes, tell me yes, I opened my hands to my heart, waiting for that warm love.*";
r_text [19] = "*My honey-eyed is my heaven, you are my only truth in the false world , you became my only truth in the world, I forgot the false world.*";
r_text [20] = "*If you are, it will be even if there is no other.*"; 
r_text [21] = "*I learned to enjoy the moment, when I held your hand I felt my heart beat, I learned to laugh with your words, my love.*";

var i = Math.floor(22*Math.random())

await message.sendMessage(`${r_text[i]}`);

}));