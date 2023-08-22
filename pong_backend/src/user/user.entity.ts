import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity()
export class User
{
    @PrimaryGeneratedColumn()
    id: number;

    // @Column()
    // nick: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    avatar: string;

    @Column({default: 0})
    loss: number;

    @Column({default: 0})
    win: number;

    @Column({ type: "smallint", default: 0})
    status: number;

    // @Column({ type: 'timestamptz', default: () => new Date()}) 
    // creation_date: Date;

    // @Column({ type: 'timestamptz', default: () => new Date() }) 
    // last_joined_date: Date;
}

