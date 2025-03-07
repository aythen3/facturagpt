import axios from "axios";

import apiBackend from "@src/apiBackend";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getEmailsByQuery = createAsyncThunk(
  "bot/getEmailsByQuery",
  async ({ userId, email, password, query, tokenGpt, logs, ftpData }) => {
    try {
      console.log("EMAIL FETCH REQUEST:", { userId, email, query, ftpData });

      const token = localStorage.getItem("token");
      // Call your backend endpoint for fetching emails
      const res = await apiBackend.post(
        "/bot/getEmailsByQuery",
        { userId, email, password, query, tokenGpt, logs, ftpData },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Replace with your token
          },
        }
      );

      console.log("EMAIL FETCH RESPONSE:", res.data);
      return res.data; // Return the email data
    } catch (error) {
      console.error("Error in getEmailsByQuery action:", error);
      return rejectWithValue(error.response?.data || "Failed to fetch emails");
    }
  }
);
export const getDataFromPdfOrImage = createAsyncThunk(
  "bot/getDataFromPdfOrImage",
  async ({ file }, { rejectWithValue }) => {
    try {
      console.log("FILE FROM ACTION", file);

      const formData = new FormData();
      formData.append("file", file);

      console.log("FORM DATA ENTRIES:", Array.from(formData.entries()));

      const token = localStorage.getItem("token");
      const res = await apiBackend.post(
        "/bot/getDataFromPdfOrImage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("RESPONSE from getDataFromPdfOrImage action", res.data);
      return res.data;
    } catch (error) {
      console.error("Error in getDataFromPdfOrImage action:", error);
      return rejectWithValue(error.response?.data || "Failed to process file");
    }
  }
);
export const fetchsAudio = createAsyncThunk(
  "bot/fetchsAudio",
  async ({ voice }, { dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await apiBackend.get(`/bot/${voice}/voice`, {
        Authorization: `Bearer ${token}`,
        "Response-Type": "arraybuffer",
      });

      return response.data;
    } catch (error) {
      console.log("Error generating voice:", error);
    }
  }
);

export const voiceBot = createAsyncThunk(
  "bot/voiceBot",
  async (text, { dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await apiBackend.post(
        "/bot/voice/",
        { text },
        {
          Authorization: `Bearer ${token}`,
          "Response-Type": "arraybuffer",
        }
      );

      return response.data;
    } catch (error) {
      console.log("Error generating voice:", error);
    }
  }
);

export const transcribeBot = createAsyncThunk(
  "bot/transcribeBot",
  async (audioBuffer, { dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await apiBackend.post("/bot/transcribe", audioBuffer, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/octet-stream",
        },
      });
      return response;
    } catch (error) {
      console.log("Error transcribing voice:", error);
    }
  }
);

