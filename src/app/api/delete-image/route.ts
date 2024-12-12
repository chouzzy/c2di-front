// app/api/delete-image/route.js
import AWS from 'aws-sdk';
import { NextResponse } from 'next/server';

const s3 = new AWS.S3({
  accessKeyId: process.env.SPACES_ACCESS_KEY,
  secretAccessKey: process.env.SPACES_SECRET_KEY,
  endpoint: new AWS.Endpoint('https://nyc3.digitaloceanspaces.com'),
});

export async function POST(request:any) {
  try {
    const { imageUrl } = await request.json();

    const params = {
      Bucket: 'c2di-space',
      Key: imageUrl.replace('https://c2di-space.nyc3.digitaloceanspaces.com/', ''), 
    };

    await s3.deleteObject(params).promise();

    console.log('Imagem excluída com sucesso:', imageUrl);
    return NextResponse.json({ message: 'Imagem excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir imagem:', error);
    return NextResponse.json({ error: 'Erro ao excluir imagem' }, { status: 500 });
  }
}