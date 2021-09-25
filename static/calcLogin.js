// array to categorize the player
var playerCategory = {
  BAT: [],
  BOW: [],
  ALL: [],
  WK: [],
  FORN: [],
  RET: [],
  UNCAP: [],
};

var calculateBonus = function () {
  var playerBonus = {
    bat_ppl: 0,
    bow_ppl: 0,
    bat_mid: 0,
    bow_mid: 0,
    bat_death: 0,
    bow_death: 0,
  };
  console.log("inside function");
  console.log(playerPositionObject);
  for (var i in playerPositionObject) {
    for (var j in playerPositionObject[i]) {
      playerBonus[i] += playerPositionObject[i][j];
    }
  }

  console.log(playerBonus);
  let total_bat_bonus = document.getElementById("total_bat_bonus");
  let total_bow_bonus = document.getElementById("total_bow_bonus");
  let bat_ppl = document.getElementById("bat_ppl");
  let bow_ppl = document.getElementById("bow_ppl");
  let bat_mid = document.getElementById("bat_mid");
  let bow_mid = document.getElementById("bow_mid");
  let bat_death = document.getElementById("bat_death");
  let bow_death = document.getElementById("bow_death");

  let bat_ppl_bonus = 0;
  let bow_ppl_bonus = 0;
  let bat_mid_bonus = 0;
  let bow_mid_bonus = 0;
  let bat_death_bonus = 0;
  let bow_death_bonus = 0;

  for (i in playerBonus) {
    if (i == "bat_ppl" || i == "bat_mid") {
      if (playerBonus[i] > 36) {
        if (i == "bat_ppl") {
          bat_ppl_bonus = 5;
          bat_ppl.innerHTML = 5;
        } else {
          bat_mid_bonus = 5;
          bat_mid.innerHTML = 5;
        }
      } else if (playerBonus[i] > 32) {
        if (i == "bat_ppl") {
          bat_ppl_bonus = 3;
          bat_ppl.innerHTML = 3;
        } else {
          bat_mid_bonus = 3;
          bat_mid.innerHTML = 3;
        }
      } else if (playerBonus[i] >= 28) {
        if (i == "bat_ppl") {
          bat_ppl_bonus = 1;
          bat_ppl.innerHTML = 1;
        } else {
          bat_mid_bonus = 1;
          bat_mid.innerHTML = 1;
        }
      } else {
        if (i == "bat_ppl") {
          bat_ppl_bonus = 0;
          bat_ppl.innerHTML = 0;
        } else {
          bat_mid_bonus = 0;
          bat_mid.innerHTML = 0;
        }
      }
    } else if (i == "bow_ppl" || i == "bow_mid") {
      if (playerBonus[i] > 27) {
        if (i == "bow_ppl") {
          bow_ppl_bonus = 5;
          bow_ppl.innerHTML = 5;
        } else {
          bow_mid_bonus = 5;
          bow_mid.innerHTML = 5;
        }
      } else if (playerBonus[i] > 24) {
        if (i == "bow_ppl") {
          bow_ppl_bonus = 3;
          bow_ppl.innerHTML = 3;
        } else {
          bow_mid_bonus = 3;
          bow_mid.innerHTML = 3;
        }
      } else if (playerBonus[i] >= 21) {
        if (i == "bow_ppl") {
          bow_ppl_bonus = 1;
          bow_ppl.innerHTML = 1;
        } else {
          bow_mid_bonus = 1;
          bow_mid.innerHTML = 1;
        }
      } else {
        if (i == "bow_ppl") {
          bow_ppl_bonus = 0;
          bow_ppl.innerHTML = 0;
        } else {
          bow_mid_bonus = 0;
          bow_mid.innerHTML = 0;
        }
      }
    } else {
      if (playerBonus[i] > 18) {
        if (i == "bow_death") {
          bow_death_bonus = 5;
          bow_death.innerHTML = 5;
        } else {
          bat_death_bonus = 5;
          bat_death.innerHTML = 5;
        }
      } else if (playerBonus[i] > 16) {
        if (i == "bow_death") {
          bow_death_bonus = 3;
          bow_death.innerHTML = 3;
        } else {
          bat_death_bonus = 3;
          bat_death.innerHTML = 3;
        }
      } else if (playerBonus[i] >= 14) {
        if (i == "bow_death") {
          bow_death_bonus = 1;
          bow_death.innerHTML = 1;
        } else {
          bat_death_bonus = 1;
          bat_death.innerHTML = 1;
        }
      } else {
        if (i == "bow_death") {
          bow_death_bonus = 0;
          bow_death.innerHTML = 0;
        } else {
          bat_death_bonus = 0;
          bat_death.innerHTML = 0;
        }
      }
    }
  }
  total_bat_bonus.innerHTML = bat_ppl_bonus + bat_mid_bonus + bat_death_bonus;
  total_bow_bonus.innerHTML = bow_ppl_bonus + bow_mid_bonus + bow_death_bonus;
  Total_Score();
};

