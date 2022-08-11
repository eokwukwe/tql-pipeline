## Tech Stacks
- [Node.js 16.16.x](https://nodejs.org/en)
- [Express.js 4.18.x](https://expressjs.com)
- [Typescript 4.7.x](https://www.typescriptlang.org)

## How Does This Work
- It calculates and returns the age of a person, given their date of birth `(dob)` as query parameters to `GET /howold`
- The date can be a unix timestamp of a formatted date string
- The `dob` query parameters is validated to ensure it's valid
- It uses the [dayjs](https://day.js.org/en/) library for the age calculation
- The `/howold` endpoint is rate-limited to a maximum of 3 calls per second for each API client/caller