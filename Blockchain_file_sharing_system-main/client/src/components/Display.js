import { useState } from "react";
import "./Display.css";
const Display = ({ contract, account }) => {
  const [data, setData] = useState("");
  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
      } else {
        dataArray = await contract.display(account);
      }
    } catch (error) {
      alert("You don't have access");
    }
    const isEmpty = Object.keys(dataArray).length == 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
    // console.log(str);
    // console.log(str_array);
    function isImage(url) {

      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
      });
    }

    const images = await Promise.all(str_array.map(async (item, i) => {

      try {
        const isItemImage = await isImage(item);
        const src = isItemImage ? item : 'https://curate.nd.edu/assets/curate/default-1d435cdbfc607f1ce11e41ab0baa1704f437a7944c5a75a1d509edaf28b05902.png';
    
        return (
          <a href={item} key={`a-${i}`} target="_blank" rel="noopener noreferrer">
            <img
              key={`img-${i}`}
              src={src}
              alt={`new-${i}`}
              className="image-list"
            ></img>
          </a>
        );
      } catch (error) {
        console.error('Error loading image:', error);
        return null; 
      }
      }));
      setData(images);
    } else {
      alert("No file to display");
    }
  };
  return (
    <>
      <div className="image-list">{data}</div>
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input>
      <button className="center button" onClick={getdata}>
        Get Data
      </button>
    </>
  );
};
export default Display;
