import ollama from "ollama";
const num_ctx = 2048 * 4;
const chunkSize = Math.floor(num_ctx * 0.75);
export async function askLLM(llm_request: string): Promise<string> {
  const response = await ollama.chat({
    model: "mannix/llama3.1-8b-abliterated",
    messages: [{
      role: "system",
      content: `num_ctx: ${num_ctx}`
    },
    // Задаем контекстное окно
    {
      role: "user",
      content: llm_request
    }],
    options: {
      num_ctx: num_ctx
    } // Альтернативный способ задавать параметры
  });

  // console.log(response.message.content);
  return response.message.content;
}