import { plainToInstance } from 'class-transformer';
import { validate, type ValidationError } from 'class-validator';
import { BadRequestError } from './api-error';

/**
 * Valida os dados de acordo com o DTO informado
 *
 * @param dtoClass
 * @param data
 * @returns Retorna os dados no padrão do DTO
 */
export const validateDto = async <T extends object>(
  dtoClass: new () => T,
  data: object,
): Promise<T> => {
  const dto = plainToInstance(dtoClass, data, {
    excludeExtraneousValues: true,
  });
  const errors = await validate(dto);

  // valida se existem erros
  if (!errors.length) return dto;

  // monta os erros e retorna a mensagem de erro completa
  const details = errors.map((error: ValidationError) =>
    Object.values(error.constraints || {}).join(', '),
  );
  throw new BadRequestError(
    `Preencha todos os campos corretamente: ${details.join('; ')}`,
  );
};
