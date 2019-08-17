const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');

const RiddleSchema = new mongoose.Schema({
  num: {
    type: Number
  },
  title: {
    type: String
  },
  type: {
    type: String,
    enum: [
      'geo',
      'single',
      'several',
      'several-geo',
      'text',
      'interactive',
      'ar'
    ]
  },
  text: {
    type: String
  },
  answer: {
    type: String
  },
  required: {
    type: Boolean
  },
  location: {
    type: String
  },
  last: {
    type: Boolean
  },
  children: {
    num: {
      type: Number
    },
    title: {
      type: String
    },
    type: {
      type: String,
      enum: [
        'geo',
        'single',
        'several',
        'several-geo',
        'text',
        'interactive',
        'ar'
      ]
    },
    text: {
      type: String
    },
    answer: {
      type: String
    },
    required: {
      type: Boolean
    },
    location: {
      type: String
    }
  }
});

const QuestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tags: {
    typeTeam: {
      type: String,
      enum: ['командная', 'индивидуальная', 'сообщество']
    },
    typeGenre: {
      type: String,
      enum: ['тестовая', 'с сюжетом', 'ориентирование']
    },
    typeTime: {
      type: String
    },
    location: {
      type: String
    }
  },
  dateStart: {
    type: String
  },
  isActual: {
    type: Boolean
  },
  image: {
    type: String
  },
  price: {
    type: String
  },
  available: {
    type: Boolean
  },
  rules: {
    type: String
  },
  riddles: [RiddleSchema]
});

QuestSchema.plugin(MongooseAutoIncrementID.plugin, {
  modelName: 'Quest'
});

const Riddle = mongoose.model('Riddle', RiddleSchema);

module.exports = Quest = mongoose.model('Quest', QuestSchema);
