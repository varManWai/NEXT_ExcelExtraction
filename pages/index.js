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
    <div>
      {console.log("1111111111111111111111")}
      {console.log(items)}
      {console.log("3333333333333333333333")}
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />

      <table className="table container">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {items.map((d) => (
            <tr key={d.name}>
              <th>{d.name}</th>
              <td>{d.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
