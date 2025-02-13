const { connectDB } = require('./utils');
const { meetGPT } = require('../services/gpt-meet');


const getChatListController = async (req, res) => {
  const user = req.user;
  const search = req.query.search || '';


  const id = user.userId.split('_').pop();
  console.log("user", user, id);
  // console.log("search", search);
  // return res.json({ success: true, id });
  try {
    const dbName = `db_chat_${id}`;
    const db = await connectDB(dbName);

    const selector = {
      _id: { $gt: null } // Selecciona todos los documentos
    };

    if (search) {
      selector.name = {
        $regex: `(?i)${search}`  // (?i) hace la búsqueda case-insensitive
      };
    }


    const result = await db.find({
      selector: selector,
      fields: ['_id', 'name', 'createdAt']
      // sort: [{ createdAt: 'desc' }]
    });

    // const result = await db.view('chats', 'by_date', {
    //   descending: true
    // });

    console.log("result", result);

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

    // if (search) {
    //   chats = chats.filter(chat => 
    //     chat.name.toLowerCase().includes(search.toLowerCase())
    //   );
    // }

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
  const user = req.user;
  const { chatId } = req.params;

  console.log("chatId", chatId);
  console.log("user", user);

  const id = user.userId.split('_').pop();

  try {
    const dbName = `db_chat_${id}`;
    const db = await connectDB(dbName);

    const result = await db.find({
      selector: {
        _id: chatId
      }
    });


    // console.log("result", result);

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

  const id = user.userId.split('_').pop();

  try {
    const dbName = `db_chat_${id}`;
    const db = await connectDB(dbName);

    const result = await db.find({
      selector: {
        _id: chatId
      }
    });

    // const chat = result.docs[0];

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




// ... existing code ...

const sendMessageController = async (req, res) => {
  // res.setHeader("Content-Type", "text/event-stream");
  // res.setHeader("Cache-Control", "no-cache");
  // res.setHeader("Connection", "keep-alive");

  console.log("sendMessageController");
  const user = req.user;
  const { chatId } = req.params;
  const { text } = req.body;






  // const result_meet = await meetGPT(res, text);
  const result_meet = {
    success: true,
    value: 'Hola, ¿cómo estás?'
  }

  console.log('result_meett', result_meet)
  console.log("user", user);
  const id = user.userId.split('_').pop();
  console.log("chatId", chatId);
  console.log("text", text);

  try {
    const dbName = `db_chat_${id}`;
    const db = await connectDB(dbName);

    // console.log("db", db);
    // Get existing chat

    const result = await db.find({
      selector: {
        _id: chatId
      }
    });


    // res.end();

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

    console.log("chat", chat);
    // Create new message object
    const newMessage = {
      type: 'user',
      userId: id,
      text: text,
      timestamp: new Date().toISOString()
    };

    const botMessage = {
      type: 'bot',
      userId: '1234',
      text: result_meet?.value,
      timestamp: new Date().toISOString()
    }

    console.log("botMessage", botMessage);


    // console.log("newMessage", newMessage);

    // Add message to the beginning of the messages array
    if (!chat.messages) {
      chat.messages = [];
    }
    chat.messages.unshift(newMessage);
    chat.messages.unshift(botMessage); 

    // Save updated chat document
    if (isNewChat) {
      await db.insert({
        ...chat,
        messages: chat.messages,
        updatedAt: new Date().toISOString()
      });
    } else {
      await db.insert({
        ...chat,
        messages: chat.messages,
        updatedAt: new Date().toISOString()
      });
    }

    return res.json({
      success: true,
      message: newMessage,
      botMessage: botMessage, 
      isNewChat: isNewChat
    });

  } catch (error) {
    console.error('Error en sendMessageController:', error);
    return res.status(500).json({
      success: false,
      error: 'Error al enviar el mensaje'
    });
  }
};


module.exports = {
  getChatListController,
  getChatMessagesController,
  deleteChatController,
  sendMessageController
};
