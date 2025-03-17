<p align="center">
  <img src="https://flowchat-rdri.netlify.app/assets/logo-F1-gNZkr.webp" width="200" alt="FlowChat Logo" />
</p>

<p align="center">A modern messaging platform built with <a href="http://nodejs.org" target="_blank">Node.js</a> and NestJS framework for scalable, real-time communication.</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
</p>

## Description

FlowChat is a messaging application backend built using the [NestJS](https://github.com/nestjs/nest) framework. It provides a robust API for real-time messaging, user management, contact management, and file uploads.

## Project Structure

The backend follows a modular architecture organized by domain:

```
src/
├── modules/
│   ├── auth/            # Authentication and authorization
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   └── auth.service.ts
│   ├── chatEvents/      # Real-time chat event handling
│   │   ├── dto/
│   │   ├── chatEvents.controller.ts
│   │   ├── chatEvents.module.ts
│   │   └── chatEvents.service.ts
│   ├── chats/           # Chat room and conversation management
│   │   ├── dto/
│   │   ├── chats.controller.ts
│   │   ├── chats.module.ts
│   │   └── chats.service.ts
│   ├── contacts/        # User contacts management
│   │   ├── dto/
│   │   ├── contacts.controller.ts
│   │   ├── contacts.module.ts
│   │   └── contacts.service.ts
│   ├── messages/        # Message handling and storage
│   │   ├── dto/
│   │   ├── messages.controller.ts
│   │   ├── messages.module.ts
│   │   └── messages.service.ts
│   ├── uploads/         # File upload functionality
│   │   ├── dto/
│   │   ├── uploads.controller.ts
│   │   ├── uploads.module.ts
│   │   └── uploads.service.ts
│   ├── users/           # User management
│   │   ├── dto/
│   │   ├── users.controller.ts
│   │   ├── users.module.ts
│   │   └── users.service.ts
│   └── supabase/        # Database integration with Supabase
│       ├── supabase.module.ts
│       └── supabase.service.ts
```

## Key Features

### 1. Real-time Messaging

The `messages.service.ts` implements real-time messaging using Supabase:

```typescript
async sendMessage(createMessageDto: CreateMessageDto) {
    const { chat_id, sender_id, content, media_url } = createMessageDto;

    try {
      const { data, error } = await this.supabase
        .from('messages')
        .insert([{ chat_id, sender_id, content, media_url }])
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Error al insertar el mensaje:', error.message);
      throw new Error(`Error al enviar el mensaje: ${error.message}`);
    }
}
```

### 2. User Authentication

The `auth.service.ts` handles secure user authentication:

```typescript
async signIn(email: string, password: string) {
    const { data, error } = await this.supabaseService.getClient().auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);
    return data;
}
```

### 3. Chat Creation

The `chats.service.ts` provides functionality for creating conversations:

```typescript
async createChat(createChatDto: CreateChatDto) {
    const { is_group, name } = createChatDto;

    const { data, error } = await this.supabase
      .from('chats')
      .insert([{ is_group, name }])
      .select()
      .single();

    if (error) throw error;
    return data;
}
```

### 4. File Upload System

The `uploads.service.ts` manages secure file uploads for messaging attachments:

```typescript
async uploadFile(file: Express.Multer.File, user_id: string, chat_id: string) {
    const supabase = this.supabaseService.getClient();

    const filePath = `uploads/${chat_id}/${Date.now()}-${file.originalname}`;

    const { data, error } = await supabase.storage.from('uploads').upload(filePath, file.buffer, {
      contentType: file.mimetype,
    });

    if (error) throw new Error(`Error al subir archivo: ${error.message}`);

    const file_url = `${process.env.SUPABASE_URL}/storage/v1/object/public/uploads/${filePath}`;
    const file_type = file.mimetype;

    return this.saveFile({ user_id, chat_id, file_url, file_type });
}
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
PORT=3000
```

## Support

FlowChat is an open-source project. If you'd like to support its development, consider contributing or donating.
