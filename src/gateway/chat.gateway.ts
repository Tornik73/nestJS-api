import {
    WebSocketGateway,
    SubscribeMessage,
    WsResponse,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    MessageBody,
  } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetChatMessagesModel, ChatMessageModel, ChatMessageResponse } from 'src/models';
import { ChatService } from '../services/chat.service';
import { response } from 'express';

let i = 0;

//this makes sure we have unique task IDs when starting an stopping rhe server
let baseTaskID = Math.round((Date.now() - 1511098000000)/1000);

console.log('Server started');
setInterval(() => i++, 2000);

@WebSocketGateway(8082)
export class ChatGateway{
    constructor(private chatService: ChatService) {}

    @WebSocketServer()
    server: Server;
    private logger: Logger = new Logger('ChatGateway');

    afterInit(server: any) {
        this.logger.log('Initialized!');
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client connected:    ${client.id}`);
        setInterval(() => {
            client.emit("newTask", {
                taskName: `Task ${baseTaskID + i}`,
                taskID: baseTaskID + i
            })
            }, 2000
        )

    }

    @SubscribeMessage('getMessages')
    public async handleGetMessages(client: Socket): Promise<void> {
        this.logger.log(`GET MESSAGES`);
        const messages: GetChatMessagesModel =  await this.chatService.findAll().then(response => response);
        client.emit('msgToClient', messages);
        // return { event: 'msgToClient', data: mes };
    }

    @SubscribeMessage('msgToServer')
    async handleMessage(client: Socket, body: ChatMessageModel): Promise<any> {
        this.logger.log(`POST MESSAGE`);
        const response: ChatMessageResponse = await this.chatService.sendMessage(body).then(response =>  response);
        if(response.success) {
            const messages: GetChatMessagesModel =  await this.chatService.findAll().then(response => response);
            body.id = response.messageId;
            client.emit('postResponseToClient', body );
            client.emit('msgToClient', messages );
            console.log(messages);
        }
    }

}
