import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ArrayMinSize,
} from 'class-validator';
import { CulturasPlantadas } from '../enums/culturas.enum';

export class CreateProdutorDTO {
  @IsString({ message: 'cpf_cnpj deve ser uma string' })
  @IsNotEmpty({ message: 'cpf_cnpj é obrigatório' })
  cpf_cnpj: string;

  @IsString({ message: 'nome deve ser uma string' })
  @IsNotEmpty({ message: 'nome é obrigatório' })
  nome: string;

  @IsString({ message: 'cidade deve ser uma string' })
  @IsNotEmpty({ message: 'cidade é obrigatório' })
  cidade: string;

  @IsString({ message: 'sigla_uf deve ser uma string' })
  @IsNotEmpty({ message: 'sigla_uf é obrigatório' })
  sigla_uf: string;

  @IsString({ message: 'nome_fazenda deve ser uma string' })
  @IsNotEmpty({ message: 'nome_fazenda é obrigatório' })
  nome_fazenda: string;

  @IsNumber({}, { message: 'total_ha_fazenda deve ser um número' })
  @IsNotEmpty({ message: 'total_ha_fazenda é obrigatório' })
  total_ha_fazenda: number;

  @IsNumber({}, { message: 'total_agricultavel_ha_fazenda deve ser um número' })
  @IsNotEmpty({ message: 'total_agricultavel_ha_fazenda é obrigatório' })
  total_agricultavel_ha_fazenda: number;

  @IsNumber({}, { message: 'total_vegetacao_ha_fazenda deve ser um número' })
  @IsNotEmpty({ message: 'total_vegetacao_ha_fazenda é obrigatório' })
  total_vegetacao_ha_fazenda: number;

  @IsArray({ message: 'culturas_fazenda deve ser um array' })
  @ArrayMinSize(1, { message: 'culturas_fazenda não deve ser um array vazio' })
  @IsNotEmpty({ message: 'culturas_fazenda é obrigatório' })
  @IsEnum(CulturasPlantadas, {
    each: true,
    message: `culturas_fazenda opções aceitas: ${Object.values(CulturasPlantadas).join(', ')}`,
  })
  culturas_fazenda: CulturasPlantadas[];
}
