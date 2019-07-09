const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  menuType: {
    type: String,
    enum: ['Кофе', 'Чай', 'Какао', 'Лимонад', 'Напиток', 'Снэк']
  },
  isnew: {
    type: Boolean,
    defalut: false
  },
  image: {
    type: String
  },
  variations: [
    {
      size: {
        type: String,
        enum: ['100мл', '200мл', '350мл', '500мл']
      },
      price: {
        type: Number
      },
      addition: {
        type: String
      }
    }
  ]
});

module.exports = Menu = mongoose.model('Menu', MenuSchema);
