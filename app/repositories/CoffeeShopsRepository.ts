import parse from "csv-parse";
import uuid = require("uuid");
import {ReadStream} from "fs";


export class CoffeeShopsRepository {

    /**
     * coffee shop locations map (id -> coffee shop)
     */
    private coffeeShopLocations = new Map<string, CoffeeShop>();

    constructor(csvStream: ReadStream) {
        let pipe = csvStream.pipe(parse({delimiter: ', '}));
        const map = new Map<string, CoffeeShop>();
        pipe.on('data', function (csvrow) {
            const location: CoffeeShop = {
                name: csvrow[1],
                address: csvrow[2],
                latitude: csvrow[3],
                longitude: csvrow[4]
            };
            map.set(csvrow[0], location);
        });
        this.coffeeShopLocations = map;
    }


    findAll(): Array<CoffeeShop> {
        return Array.from(this.coffeeShopLocations.values());
    }

    find(id: string): CoffeeShop | undefined {
        return this.coffeeShopLocations.get(id);
    }

    create(location: CoffeeShop): string {
        let newLocationId: string = uuid.v4();
        this.coffeeShopLocations.set(newLocationId, location);
        return newLocationId;
    }

    update(locationId: string, updatedLocation: CoffeeShop): boolean {
        if (this.coffeeShopLocations.has(locationId)) {
            this.coffeeShopLocations.set(locationId, updatedLocation);
            return true;
        }
        return false;
    }

    delete(locationId: string) {
        return this.coffeeShopLocations.delete(locationId);
    }
}
