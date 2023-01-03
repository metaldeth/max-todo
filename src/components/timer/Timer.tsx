import { UseTimerParamsType, GetTimerProps, getTimer } from "../../hooks/timer";
import { useEffect, useMemo, useState, VFC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@consta/uikit/Button";
import { Layout } from "@consta/uikit/Layout";
import { Text } from "@consta/uikit/Text";
import { pass } from "../../consts";
import { txtDeCode } from "../../helpers";

export const Timer: VFC = () => {
  const { codeTxt } = useParams<{ codeTxt: string }>();
  const navigate = useNavigate();

  console.log(codeTxt && txtDeCode(codeTxt, pass));

  const date = useMemo(
    () =>
      codeTxt &&
      (JSON.parse(String(txtDeCode(codeTxt, pass))) as UseTimerParamsType),
    [codeTxt]
  );

  const [timer, setTimer] = useState<string | GetTimerProps>("Не загрузилось");

  useEffect(() => {
    const id = setInterval(() => {
      date && setTimer(getTimer(date));
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [date]);

  const isStarted = typeof timer === "string";

  // Обработчики
  const handleCreateTimerButtonClick = () => {
    navigate("/createTimer");
  };

  if (!date) return null;

  return (
    <Layout direction="column">
      <Button onClick={handleCreateTimerButtonClick} label="Создать таймер" />
      {isStarted ? (
        timer
      ) : (
        <>
          <Text>{date?.title}</Text>
          <Text>{date?.description}</Text>
          <Text>лет {timer.year}</Text>
          <Text>месяцев {timer.month}</Text>
          <Text>дней {timer.day}</Text>
          <Text>часов {timer.hours}</Text>
          <Text>минут {timer.minutes}</Text>
          <Text>секунд {timer.seconds}</Text>
        </>
      )}
    </Layout>
  );
};
