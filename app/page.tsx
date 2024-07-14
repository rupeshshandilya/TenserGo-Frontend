import Image from "next/image";
import ProtectedPage from "./components/ProtectedPage";
import { redirect } from "next/navigation";
import Feedbacks from "./components/Feedbacks";

export default function Home() {

  return (
    <>
    <ProtectedPage />    
    <Feedbacks />
    </>
  );
}
