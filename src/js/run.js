let runDialog = document.querySelector(".runDialog");
let runInputField = document.getElementById("runInputField");
// making the run dialog appear on pressing window + r
document.body.addEventListener("keydown", event => {
    // this will open the run dialog by pressing win +r key even in windows. WARNING: This may also pop up window's atual run dialog.
    if (event.key == "Meta") {
        let active = false;
        console.log("meta key pressed")
            // Check if key is already active
        if (Keyboard.activeKey.indexOf("Win") == -1) {
            Keyboard.activeKey.push("Win");
            document.getElementById("winkey").classList.add("activeKey");
            active = true;
        } else {
            console.log("Key  is already active")
        }
        if (active) {
            setTimeout(() => {
                let index = Keyboard.activeKey.indexOf("Win");
                Keyboard.activeKey.splice(index, 1)
                document.getElementById("winkey").classList.remove("activeKey");

            }, 300)
        }
    }


    function shortCutWithKeyboard(key) {
        if (Keyboard.activeKey.includes("Win") && (event.key == "r" || event.key == "R")) {
            Keyboard.activeKey.shift();
            Keyboard.activeKey.pop();
            document.querySelector("#winkey").classList.remove("activeKey");
            return true;
        } else {
            return false;
        }
    }
    let fallBack = shortCutWithKeyboard("r"); // this for handling run shortcut key for windows
    if (event.metaKey && (event.key == "r" || event.key == "R") || fallBack) {
        runDialog.style.display = "block";
        runInputField.focus();
        runInputField.value = null;
    }
})
runInputField.addEventListener("keyup", event => {
    if (searchPrograms(runInputField.value)) {
        document.getElementById("runOkBtn").classList.remove("disabledButton")
        document.getElementById("runOkBtn").onclick = _ => {
            executeProgram(searchPrograms(runInputField.value));
            runDialog.style.display = "none";
        }
    } else {
        document.getElementById("runOkBtn").classList.add("disabledButton")
    }
    // execute the program if user press the enter button
    if (event.key == "Enter") {
        if (searchPrograms(runInputField.value)) {
            executeProgram(searchPrograms(runInputField.value));
            runDialog.style.display = "none";
        } else {
            alert("no program exist");
        }
    }
    // if escape is pressed remove the window
    if (event.key == "Escape") {
        runDialog.style.display = "none";
    }

});

let allPrograms = ["winver", "powershell", "msedge", "vscode"];
let allProgramsTitleName = ["About Windows", "Windows PowerShell", "Microsoft Edge", "Visual Studio Code"];
let allProgramsBody = ["src/apps/winver.html", "src/apps/powershell.html", "src/apps/edge.html", "src/apps/vscode.html"]
let allProgramIcons = ["src/icons/favicon.png", "src/icons/powershell.png", "src/icons/edge.svg", "src/icons/vscode.svg"];
let allSchemes = ["min", "max", "cross"];
let allProgramsIconsSchemes = [
    ["cross"],
    allSchemes,
    allSchemes,
    allSchemes
];

function searchPrograms(givenProgram) {
    if (allPrograms.includes(givenProgram)) {
        return givenProgram;
    } else {
        return false;
    }
}

function executeProgram(programName) {
    let index = allPrograms.indexOf(programName);
    let icon = allProgramIcons[index];
    let programTitle = allProgramsTitleName[index];
    let programBody = allProgramsBody[index];
    let options = allProgramsIconsSchemes[index];
    let win1 = new Window(programTitle, "black", "white", icon, programBody, options);
    win1.createWindow();
    console.log(win1)

}
let windowCrossers = document.getElementsByClassName("windowCrosser");
Array.from(windowCrossers).forEach(item => {
    item.addEventListener("click", event => {
        let windows = event.target.parentNode.parentNode.parentNode;
        console.log(windows);
        if (windows.classList.contains("window")) {
            windows.style.display = "none";
        } else {
            console.log("use class 'windows' in your window and it will be closed");
        }
    })
})