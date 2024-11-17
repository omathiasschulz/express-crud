import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CulturasPlantadas } from '../enums/culturas.enum';

export class UpdateProdutorDTO {
  @IsString({ message: 'nome deve ser uma string' })
  @IsOptional()
  nome?: string;

  @IsString({ message: 'cidade deve ser uma string' })
  @IsOptional()
  cidade?: string;

  @IsString({ message: 'sigla_uf deve ser uma string' })
  @IsOptional()
  sigla_uf?: string;

  @IsString({ message: 'nome_fazenda deve ser uma string' })
  @IsOptional()
  nome_fazenda?: string;

  @IsNumber({}, { message: 'total_ha_fazenda deve ser um número' })
  @IsOptional()
  total_ha_fazenda?: number;

  @IsNumber({}, { message: 'total_agricultavel_ha_fazenda deve ser um número' })
  @IsOptional()
  total_agricultavel_ha_fazenda?: number;

  @IsNumber({}, { message: 'total_vegetacao_ha_fazenda deve ser um número' })
  @IsOptional()
  total_vegetacao_ha_fazenda?: number;

  @IsArray({ message: 'culturas_fazenda deve ser um array' })
  @ArrayMinSize(1, { message: 'culturas_fazenda não deve ser um array vazio' })
  @IsOptional()
  @IsEnum(CulturasPlantadas, {
    each: true,
    message: `culturas_fazenda opções aceitas: ${Object.values(CulturasPlantadas).join(', ')}`,
  })
  culturas_fazenda?: CulturasPlantadas[];
}
