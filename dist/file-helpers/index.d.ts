export declare function base64ToBlob(base64encodedString: string, myme: string): Blob;
export declare function blobToBase64(blob: Blob, cb: {
    (base64String: string): void;
}): void;
export declare function download(fileName: string, blob: Blob): void;
