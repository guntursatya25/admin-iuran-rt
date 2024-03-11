import { Label } from "@/components/ui/label";
import Image from "next/image";
import React, { useState } from "react";

const PreviewIMG = () => {
  const [preview, setPreview] = useState(null);
  const handFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreview(reader.result);
      };
    }
  };
  return (
    <div>
      <Label htmlFor="picture">Picture</Label>
      <div className="mt-2">
        <Image src={preview} alt="preview" width={200} height={200} />
      </div>
    </div>
  );
};

export default PreviewIMG;