var Total_Score = function () {
  let total_bat_bonus = document.getElementById("total_bat_bonus");
  let total_bow_bonus = document.getElementById("total_bow_bonus");
  let total_score = document.getElementById("total_score");
  let your_score = document.getElementById("scoreTag");
  console.log("your score = " + playerCount);
  total_score.value =
    playerCount +
    parseInt(total_bat_bonus.innerHTML) +
    parseInt(total_bow_bonus.innerHTML);
};

var players = [];
let playerCount = 0;
let scoreTag = document.getElementById("scoreTag");
let playerCountDiv = document.getElementById("playerCountDiv");

// adding the names of the rendered players
playerList.forEach(function (selectedPlayerInfo, i) {
  console.log(selectedPlayerInfo);
  players.push(selectedPlayerInfo.name);

  let starFielder = "";
  let wk = "";
  let uncapped = "";
  let teamImage = "/static/cardlogo/" + selectedPlayerInfo.team + ".png";
  let countryImage = "/static/india.png";
  if (selectedPlayerInfo.is_starred) {
    starFielder = "Star Fielder";
  }
  if (selectedPlayerInfo.is_wk) {
    wk = "(WK)";
  }
  if (selectedPlayerInfo.foreign) {
    countryImage = "/static/plane.png";
  }
  if (selectedPlayerInfo.is_uncapped) {
    uncapped = " -U";
  }

  let playerDiv = document.getElementById("playerDiv");
  playerDiv.innerHTML +=
    '<div class="col" style="transition: all 0.5s ease-in">' +
    '<div class="wrapper" >' +
    '<div class="fut-player-card" onclick="selectPlayer(' +
    "'" +
    selectedPlayerInfo.name +
    "'" +
    ',this)" style="background-image:linear-gradient(' +
    selectedPlayerInfo.color1 +
    "," +
    selectedPlayerInfo.color2 +
    ');">' +
    '<div class="player-card-top">' +
    '<div class="player-master-info"><div class="test" align="left">' +
    '<div class="player-rating"><span>' +
    selectedPlayerInfo.overall +
    "</span></div>" +
    '<div class="player-position"><span>' +
    selectedPlayerInfo.type +
    "</span></div>" +
    '<div class="player-nation"><img src="' +
    countryImage +
    '"  draggable="false"/></div>' +
    '<div class="player-club"><img src="' +
    teamImage +
    '"  draggable="false"/></div>' +
    "</div></div>" +
    '<div class="player-picture"><img src= "/static/players/' +
    selectedPlayerInfo.name +
    '.png" alt="' +
    selectedPlayerInfo.name +
    '" draggable="false"/>' +
    '<div class="player-extra"><span>' +
    starFielder +
    "</span></div>" +
    "</div>" +
    "</div>" +
    '<div class="player-card-bottom">' +
    '<div class="player-info">' +
    '<div class="player-name"><span>' +
    selectedPlayerInfo.name +
    wk +
    uncapped +
    "</span></div>" +
    '<div class="player-features">' +
    '<div class="player-features-col">BAT<span>' +
    '<div class="player-feature-value">' +
    selectedPlayerInfo.bat_ppl +
    "</div>" +
    '<div class="player-feature-title">POW</div></span><span>' +
    '<div class="player-feature-value">' +
    selectedPlayerInfo.bat_mid +
    "</div>" +
    '<div class="player-feature-title">MO</div></span><span>' +
    '<div class="player-feature-value">' +
    selectedPlayerInfo.bat_death +
    "</div>" +
    '<div class="player-feature-title">D</div></span></div>' +
    '<div class="player-features-col">BOW<span>' +
    '<div class="player-feature-value">' +
    selectedPlayerInfo.bow_ppl +
    "</div>" +
    '<div class="player-feature-title">POW</div></span><span>' +
    '<div class="player-feature-value">' +
    selectedPlayerInfo.bow_mid +
    "</div>" +
    '<div class="player-feature-title">MO</div></span><span>' +
    '<div class="player-feature-value">' +
    selectedPlayerInfo.bow_death +
    "</div>" +
    '<div class="player-feature-title">D</div></span></div>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>";
});
console.log(players);

