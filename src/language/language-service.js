const LinkedList = require('./LinkedList/linkedlist')

const LanguageService = {
  getUsersLanguage(db, user_id) {
    return db
      .from('language')
      .select(
        'language.id',
        'language.name',
        'language.user_id',
        'language.head',
        'language.total_score',
      )
      .where('language.user_id', user_id)
      .first()
  },

  getLanguageWords(db, language_id) {
    return db
      .from('word')
      .select(
        'id',
        'language_id',
        'original',
        'translation',
        'next',
        'memory_value',
        'correct_count',
        'incorrect_count',
      )
      .where({ language_id })
  },

  //make a language service to retrieve the LanguageHead then use in the GET '/head' endpoint
  getLanguageHead(db, language_id) {
    return db
      .from('word')
      .select(
        'id',
        'language_id',
        'original',
        'translation',
        'next',
        'memory_value',
        'correct_count',
        'incorrect_count',
      )
      .where({ language_id }).first()
  },

  getNextWord(db, wordId) {
    return db
      .from('word')
      .select(
        'id',
        'language_id',
        'original',
        'translation',
        'next',
        'memory_value',
        'correct_count',
        'incorrect_count',
      )
      .where({ id: wordId })
      .first()
  },

  makeLinkedList(words) {
    const linkedList = new LinkedList();
    words.forEach(word => linkedList.insertLast(word));
    return linkedList;
  },

  updateWord(db, id, data) {
    return db('word')
      .where({ id })
      .update({ ...data });
  },

  updateTotalScore(db, id, total) {
    return db('language')
      .where({ id })
      .update({ total_score: total });
  },



  //make a language service that will process the guess and update the head (correct_count, incorrect_count..)
  //based on whether it's correct or not
  //maybe use a Linked List? the table uses a next column
}

module.exports = LanguageService
