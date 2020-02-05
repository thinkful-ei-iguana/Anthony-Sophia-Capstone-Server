const express = require('express')
const LanguageService = require('./language-service')
const { requireAuth } = require('../middleware/jwt-auth')
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
    try {
      const { guess } = req.body;

      if (!req.body.guess) {
        return res.status(400).json({ error: `Missing 'guess' in request body` });
      }

      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id
      );

      if (guess.toLowerCase() === words[0].translation.toLowerCase()) {
        words[0].correct_count++;
        words[0].memory_value = words[0].memory_value * 2;
        req.language.total_score++;
      } else {
        words[0].incorrect_count++;
        words[0].memory_value = 1;
      }

      await LanguageService.updateTotalScore(
        req.app.get('db'),
        req.language.id,
        req.language.total_score
      );
      //convert array into a Linked list
      let linkedList = LanguageService.convertLinkedList(words);

      // console.log('this is linkedlist', linkedList);

      //determine positioning using insert methods and save it into a variable

      let listLength = linkedList.size(); //5

      if (linkedList.head.value.memory_value > listLength) {
        linkedList.remove(words[0]);










        

      return res.status(200).json(results);
    } catch (error) {
      next(error);
    }
  });

module.exports = languageRouter