var catInputFunction = () => {
  console.log("testing", document.getElementsByClassName("catInput")[0]);
  let condition = checkCriteria();
  for (var i = 0; i < 6; i++) {
    if (condition == "" && selectedPlayers.length == 11) {
      document.getElementsByClassName("catInput")[i].disabled = false;
    } else {
      document.getElementsByClassName("catInput")[i].disabled = true;
    }
  }
};

var selectedPlayers = [];
var selectPlayer = function (newPlayer, wrapperCard) {
  console.log(newPlayer, wrapperCard);

  if (selectedPlayers.includes(newPlayer)) {
    snackbarFunction("Removing Selected Player");
    console.log("here removing");
    wrapperCard.style.boxShadow =
      "0.7rem 0.7rem 2.7rem 1.5rem rgb(211, 211, 211)";
    // wrapperCard.style.transform="scale(1,1)";
    // $(wrapperCard).hover(function(){
    //   $(this).css("background-color", "yellow");
    //   }, function(){
    //   $(this).css("background-color", "pink");
    // });

    removingSelectedPlayer(newPlayer);
  } else if (selectedPlayers.length == 11) {
    snackbarFunction("Remove a Player");
  } else if (!players.includes(newPlayer)) {
    snackbarFunction("Invalid Player");
  } else {
    console.log(selectedPlayers);
    selectedPlayers.push(newPlayer);

    wrapperCard.style.boxShadow =
      "0.5rem 0.5rem 1.4rem 1.3rem rgb(226, 204, 7)";
    // wrapperCard.style.transform="scale(1.1,1.1)";

    playerList.forEach(function (playerInfo) {
      if (playerInfo.name == newPlayer) {
        selectedPlayerInfo = playerInfo;
        if (playerInfo.type == "BAT" && playerInfo.is_wk) {
          playerCategory["WK"].push(newPlayer);
        } else if (playerInfo.type == "BAT" && !playerInfo.is_wk) {
          playerCategory["BAT"].push(newPlayer);
        } else {
          console.log(playerInfo.type);
          playerCategory[playerInfo.type].push(newPlayer);
        }
        if (playerInfo.team == "RET") {
          playerCategory["RET"].push(newPlayer);
        }
        if (playerInfo.foreign) {
          playerCategory["FORN"].push(newPlayer);
        }
        if (playerInfo.is_uncapped) {
          playerCategory["UNCAP"].push(newPlayer);
        }
      }
    });

    playerCount = parseInt(selectedPlayerInfo.overall) + playerCount;
    console.log(playerCount);
    if (selectedPlayerInfo.is_starred) {
      playerCount += 2;
    }
    scoreTag.innerHTML = playerCount;
    Total_Score();
    console.log(selectedPlayers);
    let rule = checkCriteria();
    if (selectedPlayers.length < 11) {
      console.log("here");
      playerCountDiv.innerHTML =
        "You have to select <span style='color:red'>" +
        parseInt(11 - selectedPlayers.length) +
        "</span> players!!";
    } else if (rule == "") {
      $("#bat_pplList option").remove();
      $("#bat_midList option").remove();
      $("#bat_deathList option").remove();

      $("#bow_pplList option").remove();
      $("#bow_midList option").remove();
      $("#bow_deathList option").remove();

      playerCategory["BAT"].forEach(function (player) {
        console.log(player);
        playerList.forEach(function (playerInfo) {
          if (playerInfo.name == player) {
            document.getElementById("bat_midList").innerHTML +=
              "<option value='" +
              player +
              "-" +
              playerInfo.bat_mid +
              "'></option>";
            document.getElementById("bat_pplList").innerHTML +=
              "<option value='" +
              player +
              "-" +
              playerInfo.bat_ppl +
              "'></option>";
            document.getElementById("bat_deathList").innerHTML +=
              "<option value='" +
              player +
              "-" +
              playerInfo.bat_death +
              "'></option>";
          }
        });
      });

      playerCategory["WK"].forEach(function (player) {
        console.log(player);
        playerList.forEach(function (playerInfo) {
          if (playerInfo.name == player) {
            document.getElementById("bat_midList").innerHTML +=
              "<option value='" +
              player +
              "-" +
              playerInfo.bat_mid +
              "'></option>";
            document.getElementById("bat_pplList").innerHTML +=
              "<option value='" +
              player +
              "-" +
              playerInfo.bat_ppl +
              "'></option>";
            document.getElementById("bat_deathList").innerHTML +=
              "<option value='" +
              player +
              "-" +
              playerInfo.bat_death +
              "'></option>";
          }
        });
      });

      playerCategory["ALL"].forEach(function (player) {
        console.log(player);
        playerList.forEach(function (playerInfo) {
          if (playerInfo.name == player) {
            document.getElementById("bat_midList").innerHTML +=
              "<option value='" +
              player +
              "-" +
              playerInfo.bat_mid +
              "'></option>";
            document.getElementById("bat_pplList").innerHTML +=
              "<option value='" +
              player +
              "-" +
              playerInfo.bat_ppl +
              "'></option>";
            document.getElementById("bat_deathList").innerHTML +=
              "<option value='" +
              player +
              "-" +
              playerInfo.bat_death +
              "'></option>";
            document.getElementById("bow_deathList").innerHTML +=
              "<option value='" +
              player +
              "-" +
              playerInfo.bow_death +
              "'></option>";
            document.getElementById("bow_midList").innerHTML +=
              "<option value='" +
              player +
              "-" +
              playerInfo.bow_mid +
              "'></option>";
            document.getElementById("bow_pplList").innerHTML +=
              "<option value='" +
              player +
              "-" +
              playerInfo.bow_ppl +
              "'></option>";
          }
        });
      });

      playerCategory["BOW"].forEach(function (player) {
        console.log(player);
        playerList.forEach(function (playerInfo) {
          if (playerInfo.name == player) {
            document.getElementById("bow_deathList").innerHTML +=
              "<option value='" +
              player +
              "-" +
              playerInfo.bow_death +
              "'></option>";
            document.getElementById("bow_midList").innerHTML +=
              "<option value='" +
              player +
              "-" +
              playerInfo.bow_mid +
              "'></option>";
            document.getElementById("bow_pplList").innerHTML +=
              "<option value='" +
              player +
              "-" +
              playerInfo.bow_ppl +
              "'></option>";
          }
        });
      });

      catInputFunction();

      playerCountDiv.innerHTML =
        "You can now proceed and click on <span class='formNext'><a href='#moveDown'>NEXT</a></span>";
    } else {
      playerCountDiv.innerHTML =
        'Criteria not fulfilled, check criteria <span class="criteriaButton" onclick="changeRuleBox(' +
        "'" +
        rule +
        "'" +
        ');">HERE</span>';
    }
    changePlayerSelectedState();
    snackbarFunction("Player Selected");
  }
};

