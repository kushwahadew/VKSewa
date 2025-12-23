"use client";

import React, { useState, useRef } from 'react';
import { Upload, X, ImageIcon, Loader2 } from 'lucide-react';
import { optimizeImage } from '@/lib/image-optimization';

interface ImageUploadProps {
    onUploadComplete: (url: string) => void;
    initialValue?: string;
    title?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUploadComplete, initialValue, title }) => {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [preview, setPreview] = useState<string | null>(initialValue || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Check file type
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file.');
            return;
        }

        uploadFile(file);
    };

    const uploadFile = async (file: File) => {
        console.log('Local Upload started for file:', file.name);
        setUploading(true);
        setProgress(0);

        try {
            console.log('Starting optimization...');
            const optimizedBlob = await optimizeImage(file, {
                maxWidth: 1200,
                quality: 0.8,
                format: 'image/webp'
            });
            console.log('Optimization complete.');

            const formData = new FormData();

            // Generate customized filename
            const baseName = title ? `${title}-image` : file.name.split('.')[0];
            const cleanName = baseName.trim().replaceAll(' ', '-').replaceAll(/[^\w-]/g, '');
            const finalFilename = `${cleanName}.webp`;

            formData.append('file', optimizedBlob, finalFilename);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Upload failed');

            const data = await response.json();
            console.log('Upload successful! URL:', data.url);

            setPreview(data.url);
            setUploading(false);
            onUploadComplete(data.url);
            setProgress(100);

        } catch (err) {
            console.error('Process failed:', err);
            alert('Upload failed. Please try again.');
            setUploading(false);
        }
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        setPreview(null);
        onUploadComplete('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="space-y-4">
            <div
                onClick={() => !uploading && fileInputRef.current?.click()}
                className={`relative h-40 w-full border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden
          ${uploading ? 'border-primary/50 bg-primary/5' : 'border-card hover:border-primary/50 hover:bg-card/50'}
          ${preview ? 'border-none' : ''}`}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                />

                {preview ? (
                    <>
                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                            <p className="text-white font-medium flex items-center gap-2">
                                <Upload size={18} /> Change Image
                            </p>
                        </div>
                        <button
                            onClick={handleClear}
                            className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-full hover:bg-black/80 transition-colors"
                        >
                            <X size={14} />
                        </button>
                    </>
                ) : uploading ? (
                    <div className="flex flex-col items-center gap-3">
                        <Loader2 className="animate-spin text-primary" size={32} />
                        <div className="w-48 h-1.5 bg-card rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <p className="text-sm text-muted">Uploading... {Math.round(progress)}%</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-2 text-muted">
                        <div className="p-3 bg-card rounded-xl">
                            <ImageIcon size={24} />
                        </div>
                        <p className="font-medium">Click to upload image</p>
                        <p className="text-xs">Recommended: 800x450px</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageUpload;
