import { ChatMessageModel, ChatMessageResponse, Chat, GetChatMessagesModel } from '../models/';
import { Inject, Injectable } from '@nestjs/common';
import { CHAT_REPOSITORY } from '../constants/constants';

@Injectable()
export class ChatRepository {
    constructor(@Inject(CHAT_REPOSITORY) private readonly chatRepository: typeof Chat) {}

    async sendMessage(sendMessage: ChatMessageModel): Promise<ChatMessageResponse> {
        try {
            const chatMessageResponse: ChatMessageModel = await this.chatRepository.create(sendMessage);
            if (!chatMessageResponse) {
                return {
                    uuid: null,
                    success: false,
                    message: 'message can`t be added',
                    statusCode: 500,
                };
            }
            chatMessageResponse.isReceived = true;
            await this.updateMessage(chatMessageResponse);
            return {
                success: true,
                message: 'message have added',
                uuid: chatMessageResponse.uuid,
                messageId: chatMessageResponse.id,
                statusCode: 200,
            };
        } catch (err) {
            return {
                uuid: null,
                success: false,
                message: err.toString(),
                statusCode: err.toString(),
            };
        }
    }

    async getMessages(): Promise<GetChatMessagesModel> {
        try {
            const chatMessageResponse: ChatMessageModel[] = await this.chatRepository.findAll();
            if (!chatMessageResponse) {
                return {
                    success: false,
                    data: [],
                    message: 'no chat found',
                    statusCode: 404,
                };
            }
            return {
                success: true,
                message: 'chat found',
                data: chatMessageResponse,
                statusCode: 200,
            };
        } catch (err) {
            return {
                data: [],
                success: false,
                message: err.toString(),
                statusCode: err.toString(),
            };
        }
    }

    async updateMessage(sendMessage: ChatMessageModel): Promise<ChatMessageResponse> {
        try {
            const chatUpdateMessageResponse: ChatMessageModel = await this.chatRepository.update(
                {
                    messageText: sendMessage.messageText,
                    isRead: sendMessage.isRead,
                    isReceived: sendMessage.isReceived,
                },
                {
                where: {
                    id: sendMessage.id,
                },
            });
            if (!chatUpdateMessageResponse) {
                return {
                    uuid: null,
                    success: false,
                    message: 'message can`t be update',
                    statusCode: 500,
                };
            }

            return {
                success: true,
                message: 'message have updated',
                uuid: chatUpdateMessageResponse.uuid,
                messageId: chatUpdateMessageResponse.id,
                statusCode: 200,
            };

        } catch (err) {
            return {
                uuid: null,
                success: false,
                message: err.toString(),
                statusCode: err.toString(),
            };
        }
    }
}
