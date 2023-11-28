const messagesCollector = {
  people: {
    nbaPlayers: [
      "Nikola Jokic",
      "Giannis Antetokounmpo",
      "Stephen Curry",
      "Luka Doncic",
      "Jayson Tatum",
      "Joel Embiid",
      "Kevin Durant",
      "Jimmy Butler",
      "Devin Booker",
      "Allen Iverson",
      "Lebron James",
    ],
    nflPlayers: [
      "Patrick Mahomes",
      "Aaron Rodgers",
      "Chris Jones",
      "Travis Kelce",
      "Josh Allen",
      "Joe Burrow",
      "Aaron Donald",
      "Justin Jefferson",
      "Nick Bosa",
      "Tyreek Hill",
      "Davante Adams",
    ],
    artists: [
      "Post Malone",
      "Travis Scott",
      "Meek Mill",
      "Asap Ferg",
      "Asap Rocky",
      "The Kid Laroi",
      "Mac Miller",
      "Andreson .Paak",
      "Frank Ocean",
      "Joji",
      "J Cole",
      "Rita Balbazor",
    ],
  },
  actionsWithoutFood: [
    "help you dunk",
    "help you get better in CS2",
    "motivate you to help you reach your goals",
    "boost you to 20,000CSR",
    "teach you full-stack",
    "land you your first job",
    "support you financially",
    "play basketball with you",
  ],
  actionsWithFood: [
    "making you pasta",
    "eating your pasta",
    "making you green-tea",
    "cooking you gnocchi",
    "drinking your gatorades",
    "cooking you pilmeni",
  ],
  yourMessage() {
    let finalMessage = "";
    let playersTypePropertiesIndexes = ["nbaPlayers", "nflPlayers", "artists"];
    let randomPlayersTypeIndex = Math.floor(
      Math.random() * playersTypePropertiesIndexes.length
    );
    let playerIndex = Math.floor(
      Math.random() *
        this.people[playersTypePropertiesIndexes[randomPlayersTypeIndex]].length
    );
    let firstActionIndex = Math.floor(
      Math.random() * this.actionsWithoutFood.length
    );
    let secondActionIndex = Math.floor(
      Math.random() * this.actionsWithFood.length
    );
    finalMessage +=
      this.people[playersTypePropertiesIndexes[randomPlayersTypeIndex]][
        playerIndex
      ] +
      " will " +
      this.actionsWithoutFood[firstActionIndex] +
      " by " +
      this.actionsWithFood[secondActionIndex];
    console.log(finalMessage);
  },
};

messagesCollector.yourMessage();
