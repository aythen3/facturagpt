import apiBackend from "@src/apiBackend.js";
import { logout } from "@src/actions/user.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchByMenu = createAsyncThunk(
  "chat/fetchByMenu",
  async ({ query = '' }, { rejectWithValue }) => {
    try {
      const user = localStorage.getItem("user");
      const userJson = JSON.parse(user);
      const token = userJson.accessToken;

      const res = await apiBackend.get(
        `/chat/list?search=${encodeURIComponent(query)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("res", res);

      // La respuesta incluirá los chats con sus días de antigüedad
      return res.data;
    } catch (error) {
      if(error.response.status === 501) logout()      

      console.error("Error fetching chats:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const fetchByChat = createAsyncThunk(
  "chat/fetchByChat",
  async ({ chatId }, { rejectWithValue }) => {
    try {
      const user = localStorage.getItem("user");
      const userJson = JSON.parse(user);
      const token = userJson.accessToken;

      const res = await apiBackend.get(
        `/chat/${chatId}/messages`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return res.data;
    } catch (error) {
      console.error("Error fetching chat messages:", error);

      if(error.response.status === 501) logout()

      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const deleteChat = createAsyncThunk(
  "chat/deleteChat",
  async ({ chatId }, { rejectWithValue }) => {
    try {
      const user = localStorage.getItem("user");
      const userJson = JSON.parse(user);
      const token = userJson.accessToken;

      const res = await apiBackend.delete(
        `/chat/${chatId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return res.data;
    } catch (error) {
      console.error("Error deleting chat:", error);

      if(error.response.status === 501) logout()

      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);


export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ chatId, text }, { rejectWithValue }) => {
    try {
      const user = localStorage.getItem("user");
      const userJson = JSON.parse(user);
      const token = userJson.accessToken;

      const res = await apiBackend.post(
        `/chat/${chatId}/messages`,
        { text },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("!!! send message res", res);

      return {
        ...res.data,
        chatId: chatId
      };
    } catch (error) {
      console.error("Error sending message:", error);

      if(error.response.status === 501) logout()

      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);


export const validateTokenGPT = createAsyncThunk(
  "chat/validateTokenGPT",
  async (id, { rejectWithValue }) => {
    try {
      const user = localStorage.getItem("user");
      const userJson = JSON.parse(user);
      const token = userJson.accessToken;

      const res = await apiBackend.post(
        `/chat/validate-token`,
        {  },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("!!! valid token gpt", res);

      return {
        ...res.data,
        // chatId: chatId
      };
    } catch (error) {
      console.error("Error sending message:", error);

      if(error.response.status === 501) logout()

      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);