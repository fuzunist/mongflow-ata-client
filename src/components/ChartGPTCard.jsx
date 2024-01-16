import React from "react";

const ChartGPTCard = ({ gptResponse = null, color }) => {
  if (gptResponse === null) {
    gptResponse =
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam fuga iste rerum repellat. A tempore nostrum praesentium eius incidunt suscipit quisquam! Nam dolore Laboriosam fuga iste rerum repellat. Laboriosam fuga iste rerum repellat. Laboriosam fuga iste rerum repellat.";
  }
   return null
  return (
    <div className="text-gray-500 italic shadow-lg p-4 mb-2">
      <span className="font-semibold ">Grafik Analizi: </span>
      <p className=" line-clamp-3"> {gptResponse}</p>
    </div>
  );
};

export default ChartGPTCard;
