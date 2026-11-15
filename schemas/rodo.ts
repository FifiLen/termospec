import { z } from "zod/v4";

interface RodoEditorOptions {
  label: string;
  description?: string;
  input?: "textarea";
}

const rodoField = <T extends z.ZodType>(
  schema: T,
  options: RodoEditorOptions,
) => {
  const definition = schema.def as typeof schema.def & {
    $content?: { editor?: RodoEditorOptions };
  };

  definition.$content = {
    ...definition.$content,
    editor: {
      ...definition.$content?.editor,
      ...options,
    },
  };

  return schema;
};

export const rodoSchema = z.object({
  title: rodoField(z.string().trim().min(1, "Podaj nagłówek strony"), {
    label: "Nagłówek strony",
  }),
  intro: rodoField(z.string().trim().min(1, "Podaj wstęp"), {
    label: "Wstęp",
    description: "Akapit nad numerowaną listą.",
    input: "textarea",
  }),
  items: rodoField(z.array(z.string().trim().min(1, "Usuń pusty punkt")).min(1, "Dodaj co najmniej jeden punkt"), {
    label: "Punkty klauzuli",
    description: "Numerowana lista; numery 01, 02… nadawane są automatycznie.",
  }),
});

export type RodoData = z.output<typeof rodoSchema>;
