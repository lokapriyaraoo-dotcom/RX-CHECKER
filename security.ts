export const OCR_MAX_BYTES = 5 * 1024 * 1024;
export const GENERIC_GATEWAY_ERROR = 'We could not read this prescription. Please rescan a clearer image or enter the medicines manually.';

export function mapGatewayErrorMessage(error: unknown): string {
  const raw = String(error ?? '').toLowerCase();
  if (!raw) return GENERIC_GATEWAY_ERROR;
  if (raw.includes('413') || raw.includes('payload') || raw.includes('too large') || raw.includes('size limit') || raw.includes('entity too large')) return GENERIC_GATEWAY_ERROR;
  if (raw.includes('timeout') || raw.includes('timed out') || raw.includes('gateway') || raw.includes('502') || raw.includes('503') || raw.includes('504')) return GENERIC_GATEWAY_ERROR;
  if (raw.includes('invalid image') || raw.includes('unsupported image') || raw.includes('mime') || raw.includes('header')) return GENERIC_GATEWAY_ERROR;
  return GENERIC_GATEWAY_ERROR;
}

export function hasValidImageHeader(bytes: Uint8Array): boolean {
  if (bytes.length < 8) return false;
  const png = bytes[0]===0x89 && bytes[1]===0x50 && bytes[2]===0x4e && bytes[3]===0x47 && bytes[4]===0x0d && bytes[5]===0x0a && bytes[6]===0x1a && bytes[7]===0x0a;
  const jpg = bytes[0]===0xff && bytes[1]===0xd8 && bytes[2]===0xff;
  const webp = bytes[0]===0x52 && bytes[1]===0x49 && bytes[2]===0x46 && bytes[3]===0x46 && bytes[8]===0x57 && bytes[9]===0x45 && bytes[10]===0x42 && bytes[11]===0x50;
  return png || jpg || webp;
}

export function validateOcrPayload(bytes: Uint8Array): {ok:true}|{ok:false;message:string} {
  if (bytes.byteLength > OCR_MAX_BYTES) return {ok:false,message:GENERIC_GATEWAY_ERROR};
  if (!hasValidImageHeader(bytes)) return {ok:false,message:GENERIC_GATEWAY_ERROR};
  return {ok:true};
}
