export interface ChatMessageModel {
    id: number | null;
    uuid: string | null;
    username: string;
    messageText: string;
    time: string;
    isRead: boolean;
    isReceived: boolean;
    date: string;
}

export interface ChatMessageResponse {
    messageId?: number;
    uuid: string;
    success: boolean;
    message: string;
    statusCode: number;
}

export interface GetChatMessagesModel {
    success: boolean;
    data: ChatMessageModel[];
    message: string;
    statusCode: number;
}
