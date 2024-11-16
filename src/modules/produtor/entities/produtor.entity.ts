import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CulturasPlantadas } from '../enums/culturas.enum';

@Entity({ name: 'produtor' })
export class Produtor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  cpf_cnpj: string;

  @Column({ nullable: false })
  nome: string;

  @Column({ nullable: false })
  cidade: string;

  @Column({ nullable: false })
  sigla_uf: string;

  @Column({ nullable: false })
  nome_fazenda: string;

  @Column({ nullable: false })
  total_ha_fazenda: number;

  @Column({ nullable: false })
  total_agricultavel_ha_fazenda: number;

  @Column({ nullable: false })
  total_vegetacao_ha_fazenda: number;

  @Column({
    nullable: false,
    type: 'enum',
    enum: CulturasPlantadas,
  })
  culturas_fazenda: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  deleted: boolean;
}