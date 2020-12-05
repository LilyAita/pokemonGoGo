import React, { useState, useEffect } from "react";
import "isomorphic-fetch";
import es from "./locales/es.json";
import en from "./locales/en.json";
import "bootstrap/dist/css/bootstrap.min.css";
import Grafic from "./Grafic";
import TableF from "./TableF";
import {IntlProvider} from "react-intl";

const data = {
  es: es,
  en: en,
};

const Films = () => {
  const [films, setFilms] = useState([]);
  const [url, setUrl] = useState([]);
  const [keys, setKeys] = useState([]);
  const [language, setLanguage] = useState("");
  const [title, setTitle] = useState("");
  const [localeMessages, setLocaleMessages] = useState({});
  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("films") === null) {
      } else {
        setFilms(JSON.parse(localStorage.getItem("films")));
        setKeys(JSON.parse(localStorage.getItem("keys")));
      }
    } else {
      const le = navigator.language.split(/[-_]/)[0];
      setLanguage ( le);
      const inf = data[le];
      setUrl(inf.url);
      setUrl(inf.url);
      setTitle(inf.title);
      setLocaleMessages(inf);
      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          setFilms(res);
          setKeys(inf.keys);
          localStorage.setItem("films", JSON.stringify(res));
          localStorage.setItem("keys", JSON.stringify(inf.keys));
        });
    }
  });
  if (films.length === 0) {
    return (
      <div>
        <h1> ... </h1>
      </div>
    );
  } else if (navigator.onLine) {
    return (
      <div>
        <IntlProvider locale={language} messages= {localeMessages}>
            <TableF films={films} keys={keys} title={title}></TableF>
        </IntlProvider>
        <Grafic data={films}></Grafic>
      </div>
    );
  } else {
    return (
      <div>
        <TableF films={films} keys={keys} title={title}></TableF>
      </div>
    );
  }
};
export default Films;
