import fs from 'node:fs';
import { argv } from 'node:process';

import { readAndExecuteCommands} from "./comand_executor.js";

const holder_file_path = "src/counter.txt";

const read_async = (callback) => {
  fs.readFile(holder_file_path, "utf-8", (err, data) => {
    if (err){
      callback(err,null);
    }
    callback(null,parseInt(data));
  });
}

const write_async = (string_value,callback) => {
  fs.writeFile(holder_file_path, string_value, "utf-8" , (err) => {
    if (err){
      callback(err);
    }
    callback(null);
  });

}

const read_sync = () => {
  return parseInt(fs.readFileSync(holder_file_path, "utf-8"));
}

const write_sync = (string_value) => {
  fs.writeFileSync(holder_file_path, string_value);
}


const main = async () => {
  if (argv.length < 3) {
    console.warn("Uzycie: node run_counter.js {file_path} --{async|sync}");
    console.log("Wprowadź komendy — naciśnięcie Ctrl+D kończy wprowadzanie danych");
    readAndExecuteCommands();
    return;
  }

  let cnt = 0;
  switch (argv[2]) {
    case "--async": {
      read_async((err, read_cnt) => {
        if(err){
          console.error('Blad w trakcie odczytu:', err);
          return;
        }
        cnt = read_cnt+1;
        write_async(cnt.toString(), (err) => {
          if(err){
            console.error('Blad w trakcie zapisu:', err);
            return;
          }
          console.log("Liczba uruchomień:" , cnt);
        });
      });
      break;
    }
    case "--sync" :{
      cnt = read_sync();
      cnt += 1;
      write_sync(cnt.toString());
      console.log("Liczba uruchomień:" , cnt);
      break;
    }
    default:
      console.error("Uzycie: node run_counter.js {file_path} --{async|sync}");
  }


}

// Run the main function
main();