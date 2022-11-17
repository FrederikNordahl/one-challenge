import React, { useEffect, useRef } from "react";
import styles from "styles/AnimatedText.module.scss";

const AnimatedText = (props) => {
  const { children } = props;

  const text = children.props.children;
  const Tag = children.type;
  const words = text.split(" ");

  const tagRef = useRef();

  const delayBetweenLetter = props.between ? props.between : 15;
  const delayStart = props.delay ? props.delay : 200;
  const offset = props.offset ? props.offset : "100px";
  const threshold = props.threshold ? props.threshold : 0.2;

  const handleIntersect = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated-loaded");
      }
    });
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: offset,
      threshold,
    };

    if (!window.observer) {
      window.observer = new IntersectionObserver(handleIntersect, options);
    }

    window.observer.observe(tagRef.current);
  });

  return (
    <Tag ref={tagRef}>
      {words.map((word, index) => {
        const letters = word.split("");
        return (
          <span className={styles.word} key={`animated-word-${index}`}>
            {letters.map((letter, lindex) => {
              let previousLetters = 0;
              words.forEach((localWord, windex) => {
                if (windex < index) {
                  previousLetters += localWord.length;
                }
              });

              const delay = `${
                lindex * delayBetweenLetter +
                previousLetters * delayBetweenLetter +
                delayStart
              }ms`;
              return (
                <span
                  key={`animated-word-${index}-${lindex}`}
                  style={{ transitionDelay: delay }}
                  className={styles.letter}
                >
                  {letter}
                </span>
              );
            })}{" "}
          </span>
        );
      })}
    </Tag>
  );
};

export default AnimatedText;
