import React, { ChangeEvent, useEffect, useState } from "react";
import pica from "pica";
import { useApiUrl } from "@refinedev/core";
import { ApiClient } from "../../lib/apiClient";
import toast from "react-hot-toast";

interface Props {
  setPreview: React.Dispatch<React.SetStateAction<File | null>>;
  setAvatarUpdating: React.Dispatch<React.SetStateAction<boolean>>;
}

const AvatarUploader: React.FC<Props> = ({ setPreview, setAvatarUpdating }) => {
  const [isLoading, setIsLoading] = useState(false)
  const apiUrl = useApiUrl();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true)
    if (!event.target.files?.length) return;
    const file = event.target.files?.[0];

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = async () => {
      const picaInstance = pica();

      const sourceCanvas = document.createElement("canvas");
      sourceCanvas.width = img.width;
      sourceCanvas.height = img.height;

      const ctx = sourceCanvas.getContext("2d");
      ctx?.drawImage(img, 0, 0);

      const targetCanvas = document.createElement("canvas");
      targetCanvas.width = 300;
      targetCanvas.height = 300;

      try {
        await picaInstance.resize(sourceCanvas, targetCanvas);
        const blob = await picaInstance.toBlob(targetCanvas, "image/jpeg", 0.8);

        const resizeFile = new File([blob], file?.name, { type: "image/jpeg" });
        const formData = new FormData();
        formData.append("avatar", resizeFile);
        formData.append("name", "billal");

        setPreview(resizeFile);

        ApiClient.put<{ avatar: string }>(`${apiUrl}/profile/avatar`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        
        setIsLoading(false)
      } catch (error) {
        console.error("pica resize error", error);
      }
    };
  };



  return (
    <div>
      <input
        onChange={handleFileChange}
        type={"file"}
        id={"image-uploader"}
        className={"hidden"}
      />
    </div>
  );
};

export default AvatarUploader;
