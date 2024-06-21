import React, { useState, useEffect } from 'react';
import data from './players.json';

const PlayersComponent = () => {
  const [players, setPlayers] = useState({}); // State to store players

  useEffect(() => {
    let players = {}; // Object to store player data

    // Fetching JSON file using fetch API
   
    // Processing each player object in the JSON array
    data.forEach(player => {
      const name = player.name;
      const teams = player.teams;
      const seaP = player.sp;
      const carP = player.c;
      const seaGB = player.sgb;
      const carGB = player.cgb;
      const seaSV = player.ssv;
      const carSV = player.csv;
      const one = player.one;
      const draft = player.draft;
      const tall = player.tall;
      const short = player.short;
      const lefty = player.lefty;
      const college = player.college;
      const country = player.country;
      const picture = player.picture;

      const info = [teams, seaP, carP, seaGB, carGB, seaSV, carSV, one, draft, tall, short, lefty, college, country, picture];

      players[name] = info; // Assigning info array to players object under key 'name'
    });

    // Now players object is populated with data from JSON
    console.log(players);
    setPlayers(players)
    
  }, []); // Run once on component mount

  // Function to check categories for a player
  const check = (name, cat1, cat2) => {
    let c1 = false;
    let c2 = false;
    if (players[name].includes(cat1)) {
        c1 = true;
    }
    if (players[name][0].split(", ").includes(cat1)) {
      c1 = true;
    }
    if (players[name].includes(cat2)) {
      c2 = true;
    }
    if (players[name][0].split(", ").includes(cat2)) {
      c2 = true;
    }

    return c1 && c2;
  };

  // Function to perform big check
  const bigCheck = (cat1, cat2) => {
    const list = [];
    Object.keys(players).forEach(player => {
      if (check(player, cat1, cat2)) {
        
        list.push(player);
      }
    });
    return list;
  };

  // Function to generate categories
  const genCats = () => {
    let pllCats = ["Atlas", "Archers", "Cannons", "Chaos", "Outlaws", "Redwoods", "Waterdogs", "Whipsnakes"];
    let concats = ["USA", "CAN", "IRQ"];
    let collcats = ["Virginia", "Notre Dame", "Maryland", "Johns Hopkins", "Duke", "Denver", "Syracuse"];
    let statcats = ["20P", "100P", "20GB", "200GB", "100SV", "500SV","TALL","SHORT","Lefty","A","M","FO","SSDM","LSM","D","G"];
    let mllCats = ["Dragons", "Riptide", "Bayhawks", "Lizards", "Hounds", "Pride", "Rattlers", "Launch", "Blaze", "Machine", "Nationals", "Hammerheads", "Chrome", "Barrage"];

    const left = [];
    const top = [];

    let cat = ""
    for (let i = 0; i < 3; i++) {
      cat = pllCats[Math.floor(Math.random() * pllCats.length)]
      left.push(cat);
      pllCats = pllCats.filter(item => item !== cat);
    }

    
    for (let i = 0; i < 3; i++) {
      const topic = ['pll', 'countries', 'colleges', 'stats', 'mll'][Math.floor(Math.random() * 5)];
      switch (topic) {
        case 'pll':
          cat = pllCats[Math.floor(Math.random() * pllCats.length)];
          top.push(cat);
          pllCats = pllCats.filter(item => item !== cat)
          break;
        case 'countries':
          cat = concats[Math.floor(Math.random() * concats.length)];
          top.push(cat);
          concats = concats.filter(item => item !== cat)
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
        if(bigCheck(left[i],top[j]).length<1)
        {
            genCats()
            return
        }
      }
    }

    // Checking and printing results
    // (Modify as per your UI needs)
    console.log(left);
    console.log(top);
    console.log(`${left[0]} + ${top[0]}: `);
    console.log(bigCheck(left[0], top[0]));
    console.log(`${left[1]} + ${top[0]}: `);
    console.log(bigCheck(left[1], top[0]));
    console.log(`${left[2]} + ${top[0]}: `);
    console.log(bigCheck(left[2], top[0]));
    console.log(`${left[0]} + ${top[1]}: `);
    console.log(bigCheck(left[0], top[1]));
    console.log(`${left[1]} + ${top[1]}: `);
    console.log(bigCheck(left[1], top[1]));
    console.log(`${left[2]} + ${top[1]}: `);
    console.log(bigCheck(left[2], top[1]));
    console.log(`${left[0]} + ${top[2]}: `);
    console.log(bigCheck(left[0], top[2]));
    console.log(`${left[1]} + ${top[2]}: `);
    console.log(bigCheck(left[1], top[2]));
    console.log(`${left[2]} + ${top[2]}: `);
    console.log(bigCheck(left[2], top[2]));
    console.log(left);
    console.log(top);
  };

  // Render JSX
  return (
    <div>
      {/* Your JSX for rendering the UI */}
      {/* Example: */}
      <button onClick={genCats}>Generate Categories</button>
    </div>
  );
};

export default PlayersComponent;
