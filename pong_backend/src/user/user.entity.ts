import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable} from "typeorm";


@Entity()
export class User
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nick: string;

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

    @Column({ type: 'timestamptz' }) 
    creation_date: Date;

    @Column({ type: 'timestamptz' }) 
    last_joined_date: Date;
}

