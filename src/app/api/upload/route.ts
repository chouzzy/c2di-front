// app/api/upload/route.js
import AWS from 'aws-sdk';
import { NextResponse } from 'next/server';

const s3 = new AWS.S3({
  accessKeyId: process.env.SPACES_ACCESS_KEY,
  secretAccessKey: process.env.SPACES_SECRET_KEY,
  endpoint: new AWS.Endpoint('https://nyc3.digitaloceanspaces.com'), // Corrigido
});

export async function POST(request: any) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('file'); // Obtem todos os arquivos

    let projectId = formData.get('projectId'); // Extrai o ID do projeto

    if (files.length === 0) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 });
    }

    const imageUrls = [];

    for (const file of files) {
      const fileName = `${Date.now()}-${file.name}`;
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const params = {
        Bucket: 'c2di-space',
        Key: `${projectId}/${fileName}`,
        Body: buffer,
        ACL: 'public-read',
      };

      const data = await s3.upload(params).promise();
      if (data.Location.startsWith('nyc3.digitaloceanspaces.com')) {
        data.Location = data.Location.replace('nyc3.digitaloceanspaces.com', 'https://c2di-space.nyc3.digitaloceanspaces.com');
      }
      console.log('Imagem enviada com sucesso:', data.Location);
      imageUrls.push(data.Location); // Adiciona a URL ao array de URLs
    }

    return NextResponse.json({ imageUrls }); // Retorna o array de URLs
  } catch (error) {
    console.error('Erro ao enviar imagem:', error);
    return NextResponse.json({ error: 'Erro ao enviar a imagem' }, { status: 500 });
  }
}