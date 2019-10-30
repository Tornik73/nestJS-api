import { Injectable } from '@nestjs/common';
import { ChatMessageResponse, ChatMessageModel, GetChatMessagesModel } from '../models';
import { ChatRepository } from '../repositories';

@Injectable()
export class ChatService {
    constructor(private chatRepository: ChatRepository) {}

    public async findAll(): Promise<GetChatMessagesModel> {
        return await this.chatRepository.getMessages();
    }

    // public async findOne(id: number): Promise<Books> {
    //     return await this.booksRepository.getOneById(id);
    // }

    public async sendMessage(chatMessage: ChatMessageModel): Promise<ChatMessageResponse> {
        return await this.chatRepository.sendMessage(chatMessage);
    }

    // public async updateBook(id: number, book: Books): Promise<BookModel> {
    //     return await this.booksRepository.updateBook(id, book);
    // }

    // public async deleteBook(id: number): Promise<object> {
    //     return await this.booksRepository.deleteBook(id);
    // }

}
