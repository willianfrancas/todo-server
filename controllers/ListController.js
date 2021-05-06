import List from '../models/ListModel.js';
import ListModel from '../models/ListModel.js';

const ListController = {
  loadItems: async (req, res) => {
    ListModel.find().exec((error, items) => {
      if (error) {
        return res.status(500).json({ message: '...problemas ao carregar os items!' });
      }
      return res.status(200).json(items);
    })
  },

  newItem: async function (req, res) {
    try {
      const newItem = new ListModel(req.body);
      await newItem.save();
      res.status(200).json({ newItem, message: 'item salvo com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'erro ao tentar salvar novo item!', error: error })
    }
  },

  updateItem: (req, res) => {
    console.log(req.body._id);
    try {
      ListModel.findByIdAndUpdate(req.body._id, {
        done: req.body.done,
        description: req.body.description,
        price: req.body.price,
      }).then(item => {
        if (!item) {
          return res.status(404).json({ message: 'Falha ao atualizar item! ' });
        }
        res.status(200).json({ ...item, message: 'Item atualizado com sucesso!' });
      })
    } catch (error) {
      console.log('error', error);
    }
  }
}

export default ListController;