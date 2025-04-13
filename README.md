# SignalR Chat Application

This is a simple chat application built using **C# .NET Web API 8** for the backend, and **Vue** with **SignalR** and **Vuetify** for the frontend. The app allows users to enter a username and a room number to join a chat room, and then communicate with other users who have joined the same room.

## Features

- Users can enter a username and a room number.
- Real-time communication using SignalR.
- Chat messages are exchanged only between users in the same room.
- The frontend is built using Vue2 and Vuetify for a responsive UI.

## Technologies Used

- **Backend**: 
  - C# .NET Web API 8
  - SignalR for real-time communication
  
- **Frontend**:
  - Vue2
  - Vuetify for UI components
  - SignalR for real-time communication
  
## Setup Instructions

### Backend (C# .NET Web API)

1. Clone the repository or download the source code for the backend.
2. Open the solution in **Visual Studio** or **Visual Studio Code**.
3. Ensure that you have **.NET 8** SDK installed.
4. Restore the NuGet packages using the following command:
   ```bash
   dotnet restore
5. Build the project:
   dotnet build
6. Run the Web API locally:
   dotnet run
   
