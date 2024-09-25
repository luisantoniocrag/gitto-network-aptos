import { ChangeEvent, useState } from "react";
import { Topbar } from "@/components/Global";
import {
  ChevronLeftIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import React from "react";

export const UpdateProfile = (props: any) => {
  const { setShowUpdateProfile, currentProfile, setCurrentProfile } = props;
  const [userName, setUserName] = useState(currentProfile.userName.slice(1));
  const [userDescription, setUserDescription] = useState(
    currentProfile.userDescription
  );
  const [userLink, setUserLink] = useState(currentProfile.userLink);

  const updateProfile = () => {
    setCurrentProfile({
      ...currentProfile,
      userName: `@${userName}`,
      userDescription,
      userLink,
    });
    setShowUpdateProfile(false);
  };

  const onUpdateData = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    if (name === "userName") setUserName(value);
    if (name === "userDescription") setUserDescription(value);
    if (name === "userLink") setUserLink(value);
  };

  return (
    <>
      <Topbar>
        <div className="w-full h-full flex flex-row justify-between overflow-x-auto py-4 pl-2 relative">
          <div
            className="flex flex-row items-center z-20"
            onClick={() =>
              setShowUpdateProfile(
                (showUpdateProfile: any) => !showUpdateProfile
              )
            }
          >
            <ChevronLeftIcon className="w-10 h-10 text-gray-500 p-1.5" />
            <label className="text-gray-500">Cancelar</label>
          </div>
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <label className="text-gray-900 font-bold">Editar Perfil</label>
          </div>
          <div
            className="flex flex-row items-center z-20 mr-4"
            onClick={updateProfile}
          >
            <ClipboardDocumentCheckIcon className="w-10 h-10 text-gray-500 p-2" />
            <label className="text-gray-500">Guardar</label>
          </div>
        </div>
      </Topbar>
      <div className="flex flex-col flex-1 overflow-y-auto bg-gray-50 px-4">
        <div className="flex items-center justify-center my-8">
          <img
            className="w-1/2 aspect-square rounded-full object-contain bg-gray-200"
            src={currentProfile.userImage}
          />
        </div>
        <div className="grid grid-cols-3 border-t border-gray-300 py-3 items-center">
          <div className="col-span-1 text-gray-700 font-bold">Nombre</div>
          <div className="col-span-2">
            <input
              name="userName"
              className="p-1 text-gray-700 border-b border-gray-300"
              onChange={onUpdateData}
              value={userName}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 border-t border-gray-300 py-3 items-center">
          <div className="col-span-1 text-gray-700 font-bold">
            Nombre de Usuario
          </div>
          <div className="col-span-2">
            <input
              disabled={true}
              name="userName"
              className="p-1 text-gray-300"
              onChange={onUpdateData}
              value={currentProfile.userName}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 border-t border-gray-300 py-3 items-center">
          <div className="col-span-1 text-gray-700 font-bold">Descripcion</div>
          <div className="col-span-2">
            <textarea
              name="userDescription"
              className="p-1 text-gray-700 w-full border-b border-gray-300"
              onChange={(e) => onUpdateData(e)}
              value={userDescription}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 border-t border-gray-300 py-3 items-center">
          <div className="col-span-1 text-gray-700 font-bold">Enlace</div>
          <div className="col-span-2">
            <input
              name="userLink"
              className="p-1 text-gray-700 border-b border-gray-300"
              onChange={onUpdateData}
              value={userLink}
            />
          </div>
        </div>
      </div>
    </>
  );
};
