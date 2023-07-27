let inputSlider = document.getElementById("inputSlider");
let sliderValue = document.getElementById("sliderValue");
let passBox = document.getElementById("passBox");
let lowercase = document.getElementById("lowercase");
let uppercase = document.getElementById("uppercase");
let numbers = document.getElementById("numbers");
let symbols = document.getElementById("symbols");
let genBtn = document.getElementById("genBtn");
let copyIcon = document.getElementById("copyIcon");
let passFor = document.getElementById("passFor");
let resetBtn = document.getElementById("restBtn");


// Showing input slider value 
sliderValue.textContent = inputSlider.value;
inputSlider.addEventListener('input', () => {
    sliderValue.textContent = inputSlider.value;
});

genBtn.addEventListener('click', () => {

    var inputText = document.getElementById('passFor').value.trim();

            if (inputText === '') {
                alert('Please enter Password name.');
            } else {
                passBox.value = generatePassword();;
            }
    

})

let lowerChars = "abcdefghijklmnopqrstuvwxyz";
let upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let allNumbers = "0123456789";
let allSymbols = "~!@#$%^&*";

// Function to generate Password
function generatePassword() {
    let genPassword = "";
    let allChars = "";

    allChars += lowercase.checked ? lowerChars : "";
    allChars += uppercase.checked ? upperChars : "";
    allChars += numbers.checked ? allNumbers : "";
    allChars += symbols.checked ? allSymbols : "";


    if (allChars == "" || allChars.length == 0) {
        return genPassword;
    }


    let i = 1;
    while (i <= inputSlider.value) {
        genPassword += allChars.charAt(Math.floor(Math.random() * allChars.length));
        i++;
    }

    return genPassword;


}

copyIcon.addEventListener('click', () => {
    if (passBox.value != "" || passBox.value.length >= 1) {
        navigator.clipboard.writeText(passBox.value);
        copyIcon.innerText = "check";
        copyIcon.title = "Password Copied";

        setTimeout(() => {
            copyIcon.innerHTML = "content_copy";
            copyIcon.title = "";
        }, 3000)
    }
});

function ClearFields() {

    document.getElementById('passFor').value = "";
    document.getElementById('passBox').value = "";
}

// Save Button
function saveToFile() {
    const textName = document.getElementById("passFor").value;
    const password = document.getElementById("passBox").value;


    if ('showSaveFilePicker' in window) {

        const blob = new Blob([textName], {
            type: 'text/plain'
        });

        const tlob = new Blob([password], {
            type: 'text/plain'
        });


        window.showSaveFilePicker().then(async (handle) => {

            const writable = await handle.createWritable();


            await writable.write(blob);
            await writable.write(tlob);


            await writable.close();

            console.log("File saved successfully!");
        }).catch((err) => {
            console.error("Error saving the file:", err);
        });
    } else {
        // File System API not supported, show an error message or fallback method
        console.error("File System API is not supported in this browser.");
    }
}


