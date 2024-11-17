import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CulturasPlantadas } from '../enums/culturas.enum';

export class UpdateProdutorDTO {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  cidade?: string;

  @IsString()
  @IsOptional()
  sigla_uf?: string;

  @IsString()
  @IsOptional()
  nome_fazenda?: string;

  @IsNumber()
  @IsOptional()
  total_ha_fazenda?: number;

  @IsNumber()
  @IsOptional()
  total_agricultavel_ha_fazenda?: number;

  @IsNumber()
  @IsOptional()
  total_vegetacao_ha_fazenda?: number;

  @IsArray()
  @IsOptional()
  @IsEnum(CulturasPlantadas, { each: true })
  culturas_fazenda?: CulturasPlantadas[];
}
