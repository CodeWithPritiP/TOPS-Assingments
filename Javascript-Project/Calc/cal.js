// Get the display element
const display = document.getElementById("display");

// Append a value to the display
function appendValue(value) {
    if (display.innerText === "0") {
        display.innerText = value; // Replace initial "0" with the input value
    } else {
        display.innerText += value; // Concatenate the value
    }
}

// Clear the display
function clearDisplay() {
    display.innerText = "0"; // Reset display to 0
}

// Delete the last character
function deleteLast() {
    if (display.innerText.length === 1) {
        display.innerText = "0"; // Reset to 0 if only one character
    } else {
        display.innerText = display.innerText.slice(0, -1); // Remove the last character
    }
}

// Perform the calculation
function calculate() {
    try {
        display.innerText = eval(display.innerText); // Use eval to compute the result
    } catch (error) {
        display.innerText = "Error"; // Handle invalid inputs
    }
}