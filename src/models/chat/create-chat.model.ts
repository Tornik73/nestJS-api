import { Column,
    Model,
    Table,
    AutoIncrement,
    PrimaryKey } from 'sequelize-typescript';

@Table
export class Chat extends Model<Chat> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column
    uuid: string;

    @Column
    name: string;

    @Column
    messageText: string;

    @Column
    time: string;

    @Column
    isRead: boolean;

    @Column
    isReceived: boolean;

    @Column
    date: string;

}
