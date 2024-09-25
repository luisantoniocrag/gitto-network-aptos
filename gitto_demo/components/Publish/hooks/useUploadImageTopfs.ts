import { useState } from "react";

export const useUploadImageToIpfs = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [orientation, setOrientation] = useState("");
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const img = new Image();

      img.onload = function () {
        const width = img.width;
        const height = img.height;

        setImageDimensions({ width, height });

        let orientation = "";

        if (width === height) {
          orientation = "square";
        } else if (width > height) {
          orientation = "landscape_horizontal";
        } else {
          orientation = "landscape_vertical";
        }

        setOrientation(orientation);
        setImageFile(file);

        // Subir la imagen al backend
        uploadImage(file, orientation);
      };

      img.onerror = function () {
        console.error("El archivo seleccionado no es una imagen válida");
      };

      const reader = new FileReader();
      reader.onload = function (e) {
        const result = e.target?.result;
        if (result && typeof result === "string") {
          img.src = result; // Asignar la fuente de la imagen
        } else {
          console.error("Error al leer el archivo como Data URL");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = (file: string | Blob, orientation: string | Blob) => {
    setUploading(true);
    setUploadError("");
    setUploadSuccess("");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("orientation", orientation);

    fetch("URL_DE_TU_BACKEND", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        setUploading(false);
        if (response.ok) {
          setUploadSuccess("Imagen subida exitosamente");
        } else {
          setUploadError("Error al subir la imagen");
        }
      })
      .catch((error) => {
        setUploading(false);
        setUploadError("Error en la petición: " + error.message);
      });
  };

  const resetState = () => {
    setImageFile(null);
    setOrientation("");
    setImageDimensions({
      width: 0,
      height: 0,
    });
    setUploading(false);
    setUploadError("");
    setUploadSuccess("");
  };

  return {
    imageFile,
    orientation,
    imageDimensions,
    uploading,
    uploadError,
    uploadSuccess,
    handleFileChange,
    resetState,
  };
};
