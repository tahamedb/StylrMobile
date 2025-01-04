const CLOUDINARY_URL = process.env.EXPO_PUBLIC_CLOUDINARY_URL;
const UPLOAD_PRESET = process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET;


if (!CLOUDINARY_URL || !UPLOAD_PRESET) {
  throw new Error('Cloudinary configuration is missing. Please check your environment variables.');
}

// Function to transform Cloudinary URLs for different use cases
export const getOptimizedImageUrl = (url: string, type: 'thumbnail' | 'full' = 'thumbnail') => {
  if (!url || !url.includes('cloudinary')) return url;

  // Extract base URL and file path
  const [baseUrl, version, transformations, folder, filename] = url.split('/').slice(-5);

  // Define transformation parameters based on usage
  const transformationParams = type === 'thumbnail' 
    ? 'w_200,h_200,c_fill,q_auto:good,f_auto' // Thumbnail view
    : 'w_800,q_auto:good,f_auto'; // Full view

  // Construct new URL with optimized parameters
  return `${baseUrl}/${version}/${transformationParams}/${folder}/${filename}`;
};

export const uploadImageToCloudinary = async (imageData: string, preset: string) => {
  try {
    const formData = new FormData();
    formData.append('file', imageData);
    formData.append('upload_preset', preset);
    
    // Add transformation parameters for compression and resizing
    formData.append('transformation', JSON.stringify({
      quality: 'auto:good',
      fetch_format: 'auto',
      width: 800,
      crop: 'limit'
    }));

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Failed to upload image to Cloudinary');
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};
