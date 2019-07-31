import { Column,
    Model,
    Table,
    AutoIncrement,
    PrimaryKey, BelongsToMany, HasMany } from 'sequelize-typescript';

import { AuthorsBooks } from '../authorBook/create-authorsBooks';

@Table
export class Books extends Model<Books> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column
    title: string;

    @Column
    price: number;

    @Column
    img: string;

    @Column
    description: string;

    @HasMany(() => AuthorsBooks)
    authorBooks: AuthorsBooks[];

}
