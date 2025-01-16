import apiBackend from "@src/apiBackend.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const checkOrCreateUserBucket = createAsyncThunk(
  "scaleway/checkOrCreateUserBucket",
  async ({ userId }) => {
    console.log("data from checkOrCreateUserBucket", { userId });
    try {
      const token = localStorage.getItem("token");
      const res = await apiBackend.get(
        `/scaleway/check-user-bucket/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log("Error checking or creating user bucket:", error);
    }
  }
);

export const getUserFiles = createAsyncThunk(
  "scaleway/getUserFiles",
  async ({ userId }) => {
    console.log("data from getUserFiles", { userId });
    try {
      const token = localStorage.getItem("token");
      const res = await apiBackend.get(`/scaleway/get-user-files/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      console.log("Error getting user files:", error);
    }
  }
);

export const uploadFiles = createAsyncThunk(
  "scaleway/uploadFiles",
  async ({ files, currentPath }, { rejectWithValue }) => {
    console.log("on uploadFiles action", { files, currentPath });
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });
      formData.append("path", currentPath);

      const response = await apiBackend.post(
        "/scaleway/upload-files",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("RESPONSE FROM UPLOAD FILES (ACTION)", response.data);
      return response.data;
    } catch (error) {
      console.error("Error uploading files:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const createFolder = createAsyncThunk(
  "scaleway/createFolder",
  async ({ folderPath }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await apiBackend.post(
        "/scaleway/create-folder",
        { folderPath },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.error("Error creating folder:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const moveObject = createAsyncThunk(
  "scaleway/moveObject",
  async ({ sourceKey, destinationKey, isFolder }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await apiBackend.post(
        "/scaleway/move-object",
        { sourceKey, destinationKey, isFolder },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.error("Error moving object:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteObject = createAsyncThunk(
  "scaleway/deleteObject",
  async ({ key, isFolder }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await apiBackend.post(
        "/scaleway/delete-object",
        { key, isFolder },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.error("Error deleting object:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
