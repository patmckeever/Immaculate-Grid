import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, CssBaseline, Paper, ClickAwayListener } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import image from './pll.png'; // Import the image
import data from './final.json';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import App from './App';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { firestore } from './firebase';


const list = [];
for (let name in data) {
  const p = {label: name, year: data[name].year};
  //console.log(p)
  list.push(p)
}

let count = 0;
let key = ""

const category = {
  "WAT": {
      text: "Waterdogs",
      image: require('./waterdogs.png'),
      description: "Waterdogs LC (2020-2023), Philadelphia Waterdogs (2024-Present)"

  },
  "ATL": {
    text: "Atlas",
    image: require('./atlas.png'),
    description: "Atlas LC (2019-2023), New York Atlas (2024-Present)"

  },
  "ARC": {
    text: "Archers",
    image: require('./archers.png'),
    description: "Archers LC (2019-2023), Utah Archers (2024-Present)"

  },
  "Cannons": {
    text: "Cannons",
    image: require('./cannons.png'),
    description: "Boston Cannons (MLL) (2001-2020), Cannons LC (2021-2023), Boston Cannons (2024-Present)"

  },
  "CHA": {
    text: "Chaos",
    image: require('./chaos.png'),
    description: "Chaos LC (2019-2023), Carolina Chaos (2024-Present)"

  },
  "OUT": {
    text: "Outlaws",
    image: require('./outlaws.png'),
    description: "Denver Outlaws (MLL) (2006-2020), Denver Outlaws (2024-Present)"

  },
  "RED": {
    text: "Redwoods",
    image: require('./redwoods.png'),
    description: "Redwoods LC (2019-2023), California Redwoods (2024-Present)"

  },
  "WHP": {
    text: "Whipsnakes",
    image: require('./whipsnakes.png'),
    description: "Whipsnakes LC (2019-2023), Maryland Whipsnakes (2024-Present)"

  },
  "BAY": {
    text: "Bayhawks",
    image: require('./Bayhawks.png'),
    description: "Baltimore Bayhawks (MLL) (2001-2006), Washington Bayhawks (MLL) (2007-2009), Chesapeake Bayhawks (MLL) (2010-2010)"

  },
  "DRG": {
    text: "Dragons",
    image: require('./Dragons.png'),
    description: "San Francisco Dragons (MLL) (2006-2008)"

  },
  "RIP": {
    text: "Riptide",
    image: require('./Riptide.png'),
    description: "Los Angeles Riptide (MLL) (2006-2008)"

  },
  "NYL": {
    text: "Lizards",
    image: require('./Lizards.png'),
    description: "Long Island Lizards (MLL) (2001-2012), New York Lizards (MLL) (2013-2020)"

  },
  "HND": {
    text: "Hounds",
    image: require('./Hounds.png'),
    description: "Charlotte Hounds (MLL) (2012-2018)"

  },
  "NJP": {
    text: "Pride",
    image: require('./Pride.png'),
    description: "New Jersey Pride (MLL) (2001-2008)"

  },
  "RAT": {
    text: "Rattlers",
    image: require('./Rattlers.png'),
    description: "Rochester Rattlers (MLL) (2001-2008, 2011-2017), Dallas Rattlers (MLL) (2018-2019)"

  },
  "LAU": {
    text: "Launch",
    image: require('./Launch.png'),
    description: "Florida Launch (MLL) (2014-2018)"

  },
  "BLZ": {
    text: "Blaze",
    image: require('./Blaze.png'),
    description: "Atlanta Blaze (MLL) (2016-2019)"

  },
  "MAC": {
    text: "Machine",
    image: require('./Machine.png'),
    description: "Chicago Machine (MLL) (2006-2010), Ohio Machine (MLL) (2012-2018)"

  },
  "NAT": {
    text: "Nationals",
    image: require('./Nationals.png'),
    description: "Toronto Nationals (MLL) (2009-2010), Hamilton Nationals (MLL) (2011-2013)"

  },
  "HAM": {
    text: "Hammerheads",
    image: require('./Hammerheads.png'),
    description: "Connecticut Hammerheads (MLL) (2020)"

  },
  "CHR": {
    text: "Chrome",
    image: require('./Chrome.png'),
    description: "Chrome LC (2019-2023)"

  },
  "BAR": {
    text: "Barrage",
    image: require('./Barrage.png'),
    description: "Bridgeport Barrage (MLL) (2001-2003), Philadelphia Barrage (MLL) (2004-2008, 2020)"

  },
  "USA": {
    text: "United States",
    image: require('./USA.png'),
    description: "Player can represent the United States National Team"

  },
  "CAN": {
    text: "Canada",
    image: require('./CAN.png'),
    description: "Player can represent the Canada National Team"

  },
  "IRQ": {
    text: "Haudenosaunee",
    image: require('./IRQ.png'),
    description: "Player can represent the Haudenosaunee National Team"

  },
  "Virginia": {
    text: "Virginia",
    image: require('./Virginia.png'),
    description: "Player played at the University of Virginia"

  },
  "Notre Dame": {
    text: "Notre Dame",
    image: require('./NotreDame.png'),
    description: "Player played at the University of Notre Dame"

  },
  "Maryland": {
    text: "Maryland",
    image: require('./Maryland.png'),
    description: "Player played at the University of Maryland"

  },
  "Johns Hopkins": {
    text: "Johns Hopkins",
    image: require('./JohnsHopkins.png'),
    description: "Player played at Johns Hopkins University"

  },
  "Duke": {
    text: "Duke",
    image: require('./Duke.png'),
    description: "Player played at Duke University"

  },
  "Denver": {
    text: "Denver",
    image: require('./Denver.png'),
    description: "Player played at the University of Denver"

  },
  "Syracuse": {
    text: "Syracuse",
    image: require('./Syracuse.png'),
    description: "Player played at Syracuse University"
  },
  "North Carolina": {
    text: "North Carolina",
    image: require('./NorthCarolina.png'),
    description: "Player played at the University of North Carolina"
  },
  "Ohio State": {
    text: "Ohio State",
    image: require('./OhioState.png'),
    description: "Player played at Ohio State University"
  },
  "Penn State": {
    text: "Penn State",
    image: require('./PennState.png'),
    description: "Player played at Penn State University"
  },
  "Michigan": {
    text: "Michigan",
    image: require('./Michigan.png'),
    description: "Player played at the University of Michigan"
  },
  "Rutgers": {
    text: "Rutgers",
    image: require('./Rutgers.png'),
    description: "Player played at Rutgers University"
  },
  "Yale": {
    text: "Yale",
    image: require('./Yale.png'),
    description: "Player played at Yale University"
  },
  "Princeton": {
    text: "Princeton",
    image: require('./Princeton.png'),
    description: "Player played at Princeton University"
  },
  "Penn": {
    text: "Penn",
    image: require('./Penn.png'),
    description: "Player played at the University of Pennsylvania"
  },
  "Cornell": {
    text: "Cornell",
    image: require('./Cornell.png'),
    description: "Player played at Cornell University"
  },
  "Brown": {
    text: "Brown",
    image: require('./Brown.png'),
    description: "Player played at Brown University"
  },
  "Albany": {
    text: "Albany",
    image: require('./Albany.png'),
    description: "Player played at the University of Albany"
  },
  "Villanova": {
    text: "Villanova",
    image: require('./Villanova.png'),
    description: "Player played at Villanova University"
  },
  "Georgetown": {
    text: "Georgetown",
    image: require('./Georgetown.png'),
    description: "Player played at Georgetown University"
  },
  "Marquette": {
    text: "Marquette",
    image: require('./Marquette.png'),
    description: "Player played at Marquette University"
  },
  "High Point": {
    text: "High Point",
    image: require('./HighPoint.png'),
    description: "Player played at High Point University"
  },
  "UMass": {
    text: "UMass",
    image: require('./UMass.png'),
    description: "Player played at the University of Massachusetts"
  },
  "Towson": {
    text: "Towson",
    image: require('./Towson.png'),
    description: "Player played at Towson University"
  },
  "Delaware": {
    text: "Delaware",
    image: require('./Delaware.png'),
    description: "Player played at the University of Delaware"
  },
  "Hofstra": {
    text: "Hofstra",
    image: require('./Hofstra.png'),
    description: "Player played at Hofstra University"
  },
  "Lehigh": {
    text: "Lehigh",
    image: require('./Lehigh.png'),
    description: "Player played at Lehigh University"
  },
  "Loyola": {
    text: "Loyola",
    image: require('./Loyola.png'),
    description: "Player played at Loyola University"
  },
  "undrafted": {
    text: "UNDRAFTED",
    image: "",
    description: "Player did not get drafted"
  },
  "top20": {
    text: "TOP 20 DRAFT PICK",
    image: "",
    description: "Player was drafted in the top 20"
  },
  "top10": {
    text: "TOP 10 DRAFT PICK",
    image: "",
    description: "Player was drafted in the top 10"
  },
  "top5": {
    text: "TOP 5 DRAFT PICK",
    image: "",
    description: "Player was drafted in the top 5"
  },
  "top1": {
    text: "#1 DRAFT PICK",
    image: "",
    description: "Player was drafted #1 overall"
  },
  "star": {
    text: "ALL-STAR",
    image: "",
    description: "Player has made an All-Star team in his career"
  },
  "star5": {
    text: "5x ALL-STAR",
    image: "",
    description: "Player has made 5 or more All-Star teams in his career"
  },
  "champ": {
    text: "CHAMP",
    image: "",
    description: "Player has won a PLL or MLL championship"
  },
  "mvp": {
    text: "MVP",
    image: "",
    description: "Player has won an MVP award"
  },
  "allpro": {
    text: "ALL-PRO",
    image: "",
    description: "Player has made a 1st or 2nd All-Pro team"
  },
  "opoy": {
    text: "OPOY",
    image: "",
    description: "Player has won an offensive player of the year award"
  },
  "dpoy": {
    text: "DPOY",
    image: "",
    description: "Player has won a defensive player of the year award"
  },
  "roy": {
    text: "ROY",
    image: "",
    description: "Player has won a rookie of the year award"
  },
  "seasonPoints": {
    text: "30 P SEASON",
    image: "",
    description: "Player has scored 30 points in a single season. When paired with a team, does not need to be in the same season"
  },
  "careerPoints": {
    text: "200 P CAREER",
    image: "",
    description: "Player has scored 200 points in his career"
  },
  "seasonGoals": {
    text: "20 G SEASON",
    image: "",
    description: "Player has scored 20 goals in a single season. When paired with a team, does not need to be in the same season"
  },
  "careerGoals": {
    text: "100 G CAREER",
    image: "",
    description: "Player has scored 100 goals in his career"
  },
  "seasonAssists": {
    text: "20 A SEASON",
    image: "",
    description: "Player has record 20 assists in a single season. When paired with a team, does not need to be in the same season"
  },
  "careerAssists": {
    text: "100 A CAREER",
    image: "",
    description: "Player has record 100 assists in his career"
  },
  "seasonGB": {
    text: "30 GB SEASON",
    image: "",
    description: "Player has recorded 30 groundballs in a single season. When paired with a team, does not need to be in the same season"

  },
  "careerGB": {
    text: "300 GB CAREER",
    image: "",
    description: "Player has recorded 300 groundballs in his career"

  },
  "seasonSaves": {
    text: "100 SAVE SEASON",
    image: "",
    description: "Player has recorded 100 saves in a single season. When paired with a team, does not need to be in the same season"
  },
  "careerSaves": {
    text: "500 SAVE CAREER",
    image: "",
    description: "Player has recorded 500 saves in his career"
  },
  "seasonCT": {
    text: "15 CT SEASON",
    image: "",
    description: "Player has recorded 15 caused turnovers in a single season. When paired with a team, does not need to be in the same season"
  },
  "careerCT": {
    text: "50 CT CAREER",
    image: "",
    description: "Player has recorded 50 caused turnovers in his career"
  },
  "careerGames": {
    text: "100 GAME CAREER",
    image: "",
    description: "Player has played in 100 games in his career"
  },
  "careerTwos": {
    text: "10 2G CAREER",
    image: "",
    description: "Player has recorded 10 two point goals in his career"
  },
  "TALL": {
    text: "6'3\" OR TALLER",
    image: "",
    description: "Player is 6'3\" or taller"

  },
  "SHORT": {
    text: "5'9\" OR SHORTER",
    image: "",
    description: "Player is 5'9\" or shorter"

  },
  "Lefty": {
    text: "LEFT HANDED",
    image: "",
    description: "Player's dominant hand is his left"

  },
  "One": {
    text: "ONE TEAM",
    image: "",
    description: "Player has played for only one MLL/PLL in his career"
  },
  "A": {
    text: "A",
    image: "",
    description: "Player's primary position is Attack"

  },
  "M": {
    text: "M",
    image: "",
    description: "Player's primary position is Midfield"

  },
  "SSDM": {
    text: "SSDM",
    image: "",
    description: "Player's primary position is Short Stick Defensive Midfield"

  },
  "FO": {
    text: "FO",
    image: "",
    description: "Player's primary position is Faceoff"

  },
  "LSM": {
    text: "LSM",
    image: "",
    description: "Player's primary position is Long Stick Midfield"

  },
  "D": {
    text: "D",
    image: "",
    description: "Player's primary position is Defense"

  },
  "G": {
    text: "G",
    image: "",
    description: "Player's primary position is Goalie"

  }
  
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; // Ensure it displays over other elements
`;

const ModalBox = styled(Box)`
   background-color: rgba(30, 30, 30, 1.0);
  max-height: 500px;
  overflow-y: auto;
  color: white;
  padding: 20px;
  border-radius: 8px;
  width: 275px;
  text-align: center;
  position: relative;
`;

const CloseButton = styled(Button)`
  position: absolute;
  font-size: 20px;
  color: rgba(150, 150, 150, 1.0);
  top: 10px;
  right: 10px;
  marginLeft: 5px;
  marginBottom: 20px;
`;



const theme = createTheme({
  palette: {
    mode: 'dark', // Enable dark mode
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
           borderRadius: '0px', // Rounded corners
        },
      },
    },
  },
});
let left = [];
let top = [];

const squareSize = 80; // Size of each square



function Unlimited() {

  const [PlayerData, setPlayerData] = useState([]);
  const [CategoryData, setCategoryData] = useState([]);

  
  const fetchData = async () => {
    try {
      const snapshot = await firestore.collection('newPlayer').get();
      const fetchedData = {};
      snapshot.forEach(doc => {
        fetchedData[doc.id] = {
          ...doc.data()
        };
      });
      setPlayerData(fetchedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };   
  const fetchCategoryData = async () => {
    try {
      const snapshot = await firestore.collection('newCategories').get();
      const fetchedData = {};
      snapshot.forEach(doc => {
        fetchedData[doc.id] = {
          ...doc.data()
        };
      });
      setCategoryData(fetchedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };   
  const updateData = async (PlayerName, newPlayerData) => {
    try {
      await firestore.collection('newPlayer').doc(PlayerName).update(newPlayerData);
      console.log('Data updated successfully');
      // Optionally, fetch updated data again
      fetchData();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  const updateCategoryData = async (CategoryName, newCategoryData) => {
    try {
      await firestore.collection('newCategories').doc(CategoryName).set(newCategoryData, { merge: true });
      console.log('Data updated or added successfully');
      // Optionally, fetch updated data again
      fetchCategoryData();
    } catch (error) {
      console.error('Error updating or adding data:', error);
    }
  };

  const [players, setPlayers] = useState({}); // State to store players

  // Function to check categories for a player
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

  const generate = (p) => {
    top = []
    left = []
    
    // Function to generate categories
    const genCats = () => {
      let pllCats = ["ATL", "ARC", "Cannons", "CHA", "OUT", "RED", "WAT", "WHP"];
      let collcats = ["Virginia", "Notre Dame", "Maryland", "Johns Hopkins", "Duke", "Denver", "Syracuse", "North Carolina", "Ohio State", "Penn State", "Michigan", "Rutgers", "Yale", "Princeton", "Penn", "Cornell", "Brown", "Albany", "Villanova", "Georgetown", "Marquette", "High Point", "UMass", "Towson", "Delaware", "Hofstra", "Lehigh", "Loyola"];
      let extraCats = ["star","star5","champ","mvp","allpro","opoy","dpoy","roy", "TALL","SHORT","Lefty","One","USA", "CAN", "IRQ"]
      let statcats = ["seasonPoints", "seasonGoals", "seasonAssists", "seasonGB", "seasonCT", "seasonSaves","careerPoints", "careerGoals", "careerAssists", "careerGB", "careerCT", "careerSaves", "careerGames", "careerTwos"];
      let mllCats = ["DRG", "RIP", "BAY", "NYL", "HND", "NJP", "RAT", "LAU", "BLZ", "MAC", "NAT", "HAM", "CHR", "BAR"];
      
      for (let i = 0; i < 3; i++) {
        let cat = ""
        cat = pllCats[Math.floor(Math.random() * pllCats.length)]
        left.push(cat);
        pllCats = pllCats.filter(item => item !== cat);
      }

      for (let i = 0; i < 3; i++) {
        let cat = ""
        const topic = ['pll', 'colleges', 'extra', 'stats', 'mll'][Math.floor(Math.random() * 5)];
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
          case 'extra':
            cat = extraCats[Math.floor(Math.random() * extraCats.length)];
            top.push(cat);
            extraCats = extraCats.filter(item => item !== cat)
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

      // Checking and printing results
      // (Modify as per your UI needs)
      //console.log(left);
      //console.log(top);
      //console.log(`${left[0]} + ${top[0]}: `);
      //console.log(bigCheck(left[0], top[0]));
      //console.log(`${left[1]} + ${top[0]}: `);
      //console.log(bigCheck(left[1], top[0]));
      //console.log(`${left[2]} + ${top[0]}: `);
      //console.log(bigCheck(left[2], top[0]));
      //console.log(`${left[0]} + ${top[1]}: `);
      //console.log(bigCheck(left[0], top[1]));
      //console.log(`${left[1]} + ${top[1]}: `);
      //console.log(bigCheck(left[1], top[1]));
      //console.log(`${left[2]} + ${top[1]}: `);
      //console.log(bigCheck(left[2], top[1]));
      //console.log(`${left[0]} + ${top[2]}: `);
      //console.log(bigCheck(left[0], top[2]));
      //console.log(`${left[1]} + ${top[2]}: `);
      //console.log(bigCheck(left[1], top[2]));
      //console.log(`${left[2]} + ${top[2]}: `);
      //console.log(bigCheck(left[2], top[2]));
      //console.log(left);
      //console.log(top);
    };


    

    genCats();

  
    
    setGuesses(9);
    setScore(0);
    setRarity(900);



    
    
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if(bigCheck(p,left[i],top[j]).length<1)
        {
          //console.log("Redoing: " + left[i] + " + " + top[j] + " length is "+ bigCheck(p,left[i],top[j]).length +", count: " + count)
            count++
            if(count<100) generate(p);
            
            return;
        }
      }
    }
    count = 0 

  };

  //console.log();
  

  const [selectedBox, setSelectedBox] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // State to track selected image

  const [buttonTexts, setTexts] = useState(Array.from({ length: 16 }))

  const [correctText, setCorrectText] = useState(Array.from({ length: 16 }))
  const [playerName, setPlayerName] = useState(Array.from({ length: 16 }))
  const [clickable, setUnClickable] = useState(Array.from({ length: 16 }))

  const [desc, setDesc] = useState(Array.from({ length: 16 }))

  const [isOver, setOver] = useState(Array.from({ length: 16 }))

  const [isBoxVisible, setIsBoxVisible] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  const [lengths, setLengths] = useState(Array.from({ length: 16 }))
  const [arrays, setArrays] = useState(Array.from({ length: 16 }))

  const [selectedSum, setSelectedSum] = useState(null);

  const [guesses, setGuesses] = useState(9);
  const [score, setScore] = useState(0);
  const [rarity, setRarity] = useState(900);

  
  
  const determineButtonText = (index) => {
    const isFirstRow = index > 0 && index < 4;
    const isLeftRow = index === 4 || index === 8 || index === 12;

    if(isFirstRow) return top[parseInt(index) - 1];
    else if(isLeftRow)  return left[(index/4) -1];
    else return undefined
  };
  

  
  
  const handleBoxClick = (index) => {
    setSelectedBox(index);
    setSelectedImage(null); // Reset selected image
    
  };

  const handleImageClick = (index) => {
    setSelectedImage(index);
    setSelectedBox(null); // Reset selected box
  };

  const handleClickAway = () => {
    setSelectedBox(null);
    setSelectedImage(null);
  };

  const handleOpenBox = (index) => {
   
    setIsBoxVisible(true);
   setSelectedSum(index);
   setSelectedBox(null);
   
  };

  const handleCloseBox = () => {
    setIsBoxVisible(false);
    setSelectedSum(null);
    
  };

  const handleGenerateClick = () => {
    generate(players);
    let list = [];
    let desc = [];
    let f = [];
    let text = [];
    let name = [];
    let over = [];
    for (let i = 0; i < 16; i++) {   
      list.push(determineButtonText(i));
      if(determineButtonText(i) !== undefined) desc.push(category[determineButtonText(i)].description)
      else desc.push(undefined)
      f.push(false);
      text.push("");
      name.push("");
      over.push(false)
    }
    setTexts(list);
    setDesc(desc);
    setCorrectText(text);
    setPlayerName(name)
    setUnClickable(f);
    setOver(over)
    handleClickAway();

  

    let l = []
    let a = []
    for (let i = 0; i < 4; i++) {
      l.push(undefined)
      a.push(undefined)
    }
    for (let i = 0; i < 3; i++) {
      l.push(undefined)
      a.push(undefined)
      for (let j = 0; j < 3; j++) {
        l.push(bigCheck(players,left[i],top[j]).length)
        a.push(bigCheck(players,left[i],top[j]))
      }
    } 
    setLengths(l)
    setArrays(a)
    //console.log(l)
    
  };
  useEffect(() => {

    fetchData()
    fetchCategoryData()

    let p = {}; // Object to store player data

    for (let name in data) {
      const link = 'https://premierlacrosseleague.com/player/' + name.replace(" ","-");
      const info = [data[name].team, data[name].year, data[name].seasonPoints, data[name].careerPoints, data[name].seasonGoals, data[name].careerGoals,data[name].seasonGB,data[name].careerGB,data[name].seasonCT,data[name].careerCT,data[name].seasonSaves, data[name].careerSaves, data[name].careerGames, data[name].careerTwos ,data[name].seasonAssists, data[name].careerAssists,data[name].profileUrl, link, data[name].undrafted, data[name].top20, data[name].top10, data[name].top5,data[name].top1, data[name].star,data[name].star5,data[name].mvp,data[name].champ,data[name].allpro,data[name].opoy,data[name].dpoy,data[name].roy,data[name].one, data[name].tall, data[name].short, data[name].handedness, data[name].position, data[name].college, data[name].countryCode];
      p[name] = info;
    }
    setPlayers(p)

    generate(p);
    let list = [];
    let desc =[];
    let f = [];
    let text = [];
    let name = [];
    let over = []
    for (let i = 0; i < 16; i++) {   
      list.push(determineButtonText(i));
      if(determineButtonText(i) !== undefined) desc.push(category[determineButtonText(i)].description)
      else desc.push(undefined)
      f.push(false);
      text.push("");
      name.push("");
      over.push(false)
    }
    setTexts(list);
    setDesc(desc)
    setCorrectText(text);
    setPlayerName(name);
    setUnClickable(f);
    setOver(over)
    handleClickAway();

    let l = []
    let a = []
    for (let i = 0; i < 4; i++) {
      l.push(undefined)
      a.push(undefined)
    }
    for (let i = 0; i < 3; i++) {
      l.push(undefined)
      a.push(undefined)
      for (let j = 0; j < 3; j++) {
        l.push(bigCheck(p,left[i],top[j]).length)
        a.push(bigCheck(p,left[i],top[j]))
      }
    } 
    setLengths(l)
    setArrays(a)

  }, []);

  
  

  const handleChange = (event, newValue) => {
    setSelectedItem(newValue);
    setSelectedBox(null);
    setSelectedImage(null);
    setGuesses(guesses-1);

    if(check(players,newValue.label,left[Math.floor(selectedBox/4)-1],top[(selectedBox%4)-1]))
    {
      clickable[selectedBox] = true;
      playerName[selectedBox] = newValue.label;
      correctText[selectedBox] = players[newValue.label][16];
      setCorrectText(correctText);
      setPlayerName(playerName);
      setUnClickable(clickable);
      setScore(score+1)
      
      if(left[Math.floor(selectedBox/4)-1].localeCompare(top[(selectedBox%4)-1]) < 0) key = left[Math.floor(selectedBox/4)-1] + top[(selectedBox%4)-1]
      else key = top[(selectedBox%4)-1] + left[Math.floor(selectedBox/4)-1]
      
      if(CategoryData[key] == undefined) CategoryData[key] = {"total": 1}
      else CategoryData[key]["total"] += 1

      if(PlayerData[playerName[selectedBox]].count[key] == undefined) PlayerData[playerName[selectedBox]].count[key] = 1
      else PlayerData[playerName[selectedBox]].count[key]++

      updateData(playerName[selectedBox],{ count: PlayerData[playerName[selectedBox]].count })
      updateCategoryData(key,CategoryData[key])
      
      setRarity(rarity - (100-(Math.round(((PlayerData[playerName[selectedBox]].count[key]/CategoryData[key]['total'])*10000))/100)))   
    }
    handleClickAway();

  };

  const gameOver = () => {
    let over = []
    let bool = false
    if(isOver[5]) bool = true

    for (let i = 0; i < 16; i++) { 
      if(bool) over.push(false)
      else if(i > 4 && i !== 8 && i !== 12) over.push(true);
      else over.push(false);
    }
    setOver(over)
    handleClickAway();
  };

  const giveUp = () => {
    setGuesses(0)
    handleClickAway();
  };

  const nothing = () => {
  };
  
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Ensures default styles are applied */}
      <Box sx={{ backgroundColor: '#121212', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        <Container maxWidth="md">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100vh',
              gap: 2,
            }}
          >
            {/* Title with button to the right */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: .5, marginLeft: 2, marginTop: '75px' }}>
              <Typography fontSize='12px'>PLL Immaculate Grid (BETA)</Typography>
              <Button style={{fontSize:'10px'}} variant="contained" color="primary" onClick={handleGenerateClick}>
                New Game
              </Button>
              <Link  to="/Immaculate-Grid" style = {{fontSize: '10px', color: '#90caf9'}}>Daily<br></br>Mode</Link>
            </Box>

            {/* Grid container */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: `repeat(4, ${squareSize}px)`,
                gridTemplateRows: `repeat(4, ${squareSize}px)`,
                //gap: 0,
                position: 'relative',
              }}
            >
              {Array.from({ length: 16 }).map((_, index) => {
                const isFirstRow = index < 4;
                const isFirstColumn = index % 4 === 0;
                const isImageCell = (isFirstRow || isFirstColumn);

                return (
                  <Box
                    key={index}
                    sx={{
                      width: squareSize,
                      height: squareSize,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '0px',
                      boxSizing: 'border-box',
                      cursor: 'pointer',
                    }}
                    onClick={() => index == 0 ? nothing : isImageCell ? handleImageClick(index) : handleBoxClick(index)}
                  >
                    
                    {isImageCell ? (
                    
                     index>0 && category[buttonTexts[index]] !== undefined && category[buttonTexts[index]].image !== "" ? (
                        <img
                          src={category[buttonTexts[index]].image}
                          alt={category[buttonTexts[index]].text}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '0px',
                          }}
                        />
                        
                      ) :
                        index>0 && category[buttonTexts[index]] !== undefined ? (
                        <Box
                          style={{
                            width: '100%',
                            height: '50%',
                            objectFit: 'cover',
                            borderRadius: '0px',
                            fontWeight: 'bold', // Make the text bold
                            textAlign: 'center', // Center the text
                            alignItems: 'center', // Center the text vertically
                          }}>
                          
                          {category[buttonTexts[index]].text}
                          </Box>
                        
                      ) : (
                        <img
                      
                          src={image}
                          alt={"Premier Lacrosse League"}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '0px',
                          }}
                        />
                      )) : isOver[index] ? (

                        <Box
                        variant="outlined"
                        sx={{
                          width: '100%',
                          height: '100%',
                          border: '1px solid gray',
                          position: 'relative', // Ensure the inner elements can be positioned relative to this Box
                          borderRadius: '0px',
                        }}
                        inputProps={{
                          style: {
                            textAlign: 'center',
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            position: 'absolute',
                            fontSize:'30px',
                            top: 10,
                            left: 0,
                            textAlign: 'center',
                            zIndex: 1, // Ensure the image is behind the text
                          }}
                        >
                          {lengths[index]}
                        </Box>
                        <Box
                          sx={{
                            position: 'absolute',
                            bottom: 0,
                            fontSize:'11px',
                            width: '100%',
                            textAlign: 'center',
                            padding: '5px 0',
                            zIndex: 2, // Ensure the text is above the image
                            color: '#90caf9',
                            textDecoration: 'underline',
                          }}
                          onClick={() => handleOpenBox(index)}
                        >
                         {"(Show)"}
                        </Box>
                      </Box>

                    ) : clickable[index] ? (

                      <Box
                        variant="outlined"
                        sx={{
                          width: '100%',
                          height: '100%',
                          border: '1px solid green',
                          position: 'relative', // Ensure the inner elements can be positioned relative to this Box
                          borderRadius: '0px',
                        }}
                        inputProps={{
                          style: {
                            textAlign: 'center',
                          },
                        }}
                      >
                        {buttonTexts[index]}
                        <Box
                          component="img"
                          src={correctText[index]}
                    
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            zIndex: 1, // Ensure the image is behind the text
                          }}
                        />
                        <Box
                          
                          sx={{
                            position: 'absolute',
                            bottom: 0,
                            fontSize:'7px',
                            width: '100%',
                            backgroundColor: 'black',
                            color: 'white',
                            textAlign: 'center',
                            padding: '5px 0',
                            
                            zIndex: 2, // Ensure the text is above the image
                          }}
                        >
                          <a style={{color: "#90caf9",fontSize:'9px',}} href={players[playerName[index]][17]} target = "_blank" rel="noreferrer"> {playerName[index]} </a>
                          
                        </Box>
                        <Box
                          
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            fontSize:'5px',
                            width: '30%',
                            backgroundColor: 'black',
                            color: 'white',
                            textAlign: 'center',
                            padding: '3px 0',
                            
                            zIndex: 2, // Ensure the text is above the image
                          }}
                        >
                           <p style={{fontSize:'6px',}}> { (left[Math.floor(index/4)-1].localeCompare(top[(index%4)-1]) >= 0) ? (Math.round((PlayerData[playerName[index]].count[top[(index%4)-1] + left[Math.floor(index/4)-1]] / CategoryData[top[(index%4)-1] + left[Math.floor(index/4)-1]]['total']) * 10000)/100) + "%" : (Math.round((PlayerData[playerName[index]].count[left[Math.floor(index/4)-1] + top[(index%4)-1]] / CategoryData[left[Math.floor(index/4)-1] + top[(index%4)-1]]['total']) * 10000)/100) + "%" } </p>
                        </Box>
                      </Box>
                    ): (

                      <Button
                        variant="outlined"
                        sx={{
                          width: '100%',
                          height: '100%',
                          border: '1px solid gray', // Ensure consistent border
                          borderRadius: '0px',
                        }}
                        inputProps={{
                          style: {
                            textAlign: 'center',
                          },
                        }}
                        />
                    )}
                    
                  </Box>
                );
              })}
            </Box>

            {/* Search container */}
            {selectedBox !== null && !isOver[5] && guesses>0 && (
              <ClickAwayListener onClickAway={handleClickAway}>
                <Paper
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '10%',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Transparent black color
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={list}
                    getOptionLabel={(option) => `${option.label} (${option.year})`}
                    sx={{ width: 300 }}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} label="Player" />}
                    renderOption={(props, option) => (
                      <li {...props}>
                        <Typography variant="body1">{option.label}</Typography>
                        <Typography variant="body2" color="textSecondary" style={{ marginLeft: 8 }}>
                          ({option.year})
                        </Typography>
                      </li>
                    )}
                  />
                </Paper>
              </ClickAwayListener>
            )}

            {/* Info box */}
            {selectedImage !== null  &&(
              <ClickAwayListener onClickAway={handleClickAway}>
                <Paper
                  sx={{
                    position: 'absolute',
                    top: 10,
                    
                    height: '5%',
                    borderRadius: '8px',
                    zIndex: 1000,
                    display: 'flex',
                    
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 2,
                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <Typography fontSize='10px' >{desc[selectedImage]}</Typography>
                </Paper>
              </ClickAwayListener>
            )}

            {/* Subtitle with button to the right */}
            {guesses>0 ?  (

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginTop: .5 }}>
                <Typography fontSize='15px'>Guesses Left:</Typography>
                <Typography fontSize='35px' fontWeight = 'bold' marginLeft='-10px' marginRight='10px'>{guesses}</Typography>
                <Button variant="contained" color="primary" onClick={giveUp}>
                  GIVE UP
                </Button>
              </Box>

            ) : !isOver[5] ? (

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginTop: 2 }}>
                <Typography fontSize='15px'>Your Score:</Typography>
                <Typography fontSize='35px' fontWeight = 'bold' marginLeft='-10px' marginRight='10px'>{score}-9</Typography>
                <Button variant="contained" color="primary" onClick={gameOver}>
                  SHOW SUMMARY
                </Button>
              </Box>

            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginTop: 2 }}>
                <Typography fontSize='15px'>Your Score:</Typography>
                <Typography fontSize='35px' fontWeight = 'bold' marginLeft='-10px' marginRight='10px'>{score}-9</Typography>
                <Button variant="contained" color="primary" onClick={gameOver}>
                  SHOW GRID
                </Button>
              </Box>
            )}
            

            {isBoxVisible && arrays[selectedSum] !== undefined  &&  (
             
                <Overlay>
                <ClickAwayListener onClickAway={handleCloseBox}>
                  <ModalBox>
                  <span style={{ display: 'flex',alignItems: 'center'}}>
                    <p style={{ textAlign: 'left',fontSize:"10px", color:'lightgray' }}>{ category[left[Math.floor(selectedSum/4)-1]].text} + {category[top[(selectedSum%4)-1]].text}</p>
                    <CloseButton onClick={handleCloseBox} >X</CloseButton>
                  </span>
                    <Box height={"10px"}></Box>
                    {arrays[selectedSum].map((text, index) => (
                      <span key={index} style={{ display: 'flex',alignItems: 'center'}}>
                        <p  style={{color:'lightgray', textAlign: 'left',fontSize:"12px", marginRight: '5px'}}>{index+1}. </p>
                        <a  href={players[text][17]} target="_blank" rel="noreferrer" style={{ color: '#90caf9',textAlign: 'left',fontSize:"12px" }}>{text} </a>
                        <p  style={{textAlign: 'bottom', marginLeft: '10px',fontSize:"8px",color:'lightgray' }}>{"("}{players[text][1]}{")"}</p>
                        <p style={{ textAlign: 'bottom', marginLeft: '10px', fontSize: "12px", color: 'lightgray' }}>
                        { ((PlayerData[text] != undefined) && (PlayerData[text].count != undefined) && (PlayerData[text].count[top[(selectedBox%4)-1] + left[Math.floor(selectedBox/4)-1]] != undefined) && (left[Math.floor(selectedBox/4)-1].localeCompare(top[(selectedBox%4)-1]) >= 0)) ? (Math.round((PlayerData[text].count[top[(selectedBox%4)-1] + left[Math.floor(selectedBox/4)-1]] / CategoryData[top[(selectedBox%4)-1] + left[Math.floor(selectedBox/4)-1]]['total']) * 10000)/100) + "%" : ((PlayerData[text] != undefined) && (PlayerData[text].count != undefined) && (PlayerData[text].count[left[Math.floor(selectedBox/4)-1] + top[(selectedBox%4)-1]] != undefined) && (left[Math.floor(selectedBox/4)-1].localeCompare(top[(selectedBox%4)-1]) < 0)) ? (Math.round((PlayerData[text].count[left[Math.floor(selectedBox/4)-1] + top[(selectedBox%4)-1]] / CategoryData[left[Math.floor(selectedBox/4)-1] + top[(selectedBox%4)-1]]['total']) * 10000)/100) + "%" : "0%" }
                        </p>
                      </span>
                    ))}
                  </ModalBox>
                  </ClickAwayListener>
                </Overlay>
              
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: -2, }}>
                <Typography fontSize='12px' display = 'flex' justify-content = 'center' align-items = 'center'>Rarity Score:</Typography>
                <Typography fontSize='15px' fontWeight = 'bold' marginLeft='5px' marginRight='10px'>{Math.round(rarity*10000)/10000}</Typography>
              </Box>

            <Typography fontSize='12px'>Tap on a logo or category for help</Typography>
            <Typography fontSize='12px' marginTop="-5px">Important:</Typography>
            <Typography fontSize='10px' marginTop="-15px">*Player must have played a game with PLL/MLL team to qualify<br></br>*MLL-only players don't have college/country/height data<br></br>*Player must have finished NCAA career with team to qualify</Typography>
    

          </Box>
        </Container>
      </Box>
    </ThemeProvider>


  );
  
}

export default Unlimited;