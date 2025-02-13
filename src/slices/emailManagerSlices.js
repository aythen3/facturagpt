import { createSlice } from "@reduxjs/toolkit";
import {
  addNewClient,
  createAccount,
  deleteClient,
  getAllClients,
  getAllUsers,
  updateClient,
  updateUser,
} from "../actions/emailManager";
import { loginToManager } from "../actions/user";

const emailManagerSlices = createSlice({
  name: "emailManager",
  initialState: {
    user: null,
    allUsers: [],
    allClients: [],
  },
  reducers: {
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setAllClients: (state, action) => {
      state.allClients = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      // GET ALL USERS

      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // UPDATE USER

      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log("action.payload from updateUser", action.payload);
        state.loading = false;
        state.allUsers = state.allUsers.map((user) => {
          if (user.id === action.payload.id) {
            return action.payload;
          }
          return user;
        });
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // LOGIN

      .addCase(loginToManager.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginToManager.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success && action.payload.account) {
          const { id, email, role } = action.payload.account;
          state.user = { id, email, role };
        }
      })
      .addCase(loginToManager.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // GET ALL CLIENTS

      .addCase(getAllClients.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllClients.fulfilled, (state, action) => {
        console.log("action.payload from getAllClients", action.payload);
        state.loading = false;
        state.allClients = action.payload;
      })
      .addCase(getAllClients.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // ADD CLIENT

      .addCase(addNewClient.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewClient.fulfilled, (state, action) => {
        console.log("action.payload from addNewClient", action.payload);
        state.loading = false;
        state.allClients = action.payload;
      })
      .addCase(addNewClient.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // DELETE CLIENT

      .addCase(deleteClient.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        console.log("action.payload from deleteClient", action.payload);
        state.loading = false;
        state.allClients = action.payload;
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // UPDATE CLIENT

      .addCase(updateClient.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        console.log("action.payload from updateClient", action.payload);
        state.loading = false;
        const updatedClient = action.payload;
        if (!updatedClient || !updatedClient.id) {
          console.error("Invalid client data in action.payload");
          return;
        }
        const clientIndex = state.allClients.findIndex(
          (client) => client.id === updatedClient.id
        );
        if (clientIndex !== -1) {
          state.allClients[clientIndex] = updatedClient;
        } else {
          state.allClients.push(updatedClient);
        }
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setAllUsers, setUser, setAllClients } =
  emailManagerSlices.actions;

export default emailManagerSlices.reducer;
