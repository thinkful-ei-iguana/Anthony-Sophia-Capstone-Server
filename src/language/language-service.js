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

  //make a language service that will process the guess and update the head (correct_count, incorrect_count..)
  //based on whether it's correct or not
  //maybe use a Linked List? the table uses a next column
}

module.exports = LanguageService
