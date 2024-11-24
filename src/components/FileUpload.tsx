import { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { useStorage } from '../hooks/useStorage';

interface FileUploadProps {
  onFileUpload: (urls: string[]) => void;
}

export default function FileUpload({ onFileUpload }: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const { uploadFile, progress } = useStorage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    setUploading(true);

    try {
      const uploadPromises = files.map((file) => {
        const path = `project-files/${Date.now()}_${file.name}`;
        return uploadFile(file, path);
      });

      const urls = await Promise.all(uploadPromises);
      onFileUpload(urls);
      setFiles([]);
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setUploading(false);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-brand-gold/20 rounded-lg p-8 text-center cursor-pointer hover:border-brand-gold/40 transition-colors"
      >
        <Upload className="mx-auto text-brand-gold mb-2" size={24} />
        <p className="text-sm text-gray-300">
          Drag and drop your files here, or click to select files
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-brand-primary/30 p-2 rounded-lg"
            >
              <span className="text-sm truncate">{file.name}</span>
              <button
                onClick={() => removeFile(index)}
                className="text-red-400 hover:text-red-300"
              >
                <X size={18} />
              </button>
            </div>
          ))}

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full bg-brand-gold text-brand-primary font-semibold py-2 px-4 rounded-lg hover:bg-brand-gold/90 transition-colors disabled:opacity-50"
          >
            {uploading ? `Uploading... ${Math.round(progress)}%` : 'Upload Files'}
          </button>
        </div>
      )}
    </div>
  );
}