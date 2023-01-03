import { SyntheticEvent, useState, VFC } from "react";
import { TextField, TextFieldOnChangeArguments } from "@consta/uikit/TextField";
import { UseTimerParamsType } from "../../hooks/timer";
import { Button } from "@consta/uikit/Button";
import { useNavigate } from "react-router-dom";
import { txtEnCode } from "../../helpers";
import { pass } from "../../consts";

export const CreateTimer: VFC = () => {
  const navigate = useNavigate();

  const [formState, setFormState] = useState<UseTimerParamsType>({
    year: 0,
    month: 0,
    day: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    title: "",
    description: "",
  });

  // обработчики
  const handleCreateTimerButtonClick = () =>
    navigate(`/timer/${txtEnCode(JSON.stringify(formState), pass)}`);

  const handleCopeLinkButtonClick = () => {};

  const handleChange =
    (key: keyof UseTimerParamsType) => (e: TextFieldOnChangeArguments) => {
      setFormState((prevState) => ({ ...prevState, [key]: e.value }));
    };
  const handleTimerSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleTimerSubmit}>
      {/* TODO: сократить форму, можно пробежаться по всем ключам объекта и отрендерить каждое поле ввода */}
      <TextField
        label="Год"
        // type="number"
        value={String(formState["year"])}
        onChange={handleChange("year")}
      />
      <TextField
        label="Месяц"
        // type="number"
        value={String(formState["month"])}
        onChange={handleChange("month")}
      />
      <TextField
        label="День"
        // type="number"
        value={String(formState["day"])}
        onChange={handleChange("day")}
      />
      <TextField
        label="Часы"
        // type="number"
        value={String(formState["hours"])}
        onChange={handleChange("hours")}
      />
      <TextField
        label="Минуты"
        // type="number"
        value={String(formState["minutes"])}
        onChange={handleChange("minutes")}
      />
      <TextField
        label="Секунды"
        // type="number"
        value={String(formState["seconds"])}
        onChange={handleChange("seconds")}
      />
      <TextField
        label="Заголовок"
        value={formState["title"]}
        onChange={handleChange("title")}
      />
      <TextField
        label="Описание"
        value={formState["description"]}
        onChange={handleChange("description")}
      />
      <Button label="Сохранить таймер" onClick={handleCreateTimerButtonClick} />
    </form>
  );
};
