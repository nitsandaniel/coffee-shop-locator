import "reflect-metadata"; // this shim is required
import {createExpressServer} from "routing-controllers";
import {LocationsController} from "./controllers/LocationsController";
import {CoffeeShopsRepository} from "./repositories/CoffeeShopsRepository";
import {GeoCodingService} from "./services/GeoCodingService";
import fs = require('fs');


const app = createExpressServer({
    controllers: [LocationsController]
});

// run express application on port 3000
app.listen(3000);

export const repository: CoffeeShopsRepository = new CoffeeShopsRepository(fs.createReadStream(process.argv[2]));
export const geoController: GeoCodingService = new GeoCodingService(process.argv[3]);

process.on('unhandledRejection', err => {
    console.log("unhandled rejection: " + err);
});

console.log("Coffer shop locator has started");
