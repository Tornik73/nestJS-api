import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()

export class Books {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string = null;

    @Column()
    author: string;

    @Column()
    price: number;

    @Column('text')
    img: string = null;

    @Column('text')
    description: string;
}
