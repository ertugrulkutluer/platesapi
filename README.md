# platesapi


## Description

platesapi is a lightweight api with no 3rd party frameworks && redis cloud.

## Features

* No thirdparty libraries.
* Redis Cloud DB usage.

  
## Run on Local 

### Step 1: git clone this repository [ertugrulkutluer/platesapi@github](https://github.com/ertugrulkutluer/platesapi)
```
git clone https://github.com/ertugrulkutluer/platesapi
```

### Step 2: download dependencies
```
npm install
```
### Step 3: run tests
```
npm test
```
### Step 4: run platesapi
```
npm start
```
```

> plates@1.0.0 start /Users/ertugrul/Desktop/plates
> node app.js

Server started on port: 5000

```

## Rest API Document

All endpoints here
- Get API Rules `/api`

    ```json
    {
      "rules": [
              [
                  "Orders under $50 cost $4.95. For orders under $90, delivery costs $2.95. Orders of $90 or more have free delivery."
              ],
              [
                  "Buy one red plate, get the second half price."
              ]
        ],
      "plates": [
          {
              "product": "Red Plate",
              "id": "R01",
              "price": 32.95
          },
          {
              "product": "Green Plate",
              "id": "G01",
              "price": 24.95
          },
          {
              "product": "Blue Plate",
              "id": "B01",
              "price": 7.95
          }
      ]
    }
    ```

- GET `/api/plates` List of all products
    - Response body: 
    ```json
    [
        {
            "product": "Red Plate",
            "id": "R01",
            "price": 32.95
        },
        {
            "product": "Green Plate",
            "id": "G01",
            "price": 24.95
        },
        {
            "product": "Blue Plate",
            "id": "B01",
            "price": 7.95
        }
    ]
    ```

- GET `/api/plates/{{id}}` returns a plate
    - Response body: 
    ```json
    {
        "product": "Blue Plate",
        "id": "B01",
        "price": 7.95
    }
    ```
  

- GET `/api/account` creates an account & a basket for created account. You will need this account number to add items later.

    - Response body: 
    ```json
    {
      "account_id": "4y4nx",
        "basket": {
            "plates": [],
            "total": 0,
            "delivery_cost": 0,
            "discount": 0
        }
    }
    ```
    
- GET `/api/account/4y4nx/add/R01` adds a plate to specified account
    
     ```json
     {
        "plates": [
            "Blue Plate",
            "Blue Plate"
        ],
        "total": "20.85",
        "delivery_cost": "4.95",
        "discount": 0
    }
    ```
  
## TODO

- [x] Readme File
- [x] ApiDoc
- [ ] Tests
- [ ] Docker Support
- [ ] Deploy (Heroku, aws)
