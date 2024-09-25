import { ReactNode, useState } from "react";
import { IoMdImages } from "react-icons/io";
import { IoCameraOutline, IoVideocam } from "react-icons/io5";
import { useUploadImageToIpfs } from "./hooks";
import { AiOutlineClose } from "react-icons/ai";
import { Main, Topbar } from "../Global";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

interface Thread {
  title: String;
  blob: String;
}

export const Publish: React.FC<{}> = () => {
  const router = useRouter();
  const [threads, setThreads] = useState<Thread[]>([
    {
      title: "",
      blob: "",
    },
  ]);

  const isValidToPublish = () =>
    threads.length > 0 && threads.every((t) => t.title != "");

  const addNewThread = () =>
    setThreads((prevValue) => prevValue.concat({ title: "", blob: "" }));

  return (
    <Main>
      <div className="h-full">
        <Topbar>
          <div className="w-full h-full flex flex-row justify-between overflow-x-auto py-4 pl-2 relative">
            <div
              className="flex flex-row items-center z-20"
              onClick={() => router.back()}
            >
              <ChevronLeftIcon className="w-10 h-10 text-gray-500 p-1.5" />
              <label className="text-gray-500">Atrás</label>
            </div>
            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
              <label className="text-gray-900 font-bold">Post</label>
            </div>
          </div>
        </Topbar>
        <div className="flex flex-col flex-1 overflow-y-auto">
          {threads.map((t, index) => (
            <PostContent
              key={index}
              onClickMore={addNewThread}
              allowMore={threads.length <= 6}
              isLastOne={index == threads.length - 1}
              showLine={index != 6}
            />
          ))}
        </div>
        <FooterStaticPost />
      </div>
    </Main>
  );
};

const HeaderPostTitle = () => (
  <div
    id="post-header"
    className="bg-white fixed w-[420px] h-[64px] top-0 right-0 left-0 w-[420] flex items-center py-4 mx-auto border-b-2"
  >
    <div className="grid grid-cols-2">
      <h4 className="font-normal text-xl mx-auto text-gray-900">Cancel</h4>
      <h4 className="font-bold text-2xl mx-auto"></h4>
    </div>
  </div>
);

interface IPostContent {
  isLastOne: boolean;
  allowMore: boolean;
  showLine: boolean;
  onClickMore: () => void;
}
const PostContent: React.FC<IPostContent> = ({
  isLastOne,
  onClickMore,
  allowMore,
  showLine,
}) => {
  const { resetState, imageFile, orientation, handleFileChange } =
    useUploadImageToIpfs();

  return (
    <div>
      <div className="flex px-4 py-2">
        <div className="mr-4 flex flex-col">
          <img
            className="w-16 rounded-full"
            src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"
            alt="profile image"
          />

          {showLine && (
            <div className="w-full h-[100px] flex justify-center py-4">
              <div
                id="line"
                className="w-[3px] rounded h-full bg-slate-200"
              ></div>
            </div>
          )}
        </div>

        <div className="flex flex-col w-full">
          <h3 className="mb-2 font-bold text-xl">Lorena Franco</h3>

          <div id="wrapper-text-area">
            <div className="mt-2">
              <textarea
                placeholder="What would you like to share?"
                id="comment"
                name="comment"
                rows={2}
                className="block w-full rounded-md border-0 py-1.5 text-lg text-gray-900 shadow-sm ring-0 leading-6 placeholder:text-gray-400 focus:border-0 focus:outline-none focus:ring-0"
                defaultValue={""}
              />
            </div>
          </div>

          <div id="wrapper-icons-upload" className="flex mt-4">
            {imageFile == null && (
              <>
                <label htmlFor="imageInput">
                  <IoMdImages
                    size={25}
                    className="mr-2 text-slate-300 cursor-pointer"
                  />
                </label>
                <input
                  id="imageInput"
                  className="hidden"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <IoCameraOutline
                  size={25}
                  className="text-slate-300 cursor-pointer"
                />
              </>
            )}

            {imageFile != null && orientation == "square" && (
              <SquareImage
                onRemoveImage={resetState}
                url={String(URL.createObjectURL(imageFile))}
              />
            )}

            {imageFile != null && orientation == "landscape_horizontal" && (
              <LandscapHorizontalImage
                onRemoveImage={resetState}
                url={String(URL.createObjectURL(imageFile))}
              />
            )}

            {imageFile != null && orientation == "landscape_vertical" && (
              <LandscapVerticalImage
                onRemoveImage={resetState}
                url={String(URL.createObjectURL(imageFile))}
              />
            )}
          </div>
        </div>
      </div>

      {isLastOne && allowMore && (
        <div className="flex ml-7 my-4 items-center">
          <img
            className="w-8 h-8 rounded-full mr-4"
            src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"
            alt="profile image"
          />
          <div
            className="cursor-pointer text-slate-300 font-normal"
            onClick={onClickMore}
          >
            Agregar más
          </div>
        </div>
      )}
    </div>
  );
};

interface IPostImageContent {
  url: string;
  onRemoveImage: () => void;
}

const SquareImage: React.FC<IPostImageContent> = ({ url, onRemoveImage }) => (
  <WrapperImagePost onRemoveImage={onRemoveImage}>
    <img
      className="w-52 h-52 rounded-lg"
      src={url}
      alt="post previee square image"
    />
  </WrapperImagePost>
);

const LandscapHorizontalImage: React.FC<IPostImageContent> = ({
  url,
  onRemoveImage,
}) => (
  <WrapperImagePost onRemoveImage={onRemoveImage}>
    <img
      className="w-96 h-52 rounded-lg"
      src={url}
      alt="post previee square image"
    />
  </WrapperImagePost>
);

const LandscapVerticalImage: React.FC<IPostImageContent> = ({
  url,
  onRemoveImage,
}) => (
  <WrapperImagePost onRemoveImage={onRemoveImage}>
    <img
      className="h-96 w-52 rounded-lg"
      src={url}
      alt="post previee square image"
    />
  </WrapperImagePost>
);

interface IWrapperImagePost {
  children: ReactNode;
  onRemoveImage: () => void;
}

const WrapperImagePost: React.FC<IWrapperImagePost> = ({
  children,
  onRemoveImage,
}) => (
  <div className="relative inline-block">
    {children}
    <button
      onClick={onRemoveImage}
      className="absolute top-2 right-2 bg-gray-800 text-white p-2 rounded-full focus:outline-none hover:bg-gray-600"
    >
      <AiOutlineClose className="text-white" />
    </button>
  </div>
);

const FooterStaticPost = () => (
  <footer
    id="footer-post"
    className="flex justify-between items-center bg-white fixed bottom-[63px] border-t-2 border-slate-200 w-[420px] h-[63px] left-0 right-0 mx-auto px-6"
  >
    <p className="text-xs text-slate-400">
      Anyone can reply and quote this thread*
    </p>

    <button className="rounded-full bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
      Publish
    </button>
  </footer>
);
