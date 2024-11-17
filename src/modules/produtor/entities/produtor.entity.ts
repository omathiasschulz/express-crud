import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CulturasPlantadas } from '../enums/culturas.enum';
import { DecimalColumnTransformer } from '../../../core/decimal-entity';

@Entity({ name: 'produtor' })
export class Produtor {
  @PrimaryGeneratedColumn()
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

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new DecimalColumnTransformer(),
  })
  total_ha_fazenda: number;

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new DecimalColumnTransformer(),
  })
  total_agricultavel_ha_fazenda: number;

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new DecimalColumnTransformer(),
  })
  total_vegetacao_ha_fazenda: number;

  @Column({
    nullable: false,
    type: 'enum',
    enum: CulturasPlantadas,
    array: true,
  })
  culturas_fazenda: CulturasPlantadas[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  deleted: boolean;
}
