import {describe,it,expect} from 'vitest';
import {OCR_MAX_BYTES,mapGatewayErrorMessage,validateOcrPayload,hasValidImageHeader} from '../src/security';

describe('OCR security suite',()=>{
 const pngHeader=new Uint8Array([0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a]);
 it('accepts just-under byte cap with valid header',()=>{const b=new Uint8Array(OCR_MAX_BYTES);b.set(pngHeader);expect(validateOcrPayload(b).ok).toBe(true)});
 it('rejects just-over byte cap',()=>{const b=new Uint8Array(OCR_MAX_BYTES+1);b.set(pngHeader);expect(validateOcrPayload(b).ok).toBe(false)});
 it('rejects invalid image header',()=>{const b=new Uint8Array(64);expect(hasValidImageHeader(b)).toBe(false);expect(validateOcrPayload(b).ok).toBe(false)});
 it('rejects undersized header',()=>{expect(hasValidImageHeader(new Uint8Array([1,2,3]))).toBe(false)});
 const patterns=['413 payload too large','request entity too large','gateway timeout','502 bad gateway','503 service unavailable','504 timeout','invalid image header','unsupported image mime'];
 it.each(patterns)('maps %s to generic message',p=>expect(mapGatewayErrorMessage(p)).toBe('We could not read this prescription. Please rescan a clearer image or enter the medicines manually.'));
});
