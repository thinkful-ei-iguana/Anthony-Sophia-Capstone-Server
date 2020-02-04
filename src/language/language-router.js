const express = require('express')
const LanguageService = require('./language-service')
const { requireAuth } = require('../middleware/jwt-auth')
const LinkedList = require('./linkedlist')
const jsonBodyParser = express.json();

const languageRouter = express.Router()

languageRouter
  .use(requireAuth)
  .use(async (req, res, next) => {
    try {
      const language = await LanguageService.getUsersLanguage(
        req.app.get('db'),
        req.user.id,
      )

      if (!language)
        return res.status(404).json({
          error: `You don't have any languages`,
        })

      req.language = language
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/', async (req, res, next) => {
    try {
      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id,
      )
      res.json({
        language: req.language,
        words,
      })
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/head', async (req, res, next) => {
    try {

      const head = await LanguageService.getLanguageHead(
        req.app.get('db'),
        req.language.id,
      )
      // let currentNode = head;
      // let nextWord = currentNode.next;

      // console.log(head);
      // console.log(nextWord);

      res.status(200).json({
        nextWord: head.original,
        totalScore: req.language.total_score,
        wordCorrectCount: head.correct_count,
        wordIncorrectCount: head.incorrect_count
      });
      next();
    } catch (error) {
      next(error)
    }
  });

languageRouter
  .post('/guess', jsonBodyParser, async (req, res, next) => {
    if (!req.body.guess) {
      return res.status(400).json({
        error: `Missing 'guess' in request body`
      })
    }

    try {
      let head = await LanguageService.getLanguageHead(
        req.app.get('db'),
        req.language.id,
      );

      let guess = req.body.guess;
      let translation = head.translation; 
      let totalScore = req.language.total_score;
      let memoryValue = head.memory_value;
      let correct_count = head.correct_count;
      let incorrect_count = head.incorrect_count;
      let result = ''; //correct or incorrect string value

      let words = new LinkedList();
      let currentNode = head;

      while (currentNode.next !== null) {
        words.insertLast(currentNode);
        //re-assign next value of currentNode to next node
        currentNode = await LanguageService.getNextWord(
          req.app.get('db'), currentNode.next
        );
      }
      words.insertLast(currentNode);

      // displayWordList = function (list) {
      //   let node = head
      //   while (head) {
      //     console.log(head.translation)
      //     node = node.next;
      //   }
      // }

      // displayWordList(words);


      if (guess === translation) {
        // displaying values on the page
        totalScore++;
        correct_count++;
        result = 'correct';

        // variables related to the linked list
        memoryValue = memoryValue * 2; // M of the current question
        // shift every other m for every other question +1
        // create a new node at the M*2 question
      } else {
        memoryValue = 1;
        incorrect_count++;
        result = 'incorrect';
      }

      let finalResults = {
        result,
        original: head.original,
        translation: head.translation,
        guess: guess,
        totalScore,
        correct_count,
        incorrect_count
      }

      console.log('this is', finalResults);

    } catch (error) {
      next(error);
    }
  });

module.exports = languageRouter
