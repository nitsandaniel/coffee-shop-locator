# Coffee Shop Locator
RESTful web API for finding the nearest coffee shop by providing an address, built using Node.js and TypeScript.

---

#### Usage
Download the code and then:
```bash
npm install
npm run build
node build/app.js <csv-path> <api-key>
```
* `<csv-path>` is the absolute path to locations csv file
* `<api-key>` is Google's Geocoding API key
* Server is listening to port 3000
---

#### Endpoints
##### Read
* Path: `/locations/{id}`
* Method: `GET`
* Response example:
```json
{
       "name": "Equator Coffees & Teas",
       "address": "986 Market St",
       "latitude": "37.782394430549445",
       "longitude": "-122.40997343121123"
}
```

##### Create
* Path: `/locations`
* Method: `POST`
* Payload example:
```json
{
     "name": "Equator Coffees & Teas",
     "address": "986 Market St",
     "latitude": "37.782394430549445",
     "longitude": "-122.40997343121123"
}
```
* Response example (the new location ID):
```json
"f14bdad4-a8e7-4e4a-a28f-56ee9eb4a760"
```

##### Update
* Path: `/locations/{id}`
* Method: `PUT`
* Payload example:
```json
{
     "name": "Equator Coffees & Teas",
     "address": "986 Market St",
     "latitude": "37.782394430549445",
     "longitude": "-122.40997343121123"
}
```

##### Delete
* Path: `/locations/{id}`
* Method: `DELETE`

---

#### Improvements
What should be improved/added
* Logs
* Unit tests
* Persistence
