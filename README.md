# Smol URL

## Description

A basic URL shortener application built with Supabase and Bun.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Bun](https://bun.sh/)
- [Supabase CLI](https://supabase.com/docs/guides/cli)

## Setup

### 1. Start Supabase

Run the following command to start Supabase locally:

```bash
supabase start
```

This will start the Supabase services.

Run the following command if supababase information not show up

```bash
supabase status
```

### 2. Start the Server

Navigate to the `server` directory:

```bash
cd server
```

Then, start the server using Bun:

```bash
bun start
```

### 3. Start the Client

Open a new terminal tab and navigate to the `client` directory:

```bash
cd client
```

Now, start the client with the following command:

```bash
bun dev
```

This will start the client application in development mode.

## Environment Variables

Ensure you have the correct environment variables set up for both the server and client. You can find the necessary environment variables in the .env.example file provided in both the server and client directories. Copy this file to .env in each directory and update the values with your local configuration.
