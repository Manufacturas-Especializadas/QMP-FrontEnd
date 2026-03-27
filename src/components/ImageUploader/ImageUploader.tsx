import { X, Upload } from "lucide-react";
import { useState } from "react";

export const ImageUploader = () => {
  const [images, setImages] = useState<string[]>([]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file),
      );
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  return (
    <div className="space-y-4">
      <label
        className="block text-xs font-black text-gray-400 uppercase 
        tracking-widest ml-1"
      >
        Evidencia Fotográfica
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {images.map((img, i) => (
          <div
            key={i}
            className="relative aspect-square rounded-2xl overflow-hidden border 
            border-gray-100 group"
          >
            <img src={img} className="w-full h-full object-cover" />
            <button
              onClick={() => setImages(images.filter((_, idx) => idx !== i))}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white 
              rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
          </div>
        ))}
        <label
          className="aspect-square flex flex-col items-center justify-center 
          border-2 border-dashed border-gray-200 rounded-2xl hover:border-blue-400 
          hover:bg-blue-50 transition-all cursor-pointer group"
        >
          <Upload className="text-gray-300 group-hover:text-blue-500 transition-colors" />
          <span
            className="text-[10px] font-bold text-gray-400 group-hover:text-blue-600 
            mt-2"
          >
            Subir
          </span>
          <input
            type="file"
            multiple
            className="hidden"
            onChange={handleFile}
            accept="image/*"
          />
        </label>
      </div>
    </div>
  );
};
