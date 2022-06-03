import { IoIosArrowForward } from "react-icons/io";

export default function SlideButton({ direction, onClick }) {
  return (
    <button onClick={onClick} className={`btn-slide-control btn-${direction}`}>
      <IoIosArrowForward width="16" height="16" fill="#333" />
    </button>
  );
}
