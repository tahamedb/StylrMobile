const CLOUDINARY_URL = process.env.EXPO_PUBLIC_CLOUDINARY_URL;
const UPLOAD_PRESET = process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

//TODO:  Il doit etre dynamique selon User Connecter(val statique 1: Juste pour tester endpoint.) 
const USER_ID = 1;

if (!CLOUDINARY_URL || !UPLOAD_PRESET) {
  throw new Error('Cloudinary configuration is missing. Please check your environment variables.');
}

export const uploadImageToCloudinary = async (imageBase64: string, preset?: string): Promise<string> => {
  try {
    console.log('Uploading image to Cloudinary:');
    const timestamp = new Date().getTime();
    
    const data = {
      file: `${imageBase64}`,
      upload_preset: preset || UPLOAD_PRESET,
      folder: "wewear_uploads",
      filename_override: `image_${timestamp}`
    };

    const response = await fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Cloudinary error:', errorData);
      throw new Error(`Upload failed with status ${response.status}`);
    }

    const result = await response.json();
    console.log('Upload successful:', result);

    return result.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};
