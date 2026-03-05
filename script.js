const tileTypes = ["grass", "track", "water"];
let mapData = [];
const mapSize = 20;


const mainMenu = document.getElementById("main-menu");
const editor = document.getElementById("editor");
const mapGrid = document.getElementById("mapGrid");
const savedMapList = document.getElementById("savedMapList");
const mapName = document.getElementById("mapName");
const importFile = document.getElementById("ImportFile");

const newMapButton = document.getElementById("newMapButton");
newMapButton.addEventListener("click", () => {
    generateEmptyMap();
    sectionChange("editor");
})

const loadMapButtonMenu = document.getElementById("loadMapButtonMenu");
loadMapButtonMenu.addEventListener("click", () => {
    renderMapList();
})


const mainMenuButton = document.getElementById("mainMenuButton");
mainMenuButton.addEventListener("click", () => {
    sectionChange("main-menu")
})


function sectionChange(section) {
    mainMenu.classList.remove("hidden");
    editor.classList.remove("hidden");
    if (section == "main-menu"){
        editor.classList.add("hidden");
    }
    if (section == "editor"){
        mainMenu.classList.add("hidden");
    }
}

function generateEmptyMap() {
    mapData = [];

    for (let i = 0; i < mapSize; i++) {
        const row = [];
        for (let j = 0; j < mapSize; j++) {
            row.push(0);
        }
        mapData.push(row);
    }
    drawMap();

}

function drawMap() {
    mapGrid.innerHTML = "";
    const tmpGrid = document.createDocumentFragment();
    for (let y = 0; y < mapSize; y++){
        for (let x = 0; x < mapSize; x++) {
            const gridTile = document.createElement("div");
            gridTile.classList.add("tile");
            gridTile.classList.add(tileTypes[0]);
            gridTile.addEventListener("click", () => {
                mapData[y][x] = (mapData[y][x] + 1) % tileTypes.length;
                gridTile.className = "tile " + tileTypes[mapData[y][x]];
                
            });
            tmpGrid.appendChild(gridTile);
            
        }
    }
    mapGrid.appendChild(tmpGrid);
}


function renderMapList() {
    savedMapList.innerHTML = "";
    const keys = Object.keys(localStorage);
    const tmpButtons = document.createDocumentFragment();
    for (const key of keys) {
        const loadButton = document.createElement("button");
        loadButton.textContent = key;
        loadButton.classList.add("loadMapButton");
        loadButton.addEventListener("click", () => {
            mapData = JSON.parse(localStorage.getItem(key));
            drawMap();
            sectionChange(editor);

        })
        tmpButtons.appendChild(loadButton);
    }
    savedMapList.appendChild(tmpButtons);
}