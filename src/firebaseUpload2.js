console.log("0");
const admin = require('firebase-admin');
const playersData = require('./players.json'); // Replace with the path to your players JSON file
const serviceAccount = require('./serviceAccountKey.json'); // Replace with the path to your service account JSON file

console.log("0 - Before initializing Firebase");
// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

console.log("1 - Firebase initialized");
// Get a Firestore instance
const db = admin.firestore();
console.log("2 - Firestore instance obtained");

// Test Firestore connection with a simple read
const testFirestoreConnection = async () => {
  try {
    console.log("3 - Testing Firestore connection");
    const testDoc = await db.collection('players').doc('test').get();
    console.log("4 - Firestore connection test successful");
    if (!testDoc.exists) {
      console.log("5 - Test document does not exist");
    } else {
      console.log("6 - Test document data:", testDoc.data());
    }
  } catch (error) {
    console.error('Error testing Firestore connection:', error);
  }
};

// Function to upload JSON data to Firestore
const uploadDataToFirestore = async () => {
  try {
    console.log("7 - Entering try block");
    const playersRef = db.collection('players'); // Replace 'players' with your collection name
    console.log("8 - Reference to 'players' collection obtained");
    
    // Iterate through each player in the JSON data and add it to Firestore
    for (const [name, player] of Object.entries(playersData)) {
      console.log(`Uploading data for player: ${name}`);
      await playersRef.doc(name).set(player); // Set each player document in Firestore
      console.log(`Uploaded data for ${name}`);
    }

    console.log('Data upload complete');
  } catch (error) {
    console.error('Error uploading data:', error);
  }
};

// Test Firestore connection and then run the function to upload data
testFirestoreConnection().then(uploadDataToFirestore);