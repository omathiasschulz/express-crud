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
  @IsString()
  @IsNotEmpty()
  cpf_cnpj: string;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  cidade: string;

  @IsString()
  @IsNotEmpty()
  sigla_uf: string;

  @IsString()
  @IsNotEmpty()
  nome_fazenda: string;

  @IsNumber()
  @IsNotEmpty()
  total_ha_fazenda: number;

  @IsNumber()
  @IsNotEmpty()
  total_agricultavel_ha_fazenda: number;

  @IsNumber()
  @IsNotEmpty()
  total_vegetacao_ha_fazenda: number;

  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty()
  @IsEnum(CulturasPlantadas, { each: true })
  culturas_fazenda: CulturasPlantadas[];
}
