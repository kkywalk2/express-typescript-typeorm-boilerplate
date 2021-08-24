import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { IsAlphanumeric, MinLength, MaxLength } from "class-validator"

@Entity()
export default class Account extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ unique: true })
    @MinLength(8, {
        // here, $constraint1 will be replaced with "10", and $value with actual supplied value
        message: 'Title is too short. Minimal length is $constraint1 characters, but actual is $value',
    })
    @MaxLength(30, {
        // here, $constraint1 will be replaced with "50", and $value with actual supplied value
        message: 'Title is too long. Maximal length is $constraint1 characters, but actual is $value',
    })
    @IsAlphanumeric()
    name!: string

    @Column()
    password!: string

    @Column()
    email!: string

    @Column({ default: -1 })
    teamUID!: number

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updateAt!: Date
}