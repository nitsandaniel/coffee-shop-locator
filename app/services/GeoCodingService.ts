import { createClient, GoogleMapsClient } from '@google/maps';

export class GeoCodingService {

    private geoCoder: GoogleMapsClient;

    public constructor(apiKey: string) {
        this.geoCoder = createClient({
            key: apiKey,
        });

    }

    public findClosest(address: string, coffeeShops: Array<CoffeeShop>): Promise<CoffeeShop> {

        const request: google.maps.GeocoderRequest = {
            address: address
        };

        return new Promise<CoffeeShop>((resolve, reject) => {
            this.geoCoder.geocode(request, (error, response) => {

                if (error) {
                    return reject(new Error(error));
                }

                let location = response.json.results[0].geometry.location;
                let addressLat: number = <any>location.lat;
                let addressLon: number = <any>location.lng;

                let closestCoffeeShop: CoffeeShop = coffeeShops[0];
                let minDistance: number = Number.MAX_SAFE_INTEGER;

                for (const coffeeShop of coffeeShops) {
                    let distance = GeoCodingService.calculateDistance(addressLat, addressLon, coffeeShop.latitude, coffeeShop.longitude);
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestCoffeeShop = coffeeShop;
                    }
                }

                return resolve(closestCoffeeShop);
            })
        })
    }

    /**
     * calculated distance between two geo points
     * @param lat1 first geo point latitude
     * @param long1 first geo point longitude
     * @param lat2 second geo point latitude
     * @param long2 second geo point longitude
     */
    static calculateDistance(lat1: number, long1: number, lat2: number, long2: number) : number{
        let p = 0.017453292519943295;    // Math.PI / 180
        let c = Math.cos;
        let a = 0.5 - c((lat1-lat2) * p) / 2 + c(lat2 * p) *c((lat1) * p) * (1 - c(((long1- long2) * p))) / 2;
        let dis = (12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
        return dis;
    }

}
