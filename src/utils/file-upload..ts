import cloudinary from 'cloudinary';
const Cloudinary = cloudinary.v2;

export const fileUpload = async (buffer: Buffer, folderName: string) => {
  return await new Promise((resolve, reject) => {
    return Cloudinary.uploader
      .upload_stream({ folder: `${folderName}` }, (err, res) => {
        if (err) {
          reject(err.message);
        }
        resolve(res?.secure_url);
      })
      .end(buffer);
  });
};
