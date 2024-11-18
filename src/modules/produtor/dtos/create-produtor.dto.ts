import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ArrayMinSize,
  Length,
} from 'class-validator';
import { CulturasPlantadas } from '../enums/culturas.enum';
import { Expose, Transform } from 'class-transformer';

export class CreateProdutorDTO {
  @Expose()
  @IsString({ message: 'cpf_cnpj deve ser uma string' })
  @IsNotEmpty({ message: 'cpf_cnpj é obrigatório' })
  @Transform(({ value }) => value.replace(/[\/\.\-]/g, '')) // Remove '.', '-', '/'
  cpf_cnpj: string;

  @Expose()
  @IsString({ message: 'nome deve ser uma string' })
  @IsNotEmpty({ message: 'nome é obrigatório' })
  nome: string;

  @Expose()
  @IsString({ message: 'cidade deve ser uma string' })
  @IsNotEmpty({ message: 'cidade é obrigatório' })
  cidade: string;

  @Expose()
  @IsString({ message: 'sigla_uf deve ser uma string' })
  @IsNotEmpty({ message: 'sigla_uf é obrigatório' })
  @Length(2, 2, { message: 'sigla_uf deve possuir 2 caracteres' })
  sigla_uf: string;

  @Expose()
  @IsString({ message: 'nome_fazenda deve ser uma string' })
  @IsNotEmpty({ message: 'nome_fazenda é obrigatório' })
  nome_fazenda: string;

  @Expose()
  @IsNumber({}, { message: 'total_ha_fazenda deve ser um número' })
  @IsNotEmpty({ message: 'total_ha_fazenda é obrigatório' })
  total_ha_fazenda: number;

  @Expose()
  @IsNumber({}, { message: 'total_agricultavel_ha_fazenda deve ser um número' })
  @IsNotEmpty({ message: 'total_agricultavel_ha_fazenda é obrigatório' })
  total_agricultavel_ha_fazenda: number;

  @Expose()
  @IsNumber({}, { message: 'total_vegetacao_ha_fazenda deve ser um número' })
  @IsNotEmpty({ message: 'total_vegetacao_ha_fazenda é obrigatório' })
  total_vegetacao_ha_fazenda: number;

  @Expose()
  @IsArray({ message: 'culturas_fazenda deve ser um array' })
  @ArrayMinSize(1, { message: 'culturas_fazenda não deve ser um array vazio' })
  @IsNotEmpty({ message: 'culturas_fazenda é obrigatório' })
  @IsEnum(CulturasPlantadas, {
    each: true,
    message: `culturas_fazenda opções aceitas: ${Object.values(CulturasPlantadas).join(', ')}`,
  })
  culturas_fazenda: string[];
}
