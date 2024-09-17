import * as ff from '@google-cloud/functions-framework';

import { uploadImageToIpfs } from './functions/post/upload-image-ipfs'

ff.http('TypescriptFunction', (req: ff.Request, res: ff.Response) => {
  res.send('OK');
});

ff.http('uploadImageToIpfs', uploadImageToIpfs);
