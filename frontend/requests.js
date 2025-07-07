curl -X POST http://localhost:8080/items \
  -H "Content-Type: multipart/form-data" \
  -F 'item={
    "notes": "string",
    "unitOfMeasure": "KG",
    "userId": "00a9f902-d4d3-4dbf-8ab3-4f3b1ecec155",
    "quantity": 0.1,
    "purchaseDate": "2025-07-06T18:23:47.606Z",
    "storageType": "REFRIGERATED",
    "location": {
      "latitude": 0.1,
      "longitude": 0.1,
      "address": "string",
      "city": "string",
      "accuracy": 0.1$ curl -X POST http://localhost:8081/items   -H "Content-Type: multipart/form-data"   -F 'metadata={
        "notes": "string",
        "unitOfMeasure": "KG",
        "userId": "00a9f902-d4d3-4dbf-8ab3-4f3b1ecec155",
        "quantity": 0.1,
        "purchaseDate": "2025-07-06T18:23:47.606Z",
        "storageType": "REFRIGERATED",
        "location": {
          "latitude": 0.1,
          "longitude": 0.1,
          "address": "string",
          "city": "string",
          "accuracy": 0.1
        },
        "title": "string",
        "tags": "string",
        "condition": "NEW",
        "description": "string",
        "category": "FOOD",
        "disposalDate": "2025-07-06T18:23:47.606Z"
      };type=application/json'
    
    },
    "title": "string",
    "tags": "string",
    "condition": "NEW",
    "description": "string",
    "category": "FOOD",
    "disposalDate": "2025-07-06T18:23:47.606Z"
  };type=application/json' 


  $ curl -X POST http://localhost:8081/items   -H "Content-Type: multipart/form-data"   -F 'metadata={
    "notes": "string",
    "unitOfMeasure": "KG",
    "userId": "00a9f902-d4d3-4dbf-8ab3-4f3b1ecec155",
    "quantity": 0.1,
    "purchaseDate": "2025-07-06T18:23:47.606Z",
    "storageType": "REFRIGERATED",
    "location": {
      "latitude": 0.1,
      "longitude": 0.1,
      "address": "string",
      "city": "string",
      "accuracy": 0.1
    },
    "title": "string",
    "tags": "string",
    "condition": "NEW",
    "description": "string",
    "category": "FOOD",
    "disposalDate": "2025-07-06T18:23:47.606Z"
  };type=application/json'    -F 'files=@/D:/downloads/_MAL5407.jpg'
 