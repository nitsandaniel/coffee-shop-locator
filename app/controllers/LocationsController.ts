import {Param, Body, Get, Post, Put, Delete, JsonController, Header, HeaderParam} from "routing-controllers";
import {repository} from '../app';
import {geoController} from '../app';



@JsonController()
export class LocationsController {

    @Get("/locations/find-nearest")
    findNearest(@HeaderParam("address") address: string) {
        return geoController.findClosest(address, repository.findAll());
    }

    @Get("/locations")
    getAll() {
        return repository.findAll();
    }

    @Get("/locations/:id")
    getOne(@Param("id") id: string) {
        let coffeeShopLocation = repository.find(id);
        if(coffeeShopLocation == undefined) {
            throw new Error("Location wasn't found");
        }
        return coffeeShopLocation;
    }

    @Post("/locations")
    post(@Body() location: CoffeeShop) {
        return repository.create(location);
    }

    @Put("/locations/:id")
    put(@Param("id") id: string, @Body() updatedLocation: CoffeeShop) {
        if(!repository.update(id, updatedLocation)) {
            throw new Error("Location wasn't found");
        }
        return "Location updated successfully";
    }

    @Delete("/locations/:id")
    remove(@Param("id") id: string) {
        return repository.delete(id);
    }

}
