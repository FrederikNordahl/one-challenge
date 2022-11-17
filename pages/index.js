import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "styles/Home.module.scss";
import { DateRangeInput } from "@datepicker-react/styled";
import { ThemeProvider } from "styled-components";
import { calcDateDiff } from "utils/api";
import { parseDate } from "@datepicker-react/hooks";
import AnimatedText from "components/animated-text";

export default function Home() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [dumbStart, setDumbStart] = useState("");
  const [dumbEnd, setDumbEnd] = useState("");
  const [difference, setDifference] = useState(0);

  const setDates = (data) => {
    setStartDate(data.startDate);
    setEndDate(data.endDate);
    setFocusedInput(data.focusedInput);

    setDumbStart(data?.startDate?.toLocaleDateString());
    setDumbEnd(data?.endDate?.toLocaleDateString());
  };

  const fetchDiff = async () => {
    const diff = await calcDateDiff({ end: dumbEnd, start: dumbStart });

    if (diff) {
      setDifference(diff);
    }
  };

  useEffect(() => {
    fetchDiff();
  }, [dumbEnd, dumbStart, fetchDiff]);

  return (
    <article className={`${styles.container} grid`}>
      <header className={`${styles.header} grid`}>
        <AnimatedText>
          <h1>One.com code challenge</h1>
        </AnimatedText>
      </header>
      <section className={styles.calculator}>
        <h3>
          My version of a date picker, with a calculation between the dates, I
          couldn't help myself but split it up into frontend and backend :)
        </h3>
        <ThemeProvider
          theme={{
            reactDatepicker: {
              daySize: [50, 50],
              colors: {
                selectedDay: "var(--one-light)",
                selectedDayHover: "var(--one-super-light)",
                primaryColor: "var(--one)",
              },
            },
          }}
        >
          <DateRangeInput
            onDatesChange={(data) => setDates(data)}
            onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
            startDate={startDate}
            endDate={endDate}
            focusedInput={focusedInput}
            displayFormat="yyyy-MM-dd"
          />
        </ThemeProvider>
        <h3>Difference: {difference}</h3>
      </section>
    </article>
  );
}
