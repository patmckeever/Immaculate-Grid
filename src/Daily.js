// src/App.js
import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, CssBaseline, Paper, ClickAwayListener } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import image from './pll.png'; // Import the image
import data from '../src/players.json';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import styled from 'styled-components';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { firestore } from './firebase';

let json = require('../src/data.json');
/*
const gridCount = json.data.gridCount
const left = json.data.left
const top = json.data.top
*/
let gridCount = ""
let left = ""
let top = ""
let key = ""


const list = [];
for (let name in data) {
  const p = {label: name, year: data[name].year};
  //console.log(p)
  list.push(p)
}

let count = 0;

const category = {
  "Waterdogs": {
      text: "Waterdogs",
      image: require('./waterdogs.png'),
      description: "Waterdogs LC (2020-2023), Philadelphia Waterdogs (2024-Present)"

  },
  "Atlas": {
    text: "Atlas",
    image: require('./atlas.png'),
    description: "Atlas LC (2019-2023), New York Atlas (2024-Present)"

  },
  "Archers": {
    text: "Archers",
    image: require('./archers.png'),
    description: "Archers LC (2019-2023), Utah Archers (2024-Present)"

  },
  "Cannons": {
    text: "Cannons",
    image: require('./cannons.png'),
    description: "Boston Cannons (MLL) (2001-2020), Cannons LC (2021-2023), Boston Cannons (2024-Present)"

  },
  "Chaos": {
    text: "Chaos",
    image: require('./chaos.png'),
    description: "Chaos LC (2019-2023), Carolina Chaos (2024-Present)"

  },
  "Outlaws": {
    text: "Outlaws",
    image: require('./outlaws.png'),
    description: "Denver Outlaws (MLL) (2006-2020), Denver Outlaws (2024-Present)"

  },
  "Redwoods": {
    text: "Redwoods",
    image: require('./redwoods.png'),
    description: "Redwoods LC (2019-2023), California Redwoods (2024-Present)"

  },
  "Whipsnakes": {
    text: "Whipsnakes",
    image: require('./whipsnakes.png'),
    description: "Whipsnakes LC (2019-2023), Maryland Whipsnakes (2024-Present)"

  },
  "Bayhawks": {
    text: "Bayhawks",
    image: require('./Bayhawks.png'),
    description: "Baltimore Bayhawks (MLL) (2001-2006), Washington Bayhawks (MLL) (2007-2009), Chesapeake Bayhawks (MLL) (2010-2010)"

  },
  "Dragons": {
    text: "Dragons",
    image: require('./Dragons.png'),
    description: "San Francisco Dragons (MLL) (2006-2008)"

  },
  "Riptide": {
    text: "Riptide",
    image: require('./Riptide.png'),
    description: "Los Angeles Riptide (MLL) (2006-2008)"

  },
  "Lizards": {
    text: "Lizards",
    image: require('./Lizards.png'),
    description: "Long Island Lizards (MLL) (2001-2012), New York Lizards (MLL) (2013-2020)"

  },
  "Hounds": {
    text: "Hounds",
    image: require('./Hounds.png'),
    description: "Charlotte Hounds (MLL) (2012-2018)"

  },
  "Pride": {
    text: "Pride",
    image: require('./Pride.png'),
    description: "New Jersey Pride (MLL) (2001-2008)"

  },
  "Rattlers": {
    text: "Rattlers",
    image: require('./Rattlers.png'),
    description: "Rochester Rattlers (MLL) (2001-2008, 2011-2017), Dallas Rattlers (MLL) (2018-2019)"

  },
  "Launch": {
    text: "Launch",
    image: require('./Launch.png'),
    description: "Florida Launch (MLL) (2014-2018)"

  },
  "Blaze": {
    text: "Blaze",
    image: require('./Blaze.png'),
    description: "Atlanta Blaze (MLL) (2016-2019)"

  },
  "Machine": {
    text: "Machine",
    image: require('./Machine.png'),
    description: "Chicago Machine (MLL) (2006-2010), Ohio Machine (MLL) (2012-2018)"

  },
  "Nationals": {
    text: "Nationals",
    image: require('./Nationals.png'),
    description: "Toronto Nationals (MLL) (2009-2010), Hamilton Nationals (MLL) (2011-2013)"

  },
  "Hammerheads": {
    text: "Hammerheads",
    image: require('./Hammerheads.png'),
    description: "Connecticut Hammerheads (MLL) (2020)"

  },
  "Chrome": {
    text: "Chrome",
    image: require('./Chrome.png'),
    description: "Chrome LC (2019-2023)"

  },
  "Barrage": {
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
  "30P": {
    text: "30 P SEASON",
    image: "",
    description: "Player has scored 30 points in a single season. When paired with a team, does not need to be in the same season"

  },
  "200P": {
    text: "200 P CAREER",
    image: "",
    description: "Player has scored 200 points in his career"

  },
  "30GB": {
    text: "30 GB SEASON",
    image: "",
    description: "Player has recorded 30 groundballs in a single season. When paired with a team, does not need to be in the same season"

  },
  "300GB": {
    text: "300 GB CAREER",
    image: "",
    description: "Player has recorded 300 groundballs in his career"

  },

  "100SV": {
    text: "100 SAVE SEASON",
    image: "",
    description: "Player has recorded 100 saves in a single season. When paired with a team, does not need to be in the same season"

  },
  "500SV": {
    text: "500 SAVE CAREER",
    image: "",
    description: "Player has recorded 500 saves in his career"

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


const squareSize = 80; // Size of each square

// copy text snackbar alert
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});  


function Daily() {

  

  const [PlayerData, setPlayerData] = useState([]);
  const [CategoryData, setCategoryData] = useState([]);

  
  const fetchData = async () => {
    try {
      const snapshot = await firestore.collection('players').get();
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
      const snapshot = await firestore.collection('categories').get();
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
      await firestore.collection('players').doc(PlayerName).update(newPlayerData);
      console.log('Data updated successfully');
      // Optionally, fetch updated data again
      fetchData();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  const updateCategoryData = async (CategoryName, newCategoryData) => {
    try {
      await firestore.collection('categories').doc(CategoryName).set(newCategoryData, { merge: true });
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
    //console.log(players[name])
    //console.log(name)
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
    setGuesses(9);
    setScore(0);
    setRarity(900);
  };
  

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

    const formatter = new Intl.DateTimeFormat('en-US', {timeZone: 'America/New_York'});
    const date = formatter.format(new Date())
   //const date = "7/15/2024"
    console.log(date)
    gridCount = json.data[date].gridCount
    left = json.data[date].left
    top = json.data[date].top

    let p = {}; // Object to store player data

    for (let name in data) {
      const link = 'https://premierlacrosseleague.com/player/' + name.replace(" ","-");
      const info = [data[name].team, data[name].year, data[name].sp, data[name].cp, data[name].sgb, data[name].cgb, data[name].ssv, data[name].csv, data[name].one, data[name].draft, data[name].tall, data[name].short, data[name].lefty, data[name].position, data[name].college, data[name].country, data[name].picture,link];
      p[name] = info;
    }
   //console.log(p)
    setPlayers(p)

    generate(p);

    let list = [];
    let desc =[];
    let f = [];
    let text = [];
    let name = [];
    let over = []
    let checks = []
    for (let i = 0; i < 16; i++) {   
      list.push(determineButtonText(i));
      if(determineButtonText(i) !== undefined) desc.push(category[determineButtonText(i)].description)
      else desc.push(undefined)
      f.push(false);
      text.push("");
      name.push("");
      over.push(false)
      checks.push(undefined)
    }
    setTexts(list);
    setDesc(desc)
    setCorrectText(text);
    setPlayerName(name);
    setUnClickable(f);
    setOver(over)
    handleClickAway();
    setCheckArray(checks)

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
    let jawn = checkArray;

    if(check(players,newValue.label,left[Math.floor(selectedBox/4)-1],top[(selectedBox%4)-1]))
    {
      clickable[selectedBox] = true;
      playerName[selectedBox] = newValue.label;
      correctText[selectedBox] = players[newValue.label][16];
      setCorrectText(correctText);
      setPlayerName(playerName);
      setUnClickable(clickable);
      setScore(score+1)
      jawn[selectedBox] = 1
      setCheckArray(jawn)
      
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
  
  const [open, setOpen] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [textToCopy, setCopyText] = useState('');
  const [checkArray, setCheckArray] = useState(Array.from({ length: 16 }));

  const handleClick = async () => {

    let string = ""
    for (let i = 0; i < 16; i++) { 
      if (i < 5 || i === 8 || i === 12) continue
      if (checkArray[i] === 1) string += "🟩"
      else string += "⬜️"
      if(i === 7 || i === 11) string += "\n"
    }
    const textToCopy = "🥍 PLL Immaculate Grid #" + gridCount +  ": " + score + "-9:\n" + "Rarity: " + rarity + "\n" + string + "\nPlay at:\nhttps://premier-lacrosse-league.github.io/Immaculate-Grid/";
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      setAlertText('Copied to clipboard!');
    } catch (err) {
      setAlertText('Failed to copy!');
    }
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
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
            {/*
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: .5, marginLeft: 2, marginTop: '50px' }}>
              <Typography fontSize='12px'>PLL Immaculate Grid (BETA)</Typography>
              <Button variant="contained" color="primary" onClick={handleGenerateClick}>
                New Game
              </Button>
            </Box>*/}
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: .5, marginLeft: 2, marginTop: '100px' }}>
              <Typography fontSize='12px'>PLL Immaculate Grid (BETA)</Typography>
              <Typography variant="contained">
                #{gridCount}
              </Typography>

              <Link  to="/Immaculate-Grid/Unlimited" style = {{fontSize: '10px', color: '#90caf9'}}>Unlimited<br></br>Mode</Link>
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
                    onClick={() => index === 0 ? nothing : isImageCell ? handleImageClick(index) : handleBoxClick(index)}
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

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginTop: .5, marginBotton:.5 }}>
                <Typography fontSize='15px'>Guesses Left:</Typography>
                <Typography fontSize='35px' fontWeight = 'bold' marginLeft='-10px' marginRight='10px'>{guesses}</Typography>
                <Button variant="contained" color="primary" onClick={giveUp}>
                  GIVE UP
                </Button>
              </Box>

            ) : !isOver[5] ? (

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: 2 }}>
                <Typography fontSize='15px'>Your Score:</Typography>
                <Typography fontSize='35px' fontWeight = 'bold' marginLeft='-5px' marginRight='5px'>{score}-9</Typography>
                <div>
                  <Button variant="contained" onClick={handleClick} size="small" sx={{ fontSize: '10px' }}>
                    Copy
                  </Button>
                  <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={alertText === 'Copied to clipboard!' ? 'success' : 'error'}>
                      {alertText}
                    </Alert>
                  </Snackbar>
                </div>
                <Button variant="contained" color="primary" size="small" sx={{ fontSize: '10px' }} onClick={gameOver}>
                  SHOW SUMMARY
                </Button>
              </Box>

            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: 2 }}>
                <Typography fontSize='15px'>Your Score:</Typography>
                <Typography fontSize='35px' fontWeight = 'bold' marginLeft='-5px' marginRight='5px'>{score}-9</Typography>
                <div>
                  <Button variant="contained" onClick={handleClick} size="small" sx={{ fontSize: '10px' }}>
                    Copy
                  </Button>
                  <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={alertText === 'Copied to clipboard!' ? 'success' : 'error'}>
                      {alertText}
                    </Alert>
                  </Snackbar>
                </div>
                <Button variant="contained" color="primary" size="small" sx={{ fontSize: '10px' }} onClick={gameOver}>
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
                        <p style={{ textAlign: 'bottom', marginLeft: '10px', fontSize: "8px", color: 'lightgray' }}>
                        { ((PlayerData[text].count[top[(selectedBox%4)-1] + left[Math.floor(selectedBox/4)-1]] != undefined) && (left[Math.floor(selectedBox/4)-1].localeCompare(top[(selectedBox%4)-1]) >= 0)) ? (Math.round((PlayerData[text].count[top[(selectedBox%4)-1] + left[Math.floor(selectedBox/4)-1]] / CategoryData[top[(selectedBox%4)-1] + left[Math.floor(selectedBox/4)-1]]['total']) * 10000)/100) + "%" : ((PlayerData[text].count[left[Math.floor(selectedBox/4)-1] + top[(selectedBox%4)-1]] != undefined) && (left[Math.floor(selectedBox/4)-1].localeCompare(top[(selectedBox%4)-1]) < 0)) ? (Math.round((PlayerData[text].count[left[Math.floor(selectedBox/4)-1] + top[(selectedBox%4)-1]] / CategoryData[left[Math.floor(selectedBox/4)-1] + top[(selectedBox%4)-1]]['total']) * 10000)/100) + "%" : "0%" }
                        </p>
                        </span>
                    ))}
                    
                  </ModalBox>
                  </ClickAwayListener>
                </Overlay>
              
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: -2, }}>
                <Typography fontSize='12px' display = 'flex' justify-content = 'center' align-items = 'center'>Rarity Score:</Typography>
                <Typography fontSize='15px' fontWeight = 'bold' marginLeft='5px' marginRight='10px'>{rarity}</Typography>
              </Box>
            

            <Typography fontSize='12px' display = 'flex' justify-content = 'center' align-items = 'center'>Tap on a logo or category for help</Typography>
            <Typography fontSize='12px' marginTop="-5px">Important:</Typography>
            <Typography fontSize='10px' marginTop="-15px">*Data from 2019 MLL season is currently unavailable<br></br>*MLL-only players don't have college/position/country/height data<br></br>*Player must have finished a season with MLL team to qualify<br></br>*Player must have finished NCAA career with team to qualify</Typography>
    

          </Box>
        </Container>
      </Box>
    </ThemeProvider>


  );
  
}

export default Daily;