var playerPositionObject = {
  bat_ppl: {},
  bat_mid: {},
  bat_death: {},
  bow_ppl: {},
  bow_mid: {},
  bow_death: {},
};

var remPlayerCategory = function (oldPlayer, el) {
  console.log(oldPlayer, el.parentNode.parentNode.parentNode.parentNode);
  let playerNameDiv = el.parentNode.parentNode.parentNode.parentNode;

  console.log(oldPlayer.split("-"));
  let infoArray = oldPlayer.split("-");
  //playerPositionObject[infoArray[0]].splice(playerPositionObject[infoArray[0]].indexOf(infoArray[1]),1);
  delete playerPositionObject[infoArray[0]][infoArray[1]];
  playerNameDiv.style.opacity = "0";
  playerNameDiv.style.transfrom = "scale(0.8,0.8)";
  setTimeout(function () {
    playerNameDiv.style.display = "none";
  }, 400);

  console.log(playerPositionObject);
  calculateBonus();
};

var checkCategoryCondition = function (category, playerName) {
  console.log(category);
  if (!selectedPlayers.includes(playerName)) {
    snackbarFunction("Invalid Player Name , please select from the list");
    return false;
  }

  if (playerPositionObject[category][playerName] != undefined) {
    console.log("already selected in the given category");
    snackbarFunction("Already present");
    return false;
  }

  if (categoryCount(category)) {
    if (
      category == "bat_ppl" ||
      category == "bat_mid" ||
      category == "bat_death"
    ) {
      console.log("yess inside batting check");
      let countPlayer = 0;
      if (playerPositionObject["bat_death"][playerName] != undefined) {
        countPlayer += 1;
      }
      if (playerPositionObject["bat_mid"][playerName] != undefined) {
        countPlayer += 1;
      }
      if (playerPositionObject["bat_ppl"][playerName] != undefined) {
        countPlayer += 1;
      }

      if (countPlayer >= 2) {
        snackbarFunction(
          "You cannot add a player in more than two category in each section"
        );
        console.log("yess working");
        return false;
      } else {
        return true;
      }
    } else {
      let countPlayer = 0;
      if (playerPositionObject["bow_death"][playerName] != undefined) {
        countPlayer += 1;
      }
      if (playerPositionObject["bow_mid"][playerName] != undefined) {
        countPlayer += 1;
      }
      if (playerPositionObject["bow_ppl"][playerName] != undefined) {
        countPlayer += 1;
      }

      if (countPlayer >= 2) {
        snackbarFunction(
          "You cannot add a player in more than two category in each section"
        );
        return false;
      } else {
        return true;
      }
    }
  } else {
    snackbarFunction("Sorry cannot add more in this category");
  }
};

