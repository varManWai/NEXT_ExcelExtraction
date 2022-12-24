import * as XLSX from "xlsx";
import { useState } from "react";

export default function Home() {
  const [items, setItems] = useState([]);

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        console.log(wsname);

        const ws = wb.Sheets[wsname];

        console.log(ws);

        const data = XLSX.utils.sheet_to_json(ws);

        console.log(data);

        data.map((d) => {
          setItems([...items, d]);
        });

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setItems(d);
    });
  };

  return (
   
  );
}
