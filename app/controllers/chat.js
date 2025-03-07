const { connectDB } = require('./utils');
const { meetGPT, validateToken } = require('../services/gpt-meet');
const { updateAccount } = require('../services/user');

const getChatListController = async (req, res) => {
  const user = req.user;
  const search = req.query.search || '';

  const id = user._id.split('_').pop();
  try {
    const dbName = `db_${id}_chat`;
    const db = await connectDB(dbName);

    const selector = {
      _id: { $gt: null }
    };

    if (search) {
      selector.name = {
        $regex: `(?i)${search}`
      };
    }


    const result = await db.find({
      selector: selector,
      fields: ['_id', 'name', 'createdAt']
    });


    let chats = result.docs.map(row => {
      const chat = row;
      const createdAt = new Date(chat.createdAt);
      const now = new Date();
      const diffTime = Math.abs(now - createdAt);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      return {
        id: chat._id,
        name: chat.name,
        older: diffDays,
        createdAt: chat.createdAt
      };
    });

    return res.json({ success: true, chats });
  } catch (error) {
    console.error('Error en getChatListController:', error);
    return res.status(500).json({
      success: false,
      error: 'Error al obtener la lista de chats'
    });
  }
};

const getChatMessagesController = async (req, res) => {

  console.log("getChatMessagesController");
  const user = req.user;
  const { chatId } = req.params;

  const id = user._id.split('_').pop();

  try {
    const dbName = `db_${id}_chat`;
    const db = await connectDB(dbName);

    const result = await db.find({
      selector: {
        _id: chatId
      }
    });


    if (!result.docs || result.docs.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Chat no encontrado'
      });
    }

    const chat = result.docs[0];


    return res.json({
      success: true,
      messages: chat.messages || [],
      chatName: chat.name
    });
  } catch (error) {
    console.error('Error en getChatMessagesController:', error);
    return res.status(500).json({
      success: false,
      error: 'Error al obtener los mensajes del chat'
    });
  }
};

const deleteChatController = async (req, res) => {
  const user = req.user;
  const { chatId } = req.params;

  const id = user._id.split('_').pop();

  try {
    const dbName = `db_${id}_chat`;
    const db = await connectDB(dbName);

    const result = await db.find({
      selector: {
        _id: chatId
      }
    });


    if (!result.docs || result.docs.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Chat no encontrado'
      });
    }

    const chat = result.docs[0];

    await db.destroy(chat._id, chat._rev);

    return res.json({
      success: true,
      message: 'Chat eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error en deleteChatController:', error);
    return res.status(500).json({
      success: false,
      error: 'Error al eliminar el chat'
    });
  }
};



const validateTokenGPT = async (req, res) => {
  const user = req?.user;

  if (!res?.send) {
    return true
  }

  if (!user) {
    return res.send({
      success: false,
      error: 'Token GPT no encontrado'
    });
  }


  const response = await validateToken(user.tokenGPT);
  return res.send({
    success: response,
    message: 'Token GPT validado correctamente'
  });
}



const sendMessageController = async (req, res) => {
  const user = req.user;
  const id = user._id.split('_').pop()

  const { chatId } = req.params;
  const text = req.body.toString().replace('text=', '');

  const skProjRegex = /^sk-proj-[A-Za-z0-9-_]{100,}$/;
  if (skProjRegex.test(text)) {
    const userData = {
      id: user.id,
      tokenGPT: text
    }
    await updateAccount(userData);

    return res.status(200).send({
      succes: true,
      message: 'Token valid'
    })
  }

  const tokenGPT = user.tokenGPT;

  if (!tokenGPT) {
    return res.json({
      success: false,
      error: 'Token GPT no encontrado'
    });
  }

  const result_meet = await meetGPT(res, text, tokenGPT, id);


  try {
    const dbChat = await connectDB(`db_${id}_chat`);

    const result = await dbChat.find({
      selector: {
        _id: chatId
      }
    });


    let chat = result.docs[0];
    let isNewChat = false;

    if (!result.docs || result.docs.length === 0) {
      isNewChat = true;
      chat = {
        _id: chatId,
        name: "Nuevo Chat",
        messages: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    }

    const newMessage = {
      type: 'me',
      userId: id,
      text: text,
      timestamp: new Date().toISOString()
    };


    console.log('tedxt', newMessage)
    const botMessage = {
      type: 'bot',
      userId: '1234',
      text: result_meet?.text,
      timestamp: new Date().toISOString()
    }

    if (!chat.messages) {
      chat.messages = [];
    }

    chat.messages.push(newMessage);
    chat.messages.push(botMessage);

    if (isNewChat) {
      await dbChat.insert({
        ...chat,
        messages: chat.messages,
        updatedAt: new Date().toISOString()
      });
    } else {
      await dbChat.insert({
        ...chat,
        messages: chat.messages,
        updatedAt: new Date().toISOString()
      });
    }


    console.log('succesfully')
   
  } catch (error) {
    console.error('Error en sendMessageController:', error);
    // return res.status(500).json({
    //   success: false,
    //   error: 'Error al enviar el mensaje'
    // });
  }
};


module.exports = {
  getChatListController,
  getChatMessagesController,
  deleteChatController,
  sendMessageController,
  validateTokenGPT
};