var categoryCount = (category) => {
  console.log(category);
  if (
    category == "bat_ppl" &&
    Object.keys(playerPositionObject[category]).length < 4
  ) {
    return true;
  } else if (
    category == "bat_mid" &&
    Object.keys(playerPositionObject[category]).length < 4
  ) {
    return true;
  } else if (
    category == "bat_death" &&
    Object.keys(playerPositionObject[category]).length < 2
  ) {
    return true;
  } else if (
    category == "bow_ppl" &&
    Object.keys(playerPositionObject[category]).length < 3
  ) {
    return true;
  } else if (
    category == "bow_mid" &&
    Object.keys(playerPositionObject[category]).length < 3
  ) {
    return true;
  } else if (
    category == "bow_death" &&
    Object.keys(playerPositionObject[category]).length < 2
  ) {
    return true;
  }

  return false;
};

var addPlayerCategory = function (category, el) {
  if (selectedPlayers.length == 11) {
    console.log(
      category,
      el.parentNode.parentNode.childNodes[1].childNodes[1].value
    );
    let playerName1 =
      el.parentNode.parentNode.childNodes[1].childNodes[1].value;
    playerName = playerName1.split("-")[0];
    playerBonus = parseInt(playerName1.split("-")[1]);
    if (checkCategoryCondition(category, playerName)) {
      let categoryName = category + "-" + playerName;
      let className = "rect-card " + playerName;
      console.log(
        "getting parent: ",
        el.parentNode.parentNode.parentNode.parentNode.childNodes[3]
      );
      let newDiv = el.parentNode.parentNode.parentNode.parentNode.childNodes[3];
      newDiv.innerHTML +=
        '<div class="' +
        className +
        '">' +
        '<div class="row"  style="margin-left: 1rem;">' +
        '<div class="col-lg-9">' +
        '<h2 style="font-size:1.25rem; padding-top: 0.5rem; ">' +
        playerName +
        " - " +
        playerBonus +
        "</h2>" +
        "</div>" +
        '<div class="col-lg-3">' +
        '<div  style="width:1.4rem;height:1.4rem; padding-top: 0.5rem;">' +
        '<img  class="crossImage" src="/static/closeButton.jpg" alt="Virat" draggable="false" style="width: 100%" onclick="remPlayerCategory(' +
        "'" +
        categoryName +
        "'" +
        ',this)"/>' +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>";
      // will use the below code to delete elements
      playerPositionObject[category][playerName] = playerBonus;
      console.log(playerPositionObject);
      console.log("Bonus after adding player");
      calculateBonus();
      // console.log(document.getElementById(category+playerName).innerHTML);
      el.parentNode.parentNode.childNodes[1].childNodes[1].value = "";
    }
  } else {
    snackbarFunction("select 11 players first");
  }
  el.parentNode.parentNode.childNodes[1].childNodes[1].value = "";
};

