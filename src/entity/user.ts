import {BaseEntity, Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    uid! : number;

    @Column()
    accountName!: number;

    @Column()
    passWord!: string;

    static findByInfo(accountName: string, passWord: string) {
        return this.createQueryBuilder("user")
            .where("user.accountName = :accountName", { accountName })
            .andWhere("user.passWord = :passWord", { passWord })
            .getMany();
    }
}