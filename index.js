const axios = require('axios');
const cheerio = require('cheerio');

let sname = '';
const getCharacterInfo = async (characterName, server) => {
    try {
        // Make a GET request to the character page
        const response = await axios.get(`https://maplestory.nexon.com/Ranking/World/Total?c=${characterName}&w=${server}`);
        const html = response.data;
        // Load the HTML into Cheerio
        const $ = cheerio.load(html);
        let servername = '';
        // Extract character information
        const characterInfo = {
            characterprofile: $('.char_img', '.search_com_chk').find('img').attr('src'),
            characterserverpicture: $('.search_com_chk').find('dt').find('img').attr('src'),
            charactername: $('.left', '.search_com_chk').find('dd').text().substring(5, 10),
            characterlevel: $('.search_com_chk').find('td:nth-child(3)').text(),
            characterpopular: $('.search_com_chk').find('td:nth-child(5)').text(),
            characterguild: $('.search_com_chk').find('td:nth-child(6)').text()
        };
        servername = characterInfo.characterserverpicture.substring(72, 73);
        if (servername == '4') {
            sname = '오로라';
        }
        // Return the character information
        return characterInfo;
    } catch (error) {
        throw error;
    }
};

// Example usage
const characterName = '보람둘이'; // Replace with the character name you want to search
const server = '3'; // Replace with the server name

getCharacterInfo(characterName, server)
    .then((characterInfo) => {
        console.log('Character Profile:', characterInfo.characterprofile);
        console.log('Character Server:', sname);
        console.log('Server Picture:', characterInfo.characterserverpicture);
        console.log('Charactername:', characterInfo.charactername);
        console.log('CharacterLevel:', characterInfo.characterlevel);
        console.log('Characterpopular:', characterInfo.characterpopular);
        console.log('Characterguild:', characterInfo.characterguild);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
