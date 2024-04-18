import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { useEffect } from "react";
import { useAppStore } from "../stores/useAppStore";

export default function Layout() {
  const { loadFromStorage } = useAppStore();

  useEffect(() => {
    loadFromStorage();
  }, []);
  return (
    <>
      <Header />
      <main className="mx-auto py-16 ">
        <Modal />
        <Outlet></Outlet>
      </main>
    </>
  );
}
