
    //http://wiki.lenux.org/base64-string-to-blob-object/
    export function base64ToBlob(base64encodedString: string,myme:string): Blob {

        // decode base64 string, remove space for IE compatibility
        var binary = atob(base64encodedString.replace(/\s/g, ''));

        // get binary length
        var len = binary.length;

        // create ArrayBuffer with binary length
        var buffer = new ArrayBuffer(len);

        // create 8-bit Array
        var view = new Uint8Array(buffer);

        // save unicode of binary data into 8-bit Array
        for (var i = 0; i < len; i++) {
            view[i] = binary.charCodeAt(i);
        }

        // create the blob object with content-type "application/pdf"               
        return new Blob([view],{type:myme});

    }

    export function blobToBase64(blob:Blob,cb:{(base64String:string):void}){
        var reader = new FileReader();
        
        reader.onloadend = ()=>{
            cb((reader.result as string).split(',')[1]);                
          
        }
        reader.readAsDataURL(blob); 
    }
    export function toDatauri(mimeType:string,base64String:string){
        return 'data:'+mimeType+';base64,' + encodeURIComponent(base64String);
    }

   export function download(fileName:string, blob:Blob) {

        blobToBase64(blob,base64String=>{
    
            var element = document.createElement('a');
            element.setAttribute('href', toDatauri(blob.type,base64String));
            
            element.setAttribute('download', fileName);
        
            element.style.display = 'none';
            document.body.appendChild(element);
        
            element.click();
        
            document.body.removeChild(element);
        });
    }
