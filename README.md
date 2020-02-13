# Dozo

Dozo is an application that implements Spaced Repetition where users can learn basic Japanese words and can take a practice word anytime when they are ready for it. Users able to check their answer is correct or incorrect directly on the learning page. Also, Dozo will display how many times they got correct or incorrect answers for each word and total score on the dashboard page. 

Live Demo: https://spaced-repetition.anthonytb.now.sh/
Client Repo: https://github.com/thinkful-ei-iguana/Anthony-Sophia-Capstone 

## Account Demo Login

Username: admin

Password: pass

## Techinologies Used

Client Side deployed on Zeit

- React.js
- JavaScript
- HTML
- CSS
- Cypress

API Server Side deployed on Heroku

- Express.js
- Node.js
- PostgreSQL
- JWT Decode

## Endpoints

1. `GET /api/language/`

This returns all the words and their associated data that match the id of the
logged in user. This is used in the dashboard view when a user first logs in.

2. `GET /api/language/head`

This returns the word that is currently in first place for testing the user as
well as information about it and the next word. This is used in the client's
`/learn` route and displays when the user clicks to begin practicing.

3. `POST /api/language/guess`

This captures the user's inputed guess and checks it against the correct answer
stored in the database. The server then updates the word's data appropriately
according to whether the user's guess was correct or incorrect and also pushes
the word back in the order of words (one space back for incorrect answer and
further for correct) using a linked list and then updates the database so that
the new ordering persists. 
