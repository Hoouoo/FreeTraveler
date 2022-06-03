import styled from "styled-components";
import React, { useLayoutEffect, useRef, useEffect, useState } from "react";
import SlideButton from "./SlideButton";
import slider_background_01 from "../../resource/img/slider_background_01.png";
import slider_background_02 from "../../resource/img/slider_background_02.png";
import slider_background_03 from "../../resource/img/slider_background_03.png";
import slider_background_04 from "../../resource/img/slider_background_04.png";
const SliderForm = styled.div`
  .slider-area {
    position: relative;
    overflow: hidden;
    height: auto;
  }
  .slider {
    position: relative;
    display: block;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -ms-touch-action: pan-y;
    touch-action: pan-y;
    -webkit-tap-highlight-color: transparent;
  }
  .slider-list {
    position: relative;
    overflow: hidden;
    display: block;
    margin: 0;
  }

  .slider-track {
    position: relative;
    position: relative;
    left: 50%;
    top: 0;
    display: flex;
    flex-direction: row;
    text-align: left;
    width: fit-content;
    /* transition: -webkit-transform 500ms ease 0s; */
    /* transition: transform 500ms ease 0s; */
  }

  .slider-auto {
  }

  .slider-item {
    position: relative;
    height: 100%;
    padding: 0 12px;
    float: left;
    -webkit-filter: brightness(50%);
    filter: brightness(50%);
  }

  .btn-slide-control {
    position: absolute;
    top: calc(50% - 30px);
    padding: 20px 4px;
    z-index: 1;
    background-color: white;
    width: 30px;
    height: 60px;
    opacity: 0.5;
    border-radius: 15px;
  }

  .btn-prev {
    transform: rotate(180deg);
    left: calc((100% - 1200px) / 2);
  }

  .btn-next {
    right: calc((100% - 1200px) / 2);
  }

  .slider-item div {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 300px;
    color: white;
    justify-content: center;
    font-size: 60px;
    font-weight: bold;
  }
  .slider-item span {
    font-size: 18px;
    margin-bottom: 1rem;
  }
  .current-slide {
    -webkit-filter: none;
    filter: none;
  }
`;

const SliderItem = styled.div`
  .slider-item {
    display: inline-block;
  }

  .slider-item img {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    object-fit: cover;
    max-height: 300px;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-select: none;
  }
`;

function Slider() {
  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }

  function useInterval(callback, delay) {
    const savedCallback = useRef();
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }
  const [windowWidth, windowHeight] = useWindowSize();
  const items = [
    slider_background_01,
    slider_background_02,
    slider_background_03,
    slider_background_04,
  ];
  const itemSize = items.length;
  const sliderPadding = 40;
  const sliderPaddingStyle = `0 ${sliderPadding}px`;
  const newItemWidth = getNewItemWidth();
  const transitionTime = 500;
  const transitionStyle = `transform ${transitionTime}ms ease 0s`;
  const imgNum = 4;
  const [currentIndex, setCurrentIndex] = useState(imgNum);
  const [slideTransition, setTransition] = useState(transitionStyle);
  const [isSwiping, setIsSwiping] = useState(false);
  const [slideX, setSlideX] = useState(null);
  const [prevSlideX, setPrevSlideX] = useState(false);
  let isResizing = useRef(false);

  let slides = setSlides();
  function setSlides() {
    let addedFront = [];
    let addedLast = [];
    var index = 0;
    while (index < imgNum) {
      addedLast.push(items[index % items.length]);
      addedFront.unshift(items[items.length - 1 - (index % items.length)]);
      index++;
    }
    return [...addedFront, ...items, ...addedLast];
  }

  function getNewItemWidth() {
    let itemWidth = windowWidth * 0.9 - sliderPadding * 2;
    itemWidth = itemWidth > 1060 ? 1060 : itemWidth;
    return itemWidth;
  }

  useEffect(() => {
    isResizing.current = true;
    setIsSwiping(true);
    setTransition("");
    setTimeout(() => {
      isResizing.current = false;
      if (!isResizing.current) setIsSwiping(false);
    }, 1000);
  }, [windowWidth]);

  useInterval(
    () => {
      handleSlide(currentIndex + 1);
    },
    !isSwiping && !prevSlideX ? 2000 : null
  );

  function replaceSlide(index) {
    setTimeout(() => {
      setTransition("");
      setCurrentIndex(index);
    }, transitionTime);
  }

  function handleSlide(index) {
    setCurrentIndex(index);
    if (index - imgNum < 0) {
      index += itemSize;
      replaceSlide(index);
    } else if (index - imgNum >= itemSize) {
      index -= itemSize;
      replaceSlide(index);
    }
    setTransition(transitionStyle);
  }

  function handleSwipe(direction) {
    setIsSwiping(true);
    handleSlide(currentIndex + direction);
  }

  function getItemIndex(index) {
    index -= imgNum;
    if (index < 0) {
      index += itemSize;
    } else if (index >= itemSize) {
      index -= itemSize;
    }
    return index;
  }

  function getClientX(event) {
    return event._reactName == "onTouchStart"
      ? event.touches[0].clientX
      : event._reactName == "onTouchMove" || event._reactName == "onTouchEnd"
      ? event.changedTouches[0].clientX
      : event.clientX;
  }

  function handleTouchStart(e) {
    setPrevSlideX((prevSlideX) => getClientX(e));
  }

  function handleTouchMove(e) {
    if (prevSlideX) {
      setSlideX((slideX) => getClientX(e) - prevSlideX);
    }
  }

  function handleMouseSwipe(e) {
    if (slideX) {
      const currentTouchX = getClientX(e);
      if (prevSlideX > currentTouchX + 100) {
        handleSlide(currentIndex + 1);
      } else if (prevSlideX < currentTouchX - 100) {
        handleSlide(currentIndex - 1);
      }
      setSlideX((slideX) => null);
    }
    setPrevSlideX((prevSlideX) => null);
  }

  return (
    <SliderForm>
      <SliderItem>
        <div className="slider-area">
          <div className="slider">
            <SlideButton direction="prev" onClick={() => handleSwipe(-1)} />
            <SlideButton direction="next" onClick={() => handleSwipe(1)} />
            <div
              className="slider-list"
              style={{ padding: sliderPaddingStyle }}
            >
              <div
                className="slider-track"
                onMouseOver={() => setIsSwiping(true)}
                onMouseOut={() => setIsSwiping(false)}
                style={{
                  transform: `translateX(calc(${
                    (-100 / slides.length) * (0.5 + currentIndex)
                  }% + ${slideX || 0}px))`,
                  transition: slideTransition,
                }}
              >
                {slides.map((slide, slideIndex) => {
                  const itemIndex = getItemIndex(slideIndex);
                  return (
                    <div
                      key={slideIndex}
                      className={`slider-item ${
                        currentIndex === slideIndex ? "current-slide" : ""
                      }`}
                      style={{ width: newItemWidth || "auto" }}
                      onMouseDown={handleTouchStart}
                      onTouchStart={handleTouchStart}
                      onTouchMove={handleTouchMove}
                      onMouseMove={handleTouchMove}
                      onMouseUp={handleMouseSwipe}
                      onTouchEnd={handleMouseSwipe}
                      onMouseLeave={handleMouseSwipe}
                    >
                      <a>
                        <img
                          src={items[itemIndex]}
                          alt={`banner${itemIndex}`}
                        />
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </SliderItem>
    </SliderForm>
  );
}

export default Slider;
