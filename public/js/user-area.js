
function renderUserInfo(user) {
    document.getElementById('username').innerText = user['username'];

    var userInfoList = document.getElementById('userInfoList');

    let winsItem = document.createElement('li');
    let lossesItem = document.createElement('li');
    let drawsItem = document.createElement('li');
    let totalItem = document.createElement('li');
    let scoreItem = document.createElement('li');

    let totalMatches = user['wins'] + user['losses'] + user['draws'];
    let score = user['wins'] - user['losses'];

    winsItem.innerText = "Wins : "+user['wins'];
    lossesItem.innerText = "Losses : "+user['losses'];
    drawsItem.innerText = "Draws : "+user['draws'];
    totalItem.innerText = "Total matches : "+ totalMatches;
    scoreItem.innerText = "Score : "+ score;

    userInfoList.append(winsItem);
    userInfoList.append(lossesItem);
    userInfoList.append(drawsItem);
    userInfoList.append(totalItem);
    userInfoList.append(scoreItem);
}

function getUserInfo() {
    const userId = localStorage.getItem('userId');
    fetch(`http://localhost:5000/user/${userId}`, {
        method: 'GET',
        headers: {"Content-Type": "application/json"}
    }).then((result) => {
        return result.json();
    }).then((user) => {
        console.log(user);
        renderUserInfo(user);
    }).catch((error) => {
        console.log(error);
    });
}

function renderRankingList(rankingList) {
    var rankingTable = document.getElementById('rankingTable');
    for (let i=0; i < rankingList.length; i++) {
        let tableRow = document.createElement('tr');

        let positionTd = document.createElement('td');
        let usernameTd = document.createElement('td');
        let scoreTd = document.createElement('td');
        positionTd.innerText = i+1;
        usernameTd.innerText = rankingList[i]['username'];
        scoreTd.innerText = rankingList[i]['score'];

        tableRow.append(positionTd, usernameTd, scoreTd);
        rankingTable.append(tableRow);
    }
}

function getPlayersRanking() {
    fetch('http://localhost:5000/getRanking', {
        method: 'GET',
        headers: {"Content-Type": "application/json"}
    }).then((result) => {
        return result.json();
    }).then((rankingList) => {
        console.log(rankingList);
        renderRankingList(rankingList);
    }).catch((error) => {
        console.log(error);
    });
}

window.addEventListener("load", () => {
    getUserInfo();
    getPlayersRanking();
});
