/** A separate, strictly bounded plugin operation; never forward an arbitrary session config. */
export function parseSessionModelChange(args: readonly unknown[]): {
  id: string;
  providerId: string;
  modelId: string;
} {
  const invalid = () => Object.assign(new Error("session model change requires id, providerId and modelId only"), {
    code: "INVALID_PARAMS",
  });
  if (args.length !== 2 || typeof args[0] !== "string" || !args[0].trim()) throw invalid();
  const selection = args[1];
  if (!selection || typeof selection !== "object" || Array.isArray(selection)) throw invalid();
  const fields = Object.keys(selection);
  if (fields.length !== 2 || !fields.includes("providerId") || !fields.includes("modelId")) throw invalid();
  const { providerId, modelId } = selection as Record<string, unknown>;
  if (typeof providerId !== "string" || !providerId.trim() ||
      typeof modelId !== "string" || !modelId.trim()) throw invalid();
  return { id: args[0], providerId, modelId };
}
