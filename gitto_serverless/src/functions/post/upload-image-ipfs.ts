import * as ff from '@google-cloud/functions-framework';
import * as fs from 'fs';
import { PinataSDK } from 'pinata-web3'
import { API_PINATA_CLOUD_JWT, API_PINATA_GATEWAY_URL } from '../../config';

const pinata = new PinataSDK({
  pinataJwt: API_PINATA_CLOUD_JWT,
  pinataGateway: API_PINATA_GATEWAY_URL
});

const FILE_PATH = `${__dirname}/hello-world.txt`;

export const uploadImageToIpfs = async (req: ff.Request, res: ff.Response) => {
  try {
    console.log("llamando con el jwt", API_PINATA_CLOUD_JWT);
    await createFile();
  res.send("send!");
  } catch(e) {
    console.error(e);
  }
}


async function createFile() {
  try {
    const content = 'Contenido de ejemplo';
    fs.writeFile(FILE_PATH, content, async (err) => {
      if (err) {
        console.error('Error al crear el archivo:', err);
      } else {
        console.log('Archivo creado y contenido escrito con éxito.');
        await upload();
      }
    });

  } catch(error){
    console.log(error);
  }
}

async function upload() {
  try {
    const blob: any = new Blob([fs.readFileSync(FILE_PATH)]);
    const upload = await pinata.upload.file(blob);
    console.log(upload);
  } catch (error) {
    console.log(error);
  }
}