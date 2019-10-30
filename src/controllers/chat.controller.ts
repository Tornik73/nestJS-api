import { Controller, Get, Post, Body, Delete, Put, Param, UseGuards } from '@nestjs/common';
import { ChatMessageResponse, ChatMessageModel, GetChatMessagesModel } from '../models/chat/chat.model';
import { ChatService } from '../services/chat.service';

@Controller('chat')
export class ChatController {

    constructor(private chatService: ChatService) {}

    @Get('')
    public async getChatMessage(): Promise<GetChatMessagesModel> {
        const createdMessageResponse: GetChatMessagesModel = await this.chatService.findAll();
        return createdMessageResponse;
    }

    @Post('')
    public async sendChatMessage(@Body() chatMessage: ChatMessageModel): Promise<ChatMessageResponse> {
        const createdMessageResponse: ChatMessageResponse = await this.chatService.sendMessage(chatMessage);
        return createdMessageResponse;
    }
}
