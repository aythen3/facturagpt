import { useEffect } from "react";

const useSwipe = (setState) => {
  useEffect(() => {
    let startX = 0;
    let endX = 0;
    let isTouch = false;

    // 🖱️ Inicio del mouse
    const handleMouseDown = (e) => {
      isTouch = false;
      startX = e.clientX;
    };

    // 🖱️ Movimiento del mouse
    const handleMouseMove = (e) => {
      if (!isTouch) endX = e.clientX;
    };

    // 🖱️ Fin del mouse
    const handleMouseUp = () => {
      if (!isTouch) detectSwipe();
    };

    // 📱 Inicio del touch
    const handleTouchStart = (e) => {
      isTouch = true;
      startX = e.touches[0].clientX;
    };

    // 📱 Movimiento del touch
    const handleTouchMove = (e) => {
      endX = e.touches[0].clientX;
    };

    // 📱 Fin del touch
    const handleTouchEnd = () => {
      if (isTouch) detectSwipe();
    };

    // 🔥 Detecta el swipe
    const detectSwipe = () => {
      if (startX < endX - 50) {
        setState(true); // 👉 Swipe a la derecha → true
      } else if (startX > endX + 50) {
        setState(false); // 👈 Swipe a la izquierda → false
      }
    };

    // Agregar eventos
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    // Cleanup al desmontar
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [setState]);
};

export default useSwipe;