export const testBot = createAsyncThunk(
  "bot/testBot",
  async ({}, { dispatch }) => {
    try {
      const token = localStorage.getItem("token");

      const text = "♪ Hola cómo estas quiero ayudarte a programar el código!";
      const url = `http://212.47.252.124:3005/generate_audio`;
      const response = await axios.get(url, {
        params: { text: text },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return response.data.audio_base64;
    } catch (error) {
      console.log("Error transcribing voice:", error);
    }
  }
);

export const avatarBot = createAsyncThunk(
  "bot/avatarBot",
  async ({ image }, { dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await apiBackend.post(
        "/bot/avatar",
        {
          image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.log("Error transcribing voice:", error);
    }
  }
);

export const meetBot = createAsyncThunk(
  "bot/meetBot ",
  async ({ type, meetId, subchatId, prompt }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await apiBackend.post(
        "/bot/meetBot",
        { type, meetId, subchatId, prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (error) {
      console.log("Error on meetBot:", error);
    }
  }
);

// -------------------------------------------------

export const filterEmail = createAsyncThunk(
  "bot/filter ",
  async ({ conf_email, filter }) => {
    try {
      const token = localStorage.getItem("token");
      const token_gpt = localStorage.getItem("token-gpt");

      const res = await apiBackend.post(
        "/bot/email/filter",
        {
          conf_email,
          filter: filter,
          token: token_gpt,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (error) {
      console.log("Error on meetBot:", error);
    }
  }
);

export const readEmail = createAsyncThunk(
  "bot/email ",
  async ({ conf_email, email }) => {
    try {
      const token = localStorage.getItem("token");
      const token_gpt = localStorage.getItem("token-gpt");

      const res = await apiBackend.post(
        "/bot/email",
        {
          conf_email,
          email: email,
          token: token_gpt,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (error) {
      console.log("Error on meetBot:", error);
    }
  }
);

export const regeneratePrompt = createAsyncThunk(
  "bot/regeneratePrompt ",
  async ({ meetId, messageId, prompt }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await apiBackend.post(
        "/bot/regeneratePrompt",
        { meetId, messageId, prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (error) {
      console.log("Error on meetBot:", error);
    }
  }
);

export const readEmailContact = createAsyncThunk(
  "bot/email/contact",
  async ({ conf_email }) => {
    try {
      const token = localStorage.getItem("token");
      const token_gpt = localStorage.getItem("token-gpt");

      const res = await apiBackend.post(
        "/bot/email/contact",
        {
          conf_email,
          fileName: "contact.json",
          token: token_gpt,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (error) {
      console.log("Error on meetBot:", error);
    }
  }
);

export const generateDoc = createAsyncThunk(
  "bot/doc ",
  async ({ id, conf_email, files }) => {
    try {
      const token = localStorage.getItem("token");
      const token_gpt = localStorage.getItem("token-gpt");

      const res = await apiBackend.post(
        "/bot/doc/generate",
        {
          conf_email,
          files: files,
          token: token_gpt,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (error) {
      console.log("Error on meetBot:", error);
    }
  }
);

export const generateEmailDoc = createAsyncThunk(
  "bot/doc/email ",
  async ({ id, files }) => {
    try {
      const token = localStorage.getItem("token");
      const token_gpt = localStorage.getItem("token-gpt");

      const res = await apiBackend.post(
        "/bot/email/doc",
        {
          files: files,
          token: token_gpt,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (error) {
      console.log("Error on meetBot:", error);
    }
  }
);

export const sendEmail = createAsyncThunk(
  "bot/email/send ",
  async ({ conf_email, subject, content }) => {
    try {
      const token = localStorage.getItem("token");
      const token_gpt = localStorage.getItem("token-gpt");

      const res = await apiBackend.post(
        "/bot/email/send",
        {
          email: email,
          subject: subject,
          content: content,
          token: token_gpt,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (error) {
      console.log("Error on meetBot:", error);
    }
  }
);

export const generateEmail = createAsyncThunk(
  "bot/email/send ",
  async ({ conf_email, content }) => {
    try {
      const token = localStorage.getItem("token");
      const token_gpt = localStorage.getItem("token-gpt");

      const res = await apiBackend.post(
        "/bot/email/generate",
        {
          conf_email,
          content: content,
          token: token_gpt,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (error) {
      console.log("Error on meetBot:", error);
    }
  }
);

export const checkDoc = createAsyncThunk(
  "bot/doc/check ",
  async ({ conf_email, file, files }) => {
    try {
      const token = localStorage.getItem("token");
      const token_gpt = localStorage.getItem("token-gpt");

      const formData = new FormData();
      formData.append("image", file);
      formData.append("files", JSON.stringify(files));
      formData.append("token", token_gpt);
      formData.append("conf_email", conf_email);
      const res = await apiBackend.post("/bot/doc/check", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Agrega el token aquí
        },
      });

      return res.data;
    } catch (error) {
      console.log("Error on meetBot:", error);
    }
  }
);

export const readWhatsapp = createAsyncThunk(
  "bot/whatsapp/read ",
  async ({ id, files }) => {
    try {
      const token = localStorage.getItem("token");
      const token_gpt = localStorage.getItem("token-gpt");

      const res = await apiBackend.post(
        "/bot/whatsapp/read",
        {
          number: "34629571058",
          message: "hello world",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (error) {
      console.log("Error on readWhatsapp:", error);
    }
  }
);

export const sendWhatsapp = createAsyncThunk(
  "bot/whatsapp/send ",
  async ({ id, files }) => {
    try {
      const token = localStorage.getItem("token");
      const token_gpt = localStorage.getItem("token-gpt");

      const res = await apiBackend.post(
        "/bot/whatsapp/send",
        {
          number: "34629571058",
          message: "hello world",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (error) {
      console.log("Error on sendWhatsapp:", error);
    }
  }
);

export const sendMediaWhatsapp = createAsyncThunk(
  "bot/whatsapp/send/media ",
  async ({ id, files }) => {
    try {
      const token = localStorage.getItem("token");
      const token_gpt = localStorage.getItem("token-gpt");

      const res = await apiBackend.post(
        "/bot/whatsapp/send/media",
        {
          number: "34629571058",
          message: "hello world",
          type: "document",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (error) {
      console.log("Error on sendMediaWhatsapp:", error);
    }
  }
);
