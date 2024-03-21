import { parse_command } from "./command_parser.js";

const command_input_field = document.getElementById("command_input")
const command_button = document.getElementById("command_button")

command_button.addEventListener("click", () => {
    const command = command_input_field.value;
    parse_command(command);
    // console.log("Button has been clicked!")
});

