import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Climate } from "./climate.entity";

@Entity({ name: "city" })
export class City {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", unique: true })
    name: string

    @Column({ type: "varchar"})
    region: string

    @Column({ type: "varchar"})
    country: string
  
    @Column({ type: "double precision" })
    lat: number

    @Column({ type: "double precision"})
    lon: number
  
    @Column({ type: "varchar" })
    tz_id: string

    @OneToMany(() => Climate, (climate) => climate.city)
    climate: Climate[];
}