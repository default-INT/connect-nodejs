import { getProgramFromFiles, generateSchema } from 'typescript-json-schema';
import { glob } from 'glob';

const compilerOptions = {
  strictNullChecks: true,
  skipLibCheck: true,
};

// TODO: Think about static generate destinations
export const genSwaggerSchemas = async () => {
  const files = await glob('./src/**/dto/**/*.ts', { ignore: 'node_modules/**' });
  const program = getProgramFromFiles(files, compilerOptions, './');

  const schemas = generateSchema(program, '*', {
    required: true,
    ref: false,
  });

  if (!schemas) return null;

  return schemas.definitions;
};
