## Description

BMI calculation (API only)

[API Base link](https://code-20210915-rajeshdan.herokuapp.com/)

BMI calculation endpoint: POST

Request body sample
```json
[
  {"Gender": "Male", "HeightCm": 171, "WeightKg": 96 },
  { "Gender": "Male", "HeightCm": 161, "WeightKg":80 }
]
```

Response Sample
```json
{
  "Person": [
    {"Gender": "Male", "HeightCm": 171, "WeightKg": 96, "BMI": 32.8, "Category": "Moderately obese", "HealthRisk": "Medium risk" },
    { "Gender": "Male", "HeightCm": 161, "WeightKg":80, "BMI": 30.9, "Category": "Moderately obese", "HealthRisk": "Medium risk" }
  ],
  "totalOverweight": 2
}
```

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```