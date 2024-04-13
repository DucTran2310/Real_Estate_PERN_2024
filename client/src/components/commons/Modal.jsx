import { useAppStore } from "@store/useAppStore"

const Modal = () => {

  const { contentModal, setModal } = useAppStore()

  return (
    <div 
    className="absolute z-[999] w-screen h-screen flex items-center justify-center bg-overlay-50"
    onClick={() => setModal(false, null)}
    >
      {contentModal}
    </div>
  )
}

export default Modal