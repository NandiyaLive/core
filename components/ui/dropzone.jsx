"use client";

import { UploadCloud } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { ImagePlus } from "lucide-react";
import { Button } from "./button";
import Image from "next/image";
import { toast } from "react-hot-toast";

const sizeToBytes = (size) => {
  return size * 1048576;
};

export const Dropzone = (props) => {
  const fileValidator = (file) => {
    if (file.size > sizeToBytes(props.maxSize)) {
      return {
        code: "size-too-large",
        message: `Size is larger than ${props.maxSize} MB`,
      };
    }

    return null;
  };

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    // maxFiles: props.maxFiles || 0,
    // validator: fileValidator,
  });

  if (fileRejections.length > 0) {
    toast.error("Upload Filed!");
  }

  const onClick = async () => {
    try {
      const data = new FormData();

      for (let i = 0; i < acceptedFiles.length; i++) {
        data.append(i, acceptedFiles[i]);
      }

      const res = await axios.post(`/api/imagekit`, data);
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section>
      <div {...getRootProps({ className: "dropzone" })} class="flex items-center justify-center w-full">
        <label
          for="dropzone"
          class="flex flex-col items-center justify-center w-full h-56 border-2 border-neutral-300 border-dashed rounded-lg cursor-pointer bg-neutral-50 dark:hover:bg-bray-800 dark:bg-neutral-700 hover:bg-neutral-100 dark:border-neutral-600 dark:hover:border-neutral-500 dark:hover:bg-neutral-600"
        >
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <UploadCloud className="h-8" />
            <p class="mb-2 text-sm text-neutral-500 dark:text-neutral-400">
              Drag &apos;n&apos; drop some files here, or click to select files
            </p>
            <p class="text-xs text-neutral-500 dark:text-neutral-400">
              Images Only {props.maxFiles && `, ${props.maxFiles} file(s)`}
              {props.maxSize && `, up to ${props.maxSize} MB`}
            </p>
          </div>
          <Input {...getInputProps()} />
        </label>
      </div>

      {acceptedFiles.length ? (
        <div className="flex mt-2 justify-between">
          <div className="flex gap-2">
            {acceptedFiles.map((file, index) => (
              <div className="h-40 w-40 relative" key={index}>
                <Image
                  key={file.path}
                  alt={file.path}
                  src={URL.createObjectURL(file)}
                  className="object-cover"
                  fill
                />
              </div>
            ))}
          </div>
          <Button type="button" variant="secondary" onClick={onClick}>
            <ImagePlus className="h-4 w-4 mr-2" />
            Upload Image
          </Button>
        </div>
      ) : null}
    </section>
  );
};

// {
//     fileId: '64d49c5388c257da3385146d',
//     name: 'test_HHvAGsUy8.jpg',
//     size: 163217,
//     versionInfo: { id: '64d49c5388c257da3385146d', name: 'Version 1' },
//     filePath: '/test_HHvAGsUy8.jpg',
//     url: 'https://ik.imagekit.io/dossceylon/test_HHvAGsUy8.jpg',
//     fileType: 'image',
//     height: 1920,
//     width: 1080,
//     thumbnailUrl: 'https://ik.imagekit.io/dossceylon/tr:n-ik_ml_thumbnail/test_HHvAGsUy8.jpg',
//     AITags: null
//   }
