import { Column, Model, Table, AutoIncrement, PrimaryKey, BelongsTo, ForeignKey, BelongsToMany, HasMany } from 'sequelize-typescript';
import { Books, AuthorsBooks } from '../index';
// import { AuthorsBooks } from '../authorsBooks/create-authorsBooks';

@Table
export class Authors extends Model<Authors> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column
    name: string;

    @Column
    country: string;

    @Column
    birthday: Date;

    @Column
    deathday: Date;

    @Column
    authorImg: string;

    @HasMany(() => AuthorsBooks)
    authorBooks: AuthorsBooks[];

}
