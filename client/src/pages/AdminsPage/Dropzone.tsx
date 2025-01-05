import { Loader } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

type CloudResp = {
  secure_url: string;
  public_id: string;
};

type UploadResp = {
  success: boolean;
  data?: CloudResp;
  error?: string;
};

interface DropZoneProp {
  imgs: string[];
  setImgs: React.Dispatch<React.SetStateAction<string[]>>; // Type for the setImgs function
}

export function MyDropzone({ imgs, setImgs }: DropZoneProp) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file: File): Promise<UploadResp> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default');
    formData.append('cloud_name', 'dev67qiod');

    try {
      const resp = await fetch(
        'https://api.cloudinary.com/v1_1/dev67qiod/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!resp.ok) {
        throw new Error('Error uploading image to Cloudinary');
      }

      const data: CloudResp = await resp.json();
      return { success: true, data }; // Return success and the Cloudinary response data
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: errorMessage }; // Return failure and the error message
    }
  };

  const handleUploadResponse = (uploadResp: UploadResp): string | null => {
    if (uploadResp.success) {
      return uploadResp.data?.secure_url ?? null;
    } else {
      console.error('Upload failed:', uploadResp.error);
      return null;
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true);
    const resp = await handleUpload(acceptedFiles[0]);
    const imageUrl = handleUploadResponse(resp);
    if (imageUrl) {
      setImgs((prev) => [...prev, imageUrl]);
    }
    setUploading(false);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div
        {...getRootProps()}
        className="border-red-600 border-2 border-dotted  p-20 flex items-center justify-center"
      >
        {uploading ? (
          <Loader className="w-6 h-6 animate-spin" />
        ) : (
          <>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </>
        )}
      </div>
      <div className="flex flex-wrap gap-6">
        {imgs.map((src) => (
          <img src={src} className="w-40 h-40 rounded-[5px] object-fill" />
        ))}
      </div>
    </>
  );
}


