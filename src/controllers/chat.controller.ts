import { Controller, Get, Post, Body, Delete, Put, Param, UseGuards } from '@nestjs/common';
import { ChatMessageResponse, SendedChatMessage } from '../models/chat/chat.model';
import { ChatService } from '../services/chat.service';

@Controller('chat')
export class ChatController {

    constructor(private chatService: ChatService) {}

    @Post('')
    public async sendChatMessage(@Body() chatMessage: SendedChatMessage): Promise<ChatMessageResponse> {
        const createdMessageResponse: ChatMessageResponse = await this.chatService.sendMessage(chatMessage);
        return createdMessageResponse;
    }
}
