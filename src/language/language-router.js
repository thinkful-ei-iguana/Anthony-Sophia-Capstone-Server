const express = require('express')
const LanguageService = require('./language-service')
const { requireAuth } = require('../middleware/jwt-auth')
const LinkedList = require('./linkedlist')

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
  .post('/guess', async (req, res, next) => {
    const { guess } = req.body;
    // if (!req.body.guess) {
    //   return res.status(400).json({ error: `Missing 'guess' in request body` })
    // }
    //iterate down from the head?
    try {

      const head = await LanguageService.getLanguageHead(
        req.app.get('db'),
        req.language.id,
      )

      let memoryValue = head.memory_value;
      let totalScore = req.language.total_score;
      let incorrectCount = head.incorrect_count;
      let correctCount = head.correct_count;
      let translation = head.translation;


      let words = new LinkedList();
      let currentNode = head;
      let nextNode = currentNode.next;

      while (currentNode !== null) {
        words.insertLast(nextWord)
        nextWord = await LanguageService.getNextWord(
          req.app.get('db'),
          nextNode
        )
      }
      words.insertLast(nextWord);

      console.log('this is words', words);

      //check if guess is right

      //update the database to reflect answers
      //incorrect/incorrect/totalscore


    } catch (error) {
      next(error)
    }
  });

module.exports = languageRouter