var removingSelectedPlayer = function (player) {
  console.log(player);

  playerList.forEach(function (playerInfo) {
    if (playerInfo.name == player) {
      playerCount = parseInt(playerCount - parseInt(playerInfo.overall));
      if (playerInfo.is_starred) {
        playerCount -= 2;
      }
      scoreTag.innerHTML = playerCount;
      if (playerInfo.type == "BAT" && playerInfo.is_wk) {
        playerCategory["WK"].splice(playerCategory["WK"].indexOf(player), 1);
      } else if (playerInfo.type == "BAT" && !playerInfo.is_wk) {
        playerCategory[playerInfo.type].splice(
          playerCategory[playerInfo.type].indexOf(player),
          1
        );
      } else {
        playerCategory[playerInfo.type].splice(
          playerCategory[playerInfo.type].indexOf(player),
          1
        );
      }

      if (playerInfo.team == "RET") {
        playerCategory["RET"].splice(playerCategory["RET"].indexOf(player), 1);
      }

      if (playerInfo.foreign) {
        playerCategory["FORN"].splice(
          playerCategory["FORN"].indexOf(player),
          1
        );
      }
      if (playerInfo.is_uncapped) {
        playerCategory["UNCAP"].splice(
          playerCategory["UNCAP"].indexOf(player),
          1
        );
      }
      console.log(playerCount, "hello");
    }
  });

  // updating the page
  selectedPlayers.splice(selectedPlayers.indexOf(player), 1);
  console.log(selectedPlayers);
  changePlayerSelectedState();
  playerCountDiv.innerHTML =
    "You have to select <span style='color:red'>" +
    parseInt(11 - selectedPlayers.length) +
    "</span> players!!";
  checkIfAddedInCategory(player);

  Total_Score();
  catInputFunction();
};

var checkIfAddedInCategory = (player) => {
  console.log(player, "hiiiiiiiiii");
  let present = false;
  if (playerPositionObject["bat_ppl"][player] != undefined) {
    present = true;
    console.log("bat_ppl", "hehehehe");
    delete playerPositionObject["bat_ppl"][player];
  }
  if (playerPositionObject["bat_mid"][player] != undefined) {
    present = true;
    console.log("bat_mid");
    delete playerPositionObject["bat_mid"][player];
  }
  if (playerPositionObject["bat_death"][player] != undefined) {
    present = true;
    console.log("bat_death");
    delete playerPositionObject["bat_death"][player];
  }
  if (playerPositionObject["bow_ppl"][player] != undefined) {
    present = true;
    console.log("bow_ppl");
    delete playerPositionObject["bow_ppl"][player];
  }
  if (playerPositionObject["bow_mid"][player] != undefined) {
    present = true;
    console.log("bow_mid");
    delete playerPositionObject["bow_mid"][player];
  }
  if (playerPositionObject["bow_death"][player] != undefined) {
    present = true;
    console.log("bow_death");
    delete playerPositionObject["bow_death"][player];
  }

  if (present) {
    calculateBonus();
    startAnimationForSelected("rect-card " + player);
  }
};

var startAnimationForSelected = function (player) {
  console.log(player, " animation");
  let classDiv = document.getElementsByClassName(player);

  document.getElementById("moveDown").scrollIntoView();
  for (var j = 0; j < classDiv.length; j++) {
    classDiv[j].style.display = "none";
    // console.log(classDiv[j]);
  }
};

//show usergenerated array

function snackbarFunction(condition) {
  // Get the snackbar DIV
  var x = document.getElementById("snackbar");
  if (
    condition ==
    "You cannot add a player in more than two category in each section"
  ) {
    x = document.getElementById("snackbar2");
  }
  x.innerHTML = condition;
  // Add the "show" class to DIV
  x.className = "show";

  // After 3 seconds, remove the show class from DIV
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}

var checkRemove = function () {
  //console.log(document.getElementById("removeCOl"));
  document.getElementById("removeCOl").style.display = "none";
};

