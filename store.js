const STORE = {
    // 5 or more questions are required
    questions: [
      {
        question: 'What are modern buildings primarily built with?',
        answers: [        
          'Adobe',
          'Wood',
          'Strawbales',
          'Cards'
        ],
        correctAnswer: 'Wood'
      },
      {
        question: 'What material is most commonly used for insulation?',
        answers: [
          'Newspaper',
          'Skittles',
          'Fiberglass',
          'Wood Fiber'
        ],
        correctAnswer: 'Fiberglass'
      },
      {
        question: 'A good foundation would be built with what?',
        answers: [        
          'Concrete',
          'Wood',
          'Styrofoam',
          'Marbles'
        ],
        correctAnswer: 'Concrete'
      },
      {
        question: 'What is NOT a good way to paint your house?',
        answers: [        
          'Finger-paint',
          'Roll',
          'Brush',
          'Spray'
        ],
        correctAnswer: 'Finger-paint'
      },
      {
        question: 'What material is NOT used for roofing?',
        answers: [        
          'Asphalt Shingles',
          'Cedar Shakes',
          'Metal',
          'Drywall'
        ],
        correctAnswer: 'Drywall'
      }    
    ],
    quizStarted: false,
    questionNumber: 0,
    score: 0
  };