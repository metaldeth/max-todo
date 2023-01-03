export type GetTimerProps = {
  year?: number;
  month?: number;
  day?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
};

// TODO: переименовать
export type UseTimerParamsType = GetTimerProps & {
  title?: string;
  description?: string;
};

export const getTimer = ({
  year,
  month,
  day,
  hours,
  minutes,
  seconds,
}: GetTimerProps): string | GetTimerProps => {
  // if (!(year && month && day && hours && minutes && seconds)) {
  //   return "Ошибка таймера";
  // }
  const now = new Date();
  const ttt = new Date(
    Number(year),
    Number(month),
    Number(day),
    Number(hours),
    Number(minutes),
    Number(seconds)
  );

  const isStarted = now > ttt;

  const deltaSeconds = ttt.getSeconds() - now.getSeconds();
  const deltaMinutes =
    ttt.getMinutes() - now.getMinutes() - (deltaSeconds < 0 ? 1 : 0);
  const deltaHours =
    ttt.getHours() - now.getHours() - (deltaMinutes < 0 ? 1 : 0);
  const deltaDay = ttt.getDate() - now.getDate() - (deltaHours < 0 ? 1 : 0);
  const deltaMonth = ttt.getMonth() - now.getMonth() - (deltaDay < 0 ? 1 : 0);
  const deltaYear =
    ttt.getFullYear() - now.getFullYear() - (deltaMonth < 0 ? 1 : 0);

  const timer = {
    year: Math.floor(deltaYear),
    month: Math.floor(deltaMonth < 0 ? 12 + deltaMonth : deltaMonth),
    day: Math.floor(deltaDay < 0 ? 31 + deltaDay : deltaDay),
    hours: Math.floor(deltaHours < 0 ? 24 + deltaHours : deltaHours),
    minutes: Math.floor(deltaMinutes < 0 ? 60 + deltaMinutes : deltaMinutes),
    seconds: Math.floor(deltaSeconds < 0 ? 60 + deltaSeconds : deltaSeconds),
  };

  return isStarted ? "Время пришло" : timer;
};
