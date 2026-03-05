const tileTypes = ["grass", "track", "water"];
let mapData = [];
const mapSize = 20;


const mainMenu = document.getElementById("main-menu");
const editor = document.getElementById("editor");
const mapGrid = document.getElementById("mapGrid");
const savedMapList = document.getElementById("savedMapList");
const mapNameInput = document.getElementById("mapName");
const importFile = document.getElementById("importFile");

const newMapButton = document.getElementById("newMapButton");
newMapButton.addEventListener("click", () => {
    generateEmptyMap();
    sectionChange("editor");
});

const loadMapButtonMenu = document.getElementById("loadMapButtonMenu");
loadMapButtonMenu.addEventListener("click", () => {
    renderMapList();
});


const mainMenuButton = document.getElementById("mainMenuButton");
mainMenuButton.addEventListener("click", () => {
    sectionChange("main-menu")
});

const saveMapButton = document.getElementById("saveMapButton");
saveMapButton.addEventListener("click", () => {
    const name = mapNameInput.value;
    if (!name) {
        return alert("Zadejte název mapy");
    };
    localStorage.setItem(name, JSON.stringify(mapData));
    alert("Mapa uložena");

});

const exportMapButton = document.getElementById("exportMapButton");
exportMapButton.addEventListener("click", () => {
    const data = JSON.stringify(mapData);
    const blob = new Blob([data], {type: "application/json"});
    const downloadURL = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = downloadURL;
    a.download = "map.json";
    a.click();
    URL.revokeObjectURL(downloadURL);

});


const importMapButton = document.getElementById("importMapButton")

importMapButton.addEventListener("click", () => importFile.click());

importFile.addEventListener("change", (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            mapData = JSON.parse(event.target.result);
            drawMap();
            sectionChange("editor");
        } catch {
            alert("Chybný soubor");
        }
    }
    reader.readAsText(file);
});

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
            gridTile.classList.add("tile", tileTypes[mapData[y][x]]);
            
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
            sectionChange("editor");

        })
        tmpButtons.appendChild(loadButton);
    }
    savedMapList.appendChild(tmpButtons);
}