//  function to change the selected players count
var changePlayerSelectedState = function () {
  console.log("changing state");
  let batsmanCount;
  if (playerCategory["WK"].length - 1 > 0) {
    batsmanCount =
      playerCategory["BAT"].length + playerCategory["WK"].length - 1;
  } else {
    batsmanCount = playerCategory["BAT"].length;
  }
  document.getElementById("playersSelectedDiv2").innerHTML =
    '<p><span class="playerType">Batsman:</span>' +
    batsmanCount +
    " </p>" +
    '<p><span class="playerType">Bowler:</span>' +
    playerCategory["BOW"].length +
    " </p>" +
    '<p><span class="playerType">WK:</span>' +
    playerCategory["WK"].length +
    " </p>" +
    '<p><span class="playerType">All-rounder:</span>' +
    playerCategory["ALL"].length +
    "</p>";
};

//  function to remove the selected players and updating the reqeuired changes
var remPlayer = function (player, tagCheck) {
  console.log(
    tagCheck.parentNode.parentNode.parentNode.parentNode.parentNode,
    player
  );
  let playerDivRem =
    tagCheck.parentNode.parentNode.parentNode.parentNode.parentNode;

  playerDivRem.style.opacity = "0";
  tagCheck.style.display = "none";
  setTimeout(function () {
    playerDivRem.style.display = "none";
  }, 1000);
  // removing the deslected player from all categories
  playerList.forEach(function (playerInfo) {
    if (playerInfo.name == player) {
      playerCount = parseInt(playerCount - parseInt(playerInfo.overall));
      scoreTag.innerHTML = playerCount;
      if (playerInfo.type == "BAT" && playerInfo.is_wk) {
        playerCategory["WK"].splice(playerCategory["WK"].indexOf(player), 1);
      } else if (playerInfo.type == "BAT" && !playerInfo.is_wk) {
        playerCategory[playerInfo.type].splice(
          playerCategory[playerInfo.type].indexOf(player),
          1
        );
      } else {
        playerCategory[playerInfo.type].splice(
          playerCategory[playerInfo.type].indexOf(player),
          1
        );
      }

      if (playerInfo.is_retro) {
        playerCategory["RET"].splice(playerCategory["RET"].indexOf(player), 1);
      }

      if (playerInfo.foreign) {
        playerCategory["FORN"].splice(
          playerCategory["FORN"].indexOf(player),
          1
        );
      }
      if (playerInfo.is_uncapped) {
        playerCategory["UNCAP"].splice(
          playerCategory["UNCAP"].indexOf(player),
          1
        );
      }
      console.log(playerCount, "hello");
    }
  });

  // updating the page
  selectedPlayers.splice(selectedPlayers.indexOf(player), 1);
  console.log(selectedPlayers);
  changePlayerSelectedState();
  playerCountDiv.innerHTML =
    "You have to select <span style='color:red'>" +
    parseInt(11 - selectedPlayers.length) +
    "</span> players!!";
};

var checkPlayer = function () {
  console.log("removing dynamically added player");
};

//  temporary not required now
var createForm = function () {
  console.log(selectedPlayers);

  let formDynamic = document.createElement("form");
  formDynamic.method = "POST";
  formDynamic.action = "/nextPage";

  selectedPlayers.forEach(function (player) {
    var inputElement = document.createElement("input");
    inputElement.type = "hidden";
    inputElement.name = "playerList";
    inputElement.value = player;

    formDynamic.appendChild(inputElement);
  });

  var inputElement = document.createElement("input");
  inputElement.type = "hidden";
  inputElement.name = "score";
  inputElement.value = playerCount;

  document.body.appendChild(formDynamic);
  formDynamic.submit();
};

var checkCriteria = function () {
  let rule = "";

  if (playerCategory["BOW"].length < 3 || playerCategory["BOW"].length > 5) {
    // return false;
    rule += "BOWL-";
  }
  if (playerCategory["ALL"].length < 1 || playerCategory["ALL"].length > 3) {
    // return false;
    rule += "All-";
  }

  if (playerCategory["WK"].length < 1 || playerCategory["WK"].length > 2) {
    // return false;
    rule += "WK-";
  }

  if (playerCategory["WK"].length >= 2) {
    if (
      playerCategory["BAT"].length + playerCategory["WK"].length - 1 < 3 ||
      playerCategory["BAT"].length + playerCategory["WK"].length - 1 > 5
    ) {
      // return false;
      rule += "BAT-";
    }
  } else {
    if (playerCategory["BAT"].length < 3 || playerCategory["BAT"].length > 5) {
      // return false;
      rule += "BAT-";
    }
  }

  if (playerCategory["RET"].length > 2 || playerCategory["RET"].length < 1) {
    // return false;
    rule += "RET-";
  }

  if (playerCategory["FORN"].length > 4) {
    // return false;
    rule += "FORN-";
  }
  if (playerCategory["UNCAP"].length < 1 || playerCategory.length > 2) {
    rule += "UNCAP-";
  }
  console.log(rule);
  return rule;
};

