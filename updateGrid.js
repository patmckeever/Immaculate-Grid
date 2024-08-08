// Function to generate categories
const fs = require('fs');
let json = require('./src/data.json');
let data =  require('./src/players.json');

const prevDate = '8/7/2024'
const date = '8/8/2024'

let p = {};
for (let name in data) {
    const link = 'https://premierlacrosseleague.com/player/' + name.replace(" ","-");
    const info = [data[name].team, data[name].year, data[name].sp, data[name].cp, data[name].sgb, data[name].cgb, data[name].ssv, data[name].csv, data[name].one, data[name].draft, data[name].tall, data[name].short, data[name].lefty, data[name].position, data[name].college, data[name].country, data[name].picture,link];
    p[name] = info;
  }

const check = (players,name, cat1, cat2) => {
    let c1 = false;
    let c2 = false;

    if (players[name].includes(cat1)) c1 = true;
    if (players[name][0].split(", ").includes(cat1)) c1 = true;

    if (players[name].includes(cat2)) c2 = true;
    if (players[name][0].split(", ").includes(cat2))  c2 = true;

    return c1 && c2;
};

const bigCheck = (players, cat1, cat2) => {
     const list = [];
     Object.keys(players).forEach(player => {
       if (check(players,player, cat1, cat2)) {
         list.push(player);
       }
     });
     return list;
   };

let left = []
let top = []
let gridCount = json.data[prevDate].gridCount
let count = 0;

const generate = () => {

    left = []
    top = []

    let pllCats = ["Atlas", "Archers", "Cannons", "Chaos", "Outlaws", "Redwoods", "Waterdogs", "Whipsnakes"];
    let collcats = ["Virginia", "Notre Dame", "Maryland", "Johns Hopkins", "Duke", "Denver", "Syracuse","USA", "CAN", "IRQ"];
    //let statcats = ["30P", "200P", "30GB", "300GB", "100SV", "500SV","TALL","SHORT","Lefty","One","A","M","FO","SSDM","LSM","D","G"];
    let statcats = ["30P", "200P", "30GB", "300GB", "100SV", "500SV","TALL","SHORT","Lefty","One"];
    let mllCats = ["Dragons", "Riptide", "Bayhawks", "Lizards", "Hounds", "Pride", "Rattlers", "Launch", "Blaze", "Machine", "Nationals", "Hammerheads", "Chrome", "Barrage"];


    for (let i = 0; i < 3; i++) {
        let cat = ""
        cat = pllCats[Math.floor(Math.random() * pllCats.length)]
        left.push(cat);
        pllCats = pllCats.filter(item => item !== cat);
    }

    for (let i = 0; i < 3; i++) {
        let cat = ""
        const topic = ['pll', 'colleges', 'stats', 'mll'][Math.floor(Math.random() * 4)];
        switch (topic) {
        case 'pll':
            cat = pllCats[Math.floor(Math.random() * pllCats.length)];
            top.push(cat);
            pllCats = pllCats.filter(item => item !== cat)
            break;
        case 'colleges':
            cat = collcats[Math.floor(Math.random() * collcats.length)];
            top.push(cat);
            collcats = collcats.filter(item => item !== cat)
            break;
        case 'stats':
            cat = statcats[Math.floor(Math.random() * statcats.length)];
            top.push(cat);
            statcats = statcats.filter(item => item !== cat)
            break;
        case 'mll':
            cat = mllCats[Math.floor(Math.random() * mllCats.length)];
            top.push(cat);
            mllCats = mllCats.filter(item => item !== cat)
            break;
        default:
            break;
        }
    }

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if(bigCheck(p,left[i],top[j]).length<1)
            {
                count++
                if(count<1000) generate(); 
                return;
            }
        }
    }
    count = 0 
};


generate()
json.data[date] = {
    "left": left,
    "top": top,
    "gridCount": gridCount+1
}

// Write back to the JSON file
fs.writeFile('./src/data.json', JSON.stringify(json, null, 2), (err) => {
    if (err) {
    console.error('Error writing file:', err);
    return;
    }
});