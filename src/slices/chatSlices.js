import { createSlice } from "@reduxjs/toolkit";
import { 
  fetchByMenu, 
  fetchByChat, 
  deleteChat,
  sendMessage
} from "../actions/chat";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatList: [], // Lista de chats del menú
    currentChat: {
      id: null,
      messages: [], // Mensajes del chat actual
    },
    loading: false,
    error: null,
    searchTerm: "",
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    addMessage: (state, action) => {
      state.currentChat.messages.push(action.payload);
    },
    clearCurrentChat: (state) => {
      state.currentChat = {
        id: null,
        messages: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Send message
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        // Si es un chat nuevo, añadirlo al menú
        console.log("action.payload sendMessage", action.payload);
        if (action.payload.isNewChat) {
          state.chatList.unshift({
            id: action.payload.chatId,
            name: action.payload.message.text,
            older: 0
          });
        }
        // // Actualizar el chat actual con el nuevo ID si es necesario
        // if (action.payload.chatId) {
        //   state.currentChat.id = action.payload.chatId;
        // }
        // // Añadir el mensaje a la conversación actual
        // state.currentChat.messages.push(action.payload.message);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch chat list
      .addCase(fetchByMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchByMenu.fulfilled, (state, action) => {
        console.log("action.payload chats", action.payload);
        state.loading = false;
        state.chatList = action.payload.chats;
      })
      .addCase(fetchByMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch chat messages
      .addCase(fetchByChat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchByChat.fulfilled, (state, action) => {
        state.loading = false;
        state.currentChat = {
          id: action.meta.arg.chatId,
          messages: action.payload.messages,
        };
      })
      .addCase(fetchByChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete chat
      .addCase(deleteChat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteChat.fulfilled, (state, action) => {
        state.loading = false;
        state.chatList = state.chatList.filter(
          (chat) => chat.id !== action.meta.arg.chatId
        );
        if (state.currentChat.id === action.meta.arg.chatId) {
          state.currentChat = {
            id: null,
            messages: [],
          };
        }
      })
      .addCase(deleteChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearchTerm, addMessage, clearCurrentChat } = chatSlice.actions;

export default chatSlice.reducer;