// displaying the rulebox division
var changeRuleBox = function (playerRule) {
  let playerRuleArray = playerRule.split("-");
  let olDiv = document.getElementById("checkRuleColor");
  let ruleColor = "";
  console.log(playerRuleArray);
  if (playerRuleArray.includes("BAT")) {
    ruleColor +=
      "<span class='colorSpan'><li>You have to choose min 3 and max 5 batsman.</li></span>";
  } else {
    ruleColor += "<li>You have to choose min 3 and max 5 batsman.</li>";
  }

  if (playerRuleArray.includes("BOWL")) {
    ruleColor +=
      "<span class='colorSpan'><li>You have to choose min 3 and max 5 bowler.</li></span>";
  } else {
    ruleColor += "<li>You have to choose min 3 and max 5 bowler.</li>";
  }

  if (playerRuleArray.includes("All")) {
    ruleColor +=
      "<span class='colorSpan'><li>You have to choose min 1 and max 3 all-rounder.</li></span>";
  } else {
    ruleColor += "<li>You have to choose min 1 and max 3 all-rounder.</li>";
  }

  if (playerRuleArray.includes("WK")) {
    ruleColor +=
      "<span class='colorSpan'><li>You have to choose min 1 and max 2 wk .(If you choose 2 wk then the second wk is considered as a pure batsman.</li></span>";
  } else {
    ruleColor +=
      "<li>You have to choose min 1 and max 2 wk .(If you choose 2 wk then the second wk is considered as a pure batsman.</li>";
  }

  if (playerRuleArray.includes("RET")) {
    ruleColor +=
      "<span class='colorSpan'><li>You have to choose min 1 and max 2 retro player</li></span>";
  } else {
    ruleColor += "<li>You have to choose min 1 and max 2 retro player</li>";
  }

  if (playerRuleArray.includes("FORN")) {
    ruleColor +=
      "<span class='colorSpan'><li>You can choose a max of 4 foriegn players.</li></span>";
  } else {
    ruleColor += "<li>You can choose a max of 4 foriegn players.</li>";
  }

  if (playerRuleArray.includes("UNCAP")) {
    ruleColor +=
      "<span class='colorSpan'><li>You have to choose min 1 and max 2 uncapped players.</li></span>";
  } else {
    ruleColor +=
      "<li>You have to choose min 1 and max 2 uncapped players.</li>";
  }

  olDiv.innerHTML = ruleColor;

  console.log("clicked", playerRuleArray);

  if (document.getElementById("ruleDiv").className == "positionDown") {
    document.getElementById("ruleDiv").classList.remove("positionDown");
    document.getElementById("ruleDiv").classList.add("positionUp");

    setTimeout(function () {
      document.getElementById("overlay").style.display = "none";
    }, 1000);
  } else {
    document.getElementById("overlay").style.display = "block";
    setTimeout(function () {
      document.getElementById("ruleDiv").classList.remove("positionUp");
      document.getElementById("ruleDiv").classList.add("positionDown");
    }, 200);
  }
};

let state = "out";

var changeChoseDivPos = () => {
  console.log("hii");
  let playersSelectedDiv = document.getElementById("playersSelectedDiv");
  let divChange = document.getElementById("divChange");
  let arrowHead = document.getElementById("arrowHead");

  if (state == "out") {
    playersSelectedDiv.style.right = "0rem";
    arrowHead.src = "/static/arrowImage-removebg-preview.png";
    state = "in";
  } else {
    playersSelectedDiv.style.right = "-13rem";
    arrowHead.src = "/static/arrowImage2-removebg-preview.png";
    state = "out";
  }
};
