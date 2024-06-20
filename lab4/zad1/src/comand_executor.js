import { exec } from 'node:child_process';
import readline from 'node:readline';

// Interfejs do odczytu wejścia
const rl_interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

// Funkcja do wykonania komendy
const runCommand = (command) => {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Błąd podczas wykonywania komendy: ${error.message}`);
      // rl_interface.prompt();
      return;
    }
    if (stderr) {
      console.error(`Błąd podczas wykonywania komendy: ${stderr}`);
      // rl_interface.prompt();
      return;
    }
    console.log(stdout);
    rl_interface.prompt();
  });
};

process.on('exit', () => {
  rl_interface.close();
});

// Funkcja do czytania i wykonywania komend
const readAndExecuteCommands = () => {
  rl_interface.prompt();

  rl_interface.on('line', (input) => {
    // Sprawdź czy użytkownik nacisnął Ctrl+D (koniec danych wejściowych)
    if (input === null) {
      rl_interface.close();
      return;
    }

    // Wykonaj komendę
    runCommand(input.trim());
    // rl_interface.prompt();
  });

  rl_interface.on('close', () => {
    console.log('Koniec wprowadzania danych.');
    process.exit(0);
  });
};

export { readAndExecuteCommands };