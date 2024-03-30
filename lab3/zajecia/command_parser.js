import { create_client, create_vehicle } from "./creators.js";
import { addVehicle, addCustomer , sellVehicle , getAllVehicles , getAllCustomers } from "./database.js";

async function parse_command(command) {
    try {
        const [command_name, ...args] = command.split(" ");
        if (command_name === "add_person") {
            const [name, surname, email] = args;
            const data = create_client(name, surname, email);
            addCustomer(data);
        } else if (command_name === "add_vehicle") {
            const [name, price, description] = args;
            const data = create_vehicle(name, price, description);
            addVehicle(data);
        } else if (command_name === "sell_vehicle") {
            const [clientId, vehicleId] = args.map(arg => parseInt(arg));
            if (!isNaN(clientId) && !isNaN(vehicleId)) {
                sellVehicle(clientId, vehicleId);
            } else {
                throw new Error("Invalid id of client or vehicle");
            }
        } else if (command_name === "show_all_vehicle") {
            const vehicles = await getAllVehicles();
            console.group(vehicles);
        } else if (command_name === "show_all_clients") {
            const clients = await getAllCustomers(); // Poczekaj na pobranie danych z bazy danych
            // console.log("Returned customers:", clients);

            const repr = clients.map(client => {
                return {
                    name: client.name,
                    surname: client.surname,
                    email: client.email,
                    bought_cars: client.bought_cars.map(car => car.name),
                    all_money: client.bought_cars.reduce((acc, car) => acc + car.price, 0)
                }
            });

            console.group(repr);
        } else {
            throw new Error("Unknown command, cannot parse it!")
        }
    } catch (e) {
        console.error(e.message);
    }


}

export { parse_command };


