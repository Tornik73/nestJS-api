import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()

export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    isAdmin: number;

    @Column()
    telephone: string;

    @Column()
    age: number;

    @Column()
    img: string = null;
}
