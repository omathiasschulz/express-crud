import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CulturasPlantadas } from '../enums/culturas.enum';
import { Expose } from 'class-transformer';

export class UpdateProdutorDTO {
  @Expose()
  @IsString({ message: 'nome deve ser uma string' })
  @IsOptional()
  nome?: string;

  @Expose()
  @IsString({ message: 'cidade deve ser uma string' })
  @IsOptional()
  cidade?: string;

  @Expose()
  @IsString({ message: 'sigla_uf deve ser uma string' })
  @IsOptional()
  sigla_uf?: string;

  @Expose()
  @IsString({ message: 'nome_fazenda deve ser uma string' })
  @IsOptional()
  nome_fazenda?: string;

  @Expose()
  @IsNumber({}, { message: 'total_ha_fazenda deve ser um número' })
  @IsOptional()
  total_ha_fazenda?: number;

  @Expose()
  @IsNumber({}, { message: 'total_agricultavel_ha_fazenda deve ser um número' })
  @IsOptional()
  total_agricultavel_ha_fazenda?: number;

  @Expose()
  @IsNumber({}, { message: 'total_vegetacao_ha_fazenda deve ser um número' })
  @IsOptional()
  total_vegetacao_ha_fazenda?: number;

  @Expose()
  @IsArray({ message: 'culturas_fazenda deve ser um array' })
  @ArrayMinSize(1, { message: 'culturas_fazenda não deve ser um array vazio' })
  @IsOptional()
  @IsEnum(CulturasPlantadas, {
    each: true,
    message: `culturas_fazenda opções aceitas: ${Object.values(CulturasPlantadas).join(', ')}`,
  })
  culturas_fazenda?: CulturasPlantadas[];
}
