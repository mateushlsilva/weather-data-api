import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { City } from "./city.entity";

@Entity({ name: "climate" })
export class Climate {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp with time zone' })
    last_updated: Date;

    @Column({ type: 'decimal', precision: 5, scale: 2 })
    temp_c: number;

    @Column({ type: 'decimal', precision: 5, scale: 2 })
    feelslike_c: number;

    @Column({ type: 'varchar', length: 100 })
    condition_text: string;

    @Column({ type: 'int' })
    condition_code: number;

    @Column({ type: 'int' })
    humidity: number;

    @Column({ type: 'decimal', precision: 6, scale: 2 })
    pressure_mb: number;

    @Column({ type: 'decimal', precision: 6, scale: 2 })
    precip_mm: number;

    @Column({ type: 'decimal', precision: 5, scale: 2 })
    wind_kph: number;

    @Column({ type: 'int' })
    wind_degree: number;

    @Column({ type: 'int' })
    cloud: number;

    @Column({ type: 'decimal', precision: 4, scale: 2 })
    uv: number;

    @ManyToOne(() => City, (city) => city.climate, { eager: true })
    city: City; 

}