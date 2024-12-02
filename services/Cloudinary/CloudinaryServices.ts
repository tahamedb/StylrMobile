const CLOUDINARY_URL = ""
const UPLOAD_PRESET = '';

export const uploadImageToCloudinary = async (imageBase64: string): Promise<string> => {
  try {
    const timestamp = new Date().getTime();
    
    const data = {
      file: `data:image/jpeg;base64,${imageBase64}`,
      upload_preset: UPLOAD_PRESET,
      folder: "wewear_uploads",  // Add images to a folder
      filename_override: `image_${timestamp}`  // Set a simple filename
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