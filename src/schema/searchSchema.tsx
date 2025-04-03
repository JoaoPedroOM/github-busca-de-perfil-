import { z } from "zod";

export const buscaSchema = z.object({
  usuario: z.string().min(1, { message: "Digite um usuário do Github" }),
});

export type BuscaFormValue = z.infer<typeof buscaSchema>;
