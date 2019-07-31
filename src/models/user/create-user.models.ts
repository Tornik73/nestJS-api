import { Column, Model, Table, AutoIncrement, PrimaryKey } from 'sequelize-typescript';

@Table
export class Users extends Model<Users> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column
    email: string;

    @Column
    password: string;

    @Column
    isAdmin: boolean;

    @Column
    telephone: string;

    @Column
    age: number;

    @Column
    img: string;
}
