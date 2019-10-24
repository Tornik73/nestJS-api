import { ChatMessageModel, ChatMessageResponse, Chat, SendedChatMessage } from '../models/';
import { Inject, Injectable } from '@nestjs/common';
import { CHAT_REPOSITORY } from '../constants/constants';

@Injectable()
export class ChatRepository {
    constructor(@Inject(CHAT_REPOSITORY) private readonly chatRepository: typeof Chat) {}

    async sendMessage(sendMessage: SendedChatMessage): Promise<ChatMessageResponse> {
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
}
