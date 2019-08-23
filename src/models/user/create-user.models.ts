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
    name: string;

    @Column
    username: string;

    @Column
    lastname: string;

    @Column
    password: string;

    @Column
    telephone: string;

    @Column
    age: number;

    @Column
    country: string;

    @Column
    gender: string;

    @Column
    img: string;

    @Column
    userVerify: string;

    @Column
    isAdmin: boolean;

    @Column
    isActive: boolean;
}
