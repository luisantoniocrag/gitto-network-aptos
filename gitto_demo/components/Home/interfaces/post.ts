import { Dispatch, SetStateAction } from "react";
import { DummyPost } from "./";

export interface PostProps {
  currentPost: DummyPost;
  setCurrentPost: Dispatch<SetStateAction<DummyPost | null>>;
}
